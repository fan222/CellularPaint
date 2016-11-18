# CellularPaint

## Background

Cyclic Cellular Automata (CCA) exhibit complex self-organization by iteration of an extremely simple update rule. A specified number of Colors are arranged cyclically in a "color wheel." Each color can only advance to the next, the last cycling to 0. Each update a cell's color advances by 1 if there are at least Threshold cells of the next color within its neighbor set of size Range in extended Moore or von Neumann neighborhood. These simple dynamics exhibit complex self-organization starting from randomness.



## MVP

- [ ] State, pause and reset the game.
- [ ] User can choose the type of Cyclic Cellular Automata.
- [ ] User can paint the cells while the game is running.
- [ ] User can chose the size and color of their paint brush.


## Wireframes

This app will have a game board, game controls and links to my LinkedIn and Github on the screen.

![cellularpaint] [wareframe]
[wareframe]: ./docs/cellularpaint.png

## Architecture and Technologies

  * This app will use Vanilla JavaScript and jquery for overall logic and structure.
  * There will be board.js, view.js, options.js and index.html files
  * The update logic of cells lives in board.js.
  * Board has a function to loop over all cell and update cells. And another function to draw the board with canvas.
  * view.js has the function that responds to mouse hover and repaint cell.
  * view.js integrate all the information and render the board to html.
  * options.js responds to user input on controls buttons and then update parameters.

## Implementation Timeline

**Day 1**.

**Day 2**.

**Day 3**.

**Day 4**.

## Features
