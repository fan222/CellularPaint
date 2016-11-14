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
[wareframe]: ./cellularpaint.png

## Architecture and Technologies

  - This app will use Vanilla JavaScript and jquery for overall logic and structure.
  - Webpack to bundle and serve up the various scripts.

  In additon to the webpack entry file, there will alse be board.js, automata.js, cell.js and paint.js files

## Implementation Timeline

**Day 1**. Setup all necessary Node modules
**Day 2**. Finish board and cell class.
**Day 3**. Finish user's paint class.
**Day 4**. Polish style and color.
