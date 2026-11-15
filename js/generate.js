import { DEITIES } from "./deities.js";
import { NATURE_BELIEFS, FLAVOR_BELIEFS, ATTRIBUTES, FLAWS } from "./personality.js";
import { featuresFor } from "./features.js";
import { NAME_TABLES, nameKeyForRace } from "./names.js";
import {
  ABILITIES, ABILITY_NAMES, ALL_SKILL_NAMES, ANCESTRIES, ARMORS, BACKGROUNDS,
  BARD_CANTRIPS, BARD_KNOWN, CLERIC_CANTRIPS, CLASSES, DOMAIN_SPELLS, EK_KNOWN,
  EXTRA_LANGUAGES, FIGHTING_STYLES, FULL_SLOTS, HALF_SLOTS, HEAVY_DOMAINS,
  INVOCATIONS, MANEUVERS, METAMAGIC, OATH_SPELLS, RACES, RANGER_KNOWN,
  SKILLS, SORC_CANTRIPS, SORC_KNOWN, THIRD_SLOTS, WARLOCK_CANTRIPS, WARLOCK_KNOWN,
  WEAPONS, WIZARD_CANTRIPS
} from "./rules.js";
import { SPELLS } from "./spells.js";
import { MAGIC_WEAPONS, lootRarity, magicWeaponCount, scrollSpellLevel, treasureChoices } from "./loot.js";

const CLASS_BY_ID = Object.fromEntries(CLASSES.map((item) => [item.id, item]));
const RACE_BY_ID = Object.fromEntries(RACES.map((item) => [item.id, item]));
const SPELL_BY_NAME = new Map(SPELLS.map((spell) => [spell.name.toLowerCase(), spell]));

export { CLASSES, RACES };

export function generateNpc(options = {}, rng = Math.random) {
  const gender = options.gender && options.gender !== "random" ? options.gender : pick(["male", "female"], rng);
  const race = resolveRace(options.raceId, rng);
  const classId = resolveClass(options.classId, rng);
  const klass = classId === "none" ? null : CLASS_BY_ID[classId];
  const level = klass ? resolveLevel(options.level, rng) : null;

  const npc = {
    gender,
    raceId: race.id,
    raceName: race.name,
    classId,
    className: klass ? klass.name : "No class",
    level,
    alignment: "chaotic neutral",
    scores: {},
    choices: {}
  };

  if (!klass) {
    buildClassless(npc, race, rng);
  } else {
    buildClassed(npc, race, klass, rng);
  }

  npc.personality = buildPersonality(npc, rng);
  npc.loot = buildLoot(npc.wealth, npc.level, rng);
  return npc;
}

function buildClassless(npc, race, rng) {
  for (const ability of ABILITIES) npc.scores[ability] = rollInt(8, 12, rng);
  npc.wealth = rollInt(1, 100, rng);
  npc.hp = 10;
  npc.ac = 10 + mod(npc.scores.dex);
  npc.acNote = "cloth, unarmored";
  npc.speed = race.speed;
  npc.initiative = mod(npc.scores.dex);
  npc.proficiency = 0;
  npc.darkvision = race.darkvision || 0;
  npc.languages = [...race.languages];
  npc.traits = [...(race.traits || [])];
  npc.resists = [...(race.resists || [])];
  npc.name = makeName(race.id, npc.gender, rng);
  npc.skillSet = new Set();
  npc.expertise = new Set();
  npc.skills = buildSkillList(npc);
  npc.saves = ABILITIES.map((ability) => ({
    id: ability,
    name: ABILITY_NAMES[ability],
    bonus: mod(npc.scores[ability]),
    proficient: false
  }));
  npc.attacks = [{
    name: "Unarmed strike",
    bonus: fmt(mod(npc.scores.str)),
    damage: `1${fmt(mod(npc.scores.str))} bludgeoning`,
    note: "No weapon training"
  }];
  npc.features = [];
  npc.equipment = ["Common clothes"];
  npc.spells = null;
  npc.passivePerception = 10 + mod(npc.scores.wis);
}

