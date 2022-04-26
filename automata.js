import {
  createEmptyMatrix,
  createRandomMatrix,
  printCanvas,
  printGrid,
  evaluateCell
} from './utils.js'

export class Automata {
  constructor(ctx, sizeX, sizeY) {
    this.sizeX = sizeX
    this.sizeY = sizeY
    this.cells = createEmptyMatrix(sizeX, sizeY)
    this.initialCells = createEmptyMatrix(sizeX, sizeY)
    this.ctx = ctx
    this.generation = 0
    this.cellColor = '#e7e7eb'
    this.backgroundColor = '#7e7e7e'
    this.gridColor = '#919191'

    this.createRandomMatrix = createRandomMatrix.bind(this)
    this.printCanvas = printCanvas.bind(this)
    this.evaluateCell = evaluateCell.bind(this)
    this.printGrid = printGrid.bind(this)

    this.printCanvas()
  }

  updateMatrix() {
    this.evaluateCell() 
    this.printCanvas()
    this.generation++
  }

  printCell(x, y) {
    if(this.cells[x][y])
      this.cells[x][y] = 0
    else
      this.cells[x][y] = 1
    this.printCanvas()
  }

  reset() {
    this.cells = [...this.initialCells]
    this.generation = 0
    this.printCanvas()
  }
}