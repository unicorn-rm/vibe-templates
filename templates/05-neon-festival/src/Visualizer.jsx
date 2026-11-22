import { useEffect, useRef, useState } from "react";

/*
  A tiny live synth (kick + bass + arpeggio) built with the Web Audio API,
  drawn as a radial spectrum on <canvas>. No audio files needed.
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

  // Draw loop: idle "breathing" when silent, spectrum when playing.
  useEffect(() => {
    const c = canvas.current, g = c.getContext("2d");
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let raf, t = 0;
    const data = new Uint8Array(128);
    const resize = () => { c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; };
    resize(); addEventListener("resize", resize);

    const draw = () => {
      t += 0.016;
      const { width: w, height: h } = c, cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.26;
      g.clearRect(0, 0, w, h);
      if (audio.current) audio.current.analyser.getByteFrequencyData(data);
      const N = 96;
      for (let k = 0; k < N; k++) {
        const a = (k / N) * Math.PI * 2 - Math.PI / 2;
        const v = audio.current ? data[k % 64] / 255 : 0.12 + 0.08 * Math.sin(t * 2 + k / 4);
        const len = r * 0.15 + v * r * 0.95;
        const hue = 300 + (k / N) * 140; // pink → cyan → lime
        g.strokeStyle = `hsl(${hue % 360} 100% 62%)`;
        g.lineWidth = Math.max(2, w / 220); g.lineCap = "round";
        g.beginPath();
        g.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        g.lineTo(cx + Math.cos(a) * (r + len), cy + Math.sin(a) * (r + len));
        g.stroke();
      }
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
