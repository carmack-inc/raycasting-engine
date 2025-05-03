import { describe, expect, it } from "vitest";
import { Vector } from "./vector";

describe("Function lengthVector", () => {
  it("should calculate the correct vector length for non-zero axes vector", () => {
    expect(Vector.lengthVector({ x: 3, y: 4 })).toBe(5);
    expect(Vector.lengthVector({ x: -3, y: -4 })).toBe(5);
    expect(Vector.lengthVector({ x: 3, y: -4 })).toBe(5);
    expect(Vector.lengthVector({ x: -3, y: 4 })).toBe(5);
  });

  it("should calculate the correct vector length for one axis zero vector", () => {
    expect(Vector.lengthVector({ x: 0, y: 1 })).toBe(1);
    expect(Vector.lengthVector({ x: 1, y: 0 })).toBe(1);
  });

  it("should return zero for a zero vector", () => {
    expect(Vector.lengthVector({ x: 0, y: 0 })).toBe(0);
  });
});

describe("Function normalizeVector", () => {
  it("should return a vector with magnitude equals one for a vector with non-zero axes vector", () => {
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

  it("should return a vector with magnitude equals one for a vector with one zero axis vector", () => {
    const axisValue = Math.random() * 10;
    const normalizedZeroYAxis = Vector.normalizeVector({ x: 10, y: 0 });
    const normalizedZeroXAxis = Vector.normalizeVector({ x: 0, y: 10 });
    expect(normalizedZeroYAxis.x).toBe(1);
    expect(normalizedZeroXAxis.y).toBe(1);
    expect(Vector.lengthVector(normalizedZeroYAxis)).toBeCloseTo(1);
    expect(Vector.lengthVector(normalizedZeroXAxis)).toBeCloseTo(1);
  });

  it("should return a vector with magnitude equals zero for zero vector", () => {
    const normalizedZeroAxes = Vector.normalizeVector({ x: 0, y: 0 });
    expect(normalizedZeroAxes.x).toBe(0);
    expect(normalizedZeroAxes.y).toBe(0);
    expect(Vector.lengthVector(normalizedZeroAxes)).toBeCloseTo(0);
  });
});

describe("Perpendicular vector function", () => {
  it("should calculate the correct perpendicular vector for non-zero vector", () => {
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

  it("should calculate the correct perpendicular vector for for zero vector", () => {
    expect(Vector.findPerpVector({ x: 0, y: 0 })).toStrictEqual({ x: 0, y: 0 });
  });
});

describe("Function applyRotateVector", () => {
  it("should apply correct rotate for a non-zero vector", () => {
    const rotatedVector90degree = Vector.applyRotateVector({ x: 1, y: 0 }, Math.PI/2);
    expect(rotatedVector90degree.x).toBeCloseTo(0);
    expect(rotatedVector90degree.y).toBeCloseTo(1);

    const rotatedVector180degree = Vector.applyRotateVector({ x: 1, y: 0 }, Math.PI);
    expect(rotatedVector180degree.x).toBeCloseTo(-1);
    expect(rotatedVector180degree.y).toBeCloseTo(0);
  });

  it("should apply correct rotate for a zero vector", () => {
    const rotatedVector90degree = Vector.applyRotateVector({ x: 0, y: 0 }, Math.PI/2);
    expect(rotatedVector90degree.x).toBeCloseTo(0);
    expect(rotatedVector90degree.y).toBeCloseTo(0);

    const rotatedVector180degree = Vector.applyRotateVector({ x: 0, y: 0 }, Math.PI);
    expect(rotatedVector180degree.x).toBeCloseTo(0);
    expect(rotatedVector180degree.y).toBeCloseTo(0);
  });
});
