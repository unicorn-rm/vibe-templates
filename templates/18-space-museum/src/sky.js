// Real star positions (J2000, approximate): [name, RA hours, Dec degrees, magnitude]
export const STARS = {
  orion: [["Betelgeuse", 5.92, 7.41, 0.5], ["Bellatrix", 5.42, 6.35, 1.6], ["Mintaka", 5.53, -0.3, 2.2], ["Alnilam", 5.6, -1.2, 1.7], ["Alnitak", 5.68, -1.94, 1.8], ["Saiph", 5.8, -9.67, 2.1], ["Rigel", 5.24, -8.2, 0.1]],
  ursa: [["Dubhe", 11.06, 61.75, 1.8], ["Merak", 11.03, 56.38, 2.4], ["Phecda", 11.9, 53.69, 2.4], ["Megrez", 12.26, 57.03, 3.3], ["Alioth", 12.9, 55.96, 1.8], ["Mizar", 13.4, 54.93, 2.2], ["Alkaid", 13.79, 49.31, 1.9]],
  cassiopeia: [["Caph", 0.15, 59.15, 2.3], ["Schedar", 0.68, 56.54, 2.2], ["Navi", 0.95, 60.72, 2.5], ["Ruchbah", 1.43, 60.24, 2.7], ["Segin", 1.91, 63.67, 3.4]],
  cygnus: [["Deneb", 20.69, 45.28, 1.3], ["Sadr", 20.37, 40.26, 2.2], ["Albireo", 19.51, 27.96, 3.1], ["Gienah", 20.77, 33.97, 2.5], ["Fawaris", 19.75, 45.13, 2.9]],
  polaris: [["Polaris", 2.53, 89.26, 2.0]],
};

// Stick figures: index pairs into each constellation's star list
export const LINES = {
  orion: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [0, 4]],
  ursa: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]],
  cassiopeia: [[0, 1], [1, 2], [2, 3], [3, 4]],
  cygnus: [[0, 1], [1, 2], [3, 1], [1, 4]],
  polaris: [],
};

// RA/Dec → point on a unit sphere (Y up = celestial north)
export function toVec(raH, decD, r = 1) {
  const ra = (raH / 24) * Math.PI * 2, dec = (decD * Math.PI) / 180;
  return [r * Math.cos(dec) * Math.cos(ra), r * Math.sin(dec), -r * Math.cos(dec) * Math.sin(ra)];
}

// Days since a known new moon → phase 0..1 (0 new, .5 full)
export function moonPhase(date = new Date()) {
  const synodic = 29.530588853;
  const ref = Date.UTC(2000, 0, 6, 18, 14);
  const days = (date.getTime() - ref) / 864e5;
  return (((days % synodic) + synodic) % synodic) / synodic;
}
