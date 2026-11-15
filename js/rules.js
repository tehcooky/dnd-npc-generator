export const ABILITIES = ["str", "dex", "con", "int", "wis", "cha"];

export const ABILITY_NAMES = {
  str: "Strength",
  dex: "Dexterity",
  con: "Constitution",
  int: "Intelligence",
  wis: "Wisdom",
  cha: "Charisma"
};

export const SKILLS = [
  ["Acrobatics", "dex"],
  ["Animal Handling", "wis"],
  ["Arcana", "int"],
  ["Athletics", "str"],
  ["Deception", "cha"],
  ["History", "int"],
  ["Insight", "wis"],
  ["Intimidation", "cha"],
  ["Investigation", "int"],
  ["Medicine", "wis"],
  ["Nature", "int"],
  ["Perception", "wis"],
  ["Performance", "cha"],
  ["Persuasion", "cha"],
  ["Religion", "int"],
  ["Sleight of Hand", "dex"],
  ["Stealth", "dex"],
  ["Survival", "wis"]
];

export const ALL_SKILL_NAMES = SKILLS.map(([name]) => name);

export const EXTRA_LANGUAGES = [
  "Dwarvish", "Elvish", "Giant", "Gnomish", "Goblin", "Halfling", "Orc",
  "Abyssal", "Celestial", "Draconic", "Deep Speech", "Infernal", "Primordial", "Sylvan", "Undercommon"
];