function buildClassed(npc, race, klass, rng) {
  const priorities = klass.altPriorities && rng() < 0.5 ? klass.altPriorities : klass.priorities;
  npc.scores = assignStandardArray(priorities);
  applyRacialBonuses(npc, race, rng);
  npc.subclass = null;
  if (npc.level >= klass.subclassLevel) {
    npc.subclass = pick(klass.subclasses, rng);
  }
  npc.subclassId = npc.subclass ? npc.subclass.id : null;
  npc.subclassName = npc.subclass ? npc.subclass.name : null;

  for (const asiLevel of asiLevels(klass.id, npc.level)) {
    applyAsi(npc.scores, priorities[0], priorities[1]);
    void asiLevel;
  }
  if (klass.id === "barbarian" && npc.level >= 20) {
    npc.scores.str = Math.min(24, npc.scores.str + 4);
    npc.scores.con = Math.min(24, npc.scores.con + 4);
  }

  npc.proficiency = proficiencyBonus(npc.level);
  npc.background = pickBackground(klass.id, rng);
  npc.ancestry = race.ancestry ? pick(ANCESTRIES, rng) : null;
  if (npc.subclassId === "draconic") npc.draconic = pick(ANCESTRIES, rng);
  if (npc.subclassId === "totem") npc.choices.totem = pick(["Bear", "Eagle", "Wolf"], rng);
  if (klass.id === "ranger") {
    npc.choices.enemy = pick(["beasts", "fey", "undead", "monstrosities", "humanoids", "giants", "dragons"], rng);
    npc.choices.terrain = pick(["forest", "grassland", "mountain", "swamp", "coast", "desert", "arctic"], rng);
  }
  if (npc.subclassId === "hunter") {
    npc.choices.prey = pick(["Colossus Slayer", "Giant Killer", "Horde Breaker"], rng);
  }

  const styleLevels = { fighter: 1, paladin: 2, ranger: 2 };
  if (npc.level >= (styleLevels[klass.id] || 99)) {
    npc.fightingStyle = pick(FIGHTING_STYLES[klass.id], rng);
    if (npc.subclassId === "champion" && npc.level >= 10) {
      const second = FIGHTING_STYLES.fighter.filter((style) => style !== npc.fightingStyle);
      npc.fightingStyle2 = pick(second, rng);
    }
  }

  grantTraining(npc, race, klass, rng);
  const extraHp = (race.id === "hill-dwarf" ? 1 : 0) + (npc.subclassId === "draconic" ? 1 : 0);
  npc.hp = hitPoints(klass.hitDie, npc.level, mod(npc.scores.con), extraHp);
  npc.hitDie = `${npc.level}d${klass.hitDie}`;

  chooseGear(npc, klass, race, rng);
  finalizeArmorClass(npc);
  if (npc.level >= 5) addMagicGear(npc, rng);

  npc.speed = race.speed;
  if (klass.id === "barbarian" && npc.level >= 5 && (!npc.armor || npc.armor.cat !== "heavy")) npc.speed += 10;
  if (klass.id === "monk" && !npc.armor && !npc.shield) {
    const bumps = [18, 14, 10, 6, 2].filter((at) => npc.level >= at).length;
    npc.speed += bumps * 5;
  }

  npc.initiative = mod(npc.scores.dex);
  if (npc.subclassId === "champion" && npc.level >= 7) npc.initiative += Math.floor(npc.proficiency / 2);
  npc.darkvision = race.darkvision || 0;
  npc.resists = [...(race.resists || [])];
  if (npc.ancestry) npc.resists.push(npc.ancestry.damage);
  if (npc.draconic && npc.level >= 6) npc.resists.push(npc.draconic.damage);
  npc.name = makeName(race.id, npc.gender, rng);
  npc.wealth = rollInt(1, 100, rng);
  npc.saves = buildSaves(npc, klass);
  npc.skills = buildSkillList(npc);
  npc.passivePerception = 10 + skillBonus(npc, "Perception");
  if (npc.classId === "bard" && npc.level >= 2) npc.initiative += Math.floor(npc.proficiency / 2);
  npc.attacks = buildAttacks(npc, klass);
  npc.spells = buildSpells(npc, klass, rng);
  if (npc.subclassId === "battle-master") {
    const maneuverCount = npc.level >= 15 ? 9 : npc.level >= 10 ? 7 : npc.level >= 7 ? 5 : 3;
    npc.maneuvers = sample(MANEUVERS, maneuverCount, rng);
  }
  npc.features = buildFeatureList(npc, klass, race);
  npc.equipment = equipmentList(npc, klass, rng);
  npc.traits = [...(race.traits || [])];
}

function resolveRace(raceId, rng) {
  if (raceId && raceId !== "random" && RACE_BY_ID[raceId]) return RACE_BY_ID[raceId];
  return pick(RACES, rng);
}

function resolveClass(classId, rng) {
  if (classId === "none") return "none";
  if (classId && classId !== "random" && CLASS_BY_ID[classId]) return classId;
  return pick([...CLASSES.map((item) => item.id), "none"], rng);
}

function resolveLevel(level, rng) {
  const number = Number(level);
  if (Number.isInteger(number) && number >= 1 && number <= 20) return number;
  return rollInt(1, 20, rng);
}

function assignStandardArray(priorities) {
  const array = [15, 14, 13, 12, 10, 8];
  const scores = { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 };
  priorities.forEach((ability, index) => {
    scores[ability] = array[index];
  });
  return scores;
}

function applyRacialBonuses(npc, race, rng) {
  for (const [ability, amount] of Object.entries(race.bonuses || {})) {
    npc.scores[ability] += amount;
  }
  if (race.halfElfAsi) {
    const options = ABILITIES.filter((ability) => ability !== "cha");
    const first = pick(options, rng);
    const second = pick(options.filter((ability) => ability !== first), rng);
    npc.scores[first] += 1;
    npc.scores[second] += 1;
    npc.choices.halfElf = [first, second];
  }
}

function asiLevels(classId, level) {
  const levels = [4, 8, 12, 16, 19];
  if (classId === "fighter") levels.push(6, 14);
  if (classId === "rogue") levels.push(10);
  return levels.filter((value) => value <= level).sort((a, b) => a - b);
}

function applyAsi(scores, primary, secondary) {
  if (scores[primary] <= 18) {
    scores[primary] = Math.min(20, scores[primary] + 2);
    return;
  }
  if (scores[primary] === 19) {
    scores[primary] = 20;
    if (scores[secondary] < 20) scores[secondary] += 1;
    return;
  }
  if (scores[secondary] <= 18) scores[secondary] = Math.min(20, scores[secondary] + 2);
  else if (scores[secondary] < 20) scores[secondary] += 1;
}

function grantTraining(npc, race, klass, rng) {
  const skills = new Set();
  const classPicked = sample(klass.skills, klass.skillCount, rng);
  classPicked.forEach((skill) => skills.add(skill));
  for (const skill of npc.background.skills) {
    if (skills.has(skill)) {
      const replacement = ALL_SKILL_NAMES.find((name) => !skills.has(name) && !npc.background.skills.includes(name));
      const fallback = ALL_SKILL_NAMES.find((name) => !skills.has(name));
      if (replacement) skills.add(replacement);
      else if (fallback) skills.add(fallback);
    } else {
      skills.add(skill);
    }
  }
  if (race.id === "high-elf" || race.id === "wood-elf" || race.id === "drow" || race.id === "half-orc") {
    const racial = race.id === "half-orc" ? "Intimidation" : "Perception";
    skills.add(racial);
  }
  if (race.extraSkills) {
    sample(ALL_SKILL_NAMES.filter((name) => !skills.has(name)), race.extraSkills, rng).forEach((name) => skills.add(name));
  }
  if (npc.subclassId === "lore" && npc.level >= 3) {
    sample(ALL_SKILL_NAMES.filter((name) => !skills.has(name)), 3, rng).forEach((name) => skills.add(name));
  }
  npc.skillSet = skills;
  npc.expertise = new Set();
  const expertCount = expertiseCount(npc);
  if (expertCount) {
    sample([...skills], expertCount, rng).forEach((name) => npc.expertise.add(name));
  }
  if (npc.subclassId === "knowledge" && npc.level >= 1) {
    const know = ["Arcana", "History", "Nature", "Religion"];
    sample(know, 2, rng).forEach((name) => {
      skills.add(name);
      npc.expertise.add(name);
    });
  }

  const languages = new Set(race.languages);
  const extra = (race.extraLanguages || 0) + (npc.background.languages || 0) + (npc.subclassId === "knowledge" ? 2 : 0);
  sample(EXTRA_LANGUAGES.filter((language) => !languages.has(language)), extra, rng).forEach((language) => languages.add(language));
  if (npc.draconic) languages.add("Draconic");
  npc.languages = [...languages];

  npc.tools = [...(npc.background.tools || [])];
  if (race.toolChoice) npc.tools.push(pick(race.toolChoice, rng));
  if (klass.id === "rogue" && !npc.tools.includes("thieves' tools")) npc.tools.push("thieves' tools");
  if (npc.subclassId === "assassin") npc.tools.push("disguise kit", "poisoner's kit");
}

