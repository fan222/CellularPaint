(function() {
  if (typeof window.CellularPaint === 'undefined') {
    window.CellularPaint = {};
  }
  let CellularPaint = window.CellularPaint;

  let Menu = CellularPaint.Menu = function (options) {
    this.board = options.board;
    let $body = $('body');
    this.$startButton = $body.find('.start-button');
    this.$stopButton = $body.find('.stop-button');
    this.$stepButton = $body.find('.step-button');
    this.$resetButton = $body.find('.reset-button');
    this.$instructionsButton = $body.find('.instructions-button');
    this.$speedBar = $body.find('#speed-bar');
    this.$numColorsBar = $body.find('#color-range');
    this.$generationCounter = $body.find('.counter');
    this.$instructBackground = $body.find('.instructions-background');
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
    this.$speedBar.on('input', this.changeSpeed.bind(this));
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

  Menu.prototype.changeSpeed = function () {
    var newSpeed = this.$speedBar.val();
    this.speed = 3000/newSpeed;
    $('.speed').text(this.speed);
    if (this.mode === "running") {
      window.clearInterval(this.timerId);
      this.timerId = setInterval(this.runGame.bind(this), this.speed);
    }
  };

  }());
