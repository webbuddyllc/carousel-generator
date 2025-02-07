export type PatternType = {
  id: string;
  name: string;
  pattern: string; // SVG pattern
  category: "Geometric" | "Abstract" | "Minimal" | "Decorative";
};

export const backgroundPatterns: PatternType[] = [
  {
    id: "puzzle",
    name: "Puzzle",
    category: "Geometric",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 0h100v100H0z"/><path fill="none" stroke="rgba(255,255,255,0.2)" d="M30 30h40v40H30z M30 30c0-10 10-10 10-10h20s10 0 10 10M30 70c0 10 10 10 10 10h20s10 0 10-10"/></svg>`)}`
  },
  {
    id: "waves",
    name: "Waves",
    category: "Abstract",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 0h100v100H0z"/><path fill="none" stroke="rgba(255,255,255,0.2)" d="M0 50c25-20 25 20 50 0s25-20 50 0"/></svg>`)}`
  },
  {
    id: "dots",
    name: "Dots",
    category: "Minimal",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 0h100v100H0z"/><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.2)"/></svg>`)}`
  },
  {
    id: "grid",
    name: "Grid",
    category: "Geometric",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 0h100v100H0z"/><path fill="none" stroke="rgba(255,255,255,0.2)" d="M25 0v100M50 0v100M75 0v100M0 25h100M0 50h100M0 75h100"/></svg>`)}`
  },
  {
    id: "triangles",
    name: "Triangles",
    category: "Geometric",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 0h100v100H0z"/><path fill="none" stroke="rgba(255,255,255,0.2)" d="M50 25l25 43.3h-50L50 25z"/></svg>`)}`
  },
  {
    id: "zigzag",
    name: "Zigzag",
    category: "Abstract",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 0h100v100H0z"/><path fill="none" stroke="rgba(255,255,255,0.2)" d="M0 50l25-25 25 25 25-25 25 25"/></svg>`)}`
  },
  {
    id: "crosses",
    name: "Crosses",
    category: "Minimal",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 0h100v100H0z"/><path fill="none" stroke="rgba(255,255,255,0.2)" d="M45 45l10 10M45 55l10-10"/></svg>`)}`
  },
  {
    id: "circles",
    name: "Circles",
    category: "Decorative",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 0h100v100H0z"/><circle cx="50" cy="50" r="20" fill="none" stroke="rgba(255,255,255,0.2)"/></svg>`)}`
  }
]; 