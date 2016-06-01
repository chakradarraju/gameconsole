WIDTH = 300;

function Console() {
  var display = document.getElementById('display');
  var controls = document.getElementById('controls');
  this.display_ = new Display(display);
  this.input_ = new Input();
  this.input_.showControls(controls);
  this.showMenu_();
  display.style.width = WIDTH;
  controls.style.width = WIDTH;
}

Console.prototype.showMenu_ = function() {
  var menu = new Menu(this.display_, this.input_, this.startGame_.bind(this));
};

Console.prototype.startGame_ = function(game) {
  this.display_.reset();
  this.input_.reset();
  this.game_ = new game(this.display_, this.input_, this.onGameOver_.bind(this));
};

Console.prototype.onGameOver_ = function() {
  this.display_.setMessage('Game Over. Press Enter to show Menu.');
  this.input_.listenPress(ENTER_KEY, function() {
    this.display_.setMessage('');
    this.showMenu_();
  }.bind(this));
};

var c = new Console();
