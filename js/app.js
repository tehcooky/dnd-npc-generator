import { generateNpc, CLASSES, RACES } from "./generate.js";
import { downloadNpcPdf } from "./pdf.js?v=loading";
import { renderSheet, escapeHtml } from "./sheet.js?v=sheet";

const classSelect = document.querySelector("#class");
const raceSelect = document.querySelector("#race");
const levelSelect = document.querySelector("#level");
const form = document.querySelector("#controls");
const sheet = document.querySelector("#sheet");
const error = document.querySelector("#error");
const status = document.querySelector("#status");

classSelect.innerHTML = [
  option("random", "Random"),
  option("none", "No class"),
  ...CLASSES.map((klass) => option(klass.id, klass.name))
].join("");

raceSelect.innerHTML = [
  option("random", "Random"),
  ...RACES.map((race) => option(race.id, race.name))
].join("");

levelSelect.innerHTML = [
  option("random", "Random"),
  ...Array.from({ length: 20 }, (_, index) => option(String(index + 1), String(index + 1)))
].join("");

const pdfDialog = document.querySelector("#pdf-dialog");
const pdfForm = document.querySelector("#pdf-form");
const pdfError = document.querySelector("#pdf-error");

document.querySelector("#save-pdf").addEventListener("click", () => {
  pdfError.hidden = true;
  pdfDialog.showModal();
  document.querySelector("#pdf-count").focus();
});

document.querySelector("#pdf-cancel").addEventListener("click", () => {
  if (pdfForm.dataset.busy === "true") return;
  pdfDialog.close();
});

pdfDialog.addEventListener("cancel", (event) => {
  if (pdfForm.dataset.busy === "true") event.preventDefault();
});

pdfForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  pdfError.hidden = true;
  const count = Number(document.querySelector("#pdf-count").value);
  const filename = pdfFilename(document.querySelector("#pdf-name").value);
  if (!Number.isInteger(count) || count < 1 || count > 40) {
    pdfError.hidden = false;
    pdfError.textContent = "Choose a number from 1 to 40.";
    return;
  }
  if (!filename) {
    pdfError.hidden = false;
    pdfError.textContent = "Give the PDF a name made of letters or numbers.";
    return;
  }
  const saveButton = document.querySelector("#pdf-save");
  const progress = document.querySelector("#pdf-progress");
  const progressText = document.querySelector("#pdf-progress-text");
  const controls = [...pdfForm.querySelectorAll("input, button")];
  pdfForm.dataset.busy = "true";
  pdfDialog.setAttribute("aria-busy", "true");
  controls.forEach((control) => { control.disabled = true; });
  saveButton.textContent = "Saving...";
  progress.hidden = false;
  progressText.textContent = `Preparing ${count} ${count === 1 ? "person" : "people"}...`;
  try {
    await paintFrame();
    const npcs = Array.from({ length: count }, () => generateNpc(selectedOptions()));
    await downloadNpcPdf(npcs, filename, (current, total, name) => {
      progressText.textContent = `Drawing ${name}, ${current} of ${total}`;
    });
    status.textContent = `Saved ${count} ${count === 1 ? "NPC" : "NPCs"} as ${filename}.`;
    pdfDialog.close();
  } catch (err) {
    pdfError.hidden = false;
    pdfError.textContent = err && err.message ? err.message : String(err);
  } finally {
    pdfForm.dataset.busy = "false";
    pdfDialog.removeAttribute("aria-busy");
    controls.forEach((control) => { control.disabled = false; });
    saveButton.textContent = "Save PDF";
    progress.hidden = true;
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  error.hidden = true;
  try {
    const npc = generateNpc(selectedOptions());
    sheet.hidden = false;
    sheet.innerHTML = renderSheet(npc);
    const summary = npc.classId === "none"
      ? `Created ${npc.name}, ${npc.raceName}, no class.`
      : `Created ${npc.name}, ${npc.raceName} ${npc.className}, level ${npc.level}.`;
    status.textContent = summary;
    const heading = sheet.querySelector("h2");
    if (heading) heading.focus({ preventScroll: true });
  } catch (err) {
    error.hidden = false;
    error.textContent = err && err.message ? err.message : String(err);
    status.textContent = "Could not create an NPC.";
  }
});

function selectedOptions() {
  return {
    classId: classSelect.value,
    raceId: raceSelect.value,
    gender: document.querySelector("#gender").value,
    level: levelSelect.value
  };
}

function pdfFilename(value) {
  const cleaned = String(value || "")
    .trim()
    .replace(/\.pdf$/i, "")
    .replace(/[\\/:*?"<>|]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned ? `${cleaned}.pdf` : "";
}

function paintFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

function option(value, label) {
  return `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`;
}
