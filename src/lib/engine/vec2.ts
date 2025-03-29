export type Vec2 = {
  x: number;
  y: number;
};
export function lengthVector(vec: Vec2) {
  return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
}

export function normalizeVector(vec: Vec2) {
  const length = lengthVector(vec);
  if (length == 0) return vec;
  return { x: vec.x / length, y: vec.y / length };
}

export function getPerpVec(vec: Vec2) {
  // always the left vector
  return { x: vec.y == 0 ? 0 : -vec.y, y: vec.x };
}
