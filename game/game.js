var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [StartScene]
};

var game = new Phaser.Game(config);


var client = new Client();