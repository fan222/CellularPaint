(function() {
  if(typeof window.CellularPaint === "undefined") {
    window.CellularPaint = {};
  }

  let CellularPaint = window.CellularPaint;

  let View = CellularPaint.View = function (board) {
    this.board = board;
    this.start();
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.ctx = this.canvas.getContext("2d");
    this.squareSize = 10;
    this.zoomBar = document.getElementById('zoom-bar');
    this.numX = View.CANVAS_DIM_X / this.squareSize;
    this.numY = View.CANVAS_DIM_Y / this.squareSize;
    this.bindEvents();
  };

  View.CANVAS_DIM_X = 1000;
  View.CANVAS_DIM_Y = 600;
  View.LINE_COLOR = "#999";

  View.prototype.bindEvents = function() {
    $(this.canvas).mousemove(this.handleClickEvent.bind(this));
  };

  View.prototype.handleClickEvent = function() {
    let rectangle = this.canvas.getBoundingClientRect();
    let mousePosition = { x: event.clientX - rectangle.left,
                          y: event.clientY - rectangle.top};
    let offsetX = (this.board.numX - Math.floor(this.numX - this.numX % 2))/2;
    let offsetY = (this.board.numY - Math.floor(this.numY - this.numY % 2))/2;
    let xLim = offsetX + Math.floor((mousePosition.x -
              this.numX % 2/2*this.squareSize)/this.squareSize);
    let yLim = offsetY + Math.floor((mousePosition.y -
              this.numY % 2/2*this.squareSize)/this.squareSize);
    this.board.setCell([xLim, yLim]);
  };

  View.prototype.start = function() {
    let that = this;
    setInterval(function() {
      that.draw();
    }, 10);
  };

  View.prototype.draw = function () {
    this.ctx.clearRect(0, 0, View.CANVAS_DIM_X, View.CANVAS_DIM_Y);
    this.ctx.fillStyle = View.BG_COLOR;
    this.ctx.fillRect(0, 0, View.CANVAS_DIM_X, View.CANVAS_DIM_Y);

    this.ctx.fillStyle = View.ACTIVE_COLOR;

    let offset = [];
    offset[0] = ((this.numX) % 2) / 2 * this.squareSize;
    offset[1] = ((this.numY) % 2) / 2 * this.squareSize;

    this.board.draw(this.ctx, offset, [this.numX, this.numY] , this.squareSize);
    this.drawLines(offset);
  };

  View.prototype.drawLines = function(offset) {
    this.ctx.strokeStyle = View.LINE_COLOR;
    for (let i = 0; i < this.numX; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.squareSize*i + offset[0], 0);
      this.ctx.lineTo(this.squareSize*i + offset[0], View.CANVAS_DIM_Y);
      this.ctx.stroke();
    }

    for (let j = 0; j < this.numY; j++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.squareSize*j+offset[1]);
      this.ctx.lineTo(View.CANVAS_DIM_X, this.squareSize*j+offset[1]);
      this.ctx.stroke();
    }
  };
}());
