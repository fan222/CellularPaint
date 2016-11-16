(function(){
  if (typeof window.CellularPaint === "undefined") {
    let CellularPaint = window.CellularPaint = {};
  }

  let CellularPaint = window.CellularPaint;

  let Menu = CellularPaint.Menu = function (options) {
    this.board = options.board;
    let $body = $('body');
    this.$startButton = $body.find('.start-button');
    this.$stopButton = $body.find('.stop-button');
    this.$stepButton = $body.find('.step-button');
    this.$resetButton = $body.find('.reset-button');
    this.$generationCounter = $body.find('.counter');
    this.timerId = null;
    this.mode = "paused";
    this.speed = 100;
    this.bindClickHandlers();
  };

  Menu.prototype.bindClickHandlers = function () {
    this.$startButton.click(this.startGame.bind(this));
    this.$stopButton.click(this.stopGame.bind(this));
    this.$stepButton.click(this.stepGame.bind(this));
    this.$resetButton.click(this.resetGame.bind(this));
  };

  Menu.prototype.startGame = function () {

    if (this.mode !== "running") {
      this.board.mode = "running";
      this.mode = "running";
      this.timerId = setInterval(this.runGame.bind(this), this.speed);
    }
  };

  Menu.prototype.runGame = function () {
    this.board.step();
    $('.counter').text(this.board.generation);
  };

  Menu.prototype.stopGame = function () {
    if (this.mode !== "paused") {
      this.board.mode = "paused";
      this.mode = "paused";
      window.clearInterval(this.timerId);
    }
  };

  Menu.prototype.stepGame = function () {
    if (this.mode !== "running") {
      this.board.step();
      $('.counter').text(this.board.generation);
    } else {
      this.stopGame();
      setTimeout(this.stepGame(), 1000);
    }
  };

  Menu.prototype.resetGame = function () {
    this.board.mode = "paused";
    this.mode = "paused";
    window.clearInterval(this.timerId);
    this.board.reset();
    $('.counter').text(this.board.generation);
  };

})();
