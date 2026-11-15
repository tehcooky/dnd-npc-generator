# D&D 5e NPC generator

A one-button creator for NPC ideas to drop into a game. Each press builds one finished NPC and shows it on the page.

Rules are the 2014 Player’s Handbook only. Content is stored by book so another book can be added later without reworking character creation.

## Controls

- **Class:** rolled at random, or chosen from a dropdown. The dropdown includes the Player’s Handbook classes and no class. No class is also in the random pool.
- **Race:** rolled at random, or chosen from a dropdown.
- **Gender:** dropdown options are Random, Male, and Female. Random rolls male or female.
- **Level:** can be chosen. If it is left unset, it is rolled across the full level range, 1 to 20. This applies to classed NPCs. A classless NPC has no level.

One button creates the whole NPC.

## Every NPC

- **Name:** random. This is the main purpose of the app. The name follows that race’s naming rules. Where the Player’s Handbook splits names by gender, gender decides which names fit. Names that are not in the handbook can be used too.
- **Race**
- **Gender**
- **Alignment:** chaotic neutral
- **Ability scores:** see classed and classless sections below
- **Beliefs, attributes, and flaws:** each is rolled from 1 to 3.
  - An attribute is something like “follows the letter of the law.”
  - A flaw is something like “hates goblins.”
  - A belief can be flavor, such as faith in a clown god of chaos, or thinking the world is flat. Any NPC can have these.
- **Wealth:** a random score from 1 to 100, rolled at creation. Higher wealth means more loot and more valuable loot. Loot can be gold, weapons, priceless heirlooms, and scrolls of magic.
- **Loot is separate from a classed NPC’s handbook equipment.**

## Religious beliefs

Religious NPCs are clerics, paladins, druids, and 20% of classless NPCs.

- Clerics, paladins, and religious classless NPCs believe in their god’s values. The god is any deity listed in the Player’s Handbook, chosen at random. That belief counts as one of their one to three beliefs.
- Druids’ belief is about nature. That belief counts as one of their one to three beliefs.
- If a religious NPC has more than one belief, the extras can be random flavor, such as the world being flat.

## Classed NPC

The page shows a full player-character sheet, as if the character had been created by hand.

The NPC is built at level 1, then advanced to the chosen or rolled level. What they have matches that level.

- **Background:** random, weighted toward backgrounds that fit the class.
- **Subclass:** random, once the level is high enough to have one.
- **Ability scores:** the standard array, assigned as a level 1 character of that class. Ability score increases are then applied at the levels the Player’s Handbook gives them, spent in favor of the class. A barbarian, for example, raises Strength or Constitution.
- **Hit points:** that class’s hit points, using the average for each level.
- **Skill proficiencies:** random. Class and background skills do not overlap. The NPC has as many skills as the class and background grant together.
- **Spells:** random, up to the number that class can know, have written in a spellbook, or prepare. If they have a school of magic, spells from that school are preferred. When their level allows it, they have at least one damaging cantrip and one damaging leveled spell.
- **Class feature choices** (such as a fighting style): random.
- **Racial choices** (such as a half-elf’s bonus ability scores): random.
- **The rest of a normal 2014 character sheet** is filled from the Player’s Handbook for that race, class, and level. That includes proficiency bonus, saving throws, speed, initiative, hit dice, languages, and class and race features.

### Equipment

Handbook starting equipment is chosen at random and is not part of loot. The NPC starts from the level 1 kit, then can gain better gear while leveling if they meet the requirements for it.

Higher-level NPCs have better gear. Gear can be more expensive ordinary equipment and magic equipment. They never wear or use something they should not be able to. A higher Strength score, for example, can allow better armor once they have that score. Everything that is still legal is random.

Magic armor should stay uncommon, so killing NPCs is not a reliable way to collect it. Higher-level NPCs are still strong.

Magic armor, weapons, trinkets, and similar equipment use the magic-equipment chance below. Gold, heirlooms, scrolls, and the rest of the loot stay on the wealth roll.

### Magic equipment chance

No classed NPC below level 5 has magic armor, weapons, or trinkets.

From level 5 to 20, there is one chance to gain a single magic piece. The chance climbs in a straight line from 1% at level 5 to 30% at level 20, rounded to the nearest percent:

| Level | Chance |
| --- | --- |
| 1–4 | 0% |
| 5 | 1% |
| 6 | 3% |
| 7 | 5% |
| 8 | 7% |
| 9 | 9% |
| 10 | 11% |
| 11 | 13% |
| 12 | 15% |
| 13 | 16% |
| 14 | 18% |
| 15 | 20% |
| 16 | 22% |
| 17 | 24% |
| 18 | 26% |
| 19 | 28% |
| 20 | 30% |

The formula is `round(1 + (level - 5) × 29 / 15)`.

From level 15 upward, that roll happens twice and can produce two pieces. Each success is one magic piece of armor, a weapon, or a trinket that the NPC is able to use.

## Classless NPC

A classless NPC is an ordinary person.

- **Ability scores:** each score is from 8 to 12.
- **Hit points:** 10.
- **Armor:** cloth. Armor class is the Player’s Handbook unarmored value, 10 plus the Dexterity modifier.
- **No level, subclass, or class features.**
- **No magic armor, weapons, or trinkets.**
- They still have a name, race, gender, alignment, beliefs, attributes, flaws, wealth, and loot.
