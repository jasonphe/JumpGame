var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var gameStarted = false;
var victory = false;
var friction = 0.8;
var gravity = 0.98;
var keys = [];
var playerImg = new Image();
playerImg.src = "pengu.png";

var player = {
	x: 200,
	y: canvas.height - 100,
	width: 40,
	height: 40,
	speed: 10,
	velX: 0,
	velY: 0,
	color: "#ff0000",
	jumping: false,
	grounded: false,
	jumpStrength: 0,
	position: "idle",
	draw: function(){	
		/*startX = 40;
		if(this.position == "left"){
			startX = 0;
		} else if(this.position == "right"){
			startX = 80;
		}*/
		context.drawImage(playerImg, this.x, this.y, 40, 40);
		//context.drawImage(playerImg, startX, 0, 40, 40, this.x, this.y, 40, 40);
		//
	}
}

var platforms = [];
var platform_width = 120;
var platform_height = 10;

platforms.push({
    x: canvas.width-170,
    y: 50,
    width: platform_width,
    height: platform_height,
});
platforms.push({
    x: canvas.width-170,
    y: canvas.height-50,
    width: platform_width,
    height: platform_height,
});
platforms.push({
    x: canvas.width-380,
    y: canvas.height-120,
    width: platform_width,
    height: platform_height,
});
platforms.push({
    x: canvas.width-380,
    y: canvas.height-240,
    width: platform_width,
    height: platform_height,
});

platforms.push({
    x: canvas.width-590,
    y: canvas.height-180,
    width: platform_width,
    height: platform_height,
});

// Floor
platforms.push({
	x: 0,
	y: canvas.height-5,
	width: canvas.width,
	height: platform_height
});

// Left Wall
platforms.push({
	x: -10,
	y: 0,
	width: 10,
	height: canvas.height
});

// Left Wall
platforms.push({
	x: canvas.width,
	y: 0,
	width: 10,
	height: canvas.height
});

// Floor
platforms.push({
	x: 0,
	y: -10,
	width: canvas.width,
	height: platform_height
});


startGame();

function startGame(){
	gameStarted = true;
	//clearCanvas();
	requestAnimationFrame(loop);
}

document.body.addEventListener("keydown", function(event){
	keys[event.keyCode] = true;
	if(event.keyCode == 32)
	{
		if (!player.jumping)
		{
			player.jumpStrength = Math.max(4, player.jumpStrength);
			player.jumpStrength += .5;
		}
		player.jumpStrength = Math.min(player.jumpStrength, 10);
	}
});

document.body.addEventListener("keyup", function(event){
	keys[event.keyCode] = false;
	if(event.keyCode == 32)
	{
		if (player.jumpStrength > 0)
		{
			player.velY = -player.jumpStrength * 1.75;
			player.jumping = true;
			if (player.position == "left")
			{
				player.velX = -player.jumpStrength;
			}
			else
			{
				player.velX = player.jumpStrength;
			}
		}
		player.jumpStrength = 0;
	}
});

function draw_platforms(){
	context.fillStyle = "#907020";

	for(var i = 0; i < platforms.length; i++){
		context.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
		context.lineWidth = 5;
		context.strokeStyle = "#90D030";
		context.strokeRect(platforms[i].x, platforms[i].y-2, platforms[i].width, 5);
	}
}

function loop(){

	clearCanvas();
	draw_platforms();
	player.draw();
	context.fillText(player.jumpStrength, 20, 20);
	if (player.grounded && player.jumpStrength == 0)
	{
		if(keys[39]){
			player.position = "right";
			player.velX+=2;
			player.velX = Math.min(player.velX, player.speed);
		}

		if(keys[37]){
			player.position = "left";
			player.velX-=2;
			player.velX = Math.max(player.velX, -player.speed);
		}
	}
	player.x += player.velX;
	player.y += player.velY;
	
	if (player.grounded)
	{
		player.velX *= friction;
	}
	
	player.velY += gravity;
	player.grounded = false;
	
	for(var i = 0; i < platforms.length; i++){
		var direction = collisionCheck(player, platforms[i]);

		if(direction == "left" || direction == "right"){
			player.velX = 0;
		} else if(direction == "bottom"){
			player.jumping = false;
			player.grounded = true;
		} else if(direction == "top"){
			player.velY *= -1;
		}

	}
	
	if (player.y + player.height > canvas.height)
	{
		player.grounded = true;
		player.y = canvas.height - player.height;
	}
	if(player.grounded)
	{
		player.velY = 0;
		player.jumping = false;
	}
	
	
	if (!victory)
	{
		requestAnimationFrame(loop);
	}
}

function collisionCheck(character, platform){

	var vectorX = (character.x + (character.width/2)) - (platform.x + (platform.width/2));
	var vectorY = (character.y + (character.height/2)) - (platform.y + (platform.height/2));

	var halfWidths = (character.width/2) + (platform.width/2);
	var halfHeights = (character.height/2) + (platform.height/2);

	var collisionDirection = null;

	if(Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights){

		var offsetX = halfWidths - Math.abs(vectorX);
		var offsetY = halfHeights - Math.abs(vectorY);
		if(offsetX < offsetY){

			if (vectorX > 0){
				collisionDirection = "left";
				character.x += offsetX;
			} else {
				collisionDirection = "right";
				character.x -= offsetX;
			}

		} else {

			if (vectorY > 0){
				collisionDirection = "top";
				character.y += offsetY;
			} else {
				collisionDirection = "bottom";
				character.y -= offsetY;
			}

		}

	}

	return collisionDirection;

}

function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}