function expertiseCount(npc) {
  let count = 0;
  if (npc.classId === "rogue") {
    if (npc.level >= 1) count += 2;
    if (npc.level >= 6) count += 2;
  }
  if (npc.classId === "bard") {
    if (npc.level >= 3) count += 2;
    if (npc.level >= 10) count += 2;
  }
  return count;
}

function hitPoints(hitDie, level, conMod, extraPerLevel) {
  const average = Math.floor(hitDie / 2) + 1;
  let total = 0;
  for (let current = 1; current <= level; current += 1) {
    const base = current === 1 ? hitDie : average;
    total += Math.max(1, base + conMod);
  }
  return total + extraPerLevel * level;
}

function armorProfs(npc) {
  const klass = CLASS_BY_ID[npc.classId];
  const set = new Set(klass.armor);
  const race = RACE_BY_ID[npc.raceId];
  (race.armorProf || []).forEach((item) => set.add(item));
  if (npc.classId === "cleric" && HEAVY_DOMAINS.has(npc.subclassId)) set.add("heavy");
  if (npc.classId === "bard" && npc.subclassId === "valor" && npc.level >= 3) {
    set.add("medium");
    set.add("shields");
  }
  return set;
}

function weaponAllowed(weapon, npc) {
  const klass = CLASS_BY_ID[npc.classId];
  const race = RACE_BY_ID[npc.raceId];
  const name = weapon.name.toLowerCase();
  if ((race.weaponProf || []).includes(name)) return true;
  if ((klass.extraWeapons || []).includes(name)) return true;
  if (npc.subclassId === "valor" && npc.level >= 3) return true;
  if ((npc.subclassId === "tempest" || npc.subclassId === "war") && weapon.cat === "martial") return true;
  if (klass.weapons === "martial") return true;
  if (klass.weapons === "simple" && weapon.cat === "simple") return true;
  if (klass.weapons === "druid" && weapon.druid) return true;
  if (klass.weapons === "monk" && (weapon.cat === "simple" || name === "shortsword")) return true;
  if ((klass.weapons === "wizard" || klass.weapons === "sorcerer") && ["dagger", "dart", "quarterstaff", "light crossbow"].includes(name)) return true;
  return false;
}

function chooseGear(npc, klass, race, rng) {
  const profs = armorProfs(npc);
  const style = npc.fightingStyle;
  const dexBuild = npc.scores.dex > npc.scores.str || style === "Archery" || style === "Two-Weapon Fighting" || ["rogue", "monk", "ranger"].includes(klass.id);
  const legal = WEAPONS.filter((weapon) => weaponAllowed(weapon, npc));

  let chosen = [];
  let wantShield = profs.has("shields");
  if (klass.id === "monk") {
    chosen = [findWeapon("Quarterstaff")];
    wantShield = false;
  } else if (style === "Archery" || (dexBuild && legal.some((weapon) => weapon.ranged) && rng() < 0.45)) {
    const bows = legal.filter((weapon) => weapon.ranged);
    chosen = [bestWeapon(bows, npc)];
    wantShield = false;
  } else if (style === "Great Weapon Fighting") {
    chosen = [bestWeapon(legal.filter((weapon) => weapon.twoHanded && !weapon.ranged), npc)];
    wantShield = false;
  } else if (style === "Two-Weapon Fighting") {
    const lights = legal.filter((weapon) => weapon.light && !weapon.ranged);
    const main = bestWeapon(lights, npc);
    const off = lights.find((weapon) => weapon !== main) || main;
    chosen = [main, off];
    wantShield = false;
  } else if (dexBuild) {
    chosen = [bestWeapon(legal.filter((weapon) => weapon.finesse || weapon.ability === "dex"), npc)];
    if (klass.id === "rogue" || klass.id === "wizard" || klass.id === "sorcerer" || klass.id === "monk") wantShield = false;
  } else {
    chosen = [bestWeapon(legal.filter((weapon) => !weapon.ranged), npc)];
    if (style === "Great Weapon Fighting") wantShield = false;
  }
  chosen = chosen.filter(Boolean);
  if (chosen.some((weapon) => weapon.twoHanded || weapon.ranged)) wantShield = false;
  if (style === "Protection") wantShield = profs.has("shields");

  const armor = bestArmor(npc, profs);
  npc.armor = armor;
  npc.shield = wantShield;
  npc.shieldName = wantShield ? (klass.id === "druid" ? "wooden shield" : "shield") : null;
  npc.weapons = chosen.length ? chosen : [findWeapon("Dagger") || legal[0]].filter(Boolean);

  const unarmored = unarmoredAc(npc, wantShield);
  const armored = armor ? armoredAc(npc, armor, wantShield) : -1;
  if (klass.id === "monk" || armored < unarmored) {
    npc.armor = null;
    if (klass.id === "monk") npc.shield = false;
  }
}

