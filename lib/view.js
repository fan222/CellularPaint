(function() {
  if (typeof window.CellularPaint === 'undefined') {
    window.CellularPaint = {};
  }
  let CellularPaint = window.CellularPaint;

  let View = CellularPaint.View = function(board) {
    this.board = board;
    this.start();
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.ctx = this.canvas.getContext("2d");
    this.numX = 100;
    this.numY = 70;
    this.paintCol = 0;
    this.bindEvents();
  };

  View.LINE_COLOR = "#444";

  View.prototype.bindEvents = function() {
    $(this.canvas).mousemove(this.handleMoveEvent.bind(this));
  };

  View.prototype.start = function() {
    let that = this;
    setInterval(function() {
      that.board.draw(this.ctx, );
    }, 10);
  };
  View.prototype.handleMoveEvent = function() {
    let rectangle = this.canvas.getBoundingClientRect();
    let mousePosition = {x: event.clientX - rectangle.left, y: event.clientY - rectangle.top};
    let offsetX = (this.board.numX - Math.floor(this.numX - this.numX % 2))/2;
    let offsetY = (this.board.numY - Math.floor(this.numY - this.numY % 2))/2;
    let xLim = offsetX + Math.floor((mousePosition.x - this.numX % 2/2*this.squareSize)/this.squareSize);
    let yLim = offsetY + Math.floor((mousePosition.y - this.numY % 2/2*this.squareSize)/this.squareSize);
    this.board.setCell([xLim, yLim], this.paintCol);
  };

  View.prototype.drawLines = function(offset) {
    this.ctx.strokeStyle = View.LINE_COLOR;
    for (let i = 0; i < this.numX; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(10*i + offset[0], 0);
      this.ctx.lineTo(10*i + offset[0], 700);
      this.ctx.stroke();
    }

    for (let j = 0; j < this.numY; j++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, 10*j+offset[1]);
      this.ctx.lineTo(1000, 10*j+offset[1]);
      this.ctx.stroke();
    }

    View.prototype.changePaintCol = function() {
      let newCol = $(this.colorRadio).val();
      this.paintCol = newCol;
    };
  };
  }());
