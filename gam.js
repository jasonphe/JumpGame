var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var gameStarted = false;
var victory = false;
var friction = 0.8;
var gravity = 0.5;
var keys = [];
var charger;
var animationCounter = 0;
var animator = setInterval(function(){ animationCounter++;}, 100);
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
wallImg.src = "darkWall.png";
var torchImg = new Image();
torchImg.src = "torch.png";
var windowImg = new Image();
windowImg.src = "window.png";
var powerImg = new Image();
powerImg.src = "power.png";
var heartImg = new Image();
heartImg.src = "heart.png";


var player = {
	x: 400,
	y: 100,
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
var objects = [];

var platform_width = 180;
var platform_height = 10;
var allPlatforms = 
[
	//1
	[
		{
			 x: 750,
			 y: 500,
			 width: platform_width,
			 height: platform_height,
		},
		{
			 x: 250,
			 y: canvas.height-160,
			 width: 400,
			 height: platform_height,
		},
		{
			 x: 700,
			 y: 300,
			 width: platform_width,
			 height: platform_height,
		},
		{
			 x: 450,
			 y: 200,
			 width: platform_width,
			 height: platform_height,
		},
		{
			 x: 250,
			 y: 150,
			 width: platform_width,
			 height: platform_height,
		},
		{
			 x: 50,
			 y: 100,
			 width: platform_width,
			 height: platform_height,
		},
		{
			x: 0,
			y: canvas.height-5,
			width: canvas.width,
			height: platform_height
		}
	],
	//2
	[
		{
			 x: 250,
			 y: canvas.height-40,
			 width: 800,
			 height: platform_height,
		},
		{
			 x: 250,
			 y: canvas.height-160,
			 width: 400,
			 height: platform_height,
		},
		{
			 x: 700,
			 y: 300,
			 width: platform_width,
			 height: platform_height,
		},
	]
];

var allObjects = 
[
	//1
	[
		{
			type: "torch",
			x: 50,
			y: 25,
		},
		{
			type: "torch",
			x: 800,
			y: 225,
		},
		{
			type: "window",
			x: 500,
			y: 59,
		},
		{
			type: "torch",
			x: 400,
			y: 480,
		},
		{
			type: "heart",
			x: 700,
			y: 20,
		},
	],
	//2
	[
		{
			type: "torch",
			x: 50,
			y: 50,
		},
		{
			type: "torch",
			x: 250,
			y: canvas.height-160,
		},
		{
			type: "torch",
			x: 700,
			y: 300,
		},
		{
			type: "torch",
			x: 450,
			y: 200,
		}
	]
];

startGame();

function startGame()
{
	gameStarted = true;
	loadStage();
	requestAnimationFrame(loop);
}

function loadStage()
{
	platforms = allPlatforms[stage - 1];
	platforms.push({
			x: -10,
			y: 0,
			width: 10,
			height: canvas.height,
			invis: true
		});
	platforms.push({
			x: canvas.width,
			y: 0,
			width: 10,
			height: canvas.height,
			invis: true
		});
		
	objects = allObjects[stage - 1];
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
	for(let i = 0; i < platforms.length; i++){
		if ("invis" in platforms[i] && platforms[i].invis)
		{
			continue;
		}
		context.fillRect(platforms[i].x, platforms[i].y, 20, 10);
		context.fillRect(platforms[i].x + platforms[i].width - 20, platforms[i].y, 20, 10);
		context.strokeRect(platforms[i].x, platforms[i].y-2, platforms[i].width, 5);
	}
}

function drawObjects()
{
	for(let i = 0; i < objects.length; i++)
	{
		let object = objects[i];
		switch (object.type)
		{
			case "torch":
			{
				context.drawImage(torchImg, ((animationCounter + i) % 3) * 40, 0, 40, 40, object.x, object.y, 40, 40);
				break;
			}
			case "window":
			{
				context.drawImage(windowImg, object.x, object.y);
				break;
			}
			case "heart":
			{
				let movement = (animationCounter% 10) - 5;
				context.drawImage(heartImg, object.x, object.y + Math.abs(movement));
				break;
			}
		}
	}
}

function drawBackground(){
	//context.fillStyle = "#87CEEB";
	//context.fillRect(0, 0, canvas.width, canvas.height);
	let imgSize = 225;
	for (let i = 0; i < canvas.width; i += imgSize)
	{
		for (let j = 0; j < canvas.height; j+= imgSize)
		{
			context.drawImage(wallImg, i, j);
		}
	}
}

function drawJumpPower()
{
	let boxHeight = 100;
	context.fillStyle = "#0000ff";
	context.fillRect(20, 20, 30, boxHeight);
	context.drawImage(powerImg, 15, 120);
	
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
	drawObjects();
	drawPlatforms();
	player.draw();
	drawJumpPower();
	if(keys[32] && !player.charging && player.grounded)
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
	
	if(player.grounded)
	{
		player.velY = 0;
		player.jumping = false;
	}
	
	if (player.y <= 0)
	{
		stage++;
		loadStage();
		player.y = canvas.height - player.height;
	}
	else if (player.y + player.height >= canvas.height)
	{
		stage--;
		loadStage();
		player.y = 0;
	}
	
	requestAnimationFrame(loop);
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