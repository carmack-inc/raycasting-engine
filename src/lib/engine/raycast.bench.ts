import { bench } from "vitest";
import { ColorOptions } from "./configuration/colors";
import { Vec2 } from "./utils/vector";
import { RayCast } from "./raycast";
import { Settings } from "./configuration/settings";

type DDAFunction = {
  initialPos: Vec2;
  rayDirection: Vec2;
};

const MAP: ColorOptions[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

function myCastRay({ initialPos, rayDirection }: DDAFunction) {
  const pos = { x: initialPos.x, y: initialPos.y };
  const mapPos = { x: Math.floor(pos.x), y: Math.floor(pos.y) };
  const mapNextMove = {
    x: rayDirection.x > 0 ? 1 : -1,
    y: rayDirection.y > 0 ? 1 : -1,
  };
  let sideDist = { x: 0, y: 0 };

  let hit = false;
  while (!hit) {
    sideDist = findSidesVector(rayDirection, pos, mapPos);

    const proportion = {
      x: rayDirection.x == 0 ? Infinity : sideDist.x / rayDirection.x,
      y: rayDirection.y == 0 ? Infinity : sideDist.y / rayDirection.y,
    };

    if (proportion.x == proportion.y) {
      mapPos.x += mapNextMove.x;
      mapPos.y -= mapNextMove.y;
      pos.x += proportion.x * rayDirection.x;
      pos.y -= proportion.y * rayDirection.y;
    } else if (proportion.x < proportion.y) {
      mapPos.x += mapNextMove.x;
      pos.x += proportion.x * rayDirection.x;
      pos.y -= proportion.x * rayDirection.y;
    } else {
      mapPos.y -= mapNextMove.y;
      pos.x += proportion.y * rayDirection.x;
      pos.y -= proportion.y * rayDirection.y;
    }

    hit = hitFunction({ x: mapPos.x, y: mapPos.y });
  }
}

function hitFunction(mapPos: Vec2) {
  if (mapPos.y > MAP.length - 1) return true;
  if (mapPos.x > MAP[0].length - 1) return true;
  if (mapPos.y < 0) return true;
  if (mapPos.x < 0) return true;
  if (MAP[mapPos.y][mapPos.x] > 0) return true;
  return false;
}

function findSidesVector(rayDir: Vec2, pos: Vec2, mapPos: Vec2): Vec2 {
  const sideDist = { x: 0, y: 0 };

  if (rayDir.x > 0) {
    sideDist.x = mapPos.x + 1 - pos.x;
  } else {
    sideDist.x = mapPos.x - pos.x;
  }

  if (rayDir.y > 0) {
    sideDist.y = pos.y - mapPos.y;
  } else {
    sideDist.y = -(mapPos.y + 1 - pos.y);
  }

  return sideDist;
}

bench("my dda", () => {
  const x = Math.random() * 24;
  const y = Math.random() * 24;

  myCastRay({
    initialPos: { x: 12 + 0.5, y: 12 + 0.5 },
    rayDirection: { x, y },
  });
});

bench("site dda", () => {
  const raycast = new RayCast(
    new Settings({
      canvas: {
        size: {
          w: 1,
          h: 1,
        },
      },
      map: MAP,
      minimap: {
        size: 0,
        position: {
          x: 0,
          y: 0,
        },
        zoom: 0,
      },
    })
  );
  const x = Math.random() * 24;
  const y = Math.random() * 24;
  raycast.castRay({
    initialPos: { x: 12 + 0.5, y: 12 + 0.5 },
    rayDirection: { x, y },
  });
});
