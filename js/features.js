const CLASS_FEATURES = {
  barbarian: [
    [1, "Rage", "While raging, bonus damage and resistance to bludgeoning, piercing, and slashing damage. Uses grow with level."],
    [1, "Unarmored Defense", "Without armor, armor class is 10 + Dexterity modifier + Constitution modifier. A shield still counts."],
    [2, "Reckless Attack", "Advantage on Strength melee attacks this turn; attacks against them have advantage until their next turn."],
    [2, "Danger Sense", "Advantage on Dexterity saves against effects they can see."],
    [5, "Extra Attack", "Two attacks whenever they take the Attack action."],
    [5, "Fast Movement", "Speed increases by 10 feet while not wearing heavy armor."],
    [7, "Feral Instinct", "Advantage on initiative. Can enter a rage as a reaction if surprised."],
    [9, "Brutal Critical", "One extra weapon die on a critical hit. A second die at 13th level, a third at 17th."],
    [11, "Relentless Rage", "A Constitution save can keep them at 1 hit point instead of dropping."],
    [15, "Persistent Rage", "A rage ends early only if they fall unconscious or choose to end it."],
    [18, "Indomitable Might", "A Strength check can use their Strength score if the roll is lower."],
    [20, "Primal Champion", "Strength and Constitution each increase by 4, to a maximum of 24."]
  ],
  bard: [
    [1, "Bardic Inspiration", "A bonus die for an ally's check, attack, or save. The die grows with level."],
    [2, "Jack of All Trades", "Half proficiency on checks that do not already include proficiency."],
    [2, "Song of Rest", "Extra healing during a short rest."],
    [3, "Expertise", "Double proficiency in two skills. Two more at 10th level."],
    [5, "Font of Inspiration", "Inspiration returns on a short or long rest."],
    [6, "Countercharm", "Allies within 30 feet can reroll a failed charm or fear save."],
    [10, "Magical Secrets", "Two spells from any class list. More at 14th and 18th level."],
    [20, "Superior Inspiration", "Inspiration returns if they roll initiative with none left."]
  ],
  cleric: [
    [1, "Divine Domain", "A domain chosen at 1st level, with its own spells and features."],
    [2, "Channel Divinity", "A domain power, usable once per rest. A second use at 6th level, a third at 18th."],
    [5, "Destroy Undead", "Channel Divinity can destroy weaker undead. The threshold rises with level."],
    [10, "Divine Intervention", "A plea for direct aid. It becomes certain at 20th level."]
  ],
  druid: [
    [1, "Druidic", "A secret language, and they will not wear metal armor or use metal shields."],
    [2, "Wild Shape", "Become a beast for a number of hours. Limits rise at 4th and 8th level."],
    [18, "Timeless Body", "Age more slowly."],
    [18, "Beast Spells", "Can cast while in beast form."],
    [20, "Archdruid", "Wild Shape uses are unlimited, and spoken or material components can be ignored."]
  ],
  fighter: [
    [1, "Fighting Style", "A chosen combat style."],
    [1, "Second Wind", "Regain 1d10 + fighter level hit points once per rest."],
    [2, "Action Surge", "One extra action. A second use at 17th level."],
    [5, "Extra Attack", "Two attacks. Three at 11th level, four at 20th."],
    [9, "Indomitable", "Reroll a failed save. Extra uses at 13th and 17th level."]
  ],
  monk: [
    [1, "Unarmored Defense", "Without armor or a shield, armor class is 10 + Dexterity modifier + Wisdom modifier."],
    [1, "Martial Arts", "Dexterity for monk weapons, a bonus unarmed strike, and a growing damage die."],
    [2, "Ki", "Ki points equal to monk level. Flurry of Blows, Patient Defense, and Step of the Wind."],
    [2, "Unarmored Movement", "Extra speed while unarmored. More at 6th, 10th, 14th, and 18th level."],
    [3, "Deflect Missiles", "Reduce ranged weapon damage, and throw a caught missile back."],
    [4, "Slow Fall", "Reduce falling damage."],
    [5, "Extra Attack", "Two attacks on the Attack action."],
    [5, "Stunning Strike", "Spend ki to force a Constitution save or stun the target."],
    [6, "Ki-Empowered Strikes", "Unarmed strikes count as magical."],
    [7, "Evasion", "No damage on a successful Dexterity save, half on a failure."],
    [7, "Stillness of Mind", "End a charm or fear on themselves."],
    [10, "Purity of Body", "Immune to disease and poison."],
    [13, "Tongue of the Sun and Moon", "Understood by any creature that knows a language."],
    [14, "Diamond Soul", "Proficiency in all saves, and ki can reroll a failed save."],
    [15, "Timeless Body", "No frailty of old age, and no need for food or water."],
    [18, "Empty Body", "Become invisible, or project an astral body."],
    [20, "Perfect Self", "If initiative is rolled with no ki, 4 ki points return."]
  ],
  paladin: [
    [1, "Divine Sense", "Know the location of celestials, fiends, and undead nearby."],
    [1, "Lay on Hands", "A pool of healing equal to paladin level times 5."],
    [2, "Fighting Style", "A chosen combat style."],
    [2, "Divine Smite", "Spend a spell slot on a melee hit for extra radiant damage."],
    [3, "Divine Health", "Immune to disease."],
    [3, "Sacred Oath", "An oath with its own tenets, spells, and channel divinity."],
    [5, "Extra Attack", "Two attacks on the Attack action."],
    [6, "Aura of Protection", "The paladin and nearby allies add the Charisma modifier to saves."],
    [10, "Aura of Courage", "The paladin and nearby allies cannot be frightened."],
    [14, "Cleansing Touch", "End a spell on themselves or a willing creature."],
    [18, "Aura improvements", "Auras reach 30 feet."]
  ],
  ranger: [
    [1, "Favored Enemy", "Advantage on tracking a chosen kind of foe, and a related language."],
    [1, "Natural Explorer", "At home in one chosen terrain. More terrains at 6th and 10th level."],
    [2, "Fighting Style", "A chosen combat style."],
    [3, "Primeval Awareness", "Spend a spell slot to sense favored kinds of creatures nearby."],
    [5, "Extra Attack", "Two attacks on the Attack action."],
    [8, "Land's Stride", "Nonmagical difficult terrain does not slow them, and plants that impede movement do not."],
    [14, "Vanish", "Hide as a bonus action."],
    [18, "Feral Senses", "No advantage for unseen attackers, and they can sense the location of an invisible creature they hit."],
    [20, "Foe Slayer", "Once per turn, add Wisdom modifier to an attack or damage roll against a favored enemy."]
  ],
  rogue: [
    [1, "Expertise", "Double proficiency in two skills, or one skill and thieves' tools. Two more at 6th level."],
    [1, "Sneak Attack", "Extra d6s when they have advantage or an ally is beside the target. The dice grow with level."],
    [1, "Thieves' Cant", "A secret mix of dialect, jargon, and signs."],
    [2, "Cunning Action", "Dash, Disengage, or Hide as a bonus action."],
    [5, "Uncanny Dodge", "Halve the damage of an attack they can see."],
    [7, "Evasion", "No damage on a successful Dexterity save, half on a failure."],
    [11, "Reliable Talent", "A proficient skill check treats a d20 roll under 10 as a 10."],
    [14, "Blindsense", "Know the location of hidden or invisible creatures within 10 feet."],
    [15, "Slippery Mind", "Proficiency in Wisdom saves."],
    [18, "Elusive", "No attack roll has advantage against them while they are conscious."],
    [20, "Stroke of Luck", "Turn a missed attack into a hit, or a failed check into a 20, once per rest."]
  ],
  sorcerer: [
    [1, "Sorcerous Origin", "The source of their magic."],
    [2, "Font of Magic", "Sorcery points equal to their level, which can become slots or fuel metamagic."],
    [3, "Metamagic", "Two ways to twist a spell. A third at 10th level, a fourth at 17th."]
  ],
  warlock: [
    [1, "Otherworldly Patron", "The power that holds their pact."],
    [2, "Eldritch Invocations", "Forbidden tricks. The number known grows with level."],
    [3, "Pact Boon", "A blade, a chain familiar, or a book of shadows."],
    [11, "Mystic Arcanum", "One 6th-level spell. 7th at 13th, 8th at 15th, 9th at 17th."],
    [20, "Eldritch Master", "Once per long rest, plead for all pact slots to return."]
  ],
  wizard: [
    [1, "Arcane Recovery", "Once a day, recover spell slots on a short rest."],
    [2, "Arcane Tradition", "A school of magic."],
    [18, "Spell Mastery", "Cast one 1st-level and one 2nd-level spell from the book at their lowest slot, without spending a slot."],
    [20, "Signature Spells", "Two 3rd-level spells from the book are always prepared and can be cast once each without a slot."]
  ]
};