function bestArmor(npc, profs) {
  const options = ARMORS.filter((armor) => {
    if (!profs.has(armor.cat)) return false;
    if (armor.level > npc.level) return false;
    if ((armor.str || 0) > npc.scores.str) return false;
    if (npc.classId === "druid" && armor.metal) return false;
    return true;
  });
  options.sort((a, b) => b.base - a.base || b.level - a.level);
  return options[0] || null;
}

function bestWeapon(list, npc) {
  if (!list.length) return null;
  const scored = list.map((weapon) => {
    const ability = weapon.finesse && mod(npc.scores.dex) > mod(npc.scores.str) ? "dex" : weapon.ability;
    const average = diceAverage(weapon.damage) + mod(npc.scores[ability]);
    return { weapon, average };
  });
  scored.sort((a, b) => b.average - a.average);
  const top = scored[0].average;
  const ties = scored.filter((item) => item.average === top).map((item) => item.weapon);
  return ties[0];
}

function unarmoredAc(npc, shield) {
  const dex = mod(npc.scores.dex);
  let ac = 10 + dex;
  if (npc.classId === "barbarian") ac = 10 + dex + mod(npc.scores.con);
  if (npc.classId === "monk") return 10 + dex + mod(npc.scores.wis);
  if (npc.subclassId === "draconic") ac = Math.max(ac, 13 + dex);
  if (shield && npc.classId !== "monk") ac += 2;
  return ac;
}

function armoredAc(npc, armor, shield) {
  const dex = mod(npc.scores.dex);
  const dexBonus = armor.cat === "heavy" ? 0 : armor.cat === "medium" ? Math.min(2, dex) : dex;
  return armor.base + dexBonus + (shield ? 2 : 0);
}

function finalizeArmorClass(npc) {
  const shield = npc.shield ? 2 : 0;
  const magicShield = npc.magicShield || 0;
  const magicArmor = npc.magicArmor || 0;
  const cloak = npc.protectionBonus || 0;
  const defense = (npc.fightingStyle === "Defense" || npc.fightingStyle2 === "Defense") && npc.armor ? 1 : 0;
  if (!npc.armor) {
    npc.ac = unarmoredAc(npc, npc.shield) + magicShield + cloak;
    npc.acNote = npc.classId === "barbarian" || npc.classId === "monk"
      ? "unarmored defense"
      : npc.subclassId === "draconic" ? "draconic resilience" : "unarmored";
  } else {
    npc.ac = armoredAc(npc, npc.armor, false) + shield + magicArmor + magicShield + defense + cloak;
    npc.acNote = npc.armor.name + (npc.magicArmor ? " +1" : "");
    if (npc.shield) npc.acNote += npc.magicShield ? ", +1 shield" : `, ${npc.shieldName}`;
  }
  if (defense) npc.acNote += ", Defense";
  if (cloak) npc.acNote += ", protection";
}

function addMagicGear(npc, rng) {
  const chance = magicChance(npc.level);
  const rolls = npc.level >= 15 ? 2 : 1;
  let successes = 0;
  for (let roll = 0; roll < rolls; roll += 1) {
    if (rng() * 100 < chance) successes += 1;
  }
  const slots = [];
  if (npc.weapons.length) slots.push("weapon");
  if (npc.armor) slots.push("armor");
  if (npc.shield) slots.push("shield");
  slots.push("trinket");
  const picked = sample(slots, successes, rng);
  npc.magicItems = [];
  for (const slot of picked) {
    if (slot === "weapon") {
      npc.magicWeapon = 1;
      npc.magicItems.push(`+1 ${npc.weapons[0].name.toLowerCase()}`);
    } else if (slot === "armor") {
      npc.magicArmor = 1;
      npc.magicItems.push(`+1 ${npc.armor.name.toLowerCase()}`);
    } else if (slot === "shield") {
      npc.magicShield = 1;
      npc.magicItems.push("+1 shield");
    } else {
      const trinket = pick(["cloak of protection", "ring of protection", "brooch of shielding"], rng);
      npc.magicItems.push(trinket);
      if (trinket !== "brooch of shielding") npc.protectionBonus = (npc.protectionBonus || 0) + 1;
    }
  }
  finalizeArmorClass(npc);
}

function magicChance(level) {
  if (level < 5) return 0;
  return Math.round(1 + ((level - 5) * 29) / 15);
}

function buildSaves(npc, klass) {
  const bonus = npc.protectionBonus || 0;
  return ABILITIES.map((ability) => {
    const proficient = klass.saves.includes(ability) || (ability === "wis" && npc.classId === "rogue" && npc.level >= 15);
    return {
      id: ability,
      name: ABILITY_NAMES[ability],
      proficient,
      bonus: mod(npc.scores[ability]) + (proficient ? npc.proficiency : 0) + bonus
    };
  });
}

function buildSkillList(npc) {
  return SKILLS.map(([name, ability]) => {
    const proficient = npc.skillSet.has(name);
    const expert = npc.expertise.has(name);
    return {
      name,
      ability,
      proficient,
      expert,
      bonus: skillBonus(npc, name)
    };
  });
}

function skillBonus(npc, name) {
  const skill = SKILLS.find(([skillName]) => skillName === name);
  const abilityMod = mod(npc.scores[skill[1]]);
  const proficient = npc.skillSet.has(name);
  const expert = npc.expertise.has(name);
  let bonus = abilityMod;
  if (proficient) bonus += npc.proficiency * (expert ? 2 : 1);
  else if (npc.classId === "bard" && npc.level >= 2) bonus += Math.floor(npc.proficiency / 2);
  else if (npc.subclassId === "champion" && npc.level >= 7 && ["str", "dex", "con"].includes(skill[1])) {
    bonus += Math.floor(npc.proficiency / 2);
  }
  return bonus;
}

