(function() {
  if (typeof window.CellularPaint === 'undefined') {
    window.CellularPaint = {};
  }
  let CellularPaint = window.CellularPaint;

  let Board = CellularPaint.Board = function(boardSize) {
    this.paintCol = 0;
    this.paintSize = 1;
    this.numColumns = boardSize.columns;
    this.numRows = boardSize.rows;
    this.generation = 0;
    this.grid = [];
    this.threshold = 2;
    this.range = 1;
    this.numColors = 4;
    this.colors = ["#ff0000", "#0000ff", "#008000", "#008000"];
    this.setupGrid();
  };

  Board.prototype.setupGrid = function () {
    for (let i = 0; i < this.numColumns; i++) {
      this.gird.push([]);
      for (let j = 0; j < this.numRows; j++) {
        let num = Math.floor(Math.random() * this.numColors);
        this.grid[i].push(num);
      }
    }
  };

  Board.prototype.reset = function () {
    this.generation = 0;
    this.setupGrid();
  };

  Board.prototype.draw = function (ctx, offset, num, size) {
    debugger;
    let offsetX = (this.numColumns - Math.floor(num[0] - num[0] % 2)) / 2;
    let offsetY = (this.numRows - Math.floor(num[1] - num[1] % 2)) / 2;
    let that = this;

    this.grid.forEach((row, i) => {
      row.forEach((cell, j) => {
          ctx.fillStyle = that.colors[that.grid[i][j]];
          ctx.fillRect((i - offsetX) * size + offset[0],
                        (j - offsetY) * size + offset[1], size, size);
      });
    });
  };

  Board.prototype.step = function () {
    this.generation++;
    let that = this;
    let changes = [];
    self.grid.forEach((row, i) => {
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
      var i = change[0];
      var j = change[1];
      var val = change[2];
      that.grid[i][j] = val;
    });
  };

  Board.prototype.changeCell = function (cell) {
    return (cell+1)%this.numColors;
  };

  Board.prototype.countNeighbors = function(cell, x, y) {
    let count = 0;
    for (let i = x-this.range; i < x+this.range; i++) {
      for (let j = y-this.range; j < y+this.range; j++) {
        if (i === x && j === y) {
          continue;
        }
        if (!this.onBoard([i,j])) {
          let neighbor = this.wrap([i,j]);
        } else {
          let neighbor = [i,j];
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
    return (x >= 0 && x < this.numColumns) && (y >= 0 && y < this.numRows);
  };

  Board.prototype.wrap = function (pos) {
    let i = pos[0];
    let j = pos[1];
    let result = [i, j];
    if (i < 0) {
      result[0] = this.numColumns + i;
    } else if (i >= this.numColumns ) {
      result[0] = i % this.numColumns;
    }

    if (j < 0) {
      result[1] = this.numRows + j;
    } else if (j >= this.numRows ) {
      result[1] = j % this.numRows;
    }
    return result;
  };

  Board.prototype.getColor = function (pos) {
    return this.grid[pos[0]][pos[1]];
  };

  Board.prototype.compareColor = function (cell, neighborColor) {
    return ((cell+1)%this.numColors === neighborColor);
  };

  Board.prototype.setCell = function (pos, color) {
    this.grid[pos[0]][pos[1]] = color;
  };

  }());

  //#ff0000 red
  //#0000ff blue
  //#008000 green
  //#ffff00 yellow
