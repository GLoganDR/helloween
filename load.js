var loadState = {
  preload: function(){
    //load player spritesheet, x and x images
    //sounds
    //make
    game.load.image('helloween', '/img/helloween.png');
    game.load.image('bullet', '/img/pumpkinbomb.png');
    game.load.spritesheet('cthulu', '/img/cthulu.png', 64, 64);
    game.load.spritesheet('mummy', '/img/mummy.png', 80, 80);
    game.load.spritesheet('jack', '/img/jack2.png', 80, 93);
    game.load.spritesheet('oogie', '/img/boss.png', 100, 96);
    //Game Sound
    game.load.audio('ls1', 'assets/audio/03 This Is Halloween - Danny Elfman.mp3', 'assets/audio/03_This_Is_Halloween_-_Danny_Elfman.ogg');
    //Game Sound lvl 2
    game.load.audio('ls2', 'assets/audio/Oogie Boogie Song.mp3', 'assets/audio/Oogie_Boogie_39_s_Song.ogg');
    //Game Sound lvl 3
    game.load.audio('ls3', 'assets/audio/17 - To the Rescue.mp3', 'assets/audio/17_-_To_the_Rescue.ogg');
    //Game Sound boss
    game.load.audio('Battle-theme', 'assets/audio/Battle-theme.ogg', 'assets/audio/Battle-theme.ogg');
    //Load in the jump sound
    game.load.audio('jump', 'assets/audio/SoundEffects/spin_jump-Brandino480-2020916281.wav');
    //Load in the shoot sound
    game.load.audio('shoot', 'assets/audio/SoundEffects/Silencer-SoundBible.com-1632156458.wav');
    //Load in the sound for key collection
    game.load.audio('key', 'assets/audio/SoundEffects/key.wav');
    //Load in the kill sound
    game.load.audio('kill', 'assets/audio/SoundEffects/Pain-SoundBible.com-1883168362.wav');
    //Load in player death sound
    game.load.audio('death', 'assets/audio/SoundEffects/Scary Scream-SoundBible.com-1115384336.wav');
    //Tilemaps
    game.load.tilemap('lv1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('lv2', 'assets/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('boss', 'assets/tilemaps/boss.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('level1', 'assets/tilemaps/cybernoid.png', 16, 16);
    game.load.image('level2', 'assets/tilemaps/cybernoid.png', 16, 16);
    game.load.image('key', '/img/key-clipart-key.png');
    game.load.image('door', '/img/Door.png');
    game.load.image('death', '/img/Solid_black.png');
  },

  create: function(){
    //when all assets are loaded, go to the menu state
    this.game.state.start('menu');
  }
};