function buildAttacks(npc, klass) {
  const attacks = [];
  const count = attackCount(npc);
  npc.weapons.forEach((weapon, index) => {
    const ability = attackAbility(weapon, npc);
    const proficient = weaponAllowed(weapon, npc) || index === 0;
    const magic = index === 0 ? npc.magicWeapon || 0 : 0;
    const attack = mod(npc.scores[ability]) + (proficient ? npc.proficiency : 0) + magic;
    const damageBonus = mod(npc.scores[ability]) + magic;
    const name = `${magic ? "+1 " : ""}${weapon.name}`;
    const notes = [];
    if (count > 1 && index === 0 && !weapon.ranged) notes.push(`${count} attacks`);
    if (klass.id === "rogue" && (weapon.finesse || weapon.ranged)) notes.push(`sneak attack +${sneakDice(npc.level)}d6`);
    if (klass.id === "barbarian" && !weapon.ranged) notes.push(`rage +${rageDamage(npc.level)}`);
    attacks.push({
      name,
      bonus: fmt(attack),
      damage: `${weapon.damage}${fmt(damageBonus)}`,
      note: notes.join(", ")
    });
  });
  if (klass.id === "monk") {
    const die = npc.level >= 17 ? "1d10" : npc.level >= 11 ? "1d8" : npc.level >= 5 ? "1d6" : "1d4";
    const ability = mod(npc.scores.dex) > mod(npc.scores.str) ? "dex" : "str";
    const bonus = mod(npc.scores[ability]) + npc.proficiency;
    attacks.push({
      name: "Unarmed strike",
      bonus: fmt(bonus),
      damage: `${die}${fmt(mod(npc.scores[ability]))}`,
      note: "martial arts"
    });
  }
  if (npc.ancestry) {
    const dice = npc.level < 6 ? 2 : npc.level < 11 ? 3 : npc.level < 16 ? 4 : 5;
    const dc = 8 + npc.proficiency + mod(npc.scores.con);
    attacks.push({
      name: `${npc.ancestry.name} breath`,
      bonus: `DC ${dc}`,
      damage: `${dice}d6 ${npc.ancestry.damage}`,
      note: "one breath per rest"
    });
  }
  return attacks;
}

function attackCount(npc) {
  if (npc.classId === "fighter") {
    if (npc.level >= 20) return 4;
    if (npc.level >= 11) return 3;
    if (npc.level >= 5) return 2;
  }
  if (["barbarian", "paladin", "ranger", "monk"].includes(npc.classId) && npc.level >= 5) return 2;
  if (npc.classId === "bard" && npc.subclassId === "valor" && npc.level >= 6) return 2;
  return 1;
}

function attackAbility(weapon, npc) {
  if (weapon.finesse && mod(npc.scores.dex) >= mod(npc.scores.str)) return "dex";
  if (weapon.ranged) return "dex";
  if (npc.classId === "monk") return mod(npc.scores.dex) >= mod(npc.scores.str) ? "dex" : "str";
  return weapon.ability || "str";
}

function buildFeatureList(npc, klass, race) {
  const features = featuresFor(klass.id, npc.subclassId, npc.level)
    .filter((feature) => feature.name !== "Fighting Style");
  if (npc.fightingStyle) features.unshift({ level: 1, name: "Fighting Style", detail: `${npc.fightingStyle}${npc.fightingStyle2 ? ` and ${npc.fightingStyle2}` : ""}.` });
  if (npc.maneuvers) features.unshift({ level: 3, name: "Maneuvers", detail: npc.maneuvers.join(", ") + "." });
  if (npc.metamagic) features.unshift({ level: 3, name: "Metamagic", detail: npc.metamagic.join(", ") + "." });
  if (npc.pact) features.unshift({ level: 3, name: "Pact Boon", detail: `${npc.pact}.` });
  if (npc.invocations && npc.invocations.length) features.unshift({ level: 2, name: "Invocations", detail: npc.invocations.join(", ") + "." });
  if (npc.choices.totem) features.unshift({ level: 3, name: "Totem", detail: `${npc.choices.totem} spirit.` });
  if (npc.choices.enemy) features.unshift({ level: 1, name: "Favored enemy and terrain", detail: `${npc.choices.enemy}, ${npc.choices.terrain}.` });
  if (npc.choices.prey) features.unshift({ level: 3, name: "Hunter's Prey", detail: `${npc.choices.prey}.` });
  if (npc.ancestry) features.unshift({ level: 1, name: `${npc.ancestry.name} dragonborn`, detail: `Resistance to ${npc.ancestry.damage}, and a breath weapon.` });
  if (npc.draconic) features.unshift({ level: 1, name: "Draconic ancestry", detail: `${npc.draconic.name} dragon, ${npc.draconic.damage}.` });
  if (race.wizardCantrip) features.push({ level: 1, name: "High elf cantrip", detail: npc.racialCantrip ? npc.racialCantrip.name : "A wizard cantrip." });
  return features;
}

