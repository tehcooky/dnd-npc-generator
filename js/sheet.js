export function renderSheet(npc) {
  const title = npc.classId === "none"
    ? `${npc.raceName} · no class`
    : `${npc.raceName} ${npc.className}${npc.subclassName ? ` · ${npc.subclassName}` : ""} · level ${npc.level}`;
  const abilityNames = {
    str: "Strength", dex: "Dexterity", con: "Constitution",
    int: "Intelligence", wis: "Wisdom", cha: "Charisma"
  };
  const abilities = Object.entries(abilityNames).map(([ability, name]) => {
    const score = npc.scores[ability];
    return `<li class="ability"><span class="mod" aria-hidden="true">${fmt(mod(score))}</span><span class="score" aria-hidden="true">${score}</span><span class="abbr" aria-hidden="true">${name.slice(0, 3)}</span><span class="visually-hidden">${name}, score ${score}, modifier ${fmt(mod(score))}</span></li>`;
  }).join("");

  const features = npc.features && npc.features.length
    ? `<section class="block"><h3>Features</h3><ul>${npc.features.map((feature) => `<li><strong>${escapeHtml(feature.name)}.</strong> ${escapeHtml(feature.detail)}</li>`).join("")}</ul></section>`
    : "";

  return `
    <header class="identity">
      <div>
        <p class="kicker">${escapeHtml(npc.gender)} · chaotic neutral</p>
        <h2 id="npc-name" tabindex="-1">${escapeHtml(npc.name)}</h2>
        <p class="summary">${escapeHtml(title)}</p>
      </div>
      <p class="wealth"><span>Wealth</span><strong>${npc.loot.wealth}</strong><span>${coin(npc.loot)}</span></p>
    </header>
    <ul class="abilities">${abilities}</ul>
    <dl class="vitals">
      ${vital("Armor class", npc.ac, npc.acNote)}
      ${vital("Hit points", npc.hp, npc.hitDie || "Ordinary person")}
      ${vital("Speed", `${npc.speed} ft`, npc.darkvision ? `Darkvision ${npc.darkvision} ft` : "No darkvision")}
      ${vital("Initiative", fmt(npc.initiative), npc.proficiency ? `Proficiency ${fmt(npc.proficiency)}` : "No proficiency bonus")}
    </dl>
    <div class="sheet-body">
      <div class="col">
        ${attackTable(npc)}
        ${saveTable(npc)}
        ${skillTable(npc)}
      </div>
      <div class="col">
        <section class="block">
          <h3>Personality</h3>
          ${list("Beliefs", npc.personality.beliefs)}
          ${list("Attributes", npc.personality.attributes)}
          ${list("Flaws", npc.personality.flaws)}
          ${npc.god ? `<p class="god">God: ${escapeHtml(npc.god)}</p>` : ""}
        </section>
        <section class="block">
          <h3>Languages and traits</h3>
          <p>${escapeHtml(npc.languages.join(", "))}</p>
          ${npc.resists && npc.resists.length ? `<p>Resists ${npc.resists.join(", ")}.</p>` : ""}
          <ul>${(npc.traits || []).map((trait) => `<li>${escapeHtml(trait)}</li>`).join("")}</ul>
          ${npc.background ? `<p><strong>Background:</strong> ${escapeHtml(npc.background.name)}</p>` : ""}
          ${npc.tools && npc.tools.length ? `<p>Tools: ${escapeHtml(npc.tools.join(", "))}</p>` : ""}
        </section>
      </div>
    </div>
    ${spellBlock(npc)}
    <div class="sheet-body">
      <section class="block">
        <h3>Equipment</h3>
        <ul>${(npc.equipment || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section class="block">
        <h3>Loot if killed</h3>
        <ul>${npc.loot.items.length ? npc.loot.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("") : "<li>Nothing but the coins above.</li>"}</ul>
        ${npc.magicItems && npc.magicItems.length ? `<div class="tags">${npc.magicItems.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}</div>` : ""}
      </section>
    </div>
    ${features ? `<div class="sheet-body single">${features}</div>` : ""}
  `;
}

