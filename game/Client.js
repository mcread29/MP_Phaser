class Client{
	constructor(){
		this.socket = io.connect("http://localhost:8000");
		
		this.newUsers = [];
		this.lostConnections = [];
		
		this.hasNewUsers = false;
		this.hasLostConnections = false;
		
		this.socket.on('new_connection', (data) => {
			this.hasNewUsers = true;
			this.newUsers.push(data.id);
		});
		
		this.socket.on('lost_connection', (data) => {
			this.hasLostConnections = true;
			this.lostConnections.push(data.id);
		});
	}
}