function buildSpells(npc, klass, rng) {
  const kind = spellcastingKind(npc);
  if (!kind) {
    npc.racialCantrip = racialCantrip(npc, [], rng);
    return npc.racialCantrip ? { racial: [npc.racialCantrip.name], cantrips: [], prepared: [], book: [], slots: "", dc: null, attack: null, ability: null } : null;
  }
  const ability = castingAbility(kind);
  const slots = slotsFor(npc, kind);
  const maxLevel = kind === "warlock" ? warlockPact(npc.level).slot : slots.length;
  const school = wizardSchool(npc);
  let cantripPool = SPELLS.filter((spell) => spell.level === 0 && spell.classes.includes(casterList(kind)));
  let leveledPool = SPELLS.filter((spell) => spell.level > 0 && spell.level <= maxLevel && spell.classes.includes(casterList(kind)));
  if (kind === "eldritch-knight" || kind === "arcane-trickster") {
    cantripPool = SPELLS.filter((spell) => spell.level === 0 && spell.classes.includes("wizard"));
    const schools = kind === "eldritch-knight" ? ["abjuration", "evocation"] : ["enchantment", "illusion"];
    const anyCount = [3, 8, 14, 20].filter((value) => npc.level >= value).length;
    const restricted = SPELLS.filter((spell) => spell.level > 0 && spell.level <= maxLevel && spell.classes.includes("wizard") && schools.includes(spell.school));
    const any = SPELLS.filter((spell) => spell.level > 0 && spell.level <= maxLevel && spell.classes.includes("wizard") && !schools.includes(spell.school));
    const known = EK_KNOWN[npc.level] || 0;
    const free = drawSpells(any, Math.min(anyCount, known), rng, null);
    const rest = drawSpells(restricted, Math.max(0, known - free.length), rng, null);
    let knownSpells = [...free, ...rest];
    knownSpells = ensureSpell(knownSpells, [...restricted, ...any], known, (spell) => spell.damage);
    const cantripCount = kind === "arcane-trickster" ? (npc.level >= 10 ? 4 : 3) : (npc.level >= 10 ? 3 : 2);
    let cantrips = drawSpells(cantripPool, cantripCount, rng, null);
    cantrips = ensureSpell(cantrips, cantripPool, cantripCount, (spell) => spell.damage);
    if (kind === "arcane-trickster") {
      const hand = SPELL_BY_NAME.get("mage hand");
      if (hand && !cantrips.some((spell) => spell.name === "Mage Hand")) {
        cantrips = [hand, ...cantrips.filter((spell) => spell.damage).slice(0, cantripCount - 1)];
        while (cantrips.length < cantripCount) {
          const extra = cantripPool.find((spell) => !cantrips.includes(spell));
          if (!extra) break;
          cantrips.push(extra);
        }
      }
    }
    npc.racialCantrip = racialCantrip(npc, cantrips, rng);
    return packSpells(npc, ability, cantrips, knownSpells, [], formatSlots(slots), kind === "warlock");
  }

  const cantripCount = cantripsKnown(kind, npc.level);
  let cantrips = drawSpells(cantripPool, cantripCount, rng, null);
  cantrips = ensureSpell(cantrips, cantripPool, cantripCount, (spell) => spell.damage);

  let prepared = [];
  let book = [];
  let known = [];
  if (kind === "wizard") {
    const bookCount = 6 + (npc.level - 1) * 2;
    book = drawSpells(leveledPool, bookCount, rng, school);
    book = ensureSpell(book, leveledPool, bookCount, (spell) => spell.damage);
    const prepareCount = Math.max(1, mod(npc.scores.int) + npc.level);
    prepared = drawSpells(book.filter((spell) => spell.level <= maxLevel), Math.min(prepareCount, book.length), rng, school);
    prepared = ensureSpell(prepared, book, prepareCount, (spell) => spell.damage);
  } else if (kind === "cleric" || kind === "druid" || kind === "paladin") {
    const abilityMod = mod(npc.scores[ability]);
    const prepareCount = kind === "paladin"
      ? Math.max(1, abilityMod + Math.floor(npc.level / 2))
      : Math.max(1, abilityMod + npc.level);
    if (maxLevel > 0) {
      prepared = drawSpells(leveledPool, Math.min(prepareCount, leveledPool.length), rng, null);
      prepared = ensureSpell(prepared, leveledPool, prepareCount, (spell) => spell.damage);
    } else prepared = [];
    const always = alwaysPrepared(npc, kind);
    for (const spell of always) {
      if (!prepared.some((item) => item.name === spell.name)) prepared.push(spell);
    }
  } else if (kind === "warlock") {
    const count = WARLOCK_KNOWN[npc.level];
    known = drawSpells(leveledPool, count, rng, null);
    known = ensureSpell(known, leveledPool, count, (spell) => spell.damage);
    npc.pact = npc.level >= 3 ? pick(["Pact of the Blade", "Pact of the Chain", "Pact of the Tome"], rng) : null;
    npc.invocations = pickInvocations(npc, rng);
    for (const arcanum of [11, 13, 15, 17]) {
      const spellLevel = { 11: 6, 13: 7, 15: 8, 17: 9 }[arcanum];
      if (npc.level >= arcanum) {
        const pool = SPELLS.filter((spell) => spell.level === spellLevel && spell.classes.includes("warlock"));
        if (pool.length) known.push(pick(pool, rng));
      }
    }
  } else {
    const count = knownLeveled(kind, npc.level);
    known = drawSpells(leveledPool, count, rng, school);
    known = ensureSpell(known, leveledPool, count, (spell) => spell.damage);
    if (kind === "bard" && (npc.level >= 10 || (npc.subclassId === "lore" && npc.level >= 6))) {
      const secrets = sample(SPELLS.filter((spell) => spell.level > 0 && spell.level <= maxLevel), 2, rng);
      known = [...secrets, ...known.filter((spell) => !secrets.includes(spell)).slice(0, Math.max(0, count - secrets.length))];
    }
    if (kind === "sorcerer" && npc.level >= 3) {
      const metaCount = npc.level >= 17 ? 4 : npc.level >= 10 ? 3 : 2;
      npc.metamagic = sample(METAMAGIC, metaCount, rng);
    }
  }

  npc.racialCantrip = racialCantrip(npc, cantrips, rng);
  const listed = kind === "wizard" ? prepared : (prepared.length ? prepared : known);
  return packSpells(npc, ability, cantrips, listed, book, formatSlots(kind === "warlock" ? [] : slots), kind === "warlock");
}

function packSpells(npc, ability, cantrips, prepared, book, slots, pact) {
  const bonus = npc.proficiency + mod(npc.scores[ability]);
  const pactInfo = pact ? warlockPact(npc.level) : null;
  return {
    ability: ABILITY_NAMES[ability],
    dc: 8 + bonus,
    attack: fmt(bonus),
    cantrips: cantrips.map((spell) => spell.name),
    prepared: prepared.map((spell) => spell.name),
    book: book.map((spell) => spell.name),
    listLabel: book.length ? "Prepared" : (["cleric", "druid", "paladin"].includes(npc.classId) ? "Prepared" : "Known"),
    slots: pactInfo ? `${pactInfo.count} pact slot${pactInfo.count === 1 ? "" : "s"} of ${ordinal(pactInfo.slot)} level` : slots,
    racial: npc.racialCantrip ? [npc.racialCantrip.name] : []
  };
}

