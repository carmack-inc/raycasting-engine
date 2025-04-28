export type ColorOptions = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export class Color{
  static texture: number[][] = this.createTextures();
  

  private static createTextures(): number[][]{
    const buffer = []
    buffer.push(this.createRedSin())
    buffer.push(this.createGreenCircle())
    buffer.push(this.createBlueXor())
    return buffer;
  }

  private static createGreenCircle(): number[]{
    const buffer = []
    for(let y = 0; y < 64; y++){
      for(let x = 0; x < 64; x++){
        const index = (y * 64 + x) * 4
        const radius = Math.sqrt(((x - 32) * (x - 32)) + ((y - 32) * (y - 32)))
        if( Math.floor(radius / 2) % 2 == 0){
          buffer[index] = 0;
          buffer[index + 1] = 255;
          buffer[index + 2] = 0;
          buffer[index + 3] = 255;
        }else {
          buffer[index] = 0;
          buffer[index + 1] = 0;
          buffer[index + 2] = 0;
          buffer[index + 3] = 255;
        }
      }
    }
    return buffer;
  } 

  private static createBlueXor(): number[]{
    const buffer = []
    for(let y = 0; y < 64; y++){
      for(let x = 0; x < 64; x++){
        const index = (y * 64 + x) * 4
          const c = (x ^y^(x*y) & y) * 4 ;
          buffer[index] = 0;
          buffer[index + 1] = 0;
          buffer[index + 2] = c;
          buffer[index + 3] = 255;
      }
    }
    return buffer;
  } 

  private static createRedSin(): number[]{
    const buffer = []
    for(let y = 0; y < 64; y++){
      for(let x = 0; x < 64; x++){
        const index = (y * 64 + x) * 4
          const c = Math.sin(x * y) * 255;
          buffer[index] = c;
          buffer[index + 1] = 0;
          buffer[index + 2] = 0;
          buffer[index + 3] = 255;
      }
    }
    return buffer;
  } 
}

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

export const RGBVector = {
  black: Object.freeze([0, 0, 0]),
  red: Object.freeze([255, 0, 0]),
  white: Object.freeze([255, 255, 255]),
  green: Object.freeze([0, 255, 0]),
  blue: Object.freeze([0, 0, 255]),
  cyan: Object.freeze([0, 255, 255]),
  yellow: Object.freeze([255, 255, 0]),
  magenta: Object.freeze([255, 0, 255]),
};

export const colorsVector: Record<ColorOptions, readonly number[]> = {
  0: RGBVector.black,
  1: RGBVector.red,
  2: RGBVector.green,
  3: RGBVector.blue,
  4: RGBVector.white,
  5: RGBVector.cyan,
  6: RGBVector.magenta,
  7: RGBVector.yellow,
};
