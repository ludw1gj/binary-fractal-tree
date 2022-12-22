export type TreeType = 'natural' | 'symmetrical'

export interface DrawOptions {
  startX: number
  startY: number
  branchWidth: number
  branchWidthDegradation: number
  branchLength: number
  branchLengthDegradation: number
  angle: number
  changeInAngel: number
  type: TreeType
  splitProbability: number
}
