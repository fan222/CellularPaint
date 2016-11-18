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

## Architecture and Technologies

  * This app will use Vanilla JavaScript and jquery for overall logic and structure.
  * There will be board.js, view.js, options.js and index.html files
  * The update logic of cells lives in board.js.
  * Board has a function to loop over all cell and update cells. And another function to draw the board with canvas.
  * view.js has the function that responds to mouse hover and repaint cell.
  * view.js integrate all the information and render the board to html.
  * options.js responds to user input on controls buttons and then update parameters.

## Implementation Timeline

**Day 1**. Research the background of CCA and usage of canvas
⋅⋅* Study the background of Cyclic Cellular Automata. The update rules of certain CCA type, such as 'Imperfect', 'Fossil Debris', 'Perfect'.
⋅⋅* Learn how to draw squares and lines with canvas.
**Day 2**. Update logic of CCA and control buttons
⋅⋅* Implement the update logic of CCA.
⋅⋅* Add start, stop, step, reset, paint color and size, CCA type control buttons. Add event listener to view.js.
**Day 3**. Canvas draw
⋅⋅* Interage view.js with board.js. Update game board with calling board draw function.
**Day 4**. Style and README
⋅⋅* Choose appropriate color for cells
⋅⋅* Write and polish README, add Example.

## Example

  **Phase-0:** the game board starts with all random colors.

  ![cellular0] [phase-0]

  **Phase-1:** after several rounds of update, regular pattern appears.

  ![cellular1] [phase-1]

  **Phase-2:** user can paint the board with different colors.

  ![cellular2] [phase-2]

  **Phase-3:** after a while, the cells 'heal' themselves. Similar pattern appears again.

  ![cellular3] [phase-3]


  [wareframe]: ./docs/cellularpaint.png
  [phase-0]: ./docs/phase-0.png
  [phase-1]: ./docs/phase-1.png
  [phase-2]: ./docs/phase-2.png
  [phase-3]: ./docs/phase-3.png
