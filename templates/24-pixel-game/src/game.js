/*
  LAMPLIGHTER — a one-screen 8-bit game on a 160×120 canvas, scaled up with crisp pixels.
  Run left/right across the rooftops, jump to light the lamps, avoid the bats. Three lives.
  Sprites are strings: each character is a palette index ("." = transparent).
*/
const W = 160, H = 120;
export const PAL = { 0: "#0f0f1b", 1: "#f8f8f8", 2: "#fcd34d", 3: "#e4572e", 4: "#2b3a8c", 5: "#6c7bd1", 6: "#7a4b2a", 7: "#3d3d4e", 8: "#ffb347" };

export const SPR = {
  hero: [
    "..3333..", ".333333.", "..1111..", "..1011..", "..1111..", ".444444.", "4.4444.4", "..4444..", "..4..4..", ".66..66.",
  ],
  hero2: [
    "..3333..", ".333333.", "..1111..", "..1011..", "..1111..", ".444444.", "4.4444.4", "..4444..", ".4....4.", "66....66",
  ],
  lampOff: ["..777..", ".7...7.", ".7...7.", "..777..", "...7...", "...7...", "...7...", "...7...", "...7...", "..777.."],
  lampOn: ["..222..", ".28882.", ".28882.", "..222..", "...7...", "...7...", "...7...", "...7...", "...7...", "..777.."],
  bat: ["5.....5", "55.5.55", "5555555", ".5.5.5.", "......."],
  bat2: [".......", ".55.55.", "5555555", "5.555.5", "......."],
  moon: ["...2222.", ".222....", ".22.....", "22......", "22......", "22......", ".22.....", ".222....", "...2222."],
};

export function draw(g, spr, x, y, flip = false) {
  spr.forEach((row, j) => [...row].forEach((c, i) => {
    if (c === ".") return;
    g.fillStyle = PAL[c];
    g.fillRect(Math.round(x + (flip ? row.length - 1 - i : i)), Math.round(y + j), 1, 1);
  }));
}

// rooftops: [x, y, width]
const ROOFS = [[0, 100, 44], [52, 88, 36], [96, 96, 30], [132, 82, 28], [20, 66, 26], [70, 56, 24], [110, 50, 22]];

