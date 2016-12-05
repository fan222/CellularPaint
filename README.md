# CellularPaint
[live][live-site]
[live-site]:  https://fan222.github.io/CellularPaint/.

![gif] [paint]
[paint]: ./docs/paints.gif

## Background

Cyclic Cellular Automata (CCA) exhibit complex self-organization by iteration of an extremely simple update rule. A specified number of Colors are arranged cyclically in a "color wheel." Each color can only advance to the next, the last cycling to 0. Each update a cell's color advances by 1 if there are at least Threshold cells of the next color within its neighbor set of size Range in extended Moore or von Neumann neighborhood. These simple dynamics exhibit complex self-organization starting from randomness.

## Implement

### Cell update logic

Each cell may has one of the four color, Red, Blue, Green, or Yellow. If a red cell meets some condition, then its color will become blue at next state.

Every 0.1s, the game board is updated.
```JavaScript
  this.timerId = setInterval(this.runGame.bind(this), this.speed);
```

Inside `runGame` function, each individual cell is updated by `cellChange` function.

```JavaScript
Board.prototype.cellChange = function (cell, i , j, changes) {
  let counts = this.countNeighbors(cell, i, j);
  if (counts >= this.threshold) {
    changes.push([i, j, this.changeCell(cell)]);
  }
};
```

The `countNeighbors` function counts the number of cells which have the color that is the next state of current cell. If the `counts` greater or equal to a fixed threshold, the cell will change its color to next one.

### Paint functionality

A mouse move listener is add to Canvas object.
```JavaScript
  $(this.canvas).mousemove(this.handleClickEvent.bind(this));
```

Each time mouse moves, its position is calculated.
```JavaScript
  let rectangle = this.canvas.getBoundingClientRect();
  let mousePosition = { x: event.clientX - rectangle.left,
                        y: event.clientY - rectangle.top};
```

And corresponding cells' color will be set to paint brush color.
```JavaScript
  this.grid[location[0]][location[1]] = this.paintColor;
```

## Future Features

* Users can set the number of colors, threshold and type of neighborhood.

* Users can choose or draw the initial state of game board.
