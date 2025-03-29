import { bench } from "vitest";
import { findRayMY, findPerpendicularDistance } from "./raycasting";
import { Vec2 } from "./vec2";
import { MAP } from "./settings";

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