export const RACES = [
  {
    id: "human",
    name: "Human",
    speed: 30,
    bonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    languages: ["Common"],
    extraLanguages: 1,
    traits: ["Extra language of their choice."]
  },
  {
    id: "hill-dwarf",
    name: "Hill Dwarf",
    speed: 25,
    darkvision: 60,
    bonuses: { con: 2, wis: 1 },
    languages: ["Common", "Dwarvish"],
    resists: ["poison"],
    weaponProf: ["battleaxe", "handaxe", "light hammer", "warhammer"],
    toolChoice: ["smith's tools", "brewer's supplies", "mason's tools"],
    traits: ["Poison resilience: advantage on saves against poison.", "Dwarven toughness: +1 hit point per level.", "Stonecunning when checking stonework."]
  },
  {
    id: "mountain-dwarf",
    name: "Mountain Dwarf",
    speed: 25,
    darkvision: 60,
    bonuses: { str: 2, con: 2 },
    languages: ["Common", "Dwarvish"],
    resists: ["poison"],
    armorProf: ["light", "medium"],
    weaponProf: ["battleaxe", "handaxe", "light hammer", "warhammer"],
    toolChoice: ["smith's tools", "brewer's supplies", "mason's tools"],
    traits: ["Poison resilience: advantage on saves against poison.", "Stonecunning when checking stonework."]
  },
  {
    id: "high-elf",
    name: "High Elf",
    speed: 30,
    darkvision: 60,
    bonuses: { dex: 2, int: 1 },
    languages: ["Common", "Elvish"],
    extraLanguages: 1,
    wizardCantrip: true,
    weaponProf: ["longsword", "shortsword", "shortbow", "longbow"],
    traits: ["Keen senses: proficiency in Perception.", "Trance: 4 hours of meditation instead of sleep.", "A wizard cantrip."]
  },
  {
    id: "wood-elf",
    name: "Wood Elf",
    speed: 35,
    darkvision: 60,
    bonuses: { dex: 2, wis: 1 },
    languages: ["Common", "Elvish"],
    weaponProf: ["longsword", "shortsword", "shortbow", "longbow"],
    traits: ["Keen senses: proficiency in Perception.", "Mask of the Wild: can hide in light natural cover.", "Trance: 4 hours of meditation instead of sleep."]
  },
  {
    id: "drow",
    name: "Drow",
    speed: 30,
    darkvision: 120,
    bonuses: { dex: 2, cha: 1 },
    languages: ["Common", "Elvish"],
    weaponProf: ["rapier", "shortsword", "hand crossbow"],
    traits: ["Keen senses: proficiency in Perception.", "Sunlight sensitivity: disadvantage on sight attacks and sight Perception in direct sun.", "Drow magic: dancing lights; faerie fire at 3rd level; darkness at 5th level."]
  },
  {
    id: "lightfoot-halfling",
    name: "Lightfoot Halfling",
    speed: 25,
    bonuses: { dex: 2, cha: 1 },
    languages: ["Common", "Halfling"],
    traits: ["Lucky: reroll a natural 1 on an attack, save, or check.", "Brave: advantage on saves against being frightened.", "Naturally stealthy: can hide behind a creature one size larger."]
  },
  {
    id: "stout-halfling",
    name: "Stout Halfling",
    speed: 25,
    bonuses: { dex: 2, con: 1 },
    languages: ["Common", "Halfling"],
    resists: ["poison"],
    traits: ["Lucky: reroll a natural 1 on an attack, save, or check.", "Brave: advantage on saves against being frightened.", "Stout resilience: advantage on saves against poison."]
  },
  {
    id: "dragonborn",
    name: "Dragonborn",
    speed: 30,
    bonuses: { str: 2, cha: 1 },
    languages: ["Common", "Draconic"],
    ancestry: true,
    traits: ["Breath weapon, usable once per rest.", "Damage resistance matching the draconic ancestry."]
  },
  {
    id: "forest-gnome",
    name: "Forest Gnome",
    speed: 25,
    darkvision: 60,
    bonuses: { int: 2, dex: 1 },
    languages: ["Common", "Gnomish"],
    traits: ["Gnome cunning: advantage on Intelligence, Wisdom, and Charisma saves against magic.", "Natural illusionist: minor illusion cantrip.", "Can speak with small beasts."]
  },
  {
    id: "rock-gnome",
    name: "Rock Gnome",
    speed: 25,
    darkvision: 60,
    bonuses: { int: 2, con: 1 },
    languages: ["Common", "Gnomish"],
    traits: ["Gnome cunning: advantage on Intelligence, Wisdom, and Charisma saves against magic.", "Artificer's lore on magic items, alchemy, and devices.", "Tinker: can make a tiny clockwork toy."]
  },
  {
    id: "half-elf",
    name: "Half-Elf",
    speed: 30,
    darkvision: 60,
    bonuses: { cha: 2 },
    halfElfAsi: true,
    extraSkills: 2,
    extraLanguages: 1,
    languages: ["Common", "Elvish"],
    traits: ["Fey ancestry: advantage on saves against being charmed, and magic cannot put them to sleep.", "Two extra skill proficiencies."]
  },
  {
    id: "half-orc",
    name: "Half-Orc",
    speed: 30,
    darkvision: 60,
    bonuses: { str: 2, con: 1 },
    languages: ["Common", "Orc"],
    traits: ["Menacing: proficiency in Intimidation.", "Relentless Endurance: drop to 1 hit point instead of 0 once per long rest.", "Savage Attacks: an extra damage die on a critical melee hit."]
  },
  {
    id: "tiefling",
    name: "Tiefling",
    speed: 30,
    darkvision: 60,
    bonuses: { cha: 2, int: 1 },
    languages: ["Common", "Infernal"],
    resists: ["fire"],
    traits: ["Hellish resistance to fire.", "Infernal legacy: thaumaturgy; hellish rebuke at 3rd level; darkness at 5th level."]
  }
];

const SIMPLE = ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"];

