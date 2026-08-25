// Shared "mid-century math textbook" palette: muted, desaturated print colors
// on a warm cream paper ground, instead of bright saturated digital-render
// hues. Reuse these anywhere a color needs to stay consistent with that mood
// (fog/background, materials, lights) rather than picking a new hex ad hoc.
export const PALETTE = {
  paper: '#f8e0ad',   // dominant neutral - warm cream paper background/fog
  ink: '#2a2018',     // secondary neutral - warm near-black for grid lines/shadow tone
  brick: '#bd4a30',   // accent - muted brick red/terracotta
  slate: '#3d5c74',   // accent - dusty desaturated navy/steel blue
  ochre: '#d3a233',   // accent - muted mustard/ochre gold
  sage: '#7c8a6a',    // accent - muted sage green
  clay: '#d05135',    // accent - header active-link's brick, ~10% brighter, for a small persistent UI accent (world-axes gizmo)

  // Deliberately outside the muted system: the one saturated "signal" color,
  // reserved for the sphere-turns-red beat (Teorema poster reference) - it
  // only reads as a surprise/focal accent because everything else stays flat.
  signalRed: '#cc1b1b',
};
