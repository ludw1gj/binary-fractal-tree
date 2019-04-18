const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = 1000;
canvas.height = 700;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const genRandomNum = (max: number, min: number): number =>
  parseFloat((Math.random() * (max - min) + min).toFixed(2));

type TreeType = "natural" | "symmetrical";

interface DrawOptions {
  startX: number;
  startY: number;
  branchWidth: number;
  branchWidthDegradation: number;
  branchLength: number;
  branchLengthDegradation: number;
  angle: number;
  changeInAngel: number;
  type: TreeType;
}

function draw(options: DrawOptions): void {
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
  } = options;

  ctx.lineWidth = branchWidth;
  ctx.beginPath();
  ctx.save();

  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -branchLength);
  ctx.stroke();

  if (branchLength < 15) {
    ctx.restore();
    return;
  }

  if (type === "natural") {
    options.branchLengthDegradation = genRandomNum(0.85, 0.8);
    options.branchWidthDegradation = genRandomNum(0.8, 0.7);
    options.changeInAngel = genRandomNum(30, 10);
  }

  const drawOptionsShared = {
    ...options,
    startX: 0,
    startY: -branchLength,
  };

  const drawOptionsFirstChild = {
    ...drawOptionsShared,
    branchLength: branchLength * branchLengthDegradation,
    branchWidth: branchWidth * branchWidthDegradation,
    angle: -changeInAngel,
  };

  const drawOptionsSecondChild = {
    ...drawOptionsShared,
    branchLength: branchLength * branchLengthDegradation,
    branchWidth: branchWidth * branchWidthDegradation,
    angle: changeInAngel,
  };

  draw(drawOptionsFirstChild);
  draw(drawOptionsSecondChild);
  ctx.restore();
}

const options: DrawOptions = {
  startX: 500,
  startY: 700,
  branchWidth: genRandomNum(15, 5),
  branchWidthDegradation: genRandomNum(0.8, 0.7),
  branchLength: genRandomNum(120, 100),
  branchLengthDegradation: genRandomNum(0.85, 0.8),
  angle: 0,
  changeInAngel: genRandomNum(30, 10),
  type: "natural",
};

draw(options);
