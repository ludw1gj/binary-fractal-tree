import { DrawOptions } from './types'

export const createCanvasContext = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): CanvasRenderingContext2D => {
  canvas.width = width
  canvas.height = height
  return canvas.getContext('2d') as CanvasRenderingContext2D
}

export const drawTree = (ctx: CanvasRenderingContext2D, options: DrawOptions): void => {
  const { startX, startY, branchWidth, branchLength, angle, type, splitProbability } = options

  ctx.lineWidth = branchWidth
  ctx.beginPath()
  ctx.save()

  ctx.translate(startX, startY)
  ctx.rotate((angle * Math.PI) / 180)
  ctx.moveTo(0, 0)
  ctx.lineTo(0, -branchLength)
  ctx.stroke()

  if (branchLength < 15) {
    ctx.restore()
    return
  }

  const isSymmetrical = type === 'symmetrical'
  const nextOptions = {
    ...options,
    startX: 0,
    startY: -branchLength,
    branchWidthDegradation: isSymmetrical
      ? options.branchWidthDegradation
      : generateRandomNumber(0.8, 0.7),
    branchLengthDegradation: isSymmetrical
      ? options.branchLengthDegradation
      : generateRandomNumber(0.85, 0.8),
    changeInAngel: isSymmetrical ? options.changeInAngel : generateRandomNumber(30, 10),
  }
  if (isSymmetrical || randomProbability(1 - splitProbability)) {
    drawTree(ctx, {
      ...nextOptions,
      angle: -nextOptions.changeInAngel,
    })
  }
  if (isSymmetrical || randomProbability(1 - splitProbability)) {
    drawTree(ctx, {
      ...nextOptions,
      angle: nextOptions.changeInAngel,
    })
  }
  ctx.restore()
}

const generateRandomNumber = (max: number, min: number): number =>
  parseFloat((Math.random() * (max - min) + min).toFixed(2))

const randomProbability = (percentage: number): boolean => {
  if (percentage < 0 || percentage > 1) {
    console.warn('Probability must be between 0 and 1. Defaulting percentage to 0.5')
    return Math.random() > 0.5
  }
  return Math.random() > 1 - percentage
}
