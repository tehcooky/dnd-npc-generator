// Magic weapons by rarity, and sale goods with a gold value.
// Weapon names are published magic items. Goods use the usual gem and art prices.

export const MAGIC_WEAPONS = {
  uncommon: [
    "Moon-Touched Sword",
    "Javelin of Lightning",
    "Trident of Fish Command",
    "Weapon of Warning",
    "+1 dagger",
    "+1 handaxe",
    "+1 mace",
    "+1 quarterstaff",
    "+1 spear",
    "+1 shortbow",
    "+1 light crossbow",
    "+1 shortsword",
    "+1 scimitar",
    "+1 longsword",
    "+1 rapier",
    "+1 battleaxe",
    "+1 warhammer",
    "+1 flail",
    "+1 morningstar",
    "+1 greatsword",
    "+1 greataxe",
    "+1 longbow"
  ],
  rare: [
    "+2 mace",
    "+2 longsword",
    "+2 rapier",
    "+2 battleaxe",
    "+2 warhammer",
    "+2 greatsword",
    "+2 greataxe",
    "+2 longbow",
    "Berserker Axe",
    "Dagger of Venom",
    "Dragon Slayer",
    "Flame Tongue",
    "Giant Slayer",
    "Mace of Disruption",
    "Mace of Smiting",
    "Mace of Terror",
    "Oathbow",
    "Sun Blade",
    "Sword of Life Stealing",
    "Sword of Wounding",
    "Vicious Weapon"
  ],
  veryRare: [
    "+3 longsword",
    "+3 rapier",
    "+3 battleaxe",
    "+3 warhammer",
    "+3 greatsword",
    "+3 greataxe",
    "+3 longbow",
    "Dancing Sword",
    "Dwarven Thrower",
    "Frost Brand",
    "Nine Lives Stealer",
    "Scimitar of Speed",
    "Sword of Sharpness",
    "Staff of Power",
    "Staff of Striking",
    "Staff of Thunder and Lightning"
  ],
  legendary: [
    "Defender",
    "Hammer of Thunderbolts",
    "Holy Avenger",
    "Luck Blade",
    "Rod of Lordly Might",
    "Staff of the Magi",
    "Sword of Answering",
    "Vorpal Sword"
  ]
};

export const TREASURES = [
  { minWealth: 1, items: priced(10, ["azurite", "banded agate", "blue quartz", "eye agate", "hematite", "lapis lazuli", "malachite", "moss agate", "obsidian", "tiger eye", "turquoise"]) },
  { minWealth: 25, items: priced(50, ["bloodstone", "carnelian", "chrysoprase", "citrine", "jasper", "moonstone", "onyx", "sardonyx", "zircon"]).concat(priced(25, ["silver locket", "ivory comb", "old medal", "painted miniature", "small gold idol"])) },
  { minWealth: 40, items: priced(100, ["amber", "amethyst", "garnet", "jade", "jet", "pearl", "spinel", "tourmaline"]).concat(priced(250, ["gold ring set with bloodstones", "carved ivory figurine", "silver necklace with a gem pendant", "heavy gold bracelet"])) },
  { minWealth: 60, items: priced(500, ["alexandrite", "aquamarine", "black pearl", "peridot", "topaz"]).concat(priced(750, ["silver chalice set with moonstones", "gold music box", "harp with an ivory inlay"])) },
  { minWealth: 75, items: priced(1000, ["black opal", "blue sapphire", "emerald", "fire opal", "star ruby", "yellow sapphire"]).concat(priced(2500, ["platinum bracelet set with a sapphire", "gold chain set with a fire opal", "mantle set with moonstones"])) },
  { minWealth: 90, items: priced(5000, ["black sapphire", "diamond", "jacinth", "ruby"]).concat(priced(7500, ["jeweled gold crown", "platinum ring set with a diamond", "gold cup set with emeralds"])) }
];

function priced(worth, names) {
  return names.map((name) => ({ name, worth }));
}

const RARITIES = ["uncommon", "rare", "veryRare", "legendary"];

// Xanathar's Guide to Everything: the level a rarity is meant for.
// Common and uncommon from 1st, rare from 5th, very rare from 11th, legendary from 17th.
const RARITY_VALUE = { uncommon: 500, rare: 5000, veryRare: 50000, legendary: Infinity };

// Dungeon Master's Guide: spell scroll rarity by the spell's level.
const SCROLL_MAX = { uncommon: 3, rare: 5, veryRare: 8, legendary: 9 };

export function rarityForLevel(level) {
  const value = Number.isInteger(level) ? level : 1;
  if (value >= 17) return "legendary";
  if (value >= 11) return "veryRare";
  if (value >= 5) return "rare";
  return "uncommon";
}

export function lootRarity(level, wealth, rng) {
  const capIndex = RARITIES.indexOf(rarityForLevel(level));
  let wanted = 0;
  if (wealth >= 90) wanted = 3;
  else if (wealth >= 75) wanted = 2;
  else if (wealth >= 50) wanted = 1;
  let index = Math.min(capIndex, wanted);
  const oneStep = Math.max(0, wealth - 50) * 0.0024;
  if (index === capIndex && index < RARITIES.length - 1 && rng() < oneStep) index += 1;
  return RARITIES[index];
}

export function magicWeaponCount(level, wealth) {
  if (wealth < 20) return 0;
  const value = Number.isInteger(level) ? level : 1;
  let count = 1;
  if (value >= 5 && wealth >= 60) count = 2;
  if (value >= 11 && wealth >= 85) count = 3;
  return count;
}

export function treasureChoices(wealth, rarity) {
  const cap = RARITY_VALUE[rarity];
  const allowed = TREASURES
    .filter((band) => wealth >= band.minWealth)
    .flatMap((band) => band.items)
    .filter((item) => item.worth <= cap);
  if (!allowed.length) return [];
  const best = Math.max(...allowed.map((item) => item.worth));
  return allowed.filter((item) => item.worth * 2 >= best);
}

export function scrollSpellLevel(wealth, rarity) {
  const fromWealth = Math.min(9, 1 + Math.floor((wealth - 1) / 20));
  return Math.min(SCROLL_MAX[rarity], fromWealth);
}
