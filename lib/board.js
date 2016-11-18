(function() {
  if(typeof window.CellularPaint === "undefined") {
    window.CellularPaint = {};
  }

  let CellularPaint = window.CellularPaint;

  let Board = CellularPaint.Board = function(options) {
    this.generation = 0;
    this.numX = options.numX;
    this.numY = options.numY;
    this.grid = [];
    this.threshold = 2;
    this.range = 1;
    this.colorNumber = 4;
    this.paintColor = 0;
    this.brushsize = 1;
    this.mode = "paused";
    this.colors = ["#fc8585", "#8ab6fc", "#94fca4", "#fafc94"];
    this.setupGrid();
  };

  //#ff0000 red
  //#8ab6fc blue
  //#008000 green
  //#ffff00 yellow

  Board.prototype.setPaintColor = function (color) {
    this.paintColor = color;
  };

  Board.prototype.setupGrid = function() {
    this.grid = [];
    for (let i = 0; i < this.numX; i++) {
      this.grid.push([]);
      for (let j = 0; j < this.numY; j++) {
        let num = Math.floor(Math.random() * this.colorNumber);
        this.grid[i].push(num);
      }
    }
  };

  Board.prototype.setCell= function(pos) {
    let location;
    for(let i = pos[0]-this.brushsize; i<= pos[0]+this.brushsize; i++){
      for(let j=pos[1]-this.brushsize; j<=pos[1]+this.brushsize; j++){
        location = [i, j];
        if (!this.onBoard(location)) {
          location = this.wrap(location);
        }
        this.grid[location[0]][location[1]] = this.paintColor;
      }
    }
  };

  Board.prototype.step = function() {
    this.generation++;
    let that = this;
    let changes = [];
    that.grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        that.cellChange(cell, i , j, changes);
      });
    });
    this.makeChanges(changes);
  };

  Board.prototype.cellChange = function (cell, i , j, changes) {
    let counts = this.countNeighbors(cell, i, j);
    if (counts >= this.threshold) {
    changes.push([i, j, this.changeCell(cell)]);
    }
  };

  Board.prototype.makeChanges = function (changes) {
    let that = this;
    if (!changes.length) {return;}
    changes.forEach(function (change) {
      let i = change[0];
      let j = change[1];
      let val = change[2];
      that.grid[i][j] = val;
    });
  };

  Board.prototype.countNeighbors = function(cell, x, y) {
    let count = 0;
    let neighbor;
    for (let i = x-this.range; i <= x+this.range; i++) {
      for (let j = y-this.range; j <= y+this.range; j++) {
        if (i === x && j === y) {
          continue;
        }
        if (!this.onBoard([i,j])) {
          neighbor = this.wrap([i,j]);
        } else {
          neighbor = [i,j];
        }
        let neighborColor = this.getColor(neighbor);
        if (this.compareColor(cell, neighborColor)) {
          count++;
        }
      }
    }
    return count;
  };

  Board.prototype.onBoard = function (pos) {
    let x = pos[0];
    let y = pos[1];
    return (x >= 0 && x < this.numX) && (y >= 0 && y < this.numY);
  };

  Board.prototype.wrap = function (pos) {
    let i = pos[0];
    let j = pos[1];
    let result = [i, j];
    if (i < 0) {
      result[0] = this.numX + i;
    } else if (i >= this.numX ) {
      result[0] = i % this.numX;
    }

    if (j < 0) {
      result[1] = this.numY + j;
    } else if (j >= this.numY ) {
      result[1] = j % this.numY;
    }
    return result;
  };

  Board.prototype.getColor = function (pos) {
    return this.grid[pos[0]][pos[1]];
  };

  Board.prototype.compareColor = function (cell, neighborColor) {
    return ((cell+1)%this.colorNumber === neighborColor);
  };


  Board.prototype.changeCell = function (cell) {
    return (cell+1)%this.colorNumber;
  };

  Board.prototype.draw = function(ctx, offset, numSquares, squareSize) {
    let offsetX = (this.numX - Math.floor(numSquares[0]
                    - numSquares[0] % 2)) / 2;
    let offsetY = (this.numY - Math.floor(numSquares[1]
                    - numSquares[1] % 2)) / 2;

    let that = this;

    this.grid.forEach(function(row, i){
      row.forEach(function(cell, j) {
        ctx.fillStyle = that.colors[that.grid[i][j]];
        ctx.fillRect((i - offsetX) * squareSize + offset[0],
          (j - offsetY) * squareSize + offset[1], squareSize, squareSize);
      });
    });
  };

  Board.prototype.reset = function() {
    this.generation = 0;
    this.setupGrid();
  };

  Board.prototype.inBounds = function(xPos, yPos) {
    return (xPos >= 0 && xPos < this.numX) && (yPos >= 0 && yPos < this.numY);
  };
}());
