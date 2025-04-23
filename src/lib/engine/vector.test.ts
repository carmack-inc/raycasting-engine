import { describe, expect, test } from "vitest";
import { Vector } from "./vector";

describe("Vector length function", () => {
  test("if the vector length is correct for non-zero axes", () => {
    expect(Vector.lengthVector({ x: 3, y: 4 })).toBe(5);
    expect(Vector.lengthVector({ x: -3, y: -4 })).toBe(5);
    expect(Vector.lengthVector({ x: 3, y: -4 })).toBe(5);
    expect(Vector.lengthVector({ x: -3, y: 4 })).toBe(5);
  });

  test("if the vector length is zero for one zero axis", () => {
    expect(Vector.lengthVector({ x: 0, y: 1 })).toBe(1);
    expect(Vector.lengthVector({ x: 1, y: 0 })).toBe(1);
  });

  test("if the vector length is zero for zero vector", () => {
    expect(Vector.lengthVector({ x: 0, y: 0 })).toBe(0);
  });
});

describe("Normalize vector function", () => {
  test("if the vector magnitude is one for non-zero axes", () => {
    const positiveAxesVec = { x: 8, y: 23 };
    const normalizedPositive = Vector.normalizeVector(positiveAxesVec);
    expect(Vector.lengthVector(normalizedPositive)).toBeCloseTo(1);

    const negativeAxesVec = { x: -9, y: -14 };
    const normalizedNegative = Vector.normalizeVector(negativeAxesVec);
    expect(Vector.lengthVector(normalizedNegative)).toBeCloseTo(1);

    const mixedAxesVec1 = { x: 10, y: -54 };
    const normalizedMixed1 = Vector.normalizeVector(mixedAxesVec1);
    expect(Vector.lengthVector(normalizedMixed1)).toBeCloseTo(1);

    const mixedAxesVec2 = { x: -10, y: 54 };
    const normalizedMixed2 = Vector.normalizeVector(mixedAxesVec2);
    expect(Vector.lengthVector(normalizedMixed2)).toBeCloseTo(1);
  });

  test("if the vector magnitude and axis value are correct for one zero axis", () => {
    const axisValue = Math.random() * 10;
    const normalizedZeroYAxis = Vector.normalizeVector({ x: 10, y: 0 });
    const normalizedZeroXAxis = Vector.normalizeVector({ x: 0, y: 10 });
    expect(normalizedZeroYAxis.x).toBe(1);
    expect(normalizedZeroXAxis.y).toBe(1);
    expect(Vector.lengthVector(normalizedZeroYAxis)).toBeCloseTo(1);
    expect(Vector.lengthVector(normalizedZeroXAxis)).toBeCloseTo(1);
  });

  test("if the vector magnitude is zero for zero vector", () => {
    const normalizedZeroAxes = Vector.normalizeVector({ x: 0, y: 0 });
    expect(normalizedZeroAxes.x).toBe(0);
    expect(normalizedZeroAxes.y).toBe(0);
    expect(Vector.lengthVector(normalizedZeroAxes)).toBeCloseTo(0);
  });
});

describe("Perpendicular vector function", () => {
  test("if the perpendicular vector is corret for non-zero vector", () => {
    expect(Vector.findPerpVector({ x: 3, y: 4 })).toStrictEqual({
      x: -4,
      y: 3,
    });
    expect(Vector.findPerpVector({ x: -3, y: -4 })).toStrictEqual({
      x: 4,
      y: -3,
    });
    expect(Vector.findPerpVector({ x: 0, y: -4 })).toStrictEqual({
      x: 4,
      y: 0,
    });
    expect(Vector.findPerpVector({ x: -4, y: 0 })).toStrictEqual({
      x: 0,
      y: -4,
    });
  });

  test("if the perpendicular vector is corret for zero vector", () => {
    expect(Vector.findPerpVector({ x: 0, y: 0 })).toStrictEqual({ x: 0, y: 0 });
  });
});
