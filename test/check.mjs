import { generateNpc } from "../js/generate.js";

const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

for (let i = 0; i < 200; i += 1) {
  const npc = generateNpc();
  check(npc.alignment === "chaotic neutral", "alignment");
  check(npc.personality.beliefs.length >= 1 && npc.personality.beliefs.length <= 3, "beliefs " + npc.name);
  check(npc.personality.attributes.length >= 1 && npc.personality.attributes.length <= 3, "attributes");
  check(npc.personality.flaws.length >= 1 && npc.personality.flaws.length <= 3, "flaws");
  check(npc.loot.wealth >= 1 && npc.loot.wealth <= 100, "wealth");
  check(npc.gender === "male" || npc.gender === "female", "gender");
  check(Number.isFinite(npc.ac) && Number.isFinite(npc.hp), `numbers ${npc.className} ${npc.level}`);
  if (npc.classId === "none") {
    check(npc.hp === 10, "classless hp");
    check(npc.level == null, "classless level");
    for (const score of Object.values(npc.scores)) check(score >= 8 && score <= 12, "classless score " + score);
    check(npc.ac === 10 + Math.floor((npc.scores.dex - 10) / 2), "classless ac");
    check(!npc.magicItems, "classless magic");
  } else {
    check(npc.level >= 1 && npc.level <= 20, "level");
    if (npc.level < 5) check(!npc.magicItems, `magic below 5 ${npc.className} ${npc.level}`);
    if (npc.level >= 15 && npc.magicItems) check(npc.magicItems.length <= 2, "two magic pieces");
    if (npc.spells && npc.spells.cantrips.length) {
      const damaging = ["Acid Splash", "Chill Touch", "Fire Bolt", "Poison Spray", "Ray of Frost", "Shocking Grasp", "Vicious Mockery", "Sacred Flame", "Produce Flame", "Thorn Whip", "Eldritch Blast"];
      check(npc.spells.cantrips.some((name) => damaging.includes(name)), `damaging cantrip ${npc.className} ${npc.spells.cantrips}`);
    }
  }
}

const fighter = generateNpc({ classId: "fighter", raceId: "human", gender: "female", level: 1 });
check(fighter.className === "Fighter" && fighter.level === 1 && fighter.raceName === "Human", "forced fighter");
check(fighter.skillSet.size === 4, `fighter skills ${fighter.skillSet.size}`);
check(fighter.gender === "female", "forced gender");

const wizard = generateNpc({ classId: "wizard", raceId: "high-elf", gender: "male", level: 5 });
check(wizard.spells.book.length === 6 + 8, `book ${wizard.spells.book.length}`);
check(wizard.spells.prepared.length >= 1, "prepared");
check(wizard.spells.cantrips.some((name) => ["Fire Bolt", "Ray of Frost", "Shocking Grasp", "Chill Touch", "Acid Splash", "Poison Spray"].includes(name)), "wizard cantrip");

const commoner = generateNpc({ classId: "none", raceId: "hill-dwarf", gender: "male", level: 20 });
check(commoner.level == null && commoner.hp === 10 && !commoner.magicItems, "forced classless ignores level");

const low = generateNpc({ classId: "rogue", raceId: "tiefling", level: 4 });
check(!low.magicItems, "rogue 4 magic");

let religious = 0;
for (let i = 0; i < 400; i += 1) {
  const npc = generateNpc({ classId: "none", raceId: "human" });
  if (npc.religious) religious += 1;
}
check(religious > 40 && religious < 120, `classless religious rate ${religious}`);

if (failures.length) {
  console.error(failures.slice(0, 30).join("\n"));
  process.exit(1);
}
console.log("ok", fighter.name, wizard.name, commoner.name);
