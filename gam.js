var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var gameStarted = false;
var victory = false;
var friction = 0.8;
var gravity = 0.5;
var keys = [];
var charger;
var counter = 0;
var stage = 1;
var rightImg = new Image();
rightImg.src = "right.png";
var leftImg = new Image();
leftImg.src = "left.png";
var jumpLeftImg = new Image();
jumpLeftImg.src = "jumpLeft.png";
var jumpRightImg = new Image();
jumpRightImg.src = "jumpRight.png";
var wallImg = new Image();
wallImg.src = "wall.jpg";



var player = {
	x: 200,
	y: canvas.height - 100,
	width: 40,
	height: 40,
	speed: 5,
	velX: 0,
	velY: 0,
	color: "#ff0000",
	charging: false,
	jumping: false,
	grounded: false,
	maxJumpStrength: 10,
	jumpStrength: 0,
	position: "idle",
	draw: function(){	
		let img = rightImg;
		let animate = player.velX > 1 || player.velX < -1 || player.jumping || player.charging;
		if (player.jumping || player.charging)
		{
			if (this.position == "right")
			{
				img = jumpRightImg;
			}
			else if (this.position == "left")
			{
				img = jumpLeftImg;
			}
		}
		else
		{
			if (this.position == "right")
			{
				img = rightImg;
			}
			else if (this.position == "left")
			{
				img = leftImg;
			}
		}
		if (animate)
		{
			let total = 20;
			if (counter % total < (total/2))
			{
				startX = 1;
			}
			else 
			{
				startX = 0;
			}
			counter++;
		}
		else
		{
			startX = 0;
			counter = 0;
		}
		context.drawImage(img, startX * 40, 0, 40, 40, this.x, this.y, 40, 40);
		//context.drawImage(img,  40, 40, this.x, this.y, 40, 40);
		
	}
}

var platforms = [];
var platform_width = 180;
var platform_height = 10;

platforms.push({
    x: 50,
    y: 50,
    width: platform_width,
    height: platform_height,
});
platforms.push({
    x: 750,
    y: 500,
    width: platform_width,
    height: platform_height,
});
platforms.push({
    x: 250,
    y: canvas.height-160,
    width: 400,
    height: platform_height,
});
platforms.push({
    x: 250,
    y: 200,
    width: platform_width,
    height: platform_height,
});

platforms.push({
    x: 700,
    y: 300,
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

// Right Wall
platforms.push({
	x: canvas.width,
	y: 0,
	width: 10,
	height: canvas.height
});



startGame();

function startGame()
{
	gameStarted = true;
	//clearCanvas();
	requestAnimationFrame(loop);
}

document.body.addEventListener("keydown", function(event)
{
	keys[event.keyCode] = true;
});

document.body.addEventListener("keyup", function(event)
{
	keys[event.keyCode] = false;
	if (event.keyCode == 32)
	{
		clearInterval(charger);
		player.charging = false;
		if (player.jumpStrength > 0)
		{
			player.velY = - 6 - player.jumpStrength * .6;
			player.jumping = true;
			if (player.position == "left")
			{
				player.velX = -5;
			}
			else
			{
				player.velX = 5;
			}
		}
		player.jumpStrength = 0;
	}
});

function drawPlatforms()
{
	context.fillStyle = "#000000";
	context.strokeStyle = "#907020";
	context.lineWidth = 5;
	for(var i = 0; i < platforms.length; i++){
		context.fillRect(platforms[i].x, platforms[i].y, 20, platforms[i].height);
		context.fillRect(platforms[i].x + platforms[i].width - 20, platforms[i].y, 20, platforms[i].height);
		context.strokeRect(platforms[i].x, platforms[i].y-2, platforms[i].width, 5);
	}
}

function drawBackground(){
	context.fillStyle = "#87CEEB";
	context.fillRect(0, 0, canvas.width, canvas.height);
	let imgSize = 225;
	for (let i = 0; i < canvas.width; i += imgSize)
	{
		for (let j = 0; j < canvas.height; j+= imgSize)
		{
			context.drawImage(wallImg, i, j);
		}
	}
	// canvas.width, canvas.height);
}

function drawJumpPower()
{
	let boxHeight = 100;
	context.fillStyle = "#0000ff";
	context.fillRect(20, 20, 30, boxHeight);
	
	if (player.jumpStrength == 0)
	{
		return;
	}
	let size = (player.maxJumpStrength - player.jumpStrength) * 10;
	context.fillStyle = "#ff0000";
	context.fillRect(20, 20 + size, 30, boxHeight - size);
}

function chargeJump()
{
	player.jumpStrength += .25;
	player.jumpStrength = Math.min(player.jumpStrength, player.maxJumpStrength);
}

function loop()
{
	clearCanvas();
	drawBackground();
	drawPlatforms();
	player.draw();
	drawJumpPower();
	context.fillText(player.jumpStrength, 20, 20);
	if(keys[32] && !player.charging && !player.jumping)
	{
		//console.log("32");
		player.charging = true;
		charger = setInterval(chargeJump, 25);
	}
	
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