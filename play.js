var cursors;
var cthulu;
var mummy;
var platforms;
var layer;
var map;
var map2;
var key;
var door;
var shotTimer = 0;
var score = 0;
var scoreText;
var style = {fontSize: '32px', fill: '#fff'};
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
    //map.setCollisionByExclusion([7, 32, 35, 36, 47]);, 
    map.setCollisionBetween(8, 10);
    map.setCollisionBetween(10, 13);
    map.setCollisionBetween(16, 31);
    map.setCollisionBetween(36, 43);
    map.setCollision(5);
    map.setCollision(46);
    map.setCollisionBetween(60, 62);
    map.setCollision(49);
    map.setCollision(54);
    map.setCollision(60);
    map.setCollision(52);
    map.setCollision(47);
    map.setCollisionBetween(74, 76);
    map.setCollision(32);
    //map.setCollisionB, 8etween(32, 47);


    score = 0;

    layer.resizeWorld();

    //draw player
    player = game.add.sprite(32, 600, 'jack');
    player.width = 40;
    player.height = 53;

    //enable physics on player
    game.physics.arcade.enable(player);
    player.anchor.setTo(0.5, 1.1);
    player.body.width = 25;
    player.body.height = 45;

    //player.body.tilePadding.set(32, 32);
    
    //follow the player via camera
    game.camera.follow(player);

    //player physics
    player.body.collideWorldBounds = true;
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 300;

    //player walking left and right animations
    player.animations.add('left', [5, 6, 7], 10, true);
    player.animations.add('right', [9, 10, 11], 10, true);

    //enemy groups
    cthulus = game.add.group();
    cthulus.enableBody = true;

    mummies = game.add.group();
    mummies.enableBody = true;

    death = game.add.group();
    death.enableBody = true;

    map.createFromObjects('Enemies', 106, 'cthulu', 0, true, false, cthulus);
    map.createFromObjects('Enemies', 107, 'mummy', 0, true, false, mummies);
    map.createFromObjects('Death', 44, 'death',   0, true, false, death);

    keys = game.add.group();
    keys.enableBody = true;

    doors = game.add.group();
    doors.enableBody = true;

    map.createFromObjects('Key', 67, 'key', 0, true, false, keys);

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

    scoreText = game.add.text(16, 40, 'score: 0', style);

    this.emitter = game.add.emitter(0, 0, 100);
    this.emitter.makeParticles('bullet');
  },


  update: function(){
    game.physics.arcade.collide(cthulus, layer);
    game.physics.arcade.collide(mummies, layer);

    game.physics.arcade.overlap(player, cthulus, this.killPlayer, null, this);
    game.physics.arcade.overlap(player, mummies, this.killPlayer, null, this);
    
    game.physics.arcade.overlap(player, keys, this.openDoor, null, this);
    game.physics.arcade.overlap(player, doors, this.nextLevel, null, this);

    game.physics.arcade.overlap(this.bullets, cthulus, this.killCthulu, null, this);
    game.physics.arcade.overlap(this.bullets, mummies, this.killMummy, null, this);
    game.physics.arcade.overlap(this.bullets, layer, this.killBullet, null, this);
    game.physics.arcade.overlap(player, death, this.killPlayer, null, this);

    game.physics.arcade.collide(player, layer);
    cursors = game.input.keyboard.createCursorKeys();

    //animate player
    this.playerMovement();
  },

  moveItems: function(){
    mummies.forEach(function(mummy){
      //random direction
      var direction = Math.floor(Math.random() + .5);

      //sprite dimensions
      mummy.width = 44;
      mummy.height = 44;

      //animations
      mummy.animations.add('left', [4, 5, 6, 7], 10, true);
      mummy.animations.add('right', [8, 9, 10, 11], 10, true);

      //enemy behavior
      mummy.body.gravity.y = 600;
      //mummy.body.bounce.y = 0.7 + Math.random() * 0.2;
      if(direction === 1){
        mummy.body.velocity.x += 100;
        mummy.animations.play('right');
      }else if(direction === 0){
        mummy.body.velocity.x -= 100;
        mummy.animations.play('left');
      };
    }, this)

    cthulus.forEach(function(cthulu){
      //random direction
      var direction = Math.floor(Math.random() + .5);
      //sprite dimensions

      cthulu.width = 30;
      cthulu.height = 30;
      //animations
      cthulu.animations.add('left', [4, 5, 6, 7], 10, true);
      cthulu.animations.add('right', [8, 9, 10, 11], 10, true);

      //enemy behavior
      cthulu.body.bounce.y = 0.7 + Math.random() * 0.2;
      if(direction === 1){
        cthulu.body.velocity.x += 50;
        cthulu.body.velocity.y += 10;
        cthulu.animations.play('right');
      }else if(direction === 0){
        cthulu.body.velocity.x -= 50;
        cthulu.body.velocity.y -= 10;
        cthulu.animations.play('left');
      };
    }, this)
  },

  killPlayer: function(death, player){
    this.deathSound = game.add.audio('death');
    this.deathSound.play();
    game.camera.reset();
    game.state.restart();
    this.gameSound.stop();
    //game.state.start('play');
  },

  killCthulu: function(bullet, cthulu){
    cthulu.kill();
    bullet.kill();
    //Add Kill Sound
    this.killSound = game.add.audio('kill');
    this.killSound.play();
    score += 40;
    scoreText.setText('Score: ' + score);
    var x = cthulu.x,
        y = cthulu.y;
    this.emitter.x = x;
    this.emitter.y = y;
    this.emitter.start(true, 2000, null, 10);
  },

  killMummy: function(bullet, mummy){
    mummy.kill();
    bullet.kill();
    //Add Kill Sound
    this.killSound = game.add.audio('kill');
    this.killSound.play();
    score += 20;
    scoreText.text = 'Score: ' + score;
    var x = mummy.x,
        y = mummy.y;
    this.emitter.x = x;
    this.emitter.y = y;
    this.emitter.start(true, 2000, null, 10);
  },

  killBullet: function(bullet){
    bullet.kill();
  },

  //show door when player has key
  openDoor: function(player, key){
    key.destroy();
    //Add Key Sound
    this.keySound = game.add.audio('key');
    this.keySound.play();
    map.createFromObjects('Door', 36, 'door', 0, true, false, doors);
  },

  //go to next level when player goes through door
  nextLevel: function(player, door){
    this.game.state.start('level2');
    game.camera.reset();
    this.gameSound.stop();
  },

  restartGame: function(){
    this.gameSound.stop();
    game.state.start('menu');
  },

  collideCthulu: function(player, cthulu){
    player.kill();
    this.restartGame();
    game.camera.reset();
    //Add Death Sound
    this.deathSound = game.add.audio('death');
    this.deathSound.play();
  },

  collideMummy: function(player, mummy){
    player.kill();
    this.restartGame();
    game.camera.reset();
    //Add Death Sound
    this.deathSound = game.add.audio('death');
    this.deathSound.play();
  },

  render: function(){
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
      player.body.velocity.y = -275;
      //Add Jump Sound
      //Add Game Sound
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
