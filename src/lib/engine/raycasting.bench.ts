import { bench } from "vitest"
import { findPerpendicularDistance, findRayMY } from "./raycasting"

bench("my dda", () => {
  const x = Math.random() * 24;
  const y = Math.random() * 24;

  findRayMY({
    initialPos: { x: 12 + 0.5, y: 12 + 0.5 },
    rayDirection: { x, y },
  });
});

bench("site dda", () => {
  const x = Math.random() * 24;
  const y = Math.random() * 24;
  findPerpendicularDistance({
    initialPos: { x: 12 + 0.5, y: 12 + 0.5 },
    rayDirection: { x, y },
  });
});
