/*
  Tiny isometric "massing model" renderer.
  A building is a list of boxes [x, y, z, w, d, h] in grid units.
  massing(boxes, { unit }) returns an <svg> string — no images needed.
*/
window.massing = function massing(boxes, opts = {}) {
  const u = opts.unit || 14;
  const C = Math.cos(Math.PI / 6), S = Math.sin(Math.PI / 6);
  const P = (x, y, z) => [(x - y) * C * u, (x + y) * S * u - z * u];

  // painter's order: far boxes first
  const sorted = [...boxes].sort((a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]));
  const polys = [];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const poly = (pts, cls) => {
    pts.forEach(([x, y]) => { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); });
    polys.push(`<polygon class="${cls}" points="${pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ")}"/>`);
  };

  for (const [x, y, z, w, d, h, accent] of sorted) {
    const t = z + h;
    poly([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, t), P(x, y + d, t)], "m-l" + (accent ? " m-acc" : ""));
    poly([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, t), P(x + w, y, t)], "m-r" + (accent ? " m-acc2" : ""));
    poly([P(x, y, t), P(x + w, y, t), P(x + w, y + d, t), P(x, y + d, t)], "m-t");
    // window slits on the right face for taller boxes
    if (h >= 3 && !accent) {
      for (let k = 1; k < h; k += 1) {
        const a = P(x + w, y + 0.25, z + k), b = P(x + w, y + d - 0.25, z + k);
        polys.push(`<line class="m-w" x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}"/>`);
      }
    }
  }
  const pad = 6;
  return `<svg class="massing" viewBox="${(minX - pad).toFixed(0)} ${(minY - pad).toFixed(0)} ${(maxX - minX + pad * 2).toFixed(0)} ${(maxY - minY + pad * 2).toFixed(0)}" xmlns="http://www.w3.org/2000/svg">${polys.join("")}</svg>`;
};