function spellcastingKind(npc) {
  if (["bard", "cleric", "druid", "paladin", "ranger", "sorcerer", "warlock", "wizard"].includes(npc.classId)) {
    if ((npc.classId === "paladin" || npc.classId === "ranger") && npc.level < 2) return null;
    return npc.classId;
  }
  if (npc.subclassId === "eldritch-knight" && npc.level >= 3) return "eldritch-knight";
  if (npc.subclassId === "arcane-trickster" && npc.level >= 3) return "arcane-trickster";
  return null;
}

function casterList(kind) {
  if (kind === "eldritch-knight" || kind === "arcane-trickster") return "wizard";
  return kind;
}

function castingAbility(kind) {
  if (["bard", "paladin", "sorcerer", "warlock"].includes(kind)) return "cha";
  if (["wizard", "eldritch-knight", "arcane-trickster"].includes(kind)) return "int";
  return "wis";
}

function slotsFor(npc, kind) {
  if (["bard", "cleric", "druid", "sorcerer", "wizard"].includes(kind)) return FULL_SLOTS[npc.level];
  if (["paladin", "ranger"].includes(kind)) return HALF_SLOTS[npc.level];
  if (kind === "eldritch-knight" || kind === "arcane-trickster") return THIRD_SLOTS[npc.level];
  return [];
}

function cantripsKnown(kind, level) {
  if (kind === "bard") return BARD_CANTRIPS[level];
  if (kind === "sorcerer") return SORC_CANTRIPS[level];
  if (kind === "warlock") return WARLOCK_CANTRIPS[level];
  if (kind === "cleric" || kind === "druid") return CLERIC_CANTRIPS[level];
  if (kind === "wizard") return WIZARD_CANTRIPS[level];
  return 0;
}

function knownLeveled(kind, level) {
  if (kind === "bard") return BARD_KNOWN[level];
  if (kind === "sorcerer") return SORC_KNOWN[level];
  if (kind === "ranger") return RANGER_KNOWN[level];
  return 0;
}

function wizardSchool(npc) {
  const schools = ["abjuration", "conjuration", "divination", "enchantment", "evocation", "illusion", "necromancy", "transmutation"];
  return schools.includes(npc.subclassId) ? npc.subclassId : null;
}

function alwaysPrepared(npc, kind) {
  const names = [];
  if (kind === "cleric" && npc.subclassId && DOMAIN_SPELLS[npc.subclassId]) {
    for (const [spellLevel, list] of Object.entries(DOMAIN_SPELLS[npc.subclassId])) {
      if (Number(spellLevel) <= maxFullLevel(npc.level)) names.push(...list);
    }
  }
  if (kind === "paladin" && npc.subclassId && OATH_SPELLS[npc.subclassId]) {
    for (const [classLevel, list] of Object.entries(OATH_SPELLS[npc.subclassId])) {
      if (npc.level >= Number(classLevel)) names.push(...list);
    }
  }
  return names.map((name) => SPELL_BY_NAME.get(name.toLowerCase())).filter(Boolean);
}

function maxFullLevel(level) {
  return FULL_SLOTS[level].length;
}

function warlockPact(level) {
  const count = level === 1 ? 1 : level < 11 ? 2 : level < 17 ? 3 : 4;
  let slot = 1;
  if (level >= 3) slot = 2;
  if (level >= 5) slot = 3;
  if (level >= 7) slot = 4;
  if (level >= 9) slot = 5;
  return { count, slot };
}

function pickInvocations(npc, rng) {
  const count = npc.level < 2 ? 0 : npc.level < 5 ? 2 : npc.level < 7 ? 3 : npc.level < 9 ? 4 : npc.level < 12 ? 5 : npc.level < 15 ? 6 : npc.level < 18 ? 7 : 8;
  const pact = npc.pact || "";
  const legal = INVOCATIONS.filter((item) => npc.level >= item.level && (!item.pact || pact.toLowerCase().includes(item.pact)));
  return sample(legal, count, rng).map((item) => item.name);
}

function racialCantrip(npc, cantrips, rng) {
  const names = new Set(cantrips.map((spell) => spell.name));
  if (RACE_BY_ID[npc.raceId].wizardCantrip) {
    const pool = SPELLS.filter((spell) => spell.level === 0 && spell.classes.includes("wizard") && !names.has(spell.name));
    return pool.length ? pick(pool, rng) : null;
  }
  if (npc.raceId === "forest-gnome") return SPELL_BY_NAME.get("minor illusion");
  if (npc.raceId === "drow" || npc.raceId === "tiefling") return SPELL_BY_NAME.get("dancing lights") || SPELL_BY_NAME.get("thaumaturgy");
  return null;
}

function buildPersonality(npc, rng) {
  const beliefCount = rollInt(1, 3, rng);
  const attributeCount = rollInt(1, 3, rng);
  const flawCount = rollInt(1, 3, rng);
  const beliefs = [];
  const religious = npc.classId === "cleric" || npc.classId === "paladin" || npc.classId === "druid" || (npc.classId === "none" && rng() < 0.2);
  npc.religious = religious;
  if (religious) {
    if (npc.classId === "druid") beliefs.push(pick(NATURE_BELIEFS, rng));
    else {
      const god = pick(DEITIES, rng);
      npc.god = god.name;
      beliefs.push(`Believes in ${god.name}: ${god.values}.`);
    }
  }
  const flavor = shuffle(FLAVOR_BELIEFS, rng);
  for (const line of flavor) {
    if (beliefs.length >= beliefCount) break;
    beliefs.push(line);
  }
  return {
    beliefs,
    attributes: sample(ATTRIBUTES, attributeCount, rng),
    flaws: sample(FLAWS, flawCount, rng)
  };
}

