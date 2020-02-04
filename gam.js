var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var gameStarted = false;
var victory = false;
var playerImg = new Image();
playerImg.src = "pengu.png";

var player = {
	x: 5,
	y: canvas.height - 45,
	width: 40,
	height: 40,
	speed: 5,
	velX: 0,
	velY: 0,
	color: "#ff0000",
	jumping: false,
	grounded: false,
	jumpStrength: 7,
	position: "idle",
	draw: function(){	
		startX = 40;
		if(this.position == "left"){
			startX = 0;
		} else if(this.position == "right"){
			startX = 80;
		}
		context.drawImage(playerImg, startX, 0, 40, 40, this.x, this.y, 40, 40);
	}
}
startGame();

function startGame(){
	gameStarted = true;
	//clearCanvas();

	requestAnimationFrame(loop);
}

function loop(){

	//clearCanvas();
	//draw_platforms();
	player.draw();
	
	if (!victory)
	{
		requestAnimationFrame(loop);
	}
}

function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}