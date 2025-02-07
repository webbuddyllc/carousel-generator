export type PatternType = {
  id: string;
  name: string;
  pattern: string;
  category: "Geometric" | "Abstract" | "Minimal" | "Decorative";
};

export const backgroundPatterns: PatternType[] = [
  {
    id: "none",
    name: "None",
    category: "Minimal",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M0 0h100v100H0z"/></svg>`)}`
  },
  {
    id: "puzzle",
    name: "Puzzle",
    category: "Geometric",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M0 0h100v100H0z"/><path stroke="black" stroke-width="2" fill="none" d="M25 25h50v50H25z M25 25c0-12.5 12.5-12.5 12.5-12.5h25s12.5 0 12.5 12.5M25 75c0 12.5 12.5 12.5 12.5 12.5h25s12.5 0 12.5-12.5"/></svg>`)}`
  },
  {
    id: "waves",
    name: "Waves",
    category: "Abstract",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M0 0h100v100H0z"/><path stroke="black" stroke-width="2" fill="none" d="M0 50c25-20 25 20 50 0s25-20 50 0"/></svg>`)}`
  },
  {
    id: "dots",
    name: "Dots",
    category: "Minimal",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M0 0h100v100H0z"/><circle cx="20" cy="20" r="2" fill="black"/><circle cx="50" cy="20" r="2" fill="black"/><circle cx="80" cy="20" r="2" fill="black"/><circle cx="20" cy="50" r="2" fill="black"/><circle cx="50" cy="50" r="2" fill="black"/><circle cx="80" cy="50" r="2" fill="black"/><circle cx="20" cy="80" r="2" fill="black"/><circle cx="50" cy="80" r="2" fill="black"/><circle cx="80" cy="80" r="2" fill="black"/></svg>`)}`
  },
  {
    id: "crosses",
    name: "Crosses",
    category: "Minimal",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M0 0h100v100H0z"/><path stroke="black" stroke-width="2" d="M35 35l30 30M65 35l-30 30"/></svg>`)}`
  },
  {
    id: "grid",
    name: "Grid",
    category: "Geometric",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M0 0h100v100H0z"/><path stroke="black" stroke-width="1" d="M0 0v100m10-100v100m10-100v100m10-100v100m10-100v100m10-100v100m10-100v100m10-100v100m10-100v100m10-100v100m10-100v100M0 0h100M0 10h100M0 20h100M0 30h100M0 40h100M0 50h100M0 60h100M0 70h100M0 80h100M0 90h100M0 100h100"/></svg>`)}`
  },
  {
    id: "triangles",
    name: "Triangles",
    category: "Geometric",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M0 0h100v100H0z"/><path fill="black" d="M50 20l15 25H35z M20 60l15 25H5z M80 60l15 25H65z"/></svg>`)}`
  },
  {
    id: "zigzag",
    name: "Zigzag",
    category: "Abstract",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M0 0h100v100H0z"/><path stroke="black" stroke-width="2" fill="none" d="M0 25l25 25-25 25M50 25l25 25-25 25"/></svg>`)}`
  },
  {
    id: "checkers",
    name: "Checkers",
    category: "Geometric",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M0 0h100v100H0z"/><path fill="black" d="M0 0h50v50H0zM50 50h50v50H50z"/></svg>`)}`
  },
  {
    id: "circles",
    name: "Circles",
    category: "Decorative",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M0 0h100v100H0z"/><circle cx="50" cy="50" r="20" fill="none" stroke="black" stroke-width="2"/><circle cx="50" cy="50" r="10" fill="none" stroke="black" stroke-width="2"/></svg>`)}`
  },
  {
    id: "stripes",
    name: "Stripes",
    category: "Abstract",
    pattern: `data:image/svg+xml,${encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M0 0h100v100H0z"/><path fill="black" d="M0 0l100 100H80L0 20zM100 0L0 100h20L100 80z"/></svg>`)}`
  }
]; 