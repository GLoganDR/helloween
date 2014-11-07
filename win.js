var winState = {
  create: function(){
    var style = {font: "30px Arial", fill: "#e78f27"};
    b = game.add.tileSprite(0, 0, 900, 500, 'helloween');
    var shiftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    shiftKey.onDown.add(this.start, this);
    var x = game.world.width/2, y = game.world.height/2;
    var text = this.game.add.text(game.world.centerX, game.world.centerY, "Congratulations!", style);
    var text2 = this.game.add.text(x, y-120, 'You\'ve completed the game!', style);
    var text3 = this.game.add.text(x, y-80, 'Hit Shift to play again', style);
    text.anchor.setTo(0.5, 0.5);
    text2.anchor.setTo(0.5, 0.5);
    text3.anchor.setTo(0.5, 0.5);
  },

  start: function(){
    this.game.state.start('play');
  }
};
