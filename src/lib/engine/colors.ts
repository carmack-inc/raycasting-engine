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
