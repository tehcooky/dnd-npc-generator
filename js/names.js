const human = {
  male: ["Alden", "Bram", "Cedric", "Dorian", "Ellis", "Finn", "Gareth", "Hugo", "Jonas", "Leif", "Marcus", "Nolan", "Owen", "Percival", "Quinn", "Rowan", "Soren", "Tomas", "Ulric", "Wesley"],
  female: ["Ada", "Brynn", "Cora", "Dahlia", "Elena", "Freya", "Greta", "Helena", "Iris", "June", "Kestra", "Lydia", "Mara", "Nella", "Olive", "Petra", "Rosa", "Sylvia", "Thea", "Willa"],
  family: ["Ashford", "Blackwood", "Carr", "Dunwich", "Hale", "Keene", "Marsh", "Penn", "Reed", "Shaw", "Vale", "Ward"]
};

const dwarf = {
  male: ["Bramli", "Durok", "Fargrim", "Harbek", "Kilgar", "Morrun", "Orsik", "Rurik", "Thorlek", "Vondal", "Balric", "Grimmul"],
  female: ["Anja", "Brynja", "Disa", "Eldra", "Frida", "Hilda", "Kathra", "Marit", "Sigrid", "Tova", "Vistra", "Ylva"],
  clan: ["Ironvein", "Stonebrow", "Copperkettle", "Deepdelver", "Axebreaker", "Goldmantle", "Hammerfall", "Cinderhelm"]
};

const elf = {
  male: ["Aelor", "Caelion", "Elandor", "Faelor", "Ithrien", "Lethorin", "Miravel", "Naeris", "Olondir", "Sylvar", "Theren", "Vaelis"],
  female: ["Arieth", "Celene", "Elira", "Faelwen", "Ilyana", "Liriel", "Maelis", "Naevys", "Serel", "Tiriel", "Vaela", "Ysilde"],
  house: ["Moonbrook", "Starlance", "Willowmere", "Nightbloom", "Silverleaf", "Dawnspire"]
};

const halfling = {
  male: ["Barlo", "Corrin", "Eldon", "Finnian", "Jasper", "Lyle", "Milo", "Neddy", "Osborn", "Pipkin", "Roscoe", "Wilfred"],
  female: ["Beryl", "Clover", "Daisy", "Etta", "Hazel", "Lavinia", "Marigold", "Nell", "Posy", "Rosie", "Tansy", "Winnie"],
  family: ["Goodbarrel", "Tealeaf", "Underbough", "Hilltopple", "Brushgather", "Greenbottle"]
};

const dragonborn = {
  male: ["Azkar", "Bruthen", "Drazhik", "Gorvash", "Heskal", "Krivor", "Mazren", "Narvash", "Rhuzak", "Shavok", "Torvash", "Vaskar"],
  female: ["Ashka", "Bireth", "Dazra", "Harzka", "Kaveth", "Mirzha", "Naleth", "Perrash", "Razha", "Sorveth", "Surzka", "Thaveth"],
  clan: ["Ashscale", "Stormkeel", "Cindertalon", "Goldwake", "Ironlung", "Deepcrest"]
};

const gnome = {
  male: ["Alwick", "Brindle", "Dobbin", "Fennick", "Glimmer", "Hobbin", "Orryn", "Puckle", "Seebo", "Tocket", "Wizzle", "Zabble"],
  female: ["Bimi", "Cora", "Elly", "Lilli", "Mimsy", "Nissa", "Nyx", "Orla", "Pim", "Tana", "Wicket", "Zanna"],
  clan: ["Berryclock", "Cogwhistle", "Merrynib", "Nimblewick", "Copperpock", "Tumblegear"]
};

const halforc = {
  male: ["Brug", "Dorg", "Fengor", "Grath", "Hosk", "Krag", "Mog", "Rusk", "Thag", "Urg", "Vork", "Zeth"],
  female: ["Braga", "Dura", "Gresha", "Hurga", "Kora", "Moga", "Nasha", "Rasha", "Shura", "Toga", "Vasha", "Yurga"]
};

const tiefling = {
  male: ["Amonis", "Barakel", "Casmir", "Davoras", "Ekris", "Izar", "Kaelen", "Malphar", "Nerius", "Sarevos", "Theron", "Vexar"],
  female: ["Anya", "Bryxis", "Calista", "Damaia", "Eryx", "Kallia", "Lirith", "Morwen", "Nyssa", "Orielle", "Ravella", "Zera"],
  virtue: ["Ash", "Blessing", "Candle", "Daring", "Ember", "Fable", "Grave", "Hush", "Kindling", "Lament", "Mercy", "Nightfall", "Oath", "Promise", "Riddle", "Silence", "Vow", "Wick"]
};

export const NAME_TABLES = {
  human, dwarf, elf, halfling, dragonborn, gnome, halforc, tiefling
};

export function nameKeyForRace(raceId) {
  if (raceId.includes("dwarf")) return "dwarf";
  if (raceId === "half-elf") return "elf";
  if (raceId.includes("elf")) return "elf";
  if (raceId.includes("halfling")) return "halfling";
  if (raceId === "dragonborn") return "dragonborn";
  if (raceId.includes("gnome")) return "gnome";
  if (raceId === "half-orc") return "halforc";
  if (raceId === "tiefling") return "tiefling";
  return "human";
}
