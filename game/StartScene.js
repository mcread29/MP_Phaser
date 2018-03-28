class User{
	constructor(t){
		this.image = t.add.image(200, 300, 'cursor');
	}
	move(x, y){
		this.image.x += x;
		this.image.y += y;
	}
}

var others = {};

class StartScene extends Phaser.Scene{

	constructor(){
		super({key: 'StartScene'});
	}

	preload(){
		this.load.image("cursor", 'assets/cursor.png');
		game.input.mouse.requestPointerLock();
	}

	create(){
		var t = this;

		var me = new User(t);

		this.others = new Map();

		game.canvas.addEventListener('mousedown', function () {
			game.input.mouse.requestPointerLock();
		});

		this.input.on('pointermove', (event) => {
			if (this.input.mouse.locked) {
				me.move(event.movementX, event.movementY);
			}
		});
	}

	update(){
		if(client.hasLostConnections){
			client.hasLostConnections = false;
			for(var i=0; i<client.lostConnections.length; i++){
				let user = client.lostConnections[i];
				console.log("DISCONNECTED: \n\t" + user)
				this.others[user].image.destroy();
				delete this.others[user];
			}
			client.lostConnections = [];
		}
		
		if(client.hasNewUsers){
			client.hasNewUsers = false;
			for(var i=0; i<client.newUsers.length; i++){
				let user = client.newUsers[i];
				console.log("CONNECTED: \n\t" + user);
				this.others[user] = new User(this);
			}
			client.newUsers = [];
		}
	}
}