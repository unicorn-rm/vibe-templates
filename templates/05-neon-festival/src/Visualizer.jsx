import { useEffect, useRef, useState } from "react";

/*
  A tiny live synth (kick + bass + arpeggio) built with the Web Audio API,
  drawn as a two-ink halftone on <canvas>. No audio files needed.
  Swap `playLoop` for an <audio> element + MediaElementSource to visualise a real track.
*/
const BPM = 124;
const ARP = [0, 7, 12, 15, 19, 15, 12, 7];        // semitone offsets
const BASS = [0, 0, -4, -4, -2, -2, -7, -5];      // one note per beat
const ROOT = 220;                                  // A3
const hz = (st) => ROOT * 2 ** (st / 12);

function playLoop(ctx, out) {
  const step = 60 / BPM / 2; // 8th notes
  let next = ctx.currentTime + 0.05, i = 0;

  const voice = (type, f, t, len, gain, cutoff) => {
    const o = ctx.createOscillator(), g = ctx.createGain(), lp = ctx.createBiquadFilter();
    o.type = type; o.frequency.value = f;
    lp.type = "lowpass"; lp.frequency.value = cutoff;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t + len);
    o.connect(lp).connect(g).connect(out);
    o.start(t); o.stop(t + len + 0.05);
  };
  const kick = (t) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.25);
    g.gain.setValueAtTime(0.9, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    o.connect(g).connect(out); o.start(t); o.stop(t + 0.32);
  };

  const timer = setInterval(() => {
    while (next < ctx.currentTime + 0.12) {
      const beat = Math.floor(i / 2) % 8;
      if (i % 2 === 0) { kick(next); voice("sawtooth", hz(BASS[beat] - 24), next, step * 1.8, 0.22, 600); }
      voice("square", hz(ARP[i % 8] + (Math.floor(i / 16) % 2 ? 3 : 0)), next, step * 0.9, 0.07, 2400 + 1600 * Math.sin(i / 6));
      next += step; i++;
    }
  }, 25);
  return () => clearInterval(timer);
}

export default function Visualizer({ labels }) {
  const canvas = useRef(null);
  const audio = useRef(null);
  const [on, setOn] = useState(false);

  // Draw loop: a two-ink halftone grid. Dot size follows the spectrum;
  // the blue plate is printed slightly off-register, like a real riso print.
  useEffect(() => {
    const c = canvas.current, g = c.getContext("2d");
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const ink = getComputedStyle(c);
    const PINK = ink.getPropertyValue("--pink").trim() || "#ff48b0";
    const BLUE = ink.getPropertyValue("--blue").trim() || "#0078bf";
    let raf, t = 0;
    const data = new Uint8Array(128);
    const resize = () => { c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; };
    resize(); addEventListener("resize", resize);

    const plate = (color, dx, dy, phase) => {
      const { width: w, height: h } = c, cols = 22, cell = w / cols, rows = Math.floor(h / cell);
      g.fillStyle = color;
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const cx = x * cell + cell / 2, cy = y * cell + cell / 2;
        const dist = Math.hypot(cx - w / 2, cy - h / 2) / (w / 2);
        let v;
        if (audio.current) v = data[Math.floor(Math.abs(x - cols / 2) * 2.6 + phase)] / 255 * (1.15 - dist * .55);
        else v = .25 + .2 * Math.sin(t * 1.6 - dist * 6 + phase);
        const r = Math.max(0, Math.min(1, v)) * cell * .52;
        if (r > .6) { g.beginPath(); g.arc(cx + dx * dpr, cy + dy * dpr, r, 0, Math.PI * 2); g.fill(); }
      }
    };
    const draw = () => {
      t += 0.016;
      if (audio.current) audio.current.analyser.getByteFrequencyData(data);
      g.clearRect(0, 0, c.width, c.height);
      g.globalCompositeOperation = "source-over"; plate(PINK, 0, 0, 0);
      g.globalCompositeOperation = "multiply"; plate(BLUE, 3, 2, 4);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);

  useEffect(() => () => audio.current?.stop(), []);

  const toggle = async () => {
    if (audio.current) { audio.current.stop(); audio.current = null; setOn(false); return; }
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const master = ctx.createGain(); master.gain.value = 0.5;
    const analyser = ctx.createAnalyser(); analyser.fftSize = 256; analyser.smoothingTimeConstant = 0.8;
    master.connect(analyser).connect(ctx.destination);
    const stopLoop = playLoop(ctx, master);
    audio.current = { analyser, stop: () => { stopLoop(); ctx.close(); } };
    setOn(true);
  };

  return (
    <div className="viz">
      <canvas ref={canvas} className="viz__canvas" aria-hidden="true" />
      <button className={`viz__btn${on ? " is-on" : ""}`} onClick={toggle} aria-pressed={on}>
        <span className="viz__icon" aria-hidden="true">{on ? "■" : "▶"}</span>
        <span>{on ? labels.stop : labels.play}</span>
      </button>
    </div>
  );
}