export function createGame(canvas, { onScore, onLives, onState }) {
  const g = canvas.getContext("2d");
  canvas.width = W; canvas.height = H;
  let keys = {}, raf = 0, last = 0, t = 0;
  let s;

  function reset() {
    s = {
      p: { x: 10, y: 80, vx: 0, vy: 0, on: false, face: false },
      lamps: ROOFS.map(([x, y, w]) => ({ x: x + w / 2 - 3, y: y - 10, lit: false })),
      bats: [{ x: 150, y: 30, dx: -0.5, ph: 0 }, { x: 10, y: 44, dx: 0.4, ph: 2 }],
      score: 0, lives: 3, over: false, hurt: 0, level: 1,
    };
    onScore(0); onLives(3);
  }

  function step(dt) {
    const p = s.p;
    const speed = 0.9, grav = 0.16;
    p.vx = (keys.ArrowLeft || keys.a ? -speed : 0) + (keys.ArrowRight || keys.d ? speed : 0);
    if (p.vx) p.face = p.vx < 0;
    if ((keys.ArrowUp || keys[" "] || keys.w) && p.on) { p.vy = -3.1; p.on = false; }
    p.vy = Math.min(3, p.vy + grav);
    p.x = Math.max(0, Math.min(W - 8, p.x + p.vx * dt));
    const prevBottom = p.y + 10;
    p.y += p.vy * dt;
    p.on = false;
    for (const [rx, ry, rw] of ROOFS) {
      if (p.x + 6 > rx && p.x + 2 < rx + rw && prevBottom <= ry && p.y + 10 >= ry && p.vy >= 0) { p.y = ry - 10; p.vy = 0; p.on = true; }
    }
    if (p.y > H) hit();

    // light lamps by touching them
    for (const l of s.lamps) {
      if (!l.lit && Math.abs(p.x + 4 - (l.x + 3)) < 6 && Math.abs(p.y - l.y) < 9) {
        l.lit = true; s.score += 10; onScore(s.score);
      }
    }
    if (s.lamps.every((l) => l.lit)) {
      // next night: lamps go out, one more (faster) bat
      s.level++; s.lamps.forEach((l) => (l.lit = false)); s.score += 50; onScore(s.score);
      s.bats.push({ x: Math.random() * 140, y: 20 + Math.random() * 30, dx: (Math.random() > .5 ? 1 : -1) * (0.4 + s.level * 0.1), ph: 0 });
    }

    // bats
    for (const b of s.bats) {
      b.x += b.dx * dt; b.ph += 0.1 * dt;
      if (b.x < 0 || b.x > W - 7) b.dx *= -1;
      const by = b.y + Math.sin(b.ph) * 8;
      if (!s.hurt && Math.abs(p.x + 4 - (b.x + 3)) < 6 && Math.abs(p.y + 4 - (by + 2)) < 6) hit();
    }
    if (s.hurt) s.hurt -= dt;
  }

  function hit() {
    s.lives--; onLives(s.lives); s.hurt = 60;
    Object.assign(s.p, { x: 10, y: 80, vx: 0, vy: 0 });
    if (s.lives <= 0) { s.over = true; onState("over"); }
  }

  function render() {
    // sky, moon, stars
    g.fillStyle = PAL[0]; g.fillRect(0, 0, W, H);
    g.fillStyle = PAL[1];
    for (let i = 0; i < 26; i++) g.fillRect((i * 37) % W, (i * 23) % 60, 1, 1);
    draw(g, SPR.moon, 134, 8);
    // far skyline
    g.fillStyle = "#1c1c33";
    for (let x = 0; x < W; x += 12) g.fillRect(x, 70 + ((x * 7) % 18), 10, 60);
    // roofs
    for (const [rx, ry, rw] of ROOFS) {
      g.fillStyle = PAL[7]; g.fillRect(rx, ry, rw, H - ry);
      g.fillStyle = PAL[6]; g.fillRect(rx, ry, rw, 2);
      g.fillStyle = s.lamps.some((l) => l.lit && Math.abs(l.x - (rx + rw / 2 - 3)) < 1) ? PAL[8] : "#22222e";
      for (let wx = rx + 3; wx < rx + rw - 3; wx += 6) for (let wy = ry + 6; wy < H; wy += 8) g.fillRect(wx, wy, 2, 3);
    }
    for (const l of s.lamps) draw(g, l.lit ? SPR.lampOn : SPR.lampOff, l.x, l.y);
    for (const b of s.bats) draw(g, Math.floor(t / 8) % 2 ? SPR.bat : SPR.bat2, b.x, b.y + Math.sin(b.ph) * 8);
    if (!(s.hurt && Math.floor(t / 4) % 2)) draw(g, s.p.vx && Math.floor(t / 6) % 2 ? SPR.hero2 : SPR.hero, s.p.x, s.p.y, s.p.face);
  }

  function loop(now) {
    const dt = Math.min(3, (now - last) / 16.67 || 1); last = now; t += dt;
    if (!s.over) step(dt);
    render();
    raf = requestAnimationFrame(loop);
  }

  const down = (e) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", " ", "a", "d", "w"].includes(e.key) && document.activeElement === canvas) e.preventDefault();
    keys[e.key] = true;
  };
  const up = (e) => { keys[e.key] = false; };

  return {
    start() { reset(); onState("play"); canvas.focus(); cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(loop); addEventListener("keydown", down); addEventListener("keyup", up); },
    press(k, on) { keys[k] = on; },
    preview() { reset(); render(); },
    stop() { cancelAnimationFrame(raf); removeEventListener("keydown", down); removeEventListener("keyup", up); },
  };
}