function buildLoot(wealth, level, rng) {
  const copper = wealth * wealth * 10;
  const gp = Math.floor(copper / 100);
  const sp = Math.floor((copper % 100) / 10);
  const cp = copper % 10;
  const items = [];
  const weapons = magicWeaponCount(level, wealth);
  const usedWeapons = new Set();
  for (let index = 0; index < weapons; index += 1) {
    const rarity = lootRarity(level, wealth, rng);
    const fresh = MAGIC_WEAPONS[rarity].filter((name) => !usedWeapons.has(name));
    const name = pick(fresh.length ? fresh : MAGIC_WEAPONS[rarity], rng);
    usedWeapons.add(name);
    items.push(name);
  }
  if (rng() * 100 < wealth) {
    const goods = treasureChoices(wealth, lootRarity(level, wealth, rng));
    if (goods.length) {
      const good = pick(goods, rng);
      items.push(`${good.name}, worth ${formatGp(good.worth)} gp`);
    }
  }
  if (rng() * 100 < Math.max(0, wealth - 20)) {
    const spellLevel = scrollSpellLevel(wealth, lootRarity(level, wealth, rng));
    const pool = SPELLS.filter((spell) => spell.level === spellLevel);
    if (pool.length) items.push(`spell scroll of ${pick(pool, rng).name}`);
    const highLevel = Number.isInteger(level) && level >= 11;
    if (highLevel && wealth >= 90 && rng() < 0.4 && pool.length) items.push(`spell scroll of ${pick(pool, rng).name}`);
  }
  return { wealth, gp, sp, cp, items };
}

function formatGp(value) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function equipmentList(npc, klass, rng) {
  const items = [];
  if (npc.armor) items.push(npc.magicArmor ? `+1 ${npc.armor.name.toLowerCase()}` : npc.armor.name);
  else items.push(npc.subclassId === "draconic" ? "no armor, scales" : "no armor");
  if (npc.shield) items.push(npc.magicShield ? `+1 ${npc.shieldName}` : npc.shieldName);
  npc.weapons.forEach((weapon, index) => {
    const magic = index === 0 && npc.magicWeapon ? "+1 " : "";
    items.push(`${magic}${weapon.name.toLowerCase()}`);
  });
  (npc.magicItems || []).filter((item) => item.includes("cloak") || item.includes("ring") || item.includes("brooch")).forEach((item) => items.push(item));
  const packs = ["explorer's pack", "dungeoneer's pack", "priest's pack", "scholar's pack", "entertainer's pack", "burglar's pack"];
  items.push(pick(packs, rng));
  if (["cleric", "paladin"].includes(klass.id)) items.push(rng() < 0.5 ? "holy symbol" : "emblem on a shield");
  if (["wizard", "sorcerer", "warlock"].includes(klass.id)) items.push(rng() < 0.5 ? "component pouch" : "arcane focus");
  if (klass.id === "druid") items.push("druidic focus");
  if (klass.id === "bard") items.push("a musical instrument");
  npc.tools.forEach((tool) => items.push(tool));
  return items;
}

function makeName(raceId, gender, rng) {
  const table = NAME_TABLES[nameKeyForRace(raceId)];
  const given = pick(table[gender], rng);
  if (table.virtue && rng() < 0.3) return `${given}, called ${pick(table.virtue, rng)}`;
  if (table.clan && rng() < 0.9) return `${given} ${pick(table.clan, rng)}`;
  if (table.family && rng() < 0.85) return `${given} ${pick(table.family, rng)}`;
  if (table.house && rng() < 0.75) return `${given} ${pick(table.house, rng)}`;
  return given;
}

function pickBackground(classId, rng) {
  const bag = [];
  for (const background of BACKGROUNDS) {
    const weight = background.suggested.includes(classId) ? 4 : 1;
    for (let i = 0; i < weight; i += 1) bag.push(background);
  }
  return pick(bag, rng);
}

function drawSpells(pool, count, rng, school) {
  const remaining = pool.slice();
  const chosen = [];
  while (chosen.length < count && remaining.length) {
    const weights = remaining.map((spell) => (school && spell.school === school ? 4 : 1));
    let roll = rng() * weights.reduce((sum, weight) => sum + weight, 0);
    let index = 0;
    for (; index < remaining.length; index += 1) {
      roll -= weights[index];
      if (roll <= 0) break;
    }
    if (index >= remaining.length) index = remaining.length - 1;
    chosen.push(remaining.splice(index, 1)[0]);
  }
  return chosen;
}

function ensureSpell(chosen, pool, count, predicate) {
  if (!pool.some(predicate) || chosen.some(predicate)) return chosen;
  const needed = pool.find(predicate);
  if (!needed) return chosen;
  if (chosen.length < count) return [...chosen, needed];
  const copy = chosen.slice();
  const index = copy.findIndex((spell) => !predicate(spell));
  if (index >= 0) copy[index] = needed;
  return copy;
}

function findWeapon(name) {
  return WEAPONS.find((weapon) => weapon.name === name);
}

function diceAverage(dice) {
  const match = /^(\d+)d(\d+)$/.exec(dice);
  if (!match) return 1;
  return Number(match[1]) * (Number(match[2]) + 1) / 2;
}

function sneakDice(level) {
  return Math.ceil(level / 2);
}

function rageDamage(level) {
  if (level >= 16) return 4;
  if (level >= 9) return 3;
  if (level >= 1) return 2;
  return 2;
}

function proficiencyBonus(level) {
  return 2 + Math.floor((level - 1) / 4);
}

function formatSlots(slots) {
  if (!slots || !slots.length) return "None";
  return slots.map((count, index) => `${ordinal(index + 1)} × ${count}`).join(", ");
}

function ordinal(number) {
  const names = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
  return names[number] || `${number}th`;
}

function mod(score) {
  return Math.floor((score - 10) / 2);
}

function fmt(number) {
  return number >= 0 ? `+${number}` : `${number}`;
}

function rollInt(min, max, rng) {
  return min + Math.floor(rng() * (max - min + 1));
}

function pick(list, rng) {
  return list[Math.floor(rng() * list.length)];
}

function sample(list, count, rng) {
  const copy = list.slice();
  const chosen = [];
  while (chosen.length < count && copy.length) {
    const index = Math.floor(rng() * copy.length);
    chosen.push(copy.splice(index, 1)[0]);
  }
  return chosen;
}

function shuffle(list, rng) {
  return sample(list, list.length, rng);
}
