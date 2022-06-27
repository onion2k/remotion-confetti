declare module 'remotion-confetti/confetti' {
  import { iConfettiOptions } from 'remotion-confetti/interfaces';
  export const confettiCannon: (canvas: HTMLCanvasElement) => {
      fire: (options: iConfettiOptions) => any;
      frame: (frame: number) => void;
  };

}
declare module 'remotion-confetti/index' {
  /// <reference types="react" />
  import { iConfettiOptions } from 'remotion-confetti/interfaces';
  export const Confetti: (confettiConfig: Omit<iConfettiOptions, 'width' | 'height'>) => JSX.Element;

}
declare module 'remotion-confetti/interfaces' {
  export interface iColor {
      r: number;
      g: number;
      b: number;
  }
  export interface iRandomPhysics {
      angle: number;
      color: iColor;
      decay: number;
      drift: number;
      gravity: number;
      i: number;
      scalar: number;
      shape: string;
      spread: number;
      startVelocity: number;
      ticks: number;
      x: number;
      y: number;
  }
  export interface iFetti {
      angle2D: number;
      color: iColor;
      decay: number;
      drift: number;
      gravity: number;
      ovalScalar: number;
      random: number;
      scalar: number;
      shape: string;
      tick: number;
      tiltAngle: number;
      tiltCos: number;
      tiltSin: number;
      totalTicks: number;
      velocity: number;
      wobble: number;
      wobbleSpeed: number;
      wobbleX: number;
      wobbleY: number;
      x: number;
      y: number;
  }
  export interface iConfettiOptions {
      angle?: number;
      colors?: string[];
      decay?: number;
      drift?: number;
      gravity?: number;
      height: number;
      particleCount?: number;
      scalar?: number;
      shapes?: string[];
      spread?: number;
      startVelocity?: number;
      ticks?: number;
      width: number;
      x: number;
      y: number;
  }

}
declare module 'remotion-confetti/utils' {
  import { iConfettiOptions } from 'remotion-confetti/interfaces';
  export const convert: (val: string | number, transform: ((value: any) => any) | undefined) => any;
  export const isOk: (val: string | number) => boolean;
  export const prop: (options: {
      [index: string]: any;
  }, name: keyof iConfettiOptions, transform?: ((value: any) => any) | undefined) => any;
  export const onlyPositiveInt: (number: number) => number;
  export const randomInt: (min: number, max: number) => number;
  export const toDecimal: (str: string) => number;
  export const colorsToRgb: (colors: string[]) => {
      r: number;
      g: number;
      b: number;
  }[];
  export const hexToRgb: (str: string) => {
      r: number;
      g: number;
      b: number;
  };

}
declare module 'remotion-confetti' {
  import main = require('remotion-confetti/src/index');
  export = main;
}