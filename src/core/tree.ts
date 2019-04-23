export type TreeType = "natural" | "symmetrical";

export interface DrawOptions {
  startX: number;
  startY: number;
  branchWidth: number;
  branchWidthDegradation: number;
  branchLength: number;
  branchLengthDegradation: number;
  angle: number;
  changeInAngel: number;
  type: TreeType;
  splitProbability: number;
}

export class BinaryFractalTree {
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.ctx = ctx;
  }

  public draw(options: DrawOptions): void {
    const {
      startX,
      startY,
      branchWidth,
      branchWidthDegradation,
      branchLength,
      branchLengthDegradation,
      angle,
      changeInAngel,
      type,
      splitProbability,
    } = options;

    this.ctx.lineWidth = branchWidth;
    this.ctx.beginPath();
    this.ctx.save();

    this.ctx.translate(startX, startY);
    this.ctx.rotate((angle * Math.PI) / 180);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -branchLength);
    this.ctx.stroke();

    if (branchLength < 15) {
      this.ctx.restore();
      return;
    }

    if (type === "natural") {
      options.branchLengthDegradation = BinaryFractalTree.generateRandomNumber(0.85, 0.8);
      options.branchWidthDegradation = BinaryFractalTree.generateRandomNumber(0.8, 0.7);
      options.changeInAngel = BinaryFractalTree.generateRandomNumber(30, 10);
    }

    const drawOptionsShared = {
      ...options,
      startX: 0,
      startY: -branchLength,
      splitProbability,
    };

    if (BinaryFractalTree.randomProbability(1 - splitProbability)) {
      const drawOptionsFirstChild = {
        ...drawOptionsShared,
        branchLength: branchLength * branchLengthDegradation,
        branchWidth: branchWidth * branchWidthDegradation,
        angle: -changeInAngel,
      };
      this.draw(drawOptionsFirstChild);
    }
    if (BinaryFractalTree.randomProbability(1 - splitProbability)) {
      const drawOptionsSecondChild = {
        ...drawOptionsShared,
        branchLength: branchLength * branchLengthDegradation,
        branchWidth: branchWidth * branchWidthDegradation,
        angle: changeInAngel,
      };
      this.draw(drawOptionsSecondChild);
    }
    this.ctx.restore();
  }

  public static generateRandomNumber(max: number, min: number): number {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  }

  public static randomProbability(percentage: number): boolean {
    if (percentage < 0 || percentage > 1) {
      throw new Error("Probability must be between 0 and 1");
    }
    return Math.random() > 1 - percentage;
  }
}
