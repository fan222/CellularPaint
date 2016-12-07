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
    this.$paintRedButton = $body.find('.paint-red');
    this.$paintBlueButton = $body.find('.paint-blue');
    this.$paintGreenButton = $body.find('.paint-green');
    this.$paintYellowButton = $body.find('.paint-yellow');
    this.$generationCounter = $body.find('.counter');
    this.$brushsize = $body.find('.paint-size');
    this.$cellularType = $body.find('.change-type');
    this.$showinstructions = $body.find('.instructions-button');
    this.$hideinstructions = $body.find('.hide');
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
    this.$paintRedButton.click(() => this.setPaintColor(0));
    this.$paintBlueButton.click(() => this.setPaintColor(1));
    this.$paintGreenButton.click(() => this.setPaintColor(2));
    this.$paintYellowButton.click(() => this.setPaintColor(3));
    this.$showinstructions.click(() => this.showinstructions());
    this.$hideinstructions.click(() => this.hideinstructions());
    this.$brushsize.on('change', this.changeSize.bind(this));
    this.$cellularType.on('input',this.changeCellularType.bind(this));
  };

  Menu.prototype.showinstructions = function() {
    $('.instructions').attr('id', 'show');
  };
  Menu.prototype.hideinstructions = function() {
    $('.instructions').attr('id', null);
  };

  Menu.prototype.setPaintColor = function(color) {
    this.board.setPaintColor(color);
    switch (this.board.paintColor) {
      case 0:
        $('.paint-color').text("Current Paint Color: Red");
        break;
      case 1:
        $('.paint-color').text("Current Paint Color: Blue");
        break;
      case 2:
        $('.paint-color').text("Current Paint Color: Green");
        break;
      case 3:
        $('.paint-color').text("Current Paint Color: Yellow");
        break;
    }
  };
  Menu.prototype.changeSize = function() {
    let size = this.$brushsize.val();
    this.board.brushsize = parseInt(size);
    $('.size').text("Size of Painting brush: "+size);
  };

  Menu.prototype.changeCellularType = function() {
    let value = this.$cellularType.val();
    this.board.range = parseInt(value[0]);
    this.board.threshold = parseInt(value[2]);
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
    $('.counter').text("Current Generation: "+this.board.generation);
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
      $('.counter').text("Current Generation: "+this.board.generation);
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
    $('.counter').text("Current Generation: "+this.board.generation);
  };
})();
