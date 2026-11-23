import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { LINES, STARS, toVec } from "./sky.js";

/* A celestial sphere drawn like a star-atlas plate: RA/Dec grid, stars sized by magnitude,
   constellation stick figures. Returns { focus(id), dispose() }. */
export function mountSphere(canvas, { reduced = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(...toVec(5.6, 20, 3.4));

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.enablePan = false;
  controls.minDistance = 2.4; controls.maxDistance = 5;
  controls.autoRotate = !reduced; controls.autoRotateSpeed = 0.35;

  const css = getComputedStyle(canvas);
  const GRID = new THREE.Color(css.getPropertyValue("--grid").trim() || "#7d9bd0");
  const INK = new THREE.Color("#ffffff");
  const HI = new THREE.Color(css.getPropertyValue("--gold").trim() || "#f3d27a");

  // grid: meridians every 2h, parallels every 30°
  const gridMat = new THREE.LineBasicMaterial({ color: GRID, transparent: true, opacity: 0.45 });
  const eqMat = new THREE.LineBasicMaterial({ color: GRID, transparent: true, opacity: 0.95 });
  const line = (pts, mat) => scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts.map((p) => new THREE.Vector3(...p))), mat));
  for (let h = 0; h < 24; h += 2) line(Array.from({ length: 61 }, (_, i) => toVec(h, -90 + i * 3)), gridMat);
  for (let d = -60; d <= 60; d += 30) line(Array.from({ length: 97 }, (_, i) => toVec(i / 4, d)), d === 0 ? eqMat : gridMat);

  // round star sprite (points are square by default)
  const dot = (() => {
    const c = document.createElement("canvas"); c.width = c.height = 64;
    const g = c.getContext("2d"); g.fillStyle = "#fff"; g.beginPath(); g.arc(32, 32, 30, 0, Math.PI * 2); g.fill();
    return new THREE.CanvasTexture(c);
  })();
  const starMat = (size, opacity = 1) => new THREE.PointsMaterial({ color: INK, size, map: dot, alphaTest: 0.5, transparent: opacity < 1, opacity });

  // faint background stars from a seeded random (same sky every load)
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const bg = [];
  for (let i = 0; i < 1400; i++) bg.push(...toVec(rnd() * 24, Math.asin(rnd() * 2 - 1) * 57.3, 1.002));
  const bgGeo = new THREE.BufferGeometry(); bgGeo.setAttribute("position", new THREE.Float32BufferAttribute(bg, 3));
  scene.add(new THREE.Points(bgGeo, starMat(0.014, 0.7)));

  // named stars in three magnitude buckets
  const buckets = [[], [], []];
  Object.values(STARS).flat().forEach(([, ra, dec, mag]) => buckets[mag < 1 ? 0 : mag < 2.3 ? 1 : 2].push(...toVec(ra, dec, 1.004)));
  [0.07, 0.05, 0.035].forEach((size, i) => {
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(buckets[i], 3));
    scene.add(new THREE.Points(g, starMat(size)));
  });

  // constellation figures
  const figures = {};
  for (const [id, pairs] of Object.entries(LINES)) {
    const s = STARS[id], pts = [];
    pairs.forEach(([a, b]) => pts.push(...toVec(s[a][1], s[a][2], 1.003), ...toVec(s[b][1], s[b][2], 1.003)));
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    const mat = new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.85 });
    scene.add(new THREE.LineSegments(g, mat));
    figures[id] = mat;
  }

  // a dark inner shell so the far side of the sphere reads as "behind"
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(0.995, 48, 32), new THREE.MeshBasicMaterial({ color: 0x14274a, transparent: true, opacity: 0.55, side: THREE.FrontSide })));

  // smooth camera turn towards a constellation
  let tween = null;
  function focus(id) {
    Object.entries(figures).forEach(([k, m]) => m.color.copy(k === id ? HI : INK));
    const s = STARS[id];
    const c = s.reduce((v, [, ra, dec]) => v.add(new THREE.Vector3(...toVec(ra, dec))), new THREE.Vector3()).normalize();
    const from = camera.position.clone(), to = c.multiplyScalar(camera.position.length());
    controls.autoRotate = false;
    tween = { from, to, t0: performance.now(), dur: reduced ? 1 : 1100 };
  }

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  resize(); addEventListener("resize", resize);

  let raf;
  const loop = (now) => {
    if (tween) {
      const k = Math.min(1, (now - tween.t0) / tween.dur), e = k < .5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
      camera.position.copy(tween.from).lerp(tween.to, e).setLength(tween.from.length());
      if (k >= 1) tween = null;
    }
    controls.update(); renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return { focus, dispose() { cancelAnimationFrame(raf); removeEventListener("resize", resize); renderer.dispose(); } };
}
