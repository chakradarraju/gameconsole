WIDTH = 300;

function Console() {
  var display = document.getElementById('display');
  var controls = document.getElementById('controls');
  this.display_ = new Display(display);
  this.input_ = new Input();
  this.storage_ = new Storage();
  this.paused_ = false;
  this.input_.showControls(controls);
  this.showMenu_();
  display.style.width = WIDTH;
  controls.style.width = WIDTH;
}

Console.prototype.setScore = function(game, score) {
  var key = this.getHiScoreKeyForGame_(game);
  var hiScore = this.storage_.get(key) || 0;
  if (score > hiScore) {
    this.storage_.update(key, score);
    this.display_.setHiScore(score);
  }
  this.display_.setScore(score);
};

Console.prototype.showHiScore = function(gameConstructor) {
  var hiScore = this.storage_.get(this.getHiScoreKey_(gameConstructor.name)) || 0;
  this.display_.setHiScore(hiScore);
};

Console.prototype.showMenu_ = function() {
  var menu = new Menu(this, this.display_, this.input_, this.startGame_.bind(this));
};

Console.prototype.startGame_ = function(game) {
  this.display_.reset();
  this.input_.reset();
  this.game_ = new game(this, this.display_, this.input_, this.onGameOver_.bind(this));
  this.input_.listenPress(SPACE_KEY, this.handlePauseResume_.bind(this));
};

Console.prototype.onGameOver_ = function() {
  delete this.game_;
  this.display_.setMessage('Game Over. Press Enter to show Menu.');
  this.input_.listenPress(ENTER_KEY, function() {
    this.display_.reset();
    this.showMenu_();
  }.bind(this));
};

Console.prototype.getHiScoreKeyForGame_ = function(game) {
  return this.getHiScoreKey_(game.constructor.name);
}

Console.prototype.getHiScoreKey_ = function(gamename) {
  return gamename + "HiScore";
};

Console.prototype.handlePauseResume_ = function() {
  if (this.game_) {
    if (this.paused_) {
      this.game_.resume();
      this.display_.setMessage('');
    } else {
      this.game_.pause();
      this.display_.setMessage('Paused');
    }
    this.paused_ = !this.paused_;
  }
};

var c = new Console();
