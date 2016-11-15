# CellularPaint

## Background

Conway's Game of Life is an example of the concept of cellular automata. Each cell on a gird is either dead or alive when the game begins. The state of that cell in next step depends on the state of all its neighborhood.


## MVP

- [ ] State, pause and reset the game.
- [ ] User can paint the cells while the game is running.
- [ ] User can chose the size and color of their paint.
- [ ] Select squares to be alive at the beginning


## Wireframes

This app will have a game board, game controls and links to my LinkedIn and Github on the screen.

![cellularpaint] [wareframe]
[wareframe]: ./docs/cellularpaint.png

## Architecture and Technologies

  - This app will use Vanilla JavaScript and jquery for overall logic and structure.
  - Webpack to bundle and serve up the various scripts.

  * In additon to the webpack entry file, there will alse be board.js, view.js, cell.js, options.js and paint.js files
  * The update logic of cells lives in cell.js. And a Board object will be passed to cell object.
  * paint.js has the function that responds to mouse hover and repaint cell.
  * board has a function to loop over all cell and call cell update function. And another function to draw the board with canvas.
  * view.js integrate all the information and render the board to html.

## Implementation Timeline

**Day 1**. Setup all necessary Node modules.

**Day 2**. Finish board and cell class.
Board setup, update and draw functions. Cell update logic.

**Day 3**. Finish user's paint class.
In paint.js, finish mouse hover logic and integrate paint with board and cell.

**Day 4**. Polish style and color.
Style the interface and provide adequate instructions
