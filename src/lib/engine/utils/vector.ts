export type Vec2 = {
  x: number;
  y: number;
};

export class Vector {
  static lengthVector(vec: Vec2): number {
    return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
  }

  static normalizeVector(vec: Vec2): Vec2 {
    const length = this.lengthVector(vec);
    if (length == 0) return vec;
    return { x: vec.x / length, y: vec.y / length };
  }

  static findPerpVector(vec: Vec2): Vec2 {
    // always the left vector
    return { x: vec.y == 0 ? 0 : -vec.y, y: vec.x };
  }

  static applyRotateVector(vec: Vec2, radians: number): Vec2{
    const resultVec = { x: vec.x, y: vec.y };
    resultVec.x = vec.x * Math.cos(radians) - vec.y * Math.sin(radians);
    resultVec.y = vec.x * Math.sin(radians) + vec.y * Math.cos(radians);
    return resultVec
  }
}