export const CLASSES = [
  {
    id: "barbarian",
    name: "Barbarian",
    hitDie: 12,
    saves: ["str", "con"],
    skillCount: 2,
    skills: ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"],
    armor: ["light", "medium", "shields"],
    weapons: "martial",
    priorities: ["str", "con", "dex", "wis", "cha", "int"],
    subclassLevel: 3,
    subclasses: [
      { id: "berserker", name: "Path of the Berserker" },
      { id: "totem", name: "Path of the Totem Warrior" }
    ]
  },
  {
    id: "bard",
    name: "Bard",
    hitDie: 8,
    saves: ["dex", "cha"],
    skillCount: 3,
    skills: ALL_SKILL_NAMES,
    armor: ["light"],
    weapons: "simple",
    extraWeapons: ["hand crossbow", "longsword", "rapier", "shortsword"],
    priorities: ["cha", "dex", "con", "wis", "int", "str"],
    caster: "bard",
    subclassLevel: 3,
    subclasses: [
      { id: "lore", name: "College of Lore" },
      { id: "valor", name: "College of Valor" }
    ]
  },
  {
    id: "cleric",
    name: "Cleric",
    hitDie: 8,
    saves: ["wis", "cha"],
    skillCount: 2,
    skills: ["History", "Insight", "Medicine", "Persuasion", "Religion"],
    armor: ["light", "medium", "shields"],
    weapons: "simple",
    priorities: ["wis", "con", "str", "cha", "dex", "int"],
    caster: "cleric",
    subclassLevel: 1,
    subclasses: [
      { id: "knowledge", name: "Knowledge Domain" },
      { id: "life", name: "Life Domain" },
      { id: "light", name: "Light Domain" },
      { id: "nature", name: "Nature Domain" },
      { id: "tempest", name: "Tempest Domain" },
      { id: "trickery", name: "Trickery Domain" },
      { id: "war", name: "War Domain" }
    ]
  },
  {
    id: "druid",
    name: "Druid",
    hitDie: 8,
    saves: ["int", "wis"],
    skillCount: 2,
    skills: ["Arcana", "Animal Handling", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"],
    armor: ["light", "medium", "shields"],
    weapons: "druid",
    priorities: ["wis", "con", "dex", "int", "cha", "str"],
    caster: "druid",
    subclassLevel: 2,
    subclasses: [
      { id: "land", name: "Circle of the Land" },
      { id: "moon", name: "Circle of the Moon" }
    ]
  },
  {
    id: "fighter",
    name: "Fighter",
    hitDie: 10,
    saves: ["str", "con"],
    skillCount: 2,
    skills: ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"],
    armor: ["light", "medium", "heavy", "shields"],
    weapons: "martial",
    priorities: ["str", "con", "dex", "wis", "cha", "int"],
    altPriorities: ["dex", "con", "wis", "str", "cha", "int"],
    subclassLevel: 3,
    subclasses: [
      { id: "champion", name: "Champion" },
      { id: "battle-master", name: "Battle Master" },
      { id: "eldritch-knight", name: "Eldritch Knight" }
    ]
  },
  {
    id: "monk",
    name: "Monk",
    hitDie: 8,
    saves: ["str", "dex"],
    skillCount: 2,
    skills: ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"],
    armor: [],
    weapons: "monk",
    priorities: ["dex", "wis", "con", "str", "cha", "int"],
    subclassLevel: 3,
    subclasses: [
      { id: "open-hand", name: "Way of the Open Hand" },
      { id: "shadow", name: "Way of Shadow" },
      { id: "four-elements", name: "Way of the Four Elements" }
    ]
  },
  {
    id: "paladin",
    name: "Paladin",
    hitDie: 10,
    saves: ["wis", "cha"],
    skillCount: 2,
    skills: ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"],
    armor: ["light", "medium", "heavy", "shields"],
    weapons: "martial",
    priorities: ["str", "cha", "con", "wis", "dex", "int"],
    caster: "paladin",
    subclassLevel: 3,
    subclasses: [
      { id: "devotion", name: "Oath of Devotion" },
      { id: "ancients", name: "Oath of the Ancients" },
      { id: "vengeance", name: "Oath of Vengeance" }
    ]
  },
  {
    id: "ranger",
    name: "Ranger",
    hitDie: 10,
    saves: ["str", "dex"],
    skillCount: 3,
    skills: ["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"],
    armor: ["light", "medium", "shields"],
    weapons: "martial",
    priorities: ["dex", "wis", "con", "str", "int", "cha"],
    caster: "ranger",
    subclassLevel: 3,
    subclasses: [
      { id: "hunter", name: "Hunter" },
      { id: "beast-master", name: "Beast Master" }
    ]
  },
  {
    id: "rogue",
    name: "Rogue",
    hitDie: 8,
    saves: ["dex", "int"],
    skillCount: 4,
    skills: ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"],
    armor: ["light"],
    weapons: "simple",
    extraWeapons: ["hand crossbow", "longsword", "rapier", "shortsword"],
    priorities: ["dex", "con", "cha", "int", "wis", "str"],
    subclassLevel: 3,
    subclasses: [
      { id: "thief", name: "Thief" },
      { id: "assassin", name: "Assassin" },
      { id: "arcane-trickster", name: "Arcane Trickster" }
    ]
  },
  {
    id: "sorcerer",
    name: "Sorcerer",
    hitDie: 6,
    saves: ["con", "cha"],
    skillCount: 2,
    skills: ["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"],
    armor: [],
    weapons: "sorcerer",
    priorities: ["cha", "con", "dex", "wis", "int", "str"],
    caster: "sorcerer",
    subclassLevel: 1,
    subclasses: [
      { id: "draconic", name: "Draconic Bloodline" },
      { id: "wild", name: "Wild Magic" }
    ]
  },
  {
    id: "warlock",
    name: "Warlock",
    hitDie: 8,
    saves: ["wis", "cha"],
    skillCount: 2,
    skills: ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"],
    armor: ["light"],
    weapons: "simple",
    priorities: ["cha", "con", "dex", "wis", "int", "str"],
    caster: "warlock",
    subclassLevel: 1,
    subclasses: [
      { id: "archfey", name: "The Archfey" },
      { id: "fiend", name: "The Fiend" },
      { id: "great-old-one", name: "The Great Old One" }
    ]
  },
  {
    id: "wizard",
    name: "Wizard",
    hitDie: 6,
    saves: ["int", "wis"],
    skillCount: 2,
    skills: ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"],
    armor: [],
    weapons: "wizard",
    priorities: ["int", "con", "dex", "wis", "cha", "str"],
    caster: "wizard",
    subclassLevel: 2,
    subclasses: [
      { id: "abjuration", name: "School of Abjuration" },
      { id: "conjuration", name: "School of Conjuration" },
      { id: "divination", name: "School of Divination" },
      { id: "enchantment", name: "School of Enchantment" },
      { id: "evocation", name: "School of Evocation" },
      { id: "illusion", name: "School of Illusion" },
      { id: "necromancy", name: "School of Necromancy" },
      { id: "transmutation", name: "School of Transmutation" }
    ]
  }
];

export const BACKGROUNDS = [
  { id: "acolyte", name: "Acolyte", skills: ["Insight", "Religion"], tools: [], languages: 2, suggested: ["cleric", "monk", "paladin", "wizard"] },
  { id: "charlatan", name: "Charlatan", skills: ["Deception", "Sleight of Hand"], tools: ["disguise kit", "forgery kit"], languages: 0, suggested: ["bard", "rogue", "sorcerer", "warlock"] },
  { id: "criminal", name: "Criminal", skills: ["Deception", "Stealth"], tools: ["thieves' tools", "one gaming set"], languages: 0, suggested: ["rogue", "fighter", "bard"] },
  { id: "entertainer", name: "Entertainer", skills: ["Acrobatics", "Performance"], tools: ["disguise kit", "one musical instrument"], languages: 0, suggested: ["bard", "rogue"] },
  { id: "folk-hero", name: "Folk Hero", skills: ["Animal Handling", "Survival"], tools: ["one artisan's tools", "vehicles (land)"], languages: 0, suggested: ["barbarian", "fighter", "paladin", "ranger"] },
  { id: "guild-artisan", name: "Guild Artisan", skills: ["Insight", "Persuasion"], tools: ["one artisan's tools"], languages: 1, suggested: ["cleric", "fighter", "rogue", "wizard"] },
  { id: "hermit", name: "Hermit", skills: ["Medicine", "Religion"], tools: ["herbalism kit"], languages: 1, suggested: ["cleric", "druid", "monk", "sorcerer", "warlock"] },
  { id: "noble", name: "Noble", skills: ["History", "Persuasion"], tools: ["one gaming set"], languages: 1, suggested: ["bard", "fighter", "paladin", "wizard"] },
  { id: "outlander", name: "Outlander", skills: ["Athletics", "Survival"], tools: ["one musical instrument"], languages: 1, suggested: ["barbarian", "druid", "fighter", "ranger"] },
  { id: "sage", name: "Sage", skills: ["Arcana", "History"], tools: [], languages: 2, suggested: ["cleric", "druid", "wizard", "warlock"] },
  { id: "sailor", name: "Sailor", skills: ["Athletics", "Perception"], tools: ["navigator's tools", "vehicles (water)"], languages: 0, suggested: ["fighter", "rogue"] },
  { id: "soldier", name: "Soldier", skills: ["Athletics", "Intimidation"], tools: ["one gaming set", "vehicles (land)"], languages: 0, suggested: ["barbarian", "fighter", "paladin", "ranger"] },
  { id: "urchin", name: "Urchin", skills: ["Sleight of Hand", "Stealth"], tools: ["disguise kit", "thieves' tools"], languages: 0, suggested: ["rogue", "bard", "sorcerer", "warlock"] }
];

export const ARMORS = [
  { name: "Padded", cat: "light", base: 11, level: 1, stealth: true, metal: false },
  { name: "Leather", cat: "light", base: 11, level: 1, metal: false },
  { name: "Studded leather", cat: "light", base: 12, level: 1, metal: false },
  { name: "Hide", cat: "medium", base: 12, level: 1, metal: false },
  { name: "Chain shirt", cat: "medium", base: 13, level: 1, metal: true },
  { name: "Scale mail", cat: "medium", base: 14, level: 1, stealth: true, metal: true },
  { name: "Breastplate", cat: "medium", base: 14, level: 4, metal: true },
  { name: "Half plate", cat: "medium", base: 15, level: 8, stealth: true, metal: true },
  { name: "Ring mail", cat: "heavy", base: 14, level: 1, stealth: true, metal: true },
  { name: "Chain mail", cat: "heavy", base: 16, level: 1, str: 13, stealth: true, metal: true },
  { name: "Splint", cat: "heavy", base: 17, level: 8, str: 15, stealth: true, metal: true },
  { name: "Plate", cat: "heavy", base: 18, level: 12, str: 15, stealth: true, metal: true }
];

export const WEAPONS = [
  { name: "Club", cat: "simple", damage: "1d4", ability: "str", druid: true },
  { name: "Dagger", cat: "simple", damage: "1d4", ability: "dex", finesse: true, light: true, thrown: true, druid: true },
  { name: "Handaxe", cat: "simple", damage: "1d6", ability: "str", light: true, thrown: true },
  { name: "Javelin", cat: "simple", damage: "1d6", ability: "str", thrown: true },
  { name: "Light crossbow", cat: "simple", damage: "1d8", ability: "dex", ranged: true, twoHanded: true },
  { name: "Mace", cat: "simple", damage: "1d6", ability: "str" },
  { name: "Quarterstaff", cat: "simple", damage: "1d6", versatile: "1d8", ability: "str", druid: true },
  { name: "Spear", cat: "simple", damage: "1d6", versatile: "1d8", ability: "str", thrown: true },
  { name: "Shortbow", cat: "simple", damage: "1d6", ability: "dex", ranged: true, twoHanded: true },
  { name: "Dart", cat: "simple", damage: "1d4", ability: "dex", finesse: true, thrown: true, druid: true },
  { name: "Light hammer", cat: "simple", damage: "1d4", ability: "str", light: true, thrown: true },
  { name: "Sickle", cat: "simple", damage: "1d4", ability: "str", light: true, druid: true },
  { name: "Battleaxe", cat: "martial", damage: "1d8", versatile: "1d10", ability: "str" },
  { name: "Flail", cat: "martial", damage: "1d8", ability: "str" },
  { name: "Glaive", cat: "martial", damage: "1d10", ability: "str", twoHanded: true, reach: true },
  { name: "Greataxe", cat: "martial", damage: "1d12", ability: "str", twoHanded: true },
  { name: "Greatsword", cat: "martial", damage: "2d6", ability: "str", twoHanded: true },
  { name: "Halberd", cat: "martial", damage: "1d10", ability: "str", twoHanded: true, reach: true },
  { name: "Lance", cat: "martial", damage: "1d12", ability: "str" },
  { name: "Longsword", cat: "martial", damage: "1d8", versatile: "1d10", ability: "str" },
  { name: "Maul", cat: "martial", damage: "2d6", ability: "str", twoHanded: true },
  { name: "Morningstar", cat: "martial", damage: "1d8", ability: "str" },
  { name: "Pike", cat: "martial", damage: "1d10", ability: "str", twoHanded: true, reach: true },
  { name: "Rapier", cat: "martial", damage: "1d8", ability: "dex", finesse: true },
  { name: "Scimitar", cat: "martial", damage: "1d6", ability: "dex", finesse: true, light: true, druid: true },
  { name: "Shortsword", cat: "martial", damage: "1d6", ability: "dex", finesse: true, light: true },
  { name: "Trident", cat: "martial", damage: "1d6", versatile: "1d8", ability: "str", thrown: true },
  { name: "Warhammer", cat: "martial", damage: "1d8", versatile: "1d10", ability: "str" },
  { name: "War pick", cat: "martial", damage: "1d8", ability: "str" },
  { name: "Whip", cat: "martial", damage: "1d4", ability: "dex", finesse: true, reach: true },
  { name: "Hand crossbow", cat: "martial", damage: "1d6", ability: "dex", ranged: true, light: true },
  { name: "Heavy crossbow", cat: "martial", damage: "1d10", ability: "dex", ranged: true, twoHanded: true, loading: true },
  { name: "Longbow", cat: "martial", damage: "1d8", ability: "dex", ranged: true, twoHanded: true }
];

export const ANCESTRIES = [
  { name: "Black", damage: "acid" },
  { name: "Blue", damage: "lightning" },
  { name: "Brass", damage: "fire" },
  { name: "Bronze", damage: "lightning" },
  { name: "Copper", damage: "acid" },
  { name: "Gold", damage: "fire" },
  { name: "Green", damage: "poison" },
  { name: "Red", damage: "fire" },
  { name: "Silver", damage: "cold" },
  { name: "White", damage: "cold" }
];

export const FIGHTING_STYLES = {
  fighter: ["Archery", "Defense", "Dueling", "Great Weapon Fighting", "Protection", "Two-Weapon Fighting"],
  paladin: ["Defense", "Dueling", "Great Weapon Fighting", "Protection"],
  ranger: ["Archery", "Defense", "Dueling", "Two-Weapon Fighting"]
};

export const METAMAGIC = ["Careful Spell", "Distant Spell", "Empowered Spell", "Extended Spell", "Heightened Spell", "Quickened Spell", "Subtle Spell", "Twinned Spell"];

export const INVOCATIONS = [
  { name: "Agonizing Blast", level: 2 },
  { name: "Armor of Shadows", level: 2 },
  { name: "Beast Speech", level: 2 },
  { name: "Beguiling Influence", level: 2 },
  { name: "Devil's Sight", level: 2 },
  { name: "Eldritch Sight", level: 2 },
  { name: "Eyes of the Rune Keeper", level: 2 },
  { name: "Fiendish Vigor", level: 2 },
  { name: "Gaze of Two Minds", level: 2 },
  { name: "Mask of Many Faces", level: 2 },
  { name: "Misty Visions", level: 2 },
  { name: "Repelling Blast", level: 2 },
  { name: "Thief of Five Fates", level: 2 },
  { name: "Book of Ancient Secrets", level: 3, pact: "tome" },
  { name: "Voice of the Chain Master", level: 3, pact: "chain" },
  { name: "Thirsting Blade", level: 5, pact: "blade" },
  { name: "Mire the Mind", level: 5 },
  { name: "One with Shadows", level: 5 },
  { name: "Sign of Ill Omen", level: 5 },
  { name: "Bewitching Whispers", level: 7 },
  { name: "Dreadful Word", level: 7 },
  { name: "Sculptor of Flesh", level: 7 },
  { name: "Ascendant Step", level: 9 },
  { name: "Minions of Chaos", level: 9 },
  { name: "Otherworldly Leap", level: 9 },
  { name: "Whispers of the Grave", level: 9 },
  { name: "Lifedrinker", level: 12, pact: "blade" },
  { name: "Chains of Carceri", level: 15, pact: "chain" },
  { name: "Witch Sight", level: 15 }
];

export const MANEUVERS = [
  "Commander's Strike", "Disarming Attack", "Distracting Strike", "Evasive Footwork",
  "Feinting Attack", "Goading Attack", "Lunging Attack", "Maneuvering Attack",
  "Menacing Attack", "Parry", "Precision Attack", "Pushing Attack", "Rally", "Riposte", "Trip Attack"
];

export const FULL_SLOTS = [
  [],
  [2], [3], [4, 2], [4, 3], [4, 3, 2], [4, 3, 3], [4, 3, 3, 1], [4, 3, 3, 2], [4, 3, 3, 3, 1], [4, 3, 3, 3, 2],
  [4, 3, 3, 3, 2, 1], [4, 3, 3, 3, 2, 1], [4, 3, 3, 3, 2, 1, 1], [4, 3, 3, 3, 2, 1, 1], [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1], [4, 3, 3, 3, 2, 1, 1, 1, 1], [4, 3, 3, 3, 3, 1, 1, 1, 1], [4, 3, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 2, 1, 1]
];

export const HALF_SLOTS = [
  [],
  [], [2], [3], [3], [4, 2], [4, 2], [4, 3], [4, 3], [4, 3, 2], [4, 3, 2],
  [4, 3, 3], [4, 3, 3], [4, 3, 3, 1], [4, 3, 3, 1], [4, 3, 3, 2], [4, 3, 3, 2],
  [4, 3, 3, 3, 1], [4, 3, 3, 3, 1], [4, 3, 3, 3, 2], [4, 3, 3, 3, 2]
];

export const THIRD_SLOTS = [
  [],
  [], [], [2], [3], [3], [3], [4, 2], [4, 2], [4, 2], [4, 3],
  [4, 3], [4, 3], [4, 3, 2], [4, 3, 2], [4, 3, 2], [4, 3, 3], [4, 3, 3], [4, 3, 3], [4, 3, 3, 1], [4, 3, 3, 1]
];

export function knownCount(table, level) {
  return table[Math.min(level, table.length - 1)];
}

export const BARD_CANTRIPS = [0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
export const BARD_KNOWN = [0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22];
export const SORC_CANTRIPS = [0, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
export const SORC_KNOWN = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15];
export const WARLOCK_CANTRIPS = [0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
export const WARLOCK_KNOWN = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15];
export const CLERIC_CANTRIPS = [0, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
export const WIZARD_CANTRIPS = [0, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
export const RANGER_KNOWN = [0, 0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11];
export const EK_KNOWN = [0, 0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13];

export const HEAVY_DOMAINS = new Set(["life", "nature", "tempest", "war"]);
export const VALOR_WEAPONS = true;

export const DOMAIN_SPELLS = {
  knowledge: { 1: ["Command", "Identify"], 2: ["Suggestion"], 3: ["Nondetection"], 4: ["Confusion"], 5: ["Legend Lore", "Scrying"] },
  life: { 1: ["Bless", "Cure Wounds"], 2: ["Lesser Restoration", "Spiritual Weapon"], 3: ["Beacon of Hope", "Revivify"], 4: ["Death Ward", "Guardian of Faith"], 5: ["Mass Cure Wounds", "Raise Dead"] },
  light: { 1: ["Burning Hands", "Faerie Fire"], 2: ["Flaming Sphere", "Scorching Ray"], 3: ["Daylight", "Fireball"], 4: ["Guardian of Faith", "Wall of Fire"], 5: ["Flame Strike", "Scrying"] },
  nature: { 1: ["Animal Friendship", "Speak with Animals"], 2: ["Barkskin", "Spike Growth"], 3: ["Plant Growth"], 4: ["Dominate Beast", "Grasping Vine"], 5: ["Insect Plague", "Tree Stride"] },
  tempest: { 1: ["Fog Cloud", "Thunderwave"], 2: ["Shatter"], 3: ["Call Lightning", "Sleet Storm"], 4: ["Ice Storm"], 5: ["Destructive Wave", "Insect Plague"] },
  trickery: { 1: ["Charm Person", "Disguise Self"], 2: ["Mirror Image", "Pass without Trace"], 3: ["Blink", "Dispel Magic"], 4: ["Dimension Door", "Polymorph"], 5: ["Dominate Person", "Modify Memory"] },
  war: { 1: ["Divine Favor", "Shield of Faith"], 2: ["Magic Weapon", "Spiritual Weapon"], 3: ["Crusader's Mantle", "Spirit Guardians"], 4: ["Freedom of Movement", "Stoneskin"], 5: ["Flame Strike", "Hold Monster"] }
};

export const OATH_SPELLS = {
  devotion: { 3: ["Protection from Evil and Good", "Sanctuary"], 5: ["Lesser Restoration"], 9: ["Beacon of Hope", "Dispel Magic"], 13: ["Freedom of Movement"], 17: ["Commune", "Flame Strike"] },
  ancients: { 3: ["Ensnaring Strike", "Speak with Animals"], 5: ["Moonbeam"], 9: ["Plant Growth", "Protection from Energy"], 13: ["Ice Storm", "Stoneskin"], 17: ["Commune with Nature", "Tree Stride"] },
  vengeance: { 3: ["Bane", "Hunter's Mark"], 5: ["Hold Person"], 9: ["Haste", "Protection from Energy"], 13: ["Banishment", "Dimension Door"], 17: ["Hold Monster", "Scrying"] }
};

void SIMPLE;
