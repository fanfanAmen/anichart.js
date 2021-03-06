import { Component } from "../component/Component";
import * as d3 from "d3";
import { Ani } from "./Ani";
function easeInterpolate<T extends Component>(e: (i: number) => number) {
  return (a: T, b: T) => {
    const i = d3.interpolate(a, b);
    return (t: number): T => {
      return i(e(t));
    };
  };
}

class CustomAniNeedFrame {
  private keyFrames: Component[] = [];
  private keyTimes: number[] = [];
  private eases: ((n: number) => number)[] = [];
  constructor(startSec = 0) {
    this.keyTimes.push(startSec);
  }

  keyFrame(c: Component) {
    this.keyFrames.push(c);
    return new CustomAni(this, this.keyTimes, this.keyFrames, this.eases);
  }
}
// tslint:disable-next-line:max-classes-per-file
class CustomAni extends Ani {
  private aniSeries: CustomAniNeedFrame;
  private keyTimes: number[];
  private eases: ((n: number) => number)[];
  private keyFrames: Component[];
  constructor(
    aniSeries: CustomAniNeedFrame,
    keyTimes: number[],
    keyFrames: Component[],
    eases: ((n: number) => number)[]
  ) {
    super();
    this.aniSeries = aniSeries;
    this.keyTimes = keyTimes;
    this.keyFrames = keyFrames;
    this.eases = eases;
  }
  getComponent(sec: number): Component {
    // [0, 3, 6]
    let rIdx = d3.bisectLeft(this.keyTimes, sec);
    if (rIdx >= this.keyFrames.length) {
      rIdx = this.keyFrames.length - 1;
    }
    const lIdx = rIdx - 1;
    const eIdx = lIdx >= this.eases.length ? this.eases.length - 1 : lIdx;
    const scale = d3
      .scaleLinear(
        [this.keyTimes[lIdx], this.keyTimes[rIdx]],
        [this.keyFrames[lIdx], this.keyFrames[rIdx]]
      )
      .interpolate(easeInterpolate(this.eases[eIdx]))
      .clamp(true);
    return scale(sec);
  }
  duration(duration: number, ease: (n: number) => number = d3.easeLinear) {
    this.keyTimes.push(this.keyTimes[this.keyTimes.length - 1] + duration);
    this.eases.push(ease);
    return this.aniSeries;
  }
}

export function customAni(startSec?: number) {
  return new CustomAniNeedFrame(startSec ? startSec : 0);
}

export function createAni<T extends Component>(
  keyFrames: T[],
  keyTimes: number[] = [0, 1],
  ease: (n: number) => number = d3.easeLinear
): Ani {
  const scale = d3
    .scaleLinear(keyTimes, keyFrames)
    .interpolate(easeInterpolate(ease))
    .clamp(true);
  return {
    setup() {
      return;
    },
    getComponent: (i: number): T => {
      return scale(i);
    },
  };
}
