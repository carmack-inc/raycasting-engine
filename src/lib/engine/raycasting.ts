import { CANVAS_HEIGHT, MAP } from "./settings";
import { Vec2 } from "./vec2";

type DDAFunction = {
  initialPos: Vec2;
  rayDirection: Vec2;
};

export function findPerpendicularDistance({
  initialPos,
  rayDirection,
}: DDAFunction) {
  const pos = { x: initialPos.x, y: initialPos.y };
  const mapPos = { x: Math.floor(pos.x), y: Math.floor(pos.y) };
  let side: "x" | "y" = "x";

  if (hitFunction(mapPos)) {
    return {
      perpDist: 0,
      mapHit: { x: mapPos.x, y: mapPos.y },
      side,
    };
  }

  const deltaDist = {
    x: rayDirection.x == 0 ? Infinity : Math.abs(1 / rayDirection.x),
    y: rayDirection.y == 0 ? Infinity : Math.abs(1 / rayDirection.y),
  };

  const sideDist = findSidesSize(rayDirection, pos, mapPos);
  sideDist.x = sideDist.x * deltaDist.x;
  sideDist.y = sideDist.y * deltaDist.y;

  let hit = false;

  const step = {
    x: rayDirection.x > 0 ? 1 : -1,
    y: rayDirection.y > 0 ? -1 : 1, // NEGATIVE Y AXIS IN CANVAS
  };

  while (hit == false) {
    if (sideDist.x < sideDist.y) {
      sideDist.x += deltaDist.x;
      mapPos.x += step.x;
      side = "x";
    } else {
      sideDist.y += deltaDist.y;
      mapPos.y += step.y;
      side = "y";
    }

    hit = hitFunction(mapPos);
  }

  if (side == "x")
    return {
      perpDist: sideDist.x - deltaDist.x,
      mapHit: { x: mapPos.x, y: mapPos.y },
      side: "x",
    };

  return {
    perpDist: sideDist.y - deltaDist.y,
    mapHit: { x: mapPos.x, y: mapPos.y },
    side: "y",
  };
}

export function hitFunction(mapPos: Vec2) {
  if (mapPos.y > MAP.length - 1) return true;
  if (mapPos.x > MAP[0].length - 1) return true;
  if (mapPos.y < 0) return true;
  if (mapPos.x < 0) return true;
  if (MAP[mapPos.y][mapPos.x] > 0) return true;
  return false;
}

export function findSidesSize(rayDir: Vec2, pos: Vec2, mapPos: Vec2): Vec2 {
  const sideDist = { x: 0, y: 0 };

  if (rayDir.x > 0) {
    sideDist.x = mapPos.x + 1 - pos.x;
  } else {
    sideDist.x = pos.x - mapPos.x;
  }

  if (rayDir.y > 0) {
    sideDist.y = pos.y - mapPos.y;
  } else {
    sideDist.y = mapPos.y + 1 - pos.y;
  }

  return sideDist;
}

export function calculteLineHeight(column: number, perpDist: number) {
  const lineHeight = Math.floor(CANVAS_HEIGHT / perpDist);
  const lineStart = -lineHeight / 2 + CANVAS_HEIGHT / 2;
  const lineEnd = lineHeight / 2 + CANVAS_HEIGHT / 2;

  return {
    lineStart: { x: column, y: lineStart < 0 ? 0 : lineStart },
    lineEnd: {
      x: column,
      y: lineEnd >= CANVAS_HEIGHT ? CANVAS_HEIGHT - 1 : lineEnd,
    },
  };
}
//---------------------------------------------------

export function findRayMY({ initialPos, rayDirection }: DDAFunction) {
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

export function findSidesVector(rayDir: Vec2, pos: Vec2, mapPos: Vec2): Vec2 {
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
