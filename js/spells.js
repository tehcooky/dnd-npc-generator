const RAW = `
Acid Splash|0|C|so,wi|d
Blade Ward|0|A|bd,so,wa,wi
Chill Touch|0|N|so,wi|d
Dancing Lights|0|V|bd,so,wi
Fire Bolt|0|V|so,wi|d
Friends|0|E|bd,so,wa,wi
Light|0|V|bd,cl,so,wi
Mage Hand|0|C|bd,so,wa,wi
Mending|0|T|bd,cl,dr,so,wi
Message|0|T|bd,so,wi
Minor Illusion|0|I|bd,so,wa,wi
Poison Spray|0|C|dr,so,wa,wi|d
Prestidigitation|0|T|bd,so,wa,wi
Ray of Frost|0|V|so,wi|d
Shocking Grasp|0|V|so,wi|d
True Strike|0|D|bd,so,wa,wi
Vicious Mockery|0|E|bd|d
Guidance|0|D|cl,dr
Resistance|0|A|cl,dr
Sacred Flame|0|V|cl|d
Spare the Dying|0|N|cl
Thaumaturgy|0|T|cl
Druidcraft|0|T|dr
Produce Flame|0|C|dr|d
Shillelagh|0|T|dr
Thorn Whip|0|T|dr|d
Eldritch Blast|0|V|wa|d
Alarm|1|A|ra,wi
Burning Hands|1|V|so,wi|d
Charm Person|1|E|bd,dr,so,wa,wi
Chromatic Orb|1|V|so,wi|d
Color Spray|1|I|so,wi
Command|1|E|cl,pa
Cure Wounds|1|V|bd,cl,dr,pa,ra
Detect Magic|1|D|bd,cl,dr,pa,ra,so,wi
Disguise Self|1|I|bd,so,wi
Dissonant Whispers|1|E|bd|d
Divine Favor|1|V|pa
Entangle|1|C|dr
Faerie Fire|1|V|bd,dr
False Life|1|N|so,wi
Feather Fall|1|T|bd,so,wi
Find Familiar|1|C|wi
Fog Cloud|1|C|dr,ra,so,wi
Goodberry|1|T|dr,ra
Grease|1|C|wi
Guiding Bolt|1|V|cl|d
Healing Word|1|V|bd,cl,dr
Hellish Rebuke|1|V|wa|d
Hex|1|E|wa|d
Hunter's Mark|1|D|ra|d
Identify|1|D|bd,wi
Inflict Wounds|1|N|cl|d
Longstrider|1|T|bd,dr,ra,wi
Mage Armor|1|A|so,wi
Magic Missile|1|V|so,wi|d
Protection from Evil and Good|1|A|cl,pa,wa,wi
Shield|1|A|so,wi
Shield of Faith|1|A|cl,pa
Silent Image|1|I|bd,so,wi
Sleep|1|E|bd,so,wi
Thunderwave|1|V|bd,dr,so,wi|d
Witch Bolt|1|V|so,wa,wi|d
Bless|1|E|cl,pa
Bane|1|E|bd,cl
Arms of Hadar|1|C|wa|d
Ensnaring Strike|1|C|ra
Hail of Thorns|1|C|ra|d
Searing Smite|1|V|pa|d
Thunderous Smite|1|V|pa|d
Wrathful Smite|1|V|pa
Animal Friendship|1|E|bd,dr,ra
Speak with Animals|1|D|bd,dr,ra
Alter Self|2|T|so,wi
Blindness/Deafness|2|N|bd,cl,so,wi
Blur|2|I|so,wi
Darkness|2|V|so,wa,wi
Darkvision|2|T|dr,ra,so,wi
Hold Person|2|E|bd,cl,dr,so,wa,wi
Invisibility|2|I|bd,so,wa,wi
Misty Step|2|C|so,wa,wi
Scorching Ray|2|V|so,wi|d
Shatter|2|V|bd,so,wa,wi|d
Suggestion|2|E|bd,so,wa,wi
Web|2|C|so,wi
Acid Arrow|2|V|wi|d
Aid|2|A|cl,pa
Spiritual Weapon|2|V|cl|d
Prayer of Healing|2|V|cl
Lesser Restoration|2|A|bd,cl,dr,pa,ra
Moonbeam|2|V|dr|d
Heat Metal|2|T|bd,dr|d
Flaming Sphere|2|C|dr,so,wi|d
Pass without Trace|2|A|dr,ra
Spike Growth|2|T|dr,ra|d
Branding Smite|2|V|pa|d
Magic Weapon|2|T|pa,wi
Find Steed|2|C|pa
Barkskin|2|T|dr,ra
Enhance Ability|2|T|bd,cl,dr,so
Knock|2|T|bd,so,wi
Levitate|2|T|so,wi
Mirror Image|2|I|so,wa,wi
Ray of Enfeeblement|2|N|wa,wi|d
Crown of Madness|2|E|so,wa,wi
Phantasmal Force|2|I|bd,so,wi
See Invisibility|2|D|bd,so,wi
Animate Dead|3|N|cl,wi
Counterspell|3|A|so,wa,wi
Dispel Magic|3|A|bd,cl,dr,pa,so,wa,wi
Fireball|3|V|so,wi|d
Fly|3|T|so,wa,wi
Haste|3|T|so,wi
Hypnotic Pattern|3|I|bd,so,wa,wi
Lightning Bolt|3|V|so,wi|d
Major Image|3|I|bd,so,wa,wi
Protection from Energy|3|A|cl,dr,ra,so,wi
Revivify|3|N|cl,pa
Spirit Guardians|3|C|cl|d
Call Lightning|3|C|dr|d
Daylight|3|V|cl,dr,pa,ra,so
Fear|3|I|bd,so,wa,wi
Slow|3|T|so,wi
Stinking Cloud|3|C|bd,so,wi
Vampiric Touch|3|N|wa,wi|d
Bestow Curse|3|N|bd,cl,wi
Blink|3|T|so,wi
Clairvoyance|3|D|bd,cl,so,wi
Conjure Animals|3|C|dr,ra
Plant Growth|3|T|bd,dr,ra
Revivify|3|N|cl,dr,pa,ra
Sleet Storm|3|C|dr,so,wi
Hunger of Hadar|3|C|wa|d
Blinding Smite|3|V|pa|d
Crusader's Mantle|3|V|pa
Elemental Weapon|3|T|pa
Lightning Arrow|3|T|ra|d
Conjure Barrage|3|C|ra|d
Beacon of Hope|3|A|cl
Mass Healing Word|3|V|cl
Sending|3|V|bd,cl,wi
Tongues|3|D|bd,cl,so,wa,wi
Banishment|4|A|cl,pa,so,wa,wi
Blight|4|N|dr,so,wa,wi|d
Confusion|4|E|bd,dr,so,wi
Dimension Door|4|C|bd,so,wa,wi
Greater Invisibility|4|I|bd,so,wi
Ice Storm|4|V|dr,so,wi|d
Polymorph|4|T|bd,dr,so,wi
Wall of Fire|4|V|dr,so,wi|d
Black Tentacles|4|C|wi|d
Phantasmal Killer|4|I|wi|d
Stoneskin|4|A|dr,ra,so,wi
Freedom of Movement|4|A|bd,cl,dr,ra
Guardian of Faith|4|C|cl|d
Death Ward|4|A|cl,pa
Locate Creature|4|D|bd,cl,dr,pa,ra,wi
Dominate Beast|4|E|dr,so
Giant Insect|4|T|dr
Grasping Vine|4|C|dr,ra
Hallucinatory Terrain|4|I|bd,dr,wa,wi
Fabricate|4|T|wi
Fire Shield|4|V|wi
Resilient Sphere|4|V|wi
Secret Chest|4|C|wi
Stone Shape|4|T|cl,dr,wi
Wall of Fire|4|V|dr,so,wi|d
Aura of Life|4|A|pa
Aura of Purity|4|A|pa
Staggering Smite|4|V|pa|d
Conjure Woodland Beings|4|C|dr,ra
Cone of Cold|5|V|so,wi|d
Dominate Person|5|E|bd,so,wi
Flame Strike|5|V|cl|d
Greater Restoration|5|A|bd,cl,dr
Hold Monster|5|E|bd,so,wa,wi
Insect Plague|5|C|cl,dr,so|d
Mass Cure Wounds|5|V|bd,cl,dr
Raise Dead|5|N|bd,cl,pa
Scrying|5|D|bd,cl,dr,wa,wi
Telekinesis|5|T|so,wi
Wall of Force|5|V|wi
Cloudkill|5|C|so,wi|d
Animate Objects|5|T|bd,so,wi
Bigby's Hand|5|V|wi|d
Cone of Cold|5|V|so,wi|d
Creation|5|I|so,wi
Dream|5|I|bd,wa,wi
Geas|5|E|bd,cl,dr,pa,wi
Legend Lore|5|D|bd,cl,wi
Mislead|5|I|bd,wi
Modify Memory|5|E|bd,wi
Passwall|5|T|wi
Planar Binding|5|A|bd,cl,dr,wi
Telepathic Bond|5|D|wi
Wall of Stone|5|V|dr,so,wi
Commune|5|D|cl
Contagion|5|N|cl,dr
Dispel Evil and Good|5|A|cl,pa
Hallow|5|V|cl
Insect Plague|5|C|cl,dr,so|d
Banishing Smite|5|A|pa|d
Destructive Wave|5|V|pa|d
Conjure Volley|5|C|ra|d
Swift Quiver|5|T|ra
Tree Stride|5|C|dr,ra
Commune with Nature|5|D|dr,ra
Chain Lightning|6|V|so,wi|d
Disintegrate|6|T|so,wi|d
Eyebite|6|N|bd,so,wa,wi|d
Globe of Invulnerability|6|A|so,wi
Harm|6|N|cl|d
Heal|6|V|cl,dr
Sunbeam|6|V|dr,so,wi|d
True Seeing|6|D|bd,cl,so,wa,wi
Circle of Death|6|N|so,wa,wi|d
Chain Lightning|6|V|so,wi|d
Contingency|6|V|wi
Create Undead|6|N|cl,wi
Eyebite|6|N|bd,so,wa,wi
Flesh to Stone|6|T|wa,wi
Freezing Sphere|6|V|wi|d
Guards and Wards|6|A|wi
Magic Jar|6|N|wi
Mass Suggestion|6|E|bd,so,wa,wi
Move Earth|6|T|dr,so,wi
Programmed Illusion|6|I|bd,wi
Sunbeam|6|V|dr,so,wi|d
Wall of Ice|6|V|wi|d
Wall of Thorns|6|C|dr|d
Find the Path|6|D|bd,cl,dr
Forbiddance|6|A|cl
Heroes' Feast|6|C|cl,dr
Planar Ally|6|C|cl
Word of Recall|6|C|cl
Blade Barrier|6|V|cl|d
Harm|6|N|cl|d
Heal|6|V|cl,dr
Wind Walk|6|T|dr
Conjure Fey|6|C|dr,wa
Transport via Plants|6|C|dr
Delayed Blast Fireball|7|V|so,wi|d
Finger of Death|7|N|so,wa,wi|d
Fire Storm|7|V|cl,dr,so|d
Plane Shift|7|C|cl,dr,so,wa,wi
Regenerate|7|T|bd,cl,dr
Teleport|7|C|bd,so,wi
Reverse Gravity|7|T|dr,so,wi
Prismatic Spray|7|V|so,wi|d
Forcecage|7|V|bd,wi
Etherealness|7|T|bd,cl,so,wa,wi
Divine Word|7|V|cl
Fire Storm|7|V|cl,dr,so|d
Resurrection|7|N|bd,cl
Symbol|7|A|bd,cl,wi
Project Image|7|I|bd,wi
Simulacrum|7|I|wi
Sequester|7|T|wi
Mordenkainen's Sword|7|V|bd,wi|d
Magnificent Mansion|7|C|bd,wi
Mirage Arcane|7|I|bd,dr,wi
Plane Shift|7|C|cl,dr,so,wa,wi
Regenerate|7|T|bd,cl,dr
Antimagic Field|8|A|cl,wi
Dominate Monster|8|E|bd,so,wa,wi
Earthquake|8|V|cl,dr,so|d
Feeblemind|8|E|bd,dr,wa,wi
Holy Aura|8|A|cl
Incendiary Cloud|8|C|so,wi|d
Power Word Stun|8|E|bd,so,wa,wi
Sunburst|8|V|dr,so,wi|d
Demiplane|8|C|wa,wi
Clone|8|N|wi
Maze|8|C|wi
Mind Blank|8|A|bd,wi
Telepathy|8|V|wi
Tsunami|8|C|dr|d
Animal Shapes|8|T|dr
Control Weather|8|T|cl,dr
Sunburst|8|V|dr,so,wi|d
Earthquake|8|V|cl,dr,so|d
Antipathy/Sympathy|8|E|dr,wi
Astral Projection|9|N|cl,wa,wi
Foresight|9|D|bd,dr,wa,wi
Gate|9|C|cl,so,wi
Imprisonment|9|A|wa,wi
Mass Heal|9|V|cl
Meteor Swarm|9|V|so,wi|d
Power Word Kill|9|E|wa,wi|d
Prismatic Wall|9|A|wi
Shapechange|9|T|dr,wi
Storm of Vengeance|9|C|dr|d
Time Stop|9|T|so,wi
True Polymorph|9|T|bd,wa,wi
True Resurrection|9|N|cl,dr
Weird|9|I|wi|d
Wish|9|C|so,wi
Power Word Heal|9|V|bd
`.trim();

const CLASS_IDS = {
  bd: "bard",
  cl: "cleric",
  dr: "druid",
  pa: "paladin",
  ra: "ranger",
  so: "sorcerer",
  wa: "warlock",
  wi: "wizard"
};

const SCHOOLS = {
  A: "abjuration",
  C: "conjuration",
  D: "divination",
  E: "enchantment",
  V: "evocation",
  I: "illusion",
  N: "necromancy",
  T: "transmutation"
};

function uniqueSpells(list) {
  const seen = new Set();
  return list.filter((spell) => {
    const key = `${spell.name}|${spell.level}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const SPELLS = uniqueSpells(RAW.split("\n").map((line) => {
  const [name, level, school, classes, damage] = line.split("|");
  return {
    name,
    level: Number(level),
    school: SCHOOLS[school],
    classes: classes.split(",").map((id) => CLASS_IDS[id]),
    damage: damage === "d"
  };
}));

export function spellsFor(classId, level, { damage = null, school = null } = {}) {
  return SPELLS.filter((spell) => {
    if (!spell.classes.includes(classId)) return false;
    if (spell.level !== level && level !== "any") return false;
    if (damage != null && spell.damage !== damage) return false;
    if (school && spell.school !== school) return false;
    return true;
  });
}
