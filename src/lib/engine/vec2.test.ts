import { describe, expect, test } from "vitest";
import { getPerpVec, lengthVector, normalizeVector, Vec2 } from "./vec2";

describe("Vector length function", () => {
  test("if the vector length is correct for non-zero axes", () => {
    expect(lengthVector({ x: 3, y: 4 })).toBe(5);
    expect(lengthVector({ x: -3, y: -4 })).toBe(5);

    const vec: Vec2 = { x: 3, y: 4 };
    const rand = Math.random();
    if (rand > 0.5) vec.x * -1;
    else vec.y * -1;
    expect(lengthVector(vec)).toBe(5);
  });

  test("if the vector length is zero for one zero axis", () => {
    expect(lengthVector({ x: 0, y: 1 })).toBe(1);
    expect(lengthVector({ x: 1, y: 0 })).toBe(1);
  });

  test("if the vector length is zero for zero vector", () => {
    expect(lengthVector({ x: 0, y: 0 })).toBe(0);
  });
});

describe("Normalize vector function", () => {
  test("if the vector magnitude is one for non-zero axes", () => {
    const positiveAxesVec = { x: 8, y: 23 };
    const normalizedPositive = normalizeVector(positiveAxesVec);
    expect(lengthVector(normalizedPositive)).toBeCloseTo(1);

    const negativeAxesVec = { x: -9, y: -14 };
    const normalizedNegative = normalizeVector(negativeAxesVec);

    expect(lengthVector(normalizedNegative)).toBeCloseTo(1);

    const mixedAxesVec: Vec2 = { x: 10, y: 54 };
    const rand = Math.random();
    if (rand > 0.5) mixedAxesVec.x * -1;
    else mixedAxesVec.y * -1;
    const normalizedMixed = normalizeVector(mixedAxesVec);
    expect(lengthVector(normalizedMixed)).toBeCloseTo(1);
  });

  test("if the vector magnitude and axis value are correct for one zero axis", () => {
    const axisValue = Math.random() * 10;
    const normalizedZeroYAxis = normalizeVector({ x: axisValue, y: 0 });
    const normalizedZeroXAxis = normalizeVector({ x: 0, y: axisValue });
    expect(normalizedZeroYAxis.x).toBe(1);
    expect(normalizedZeroXAxis.y).toBe(1);
    expect(lengthVector(normalizedZeroYAxis)).toBeCloseTo(1);
    expect(lengthVector(normalizedZeroXAxis)).toBeCloseTo(1);
  });

  test("if the vector magnitude is zero for zero vector", () => {
    const normalizedZeroAxes = normalizeVector({ x: 0, y: 0 });
    expect(normalizedZeroAxes.x).toBe(0);
    expect(normalizedZeroAxes.y).toBe(0);
    expect(lengthVector(normalizedZeroAxes)).toBeCloseTo(0);
  });
});

describe("Perpendicular vector function", () => {
  test("if the perpendicular vector is corret for non-zero vector", () => {
    expect(getPerpVec({ x: 3, y: 4 })).toStrictEqual({ x: -4, y: 3 });
    expect(getPerpVec({ x: -3, y: -4 })).toStrictEqual({ x: 4, y: -3 });
    expect(getPerpVec({ x: 0, y: -4 })).toStrictEqual({ x: 4, y: 0 });
    expect(getPerpVec({ x: -4, y: 0 })).toStrictEqual({ x: 0, y: -4 });
  });

  test("if the perpendicular vector is corret for zero vector", () => {
    expect(getPerpVec({ x: 0, y: 0 })).toStrictEqual({ x: 0, y: 0 });
  });
});
