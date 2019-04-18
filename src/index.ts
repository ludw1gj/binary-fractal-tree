const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = 1000;
canvas.height = 700;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const genRandomNum = (max: number, min: number): number =>
  parseFloat((Math.random() * (max - min) + min).toFixed(2));

function draw(
  startX: number,
  startY: number,
  len: number,
  angle: number, // should be = 0 on start,
  changeInAngel: number,
  branchWidth: number,
  lengthDegradation: number,
  branchWidthDegradation: number
): void {
  ctx.lineWidth = branchWidth;
  ctx.beginPath();
  ctx.save();

  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();

  if (len < 15) {
    ctx.restore();
    return;
  }

  // remove 2 lines
  lengthDegradation = genRandomNum(0.85, 0.8);
  branchWidthDegradation = genRandomNum(0.8, 0.7);
  changeInAngel = genRandomNum(30, 10);

  draw(
    0,
    -len,
    len * lengthDegradation,
    -changeInAngel,
    changeInAngel,
    branchWidth * branchWidthDegradation,
    lengthDegradation,
    branchWidthDegradation
  );
  draw(
    0,
    -len,
    len * lengthDegradation,
    changeInAngel,
    changeInAngel,
    branchWidth * branchWidthDegradation,
    lengthDegradation,
    branchWidthDegradation
  );

  ctx.restore();
}

const randomLength = genRandomNum(120, 100);
const randomWidth = genRandomNum(15, 5);

const lengthDegradation = genRandomNum(0.85, 0.8);
const branchWidthDegradation = genRandomNum(0.8, 0.7);
const changeInAngel = genRandomNum(30, 10);

draw(
  500,
  700,
  randomLength,
  0,
  changeInAngel,
  randomWidth,
  lengthDegradation,
  branchWidthDegradation
);

// simetric or not
// binary fractal tree