function vital(label, value, note) {
  return `<div class="vital"><dt>${escapeHtml(label)}</dt><dd><span class="vital-value">${escapeHtml(String(value))}</span>${note ? `<span class="note">${escapeHtml(note)}</span>` : ""}</dd></div>`;
}

function attackTable(npc) {
  const rows = npc.attacks.map((attack) => `
    <tr>
      <th scope="row">${escapeHtml(attack.name)}${attack.note ? `<span class="attack-note">${escapeHtml(attack.note)}</span>` : ""}</th>
      <td>${escapeHtml(attack.bonus)}</td>
      <td>${escapeHtml(attack.damage)}</td>
    </tr>`).join("");
  const caption = npc.classId === "none" ? "If they are fought" : "Attacks";
  return `<section class="block"><table>
    <caption>${caption}</caption>
    <thead><tr><th scope="col">Weapon</th><th scope="col">Bonus</th><th scope="col">Damage</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></section>`;
}

function saveTable(npc) {
  const rows = npc.saves.map((save) => `
    <tr>
      <th scope="row">${escapeHtml(save.name)}${save.proficient ? `<span class="flag">Proficient</span>` : ""}</th>
      <td>${fmt(save.bonus)}</td>
    </tr>`).join("");
  return `<section class="block"><table>
    <caption>Saving throws</caption>
    <thead class="visually-hidden"><tr><th scope="col">Save</th><th scope="col">Bonus</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></section>`;
}

function skillTable(npc) {
  const rows = npc.skills.map((skill) => {
    const flag = skill.expert
      ? `<span class="flag expertise">Expertise</span>`
      : skill.proficient ? `<span class="flag">Proficient</span>` : "";
    return `<tr><th scope="row">${escapeHtml(skill.name)}${flag}</th><td>${fmt(skill.bonus)}</td></tr>`;
  }).join("");
  return `<section class="block"><table>
    <caption>Skills</caption>
    <thead class="visually-hidden"><tr><th scope="col">Skill</th><th scope="col">Bonus</th></tr></thead>
    <tbody>${rows}</tbody>
  </table><p>Passive Perception ${npc.passivePerception}</p></section>`;
}

function spellBlock(npc) {
  if (!npc.spells) return "";
  const spells = npc.spells;
  return `<div class="sheet-body single"><section class="block">
    <h3>Spells</h3>
    <p>${escapeHtml(spells.ability || "Racial")}${spells.dc ? ` · DC ${spells.dc} · attack ${escapeHtml(spells.attack)}` : ""}</p>
    ${spells.slots ? `<p>Slots: ${escapeHtml(spells.slots)}</p>` : ""}
    <div class="spell-groups">
      ${spells.cantrips.length ? `<div>${list("Cantrips", spells.cantrips)}</div>` : ""}
      ${spells.prepared.length ? `<div>${list(spells.listLabel || "Known", spells.prepared)}</div>` : ""}
      ${spells.book && spells.book.length ? `<div>${list("Spellbook", spells.book)}</div>` : ""}
      ${spells.racial && spells.racial.length ? `<div>${list("Racial magic", spells.racial)}</div>` : ""}
    </div>
  </section></div>`;
}

function list(title, items) {
  if (!items || !items.length) return "";
  return `<h4>${escapeHtml(title)}</h4><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function coin(loot) {
  const parts = [];
  if (loot.gp) parts.push(`${loot.gp} gp`);
  if (loot.sp) parts.push(`${loot.sp} sp`);
  if (loot.cp) parts.push(`${loot.cp} cp`);
  return parts.join(", ") || "no coins";
}

function mod(score) {
  return Math.floor((score - 10) / 2);
}

function fmt(number) {
  return number >= 0 ? `+${number}` : `${number}`;
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}
