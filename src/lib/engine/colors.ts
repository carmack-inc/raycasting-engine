export type ColorOptions = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const RGB = {
  black: "rgb(0 0 0)",
  red: "rgb(255 0 0)",
  white: "rgb(255 255 255)",
  green: "rgb(0 255 0)",
  blue: "rgb(0 0 255)",
  cyan: "rgb(0 255 255)",
  yellow: "rgb(255 255 0)",
  magenta: "rgb(255 0 255)",
};

export const colors: Record<ColorOptions, string> = {
  0: RGB.black,
  1: RGB.red,
  2: RGB.green,
  3: RGB.blue,
  4: RGB.white,
  5: RGB.cyan,
  6: RGB.magenta,
  7: RGB.yellow,
};

export const RBGVector = {
  black: [0, 0, 0],
  red: [255, 0, 0],
  white: [255, 255, 255],
  green: [0, 255, 0],
  blue: [0, 0, 255],
  cyan: [0, 255, 255],
  yellow: [255, 255, 0],
  magenta: [255, 0, 255],
};

export const colorsVector: Record<ColorOptions, number[]> = {
  0: RBGVector.black,
  1: RBGVector.red,
  2: RBGVector.green,
  3: RBGVector.blue,
  4: RBGVector.white,
  5: RBGVector.cyan,
  6: RBGVector.magenta,
  7: RBGVector.yellow,
};
