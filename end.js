//var gameOver = {
//    create: function(){
//    var style = {font: "30px Arial", fill: "#e78f27"};
//    b = game.add.tileSprite(0, 0, 900, 500, 'helloween');
//    var shiftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
//    shiftKey.onDown.add(this.start, this);
//    var x = game.world.width/2, y = game.world.height/2;
//    game.camera.reset();
//
//    var text = this.game.add.text(game.world.centerX, game.world.centerY, "Game Over", style);
//    text.anchor.setTo(0.5, 0.5);
//
//    var text2 = this.game.add.text(game.world.centerX, game.world.centerY + 50, 'You were killed.', style);
//    text2.anchor.setTo(0.5, 0.5);
//
//    var text3 = this.game.add.text(game.world.centerX, game.world.centerY + 100, 'Hit Shift to play boss again', style);
//    text3.anchor.setTo(0.5, 0.5);
//  },
//
//  start: function(){
//    game.state.start('boss');
//  }
//};