const SUBCLASS_FEATURES = {
  berserker: [
    [3, "Frenzy", "A rage can grant a bonus melee attack, at the cost of a level of exhaustion after."],
    [6, "Mindless Rage", "A frenzy cannot be charmed or frightened, and those conditions end when it starts."],
    [10, "Intimidating Presence", "Frighten a creature with a show of force."],
    [14, "Retaliation", "Make a melee attack against a creature that hits them."]
  ],
  totem: [
    [3, "Totem Spirit", "A bear, eagle, or wolf spirit changes what rage does."],
    [6, "Aspect of the Beast", "A second animal gift: sight, travel, or tracking."],
    [10, "Spirit Walker", "Rituals that speak with nature's spirits."],
    [14, "Totemic Attunement", "A stronger gift from the same kind of spirit."]
  ],
  lore: [
    [3, "Bonus Proficiencies", "Three extra skills."],
    [3, "Cutting Words", "Spend inspiration to subtract the die from an attack, check, or damage roll."],
    [6, "Additional Magical Secrets", "Two extra spells from any class."],
    [14, "Peerless Skill", "Add inspiration to their own check."]
  ],
  valor: [
    [3, "Bonus Proficiencies", "Medium armor, shields, and martial weapons."],
    [3, "Combat Inspiration", "Inspiration can add to weapon damage or to the user's armor class."],
    [6, "Extra Attack", "Two attacks on the Attack action."],
    [14, "Battle Magic", "A bonus weapon attack after casting a bard spell."]
  ],
  knowledge: [
    [1, "Blessings of Knowledge", "Two languages and expertise in two knowledge skills."],
    [2, "Knowledge of the Ages", "Channel Divinity grants temporary proficiency in a skill or tool."],
    [6, "Read Thoughts", "Channel Divinity to read a creature's surface thoughts."],
    [8, "Potent Spellcasting", "Add Wisdom modifier to cleric cantrip damage."],
    [17, "Visions of the Past", "Read the history of an object or place."]
  ],
  life: [
    [1, "Bonus Proficiency", "Heavy armor."],
    [1, "Disciple of Life", "Healing spells of 1st level or higher restore extra hit points."],
    [2, "Preserve Life", "Channel Divinity to heal nearby wounded creatures."],
    [6, "Blessed Healer", "Healing another creature also heals the cleric."],
    [8, "Divine Strike", "Once per turn, extra radiant damage on a weapon hit."],
    [17, "Supreme Healing", "Healing dice are treated as their maximum."]
  ],
  light: [
    [1, "Bonus Cantrip", "The light cantrip."],
    [1, "Warding Flare", "Impose disadvantage on an attack by flashing light."],
    [2, "Radiance of the Dawn", "Channel Divinity to burn nearby darkness and creatures."],
    [6, "Improved Flare", "Warding Flare can protect an ally."],
    [8, "Potent Spellcasting", "Add Wisdom modifier to cleric cantrip damage."],
    [17, "Corona of Light", "Sunlight around them, and foes in it have disadvantage on fire and radiant saves."]
  ],
  nature: [
    [1, "Acolyte of Nature", "One druid cantrip, and a skill from the druid list."],
    [1, "Bonus Proficiency", "Heavy armor."],
    [2, "Charm Animals and Plants", "Channel Divinity to charm beasts and plant creatures."],
    [6, "Dampen Elements", "Grant resistance against elemental damage to a nearby ally."],
    [8, "Divine Strike", "Once per turn, extra cold, fire, or lightning damage on a weapon hit."],
    [17, "Master of Nature", "Command creatures charmed by the domain."]
  ],
  tempest: [
    [1, "Bonus Proficiencies", "Martial weapons and heavy armor."],
    [1, "Wrath of the Storm", "Rebuke a hitter with lightning or thunder."],
    [2, "Destructive Wrath", "Channel Divinity to maximize lightning or thunder damage."],
    [6, "Thunderbolt Strike", "Lightning damage can push a Large or smaller creature."],
    [8, "Divine Strike", "Once per turn, extra thunder damage on a weapon hit."],
    [17, "Stormborn", "A fly speed equal to walking speed while outdoors."]
  ],
  trickery: [
    [1, "Blessing of the Trickster", "Give another creature advantage on Stealth."],
    [2, "Invoke Duplicity", "Channel Divinity to create an illusory double."],
    [6, "Cloak of Shadows", "Channel Divinity to become invisible."],
    [8, "Divine Strike", "Once per turn, extra poison damage on a weapon hit."],
    [17, "Improved Duplicity", "Several duplicates at once."]
  ],
  war: [
    [1, "Bonus Proficiencies", "Martial weapons and heavy armor."],
    [1, "War Priest", "A bonus weapon attack a number of times per day."],
    [2, "Guided Strike", "Channel Divinity to add +10 to an attack roll."],
    [6, "War God's Blessing", "The same +10 can be given to an ally."],
    [8, "Divine Strike", "Once per turn, extra damage on a weapon hit."],
    [17, "Avatar of Battle", "Resistance to bludgeoning, piercing, and slashing from nonmagical weapons."]
  ],
  land: [
    [2, "Bonus Cantrip", "One extra druid cantrip."],
    [2, "Natural Recovery", "Recover spell slots on a short rest."],
    [2, "Circle Spells", "Extra spells from the chosen land, always prepared."],
    [6, "Land's Stride", "Nonmagical difficult terrain does not slow them."],
    [10, "Nature's Ward", "Cannot be charmed or frightened by elementals or fey, and immune to poison and disease."],
    [14, "Nature's Sanctuary", "Beasts and plants hesitate to attack them."]
  ],
  moon: [
    [2, "Combat Wild Shape", "Wild Shape as a bonus action, and spell slots can heal the beast form."],
    [2, "Circle Forms", "Wild Shape into stronger beasts than other druids."],
    [6, "Primal Strike", "Beast-form attacks count as magical."],
    [10, "Elemental Wild Shape", "Wild Shape into an air, earth, fire, or water elemental."],
    [14, "Thousand Forms", "Alter Self at will."]
  ],
  champion: [
    [3, "Improved Critical", "A 19 or 20 is a critical hit. An 18 joins them at 15th level."],
    [7, "Remarkable Athlete", "Half proficiency on Strength, Dexterity, and Constitution checks that lack proficiency."],
    [10, "Additional Fighting Style", "A second fighting style."],
    [18, "Survivor", "Regain hit points at the start of each turn while bloodied."]
  ],
  "battle-master": [
    [3, "Combat Superiority", "Maneuvers fueled by superiority dice. More dice and bigger dice at later levels."],
    [7, "Know Your Enemy", "Study a creature to compare its grit to theirs."],
    [10, "Improved Combat Superiority", "Superiority dice become d10s, then d12s at 18th level."],
    [15, "Relentless", "A superiority die returns if they roll initiative with none left."]
  ],
  "eldritch-knight": [
    [3, "Spellcasting", "Wizard spells, mostly abjuration and evocation."],
    [3, "Weapon Bond", "A bonded weapon can be called to the hand."],
    [7, "War Magic", "A bonus weapon attack after a cantrip."],
    [10, "Eldritch Strike", "A creature hit by a weapon has disadvantage on the next spell save they make."],
    [15, "Arcane Charge", "Action Surge also allows a teleport."],
    [18, "Improved War Magic", "A bonus weapon attack after any spell."]
  ],
  "open-hand": [
    [3, "Open Hand Technique", "Flurry of Blows can knock prone, push, or deny reactions."],
    [6, "Wholeness of Body", "Heal themselves with an action."],
    [11, "Tranquility", "A sanctuary-like peace until they attack or cast."],
    [17, "Quivering Palm", "Set a lethal vibration in a creature they hit."]
  ],
  shadow: [
    [3, "Shadow Arts", "Spend ki to cast darkness, darkvision, pass without trace, or silence."],
    [6, "Shadow Step", "Teleport between dim light and shadows."],
    [11, "Cloak of Shadows", "Become invisible in dim light or darkness."],
    [17, "Opportunist", "A reaction attack when a creature nearby is hit by someone else."]
  ],
  "four-elements": [
    [3, "Disciple of the Elements", "Spend ki to shape elemental disciplines. More disciplines at later levels."]
  ],
  devotion: [
    [3, "Sacred Weapon", "Channel Divinity adds Charisma modifier to attack rolls and makes the weapon magical."],
    [3, "Turn the Unholy", "Channel Divinity to drive fiends and undead away."],
    [7, "Aura of Devotion", "Nearby allies cannot be charmed."],
    [15, "Purity of Spirit", "Always under protection from evil and good."],
    [20, "Holy Nimbus", "Bright light, extra radiant damage, and advantage on saves against fiend and undead spells."]
  ],
  ancients: [
    [3, "Nature's Wrath", "Channel Divinity to restrain a creature with spectral vines."],
    [3, "Turn the Faithless", "Channel Divinity to drive fey and fiends away."],
    [7, "Aura of Warding", "Resistance to spell damage for the paladin and nearby allies."],
    [15, "Undying Sentinel", "Once per long rest, drop to 1 hit point instead of 0."],
    [20, "Elder Champion", "Regrow hit points, haste their own spells, and foes have trouble saving against them."]
  ],
  vengeance: [
    [3, "Abjure Enemy", "Channel Divinity to frighten a foe and slow its movement."],
    [3, "Vow of Enmity", "Channel Divinity for advantage on attacks against one creature."],
    [7, "Relentless Avenger", "A successful opportunity attack lets them move toward the target."],
    [15, "Soul of Vengeance", "A reaction attack when the sworn foe attacks."],
    [20, "Avenging Angel", "Wings, a flying speed, and a frightening presence."]
  ],
  hunter: [
    [3, "Hunter's Prey", "Colossus Slayer, Giant Killer, or Horde Breaker."],
    [7, "Defensive Tactics", "Escape the Horde, Multiattack Defense, or Steel Will."],
    [11, "Multiattack", "Volley or Whirlwind Attack."],
    [15, "Superior Hunter's Defense", "Evasion, Stand Against the Tide, or Uncanny Dodge."]
  ],
  "beast-master": [
    [3, "Ranger's Companion", "A beast companion that acts on their turn."],
    [7, "Exceptional Training", "The beast can dash, disengage, dodge, or help as a bonus action."],
    [11, "Bestial Fury", "The beast can attack twice when told to attack."],
    [15, "Share Spells", "Spells that target the ranger can also affect the beast."]
  ],
  thief: [
    [3, "Fast Hands", "Sleight of Hand, a thief's tool, or an object interaction as a bonus action."],
    [3, "Second-Story Work", "Climbing does not cost extra movement, and jumps are longer."],
    [9, "Supreme Sneak", "Advantage on Stealth if they move no more than half speed."],
    [13, "Use Magic Device", "Ignore class, race, and level limits on magic items."],
    [17, "Thief's Reflexes", "Two turns on the first round of combat."]
  ],
  assassin: [
    [3, "Assassinate", "Advantage on creatures that have not acted, and surprise hits are criticals."],
    [3, "Bonus Proficiencies", "Disguise kit and poisoner's kit."],
    [9, "Infiltration Expertise", "A false identity that can be established over time."],
    [13, "Impostor", "Mimic speech, writing, and behavior."],
    [17, "Death Strike", "A surprised target must save or take double damage."]
  ],
  "arcane-trickster": [
    [3, "Spellcasting", "Wizard spells, mostly enchantment and illusion."],
    [3, "Mage Hand Legerdemain", "An invisible mage hand that can steal and plant objects."],
    [9, "Magical Ambush", "A hidden spell forces disadvantage on the save."],
    [13, "Versatile Trickster", "Distract a creature with the mage hand for advantage."],
    [17, "Spell Thief", "Steal a spell from a caster who fails a save."]
  ],
  draconic: [
    [1, "Dragon Ancestor", "A draconic ancestry, its damage type, and the language Draconic."],
    [1, "Draconic Resilience", "Hit points increase by 1 per level. Without armor, armor class is 13 + Dexterity modifier."],
    [6, "Elemental Affinity", "Resistance to the ancestry's damage, and extra damage of that type on a spell."],
    [14, "Dragon Wings", "Sprout wings and a flying speed."],
    [18, "Draconic Presence", "An aura of awe or fear."]
  ],
  wild: [
    [1, "Wild Magic Surge", "A spell can trigger a random surge."],
    [1, "Tides of Chaos", "Advantage once per rest, which can itself trigger a surge."],
    [6, "Bend Luck", "Spend sorcery points to add or subtract 1d4 from a nearby roll."],
    [14, "Controlled Chaos", "Roll twice on a surge and pick either result."],
    [18, "Spell Bombardment", "When a spell's damage die rolls its maximum, roll it again and add it."]
  ],
  archfey: [
    [1, "Fey Presence", "Charm or frighten creatures in a cube once per rest."],
    [6, "Misty Escape", "Turn a hit into a teleport and brief invisibility."],
    [10, "Beguiling Defenses", "Immune to charm, and a charmer can be turned back."],
    [14, "Dark Delirium", "Banish a creature into a phantasmal realm."]
  ],
  fiend: [
    [1, "Dark One's Blessing", "Gain temporary hit points when they drop a hostile creature to 0."],
    [6, "Dark One's Own Luck", "Add a d10 to a check or save once per rest."],
    [10, "Fiendish Resilience", "Resistance to a chosen damage type, changeable each rest."],
    [14, "Hurl Through Hell", "A hit can send a creature on a brief trip through the lower planes."]
  ],
  "great-old-one": [
    [1, "Awakened Mind", "Speak telepathically to a creature they can see."],
    [6, "Entropic Ward", "Impose disadvantage on an attack, and gain advantage if it misses."],
    [10, "Thought Shield", "Resistance to psychic damage, and a mind-reader takes the same psychic damage."],
    [14, "Create Thrall", "Touch an incapacitated humanoid and bind it."]
  ],
  abjuration: [
    [2, "Abjuration Savant", "Copying abjuration spells into the book is cheaper and faster."],
    [2, "Arcane Ward", "A ward of temporary hit points after an abjuration spell."],
    [6, "Projected Ward", "The ward can catch a blow meant for someone else."],
    [10, "Improved Abjuration", "Add proficiency to ability checks made as part of an abjuration spell."],
    [14, "Spell Resistance", "Advantage on saves against spells, and resistance to spell damage."]
  ],
  conjuration: [
    [2, "Conjuration Savant", "Copying conjuration spells into the book is cheaper and faster."],
    [2, "Minor Conjuration", "Conjure a small nonmagical object for a short time."],
    [6, "Benign Transposition", "Teleport a short distance, or swap places with a willing creature."],
    [10, "Focused Conjuration", "Concentration on a conjuration spell cannot be broken by damage."],
    [14, "Durable Summons", "Conjured creatures gain extra hit points."]
  ],
  divination: [
    [2, "Divination Savant", "Copying divination spells into the book is cheaper and faster."],
    [2, "Portent", "Two foretold d20 rolls each day. A third at 14th level."],
    [6, "Expert Divination", "Casting a divination spell of 2nd level or higher restores a lower slot."],
    [10, "The Third Eye", "Darkvision, ethereal sight, reading any language, or seeing invisibility."],
    [14, "Greater Portent", "Three portent dice."]
  ],
  enchantment: [
    [2, "Enchantment Savant", "Copying enchantment spells into the book is cheaper and faster."],
    [2, "Hypnotic Gaze", "Charm a creature that stays beside them."],
    [6, "Instinctive Charm", "Redirect an attack that misses them."],
    [10, "Split Enchantment", "A single-target enchantment can affect a second creature."],
    [14, "Alter Memories", "A charmed creature can forget time spent charmed."]
  ],
  evocation: [
    [2, "Evocation Savant", "Copying evocation spells into the book is cheaper and faster."],
    [2, "Sculpt Spells", "Allies can be spared from an evocation blast, and they succeed on the save."],
    [6, "Potent Cantrip", "A missed cantrip still does half damage if the target saves."],
    [10, "Empowered Evocation", "Add Intelligence modifier to evocation spell damage."],
    [14, "Overchannel", "Deal maximum damage with a 1st- through 5th-level evocation spell."]
  ],
  illusion: [
    [2, "Illusion Savant", "Copying illusion spells into the book is cheaper and faster."],
    [2, "Improved Minor Illusion", "Sound and an image together."],
    [6, "Malleable Illusions", "Change an ongoing illusion with an action."],
    [10, "Illusory Self", "An attack that hits can be made to miss an illusion instead."],
    [14, "Illusory Reality", "Make one object in an illusion real for a minute."]
  ],
  necromancy: [
    [2, "Necromancy Savant", "Copying necromancy spells into the book is cheaper and faster."],
    [2, "Grim Harvest", "Regain hit points when a spell kills a creature."],
    [6, "Undead Thralls", "Animate dead is stronger, and the undead gain extra hit points and damage."],
    [10, "Inured to Undeath", "Resistance to necrotic damage, and maximum hit points cannot be reduced."],
    [14, "Command Undead", "Try to seize control of an undead."]
  ],
  transmutation: [
    [2, "Transmutation Savant", "Copying transmutation spells into the book is cheaper and faster."],
    [2, "Minor Alchemy", "Temporarily change one substance into another."],
    [6, "Transmuter's Stone", "A stone that holds one of four benefits."],
    [10, "Shapechanger", "Cast polymorph on themselves without a slot."],
    [14, "Master Transmuter", "Destroy the stone for a greater effect: restore youth, heal, raise the dead, or transmute materials."]
  ]
};

export function featuresFor(classId, subclassId, level) {
  const rows = [
    ...(CLASS_FEATURES[classId] || []),
    ...(SUBCLASS_FEATURES[subclassId] || [])
  ];
  return rows
    .filter(([at]) => at <= level)
    .sort((a, b) => a[0] - b[0])
    .map(([at, name, detail]) => ({ level: at, name, detail }));
}
