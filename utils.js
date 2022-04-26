function calculateNeighbours(x, y) {
  const topLeft = this.cells[x-1]?.[y-1]
  const left = this.cells[x-1]?.[y]
  const bottomLeft = this.cells[x-1]?.[y+1]
  const top = this.cells[x]?.[y-1]
  const bottom = this.cells[x]?.[y+1]
  const topRight = this.cells[x+1]?.[y-1]
  const right = this.cells[x+1]?.[y]
  const bottomRight = this.cells[x+1]?.[y+1]

  if(x === 0 && y === 0)
    return right + bottomRight + bottom
  else if(x === this.sizeX - 1 && y === 0)
    return bottom + bottomLeft + left
  else if(x === 0 && y === this.sizeY - 1)
    return top + topRight + right
  else if(x === this.sizeX - 1 && y === this.sizeY - 1)
    return top + left + topLeft

  else if(x > 0 && y === 0)
    return right + bottomRight + bottom + bottomLeft + left
  else if(x > 0 && y === this.sizeY - 1)
    return top + topRight + right + left + topLeft
  else if(x === 0 && y > 0)
    return top + topRight + right + bottomRight + bottom
  else if(x === this.sizeX - 1 && y > 0)
    return top + bottom + bottomLeft + left + topLeft
  else
    return top + topRight + right + bottomRight + bottom + bottomLeft + left + topLeft
}

export function createEmptyMatrix(sizeX, sizeY) {
  return new Array(sizeX).fill(0).map(() => new Array(sizeY).fill(0))
}

export function createRandomMatrix() {
  const cells = createEmptyMatrix(this.sizeX, this.sizeY)
  for(let x = 0; x < this.sizeX; x++) {
    for(let y = 0; y < this.sizeY; y++) {
      const alive = Math.random() < 0.5 ? 1 : 0
      cells[x][y] = alive
    }
  }
  this.cells = [...cells]
  this.generation = 0
  this.printCanvas()
}

export function printCanvas() {
  this.ctx.clearRect(0, 0, this.sizeX, this.sizeY)
  for (let x = 0; x < this.sizeX; x++) {
    for (let y = 0; y < this.sizeY; y++) {
      if(this.cells[x][y])
        this.ctx.fillStyle = this.cellColor
      else
        this.ctx.fillStyle = this.backgroundColor
      this.ctx.fillRect(x * 15, y * 15, 15, 15)
    }
  }
  this.printGrid();
}

export function printGrid() {
  for(let x = 0; x < this.sizeX; x++) {
    for(let y = 0; y < this.sizeY; y++) {
      this.ctx.fillStyle = this.gridColor
      const xPos = x * 15
      const yPos = y * 15
      
      this.ctx.fillRect(xPos, yPos, 1, 15)
      this.ctx.fillRect(xPos + 14, yPos, 1, 15)
      this.ctx.fillRect(xPos, yPos, 15, 1)
      this.ctx.fillRect(xPos, yPos + 14, 15, 1)
    }
  }
}

export function evaluateCell() {
  const cells = createEmptyMatrix(this.sizeX, this.sizeY)
  for (let x = 0; x < this.sizeX; x++) {
    for (let y = 0; y < this.sizeY; y++) {
      const currentCell = this.cells[x][y]
      const livingNeighbours = calculateNeighbours.call(this, x, y)

      if(currentCell === 1 && (livingNeighbours < 2 || livingNeighbours > 3))
        cells[x][y] = 0
      else if(currentCell === 0 && livingNeighbours === 3)
        cells[x][y] = 1
      else
        cells[x][y] = currentCell
    }
  }
  this.cells = [...cells]
}