import { renderSheet } from "./sheet.js";

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN_X = 28;
const FOOTER = 26;
const SHEET = [18, 32, 27];

export async function downloadNpcPdf(npcs, filename, onProgress) {
  if (!window.html2canvas || !window.jspdf) {
    throw new Error("The PDF tools did not load. Refresh the page and try again.");
  }
  const title = filename.replace(/\.pdf$/i, "");
  const doc = new window.jspdf.jsPDF({ unit: "pt", format: "letter", compress: true });
  doc.setProperties({ title });
  const stage = document.createElement("div");
  stage.className = "pdf-stage";
  stage.setAttribute("aria-hidden", "true");
  document.body.appendChild(stage);
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  try {
    for (let index = 0; index < npcs.length; index += 1) {
      if (onProgress) onProgress(index + 1, npcs.length, npcs[index].name);
      await paintFrame();
      if (index > 0) doc.addPage();
      await addNpc(doc, stage, npcs[index]);
    }
    const total = doc.getNumberOfPages();
    for (let page = 1; page <= total; page += 1) {
      doc.setPage(page);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(213, 228, 220);
      doc.text(`${title}  -  ${page} / ${total}`, MARGIN_X, PAGE_H - 14);
    }
  } finally {
    stage.remove();
    window.scrollTo(scrollX, scrollY);
  }
  doc.save(filename);
}

async function addNpc(doc, stage, npc) {
  stage.innerHTML = `<div class="sheet pdf-sheet">${renderSheet(npc)}</div>`;
  const node = stage.querySelector(".sheet");
  const heading = node.querySelector("#npc-name");
  if (heading) heading.removeAttribute("id");
  const canvas = await window.html2canvas(node, {
    backgroundColor: "#12201b",
    scale: 2,
    width: node.offsetWidth,
    height: node.offsetHeight,
    logging: false
  });
  const breaks = breakPoints(node, canvas);
  const pageWidth = PAGE_W - MARGIN_X * 2;
  const ptPerPx = pageWidth / canvas.width;
  let y = 0;
  let part = 0;
  while (y < canvas.height - 2) {
    if (part > 0) doc.addPage();
    const continued = part > 0;
    const top = continued ? 40 : 18;
    const usablePx = (PAGE_H - FOOTER - top) / ptPerPx;
    const limit = Math.min(canvas.height, y + usablePx);
    let cut = limit;
    if (limit < canvas.height - 2) {
      for (const point of breaks) {
        if (point > y + usablePx * 0.4 && point <= limit + 1) cut = point;
      }
    }
    const sliceHeight = Math.max(1, Math.round(cut - y));
    const slice = document.createElement("canvas");
    slice.width = canvas.width;
    slice.height = sliceHeight;
    slice.getContext("2d").drawImage(canvas, 0, Math.round(y), canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
    doc.setFillColor(...SHEET);
    doc.rect(0, 0, PAGE_W, PAGE_H, "F");
    if (continued) {
      doc.setFont("times", "bold");
      doc.setFontSize(14);
      doc.setTextColor(246, 239, 226);
      doc.text(`${npc.name}, continued`, MARGIN_X, 26);
    }
    doc.addImage(slice, "PNG", MARGIN_X, top, pageWidth, sliceHeight * ptPerPx);
    y = cut;
    part += 1;
  }
}

function paintFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

function breakPoints(root, canvas) {
  const ratio = canvas.height / root.offsetHeight;
  const top = root.getBoundingClientRect().top;
  const points = new Set();
  root.querySelectorAll(".identity, .abilities, .vitals, .sheet-body, .block, tr, li, h4, p").forEach((element) => {
    const bottom = element.getBoundingClientRect().bottom - top;
    if (bottom > 8 && bottom < root.offsetHeight - 4) points.add(Math.round(bottom * ratio));
  });
  return [...points].sort((a, b) => a - b);
}
