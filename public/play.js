var cursors;
var cthulu;
var mummy;
var platforms;
var layer;
var map;
var shotTimer = 0;
var playState = {
  //no preload needed
  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //use the tilemap
    map = game.add.tilemap('lv1');
    map.addTilesetImage('Cyber', 'level1');

    //draw level 1
    layer = map.createLayer('Level 1');

    //set collision for blocks
    map.setCollisionByExclusion([7, 32, 35, 36, 47]);
    //map.setCollision(7);
    //map.setCollisionBetween(32, 47);

    layer.resizeWorld();

    //draw player
    player = game.add.sprite(32, 0, 'jack');
    player.width = 40;
    player.height = 53;

    //enable physics on player
    game.physics.arcade.enable(player);
    player.body.width = 30;
    player.body.height = 53;

    //player.body.tilePadding.set(32, 32);
    
    //follow the player via camera
    game.camera.follow(player);

    //player physics
    player.body.bounce.y = 0.2;

    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //player walking left and right animations
    player.animations.add('left', [5, 6, 7], 10, true);
    player.animations.add('right', [9, 10, 11], 10, true);

    //enemy groups
    cthulus = game.add.group();
    cthulus.enableBody = true;

    mummies = game.add.group();
    mummies.enableBody = true;

    map.createFromObjects('Enemies', 106, 'cthulu', 0, true, false, cthulus);
    map.createFromObjects('Enemies', 107, 'mummy', 0, true, false, mummies);

/*
    for(var i = 0; i < 10; i++){
      //cthulu drawing
      cthulu = cthulus.create(i * 70, 0, 'cthulu');
      cthulu.animations.add('left', [4, 5, 6, 7], 10, true);
      cthulu.animations.add('right', [8, 9, 10, 11], 10, true);
      cthulu.body.gravity.y = 60;
      cthulu.body.bounce.y = 0.7 + Math.random() * 0.2;
      cthulu.body.collideWorldBounds = true;

      //mummy drawing
      mummy = mummies.create(game.world.randomX, 0, 'mummy');
      mummy.body.gravity.y = 60;
      mummy.body.bounce.y = 0.7 + Math.random() * 0.2;
      mummy.body.collideWorldBounds = true;
    };
*/
    //monster movement time
    this.moveTimer = game.time.events.loop(1500, this.moveItems, this);

    //game music
    this.gameSound = game.add.audio('ls1');
    this.gameSound.play();

    this.bullets = game.add.group();
    this.bullets.enableBody = true;

    // Call the 'shoot' function when the spacekey is hit
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.shoot, this);
  },


  update: function(){
    game.physics.arcade.collide(cthulus, layer);
    game.physics.arcade.collide(mummies, layer);

    game.physics.arcade.overlap(player, cthulus, this.collideCthulu, null, this);
    game.physics.arcade.overlap(player, mummies, this.collideMummy, null, this);

    game.physics.arcade.overlap(this.bullets, cthulus, this.killCthulu, null, this);
    game.physics.arcade.overlap(this.bullets, mummies, this.killMummy, null, this);
    game.physics.arcade.overlap(this.bullets, layer, this.killBullet, null, this);

    //player collision w/ walls and floor
    game.physics.arcade.collide(player, layer);
    cursors = game.input.keyboard.createCursorKeys();

    //animate player
    this.playerMovement();
  },

  moveItems: function(){
    cthulus.forEach(function(cthulu){
      var direction = Math.floor(Math.random() + .5);
      cthulu.animations.add('left', [4, 5, 6, 7], 10, true);
      cthulu.animations.add('right', [8, 9, 10, 11], 10, true);
      cthulu.body.gravity.y = 60;
      cthulu.body.bounce.y = 0.7 + Math.random() * 0.2;
      if(direction === 1){
        cthulu.body.velocity.x += 100;
        cthulu.animations.play('right');
      }else if(direction === 0){
        cthulu.body.velocity.x -= 100;
        cthulu.animations.play('left');
      };
    }, this)

    mummies.forEach(function(mummy){
      var direction = Math.floor(Math.random() + .5);

      mummy.body.bounce.y = 0.7 + Math.random() * 0.2;
      if(direction === 1){
        mummy.body.velocity.x += 100;
        mummy.body.velocity.y += 20;
      }else if(direction === 0){
        mummy.body.velocity.x -= 100;
        mummy.body.velocity.y -= 20;
      };
    }, this)
  },

  killCthulu: function(bullet, cthulu){
    cthulu.kill();
    bullet.kill();
    //Add Kill Sound
    this.killSound = game.add.audio('kill');
    this.killSound.play();
  },

  killMummy: function(bullet, mummy){
    mummy.kill();
    bullet.kill();
    //Add Kill Sound
    this.killSound = game.add.audio('kill');
    this.killSound.play();
  },

  killBullet: function(bullet){
    bullet.kill();
  },

  restartGame: function(){
    this.gameSound.stop();
    game.state.start('menu');
  },

  collideCthulu: function(player, cthulu){
    player.kill();
    this.restartGame();
    //Add Death Sound
    this.deathSound = game.add.audio('death');
    this.deathSound.play();
  },

  collideMummy: function(player, mummy){
    player.kill();
    this.restartGame();
    //Add Death Sound
    this.deathSound = game.add.audio('death');
    this.deathSound.play();
  },

  render: function(){
    game.debug.body(player);
    layer.debug = true;
  },

  playerMovement: function(){
    player.body.velocity.x = 0;
    if(cursors.left.isDown)
    {
      //  Move to the left
      player.body.velocity.x = -150;
      player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
      player.body.velocity.x = 150;
      player.animations.play('right');
    }
    else
    {
      //  Stand still
      player.animations.stop();
      player.frame = 8;
    }
    //  Allow the player to jump if they are touching the ground.
    if(cursors.up.isDown && player.body.onFloor())
    {
      player.body.velocity.y = -350;
      //Add Jump Sound
      this.jumpSound = game.add.audio('jump');
      this.jumpSound.play();
    }
  },
  //player movement variables there is velocity and animation. make a global variable called "lastDirection." If you let go of that key it will still have left in it
  //It won't change until you hit right. Whatever direction you end in is what direction it will shoot.
  shoot: function(){
    if(shotTimer < game.time.now){
      shotTimer = game.time.now + 275;
      var bullet = this.bullets.create(player.body.x + player.body.width / 2 + 20, player.body.y + player.body.height / 2 - 4, 'bullet');
      game.physics.enable(bullet, Phaser.Physics.ARCADE)
      bullet.outOfBoundsKill = true;
      bullet.anchor.setTo(0.5, 0.5);
      if(cursors.left.isDown)
      {
        bullet.body.velocity.y = 0;
        bullet.body.velocity.x = -600;
      }else
      {
        bullet.body.velocity.y = 0;
        bullet.body.velocity.x = 600;
      }
    }
    this.shootSound = game.add.audio('shoot');
    this.shootSound.play();
  }
};
