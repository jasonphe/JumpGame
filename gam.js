var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var stage = 1;
var friction = 0.8;
var gravity = 0.5;
var keys = [];
var charger;
var animationCounter = 0;
var animator = setInterval(function(){ animationCounter++;}, 100);
var counter = 0;
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
var wall2Img = new Image();
wall2Img.src = "wall2.png";
var torchImg = new Image();
torchImg.src = "torch.png";
var windowImg = new Image();
windowImg.src = "window.png";
var powerImg = new Image();
powerImg.src = "power.png";
var heartImg = new Image();
heartImg.src = "heart.png";
var grassImg = new Image();
grassImg.src = "grass.png";
var woodImg = new Image();
woodImg.src = "wood.png";
var doorImg = new Image();
doorImg.src = "door.png";

var platforms = [];
var objects = [];

var platform_width = 180;
var platform_height = 15;
var allPlatforms = 
[
	//0
	[
		{
			type: "grass",
			x: 0,
			y: 550,
			width: 1024,
			height: 50,
		},
		{
			type: "grass",
			x: 0,
			y: 100,
			width: 300,
			height: platform_height,
		},
		{
			type: "wall2",
			x: 800,
			y: 0,
			width: 300,
			height: 700,
		},
	],
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
			 y: 440,
			 width: 400,
			 height: platform_height,
		},
		{
			 x: 500,
			 y: 300,
			 width: 400,
			 height: platform_height,
		},
		{
			 x: 200,
			 y: 350,
			 width: platform_width,
			 height: platform_height,
		},
		{
			 x: 650,
			 y: 225,
			 width: platform_width,
			 height: platform_height,
		},
		{
			 x: 250,
			 y: 150,
			 width: 300,
			 height: platform_height,
		},
		{
			 x: 50,
			 y: 70,
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
			 y: 550,
			 width: 200,
			 height: platform_height,
		},
		{
			 x: 750,
			 y: 550,
			 width: 200,
			 height: platform_height,
		},
		{
			 x: 400,
			 y: 500,
			 width: 200,
			 height: platform_height,
		},
		{
			 x: 200,
			 y: 425,
			 width: 100,
			 height: platform_height,
		},
		{
			 x: 125,
			 y: 400,
			 width: 100,
			 height: platform_height,
		},
		{
			 x: 50,
			 y: 375,
			 width: 100,
			 height: platform_height,
		},
		{
			 x: 200,
			 y: 300,
			 width: 100,
			 height: platform_height,
		},
		{
			 x: 350,
			 y: 300,
			 width: 100,
			 height: platform_height,
		},
		{
			 x: 500,
			 y: 270,
			 width: 100,
			 height: platform_height,
		},
		{
			 x: 750,
			 y: 230,
			 width: 300,
			 height: platform_height,
		},
		{
			 x: 900,
			 y: 180,
			 width: 100,
			 height: platform_height,
		},
		{
			 x: 50,
			 y: 100,
			 width: 800,
			 height: platform_height,
		},
	],
	//3
	[
		{
			 x: 250,
			 y: 550,
			 width: 200,
			 height: platform_height,
		},
	],
	//4
	[
		{
			 x: 250,
			 y: 550,
			 width: 200,
			 height: platform_height,
		},
	],
];

var allObjects = 
[
	//0
	[
		{
			type: "door",
			x: 850,
			y: 400,
		}
	],
	//1
	[
		{
			type: "torch",
			x: 50,
			y: 25,
		},
		{
			type: "torch",
			x: 500,
			y: 225,
		},
		{
			type: "window",
			x: 700,
			y: 88,
		},
		{
			type: "torch",
			x: 400,
			y: 480,
		},
		{
			type: "heart",
			x: 800,
			y: 430,
			width: 40,
			height: 40,
			item: "ibis"
		},
	],
	//2
	[
		{
			type: "heart",
			x: 70,
			y: 30,
			width: 40,
			height: 40,
			item: "tpose"
		},
		{
			type: "torch",
			x: 450,
			y: 425,
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
		},
		{
			type: "window",
			x: 190,
			y: 165,
		},
		{
			type: "heart",
			x: 850,
			y: 480,
			width: 40,
			height: 40,
			item: "tpose"
		},
	],
	//3
	[
		{
			type: "torch",
			x: 450,
			y: 200,
		},
	],
	//4
	[
		{
			type: "torch",
			x: 450,
			y: 200,
		},
	],
	
];

var player = {
	x: 400,
	y: 50,
	width: 40,
	height: 40,
	speed: 5,
	velX: 0,
	velY: 0,
	color: "#ff0000",
	charging: false,
	jumping: false,
	grounded: false,
	maxJumpStrength: 7,
	hearts: 0,
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
	}
}


startGame();

function startGame()
{
	loadStage();
	requestAnimationFrame(loop);
}

function loadStage()
{
	platforms = allPlatforms[stage];
	platforms.push({
			x: -10,
			y: 0,
			width: 10,
			height: canvas.height,
			type: "invis"
		});
	platforms.push({
			x: canvas.width,
			y: 0,
			width: 10,
			height: canvas.height,
			type: "invis"
		});
		
	objects = allObjects[stage];
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
			player.velY = - 5 - player.jumpStrength * .8;
			player.jumping = true;
			if (player.position == "left")
			{
				player.velX = -5 - player.jumpStrength * .2;
			}
			else
			{
				player.velX = 5 + player.jumpStrength * .2;
			}
		}
		player.jumpStrength = 0;
	}
});

function drawPlatforms()
{
	for(let i = 0; i < platforms.length; i++)
	{
		let platform = platforms[i];
		let mainColor = "#907020";
		let secondaryColor = "#000000";
		let img = woodImg;
		if ("type" in platform)
		{
			switch (platform.type)
			{
				case "invis":
				{
					continue;
					break;
				}
				case "grass":
				{
					img = grassImg;
					secondaryColor = "#907020";
					break;
				}
				case "wall2":
				{
					img = wall2Img;
				}
			}
		}
		
		context.fillStyle = secondaryColor;
		context.fillRect(platform.x + 5, platform.y, platform.width - 10, platform.height + 5);
		//context.fillRect(platform.x + platform.width - 20, platform.y, 20, platform.height + 5);
		//context.fillStyle = mainColor;
		let imgSize = img.width;
		let right = platform.x + platform.width;
		let bottom = platform.y + platform.height;
		for (let i = platform.x; i < right; i += imgSize)
		{
			for (let j = platform.y - 2; j < bottom; j+= imgSize)
			{
				let width = Math.min(right- i, imgSize);
				let height = Math.min(bottom - j, imgSize);
				context.drawImage(img, 0, 0, width, height, i, j, width, height);
			}
		}
		//context.fillRect(platform.x, platform.y, platform.width, platform.height);
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
			case "door":
			{
				context.drawImage(doorImg, object.x, object.y);
				break;
			}
		}
	}
}

function drawBackground(){
	if (stage == 0)
	{
		context.fillStyle = "#87CEEB";
		context.fillRect(0, 0, canvas.width, canvas.height);
		return;
	}
	
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
	//draw bar
	let boxHeight = player.maxJumpStrength * 10;
	let bottomBar = 150;
	let topBar = 150 - boxHeight;
	context.fillStyle = "#0000ff";
	context.fillRect(20, topBar, 30, boxHeight);
	context.drawImage(powerImg, 15, bottomBar + 5);
	
	//draw charged part
	let size = player.jumpStrength * 10;
	context.fillStyle = "#ff0000";
	context.fillRect(20, bottomBar - size, 30, size);
}

function chargeJump()
{
	player.jumpStrength += .25;
	player.jumpStrength = Math.min(player.jumpStrength, player.maxJumpStrength);
}

function draw()
{
	clearCanvas();
	drawBackground();
	drawObjects();
	drawPlatforms();
	player.draw();
	drawJumpPower();
}

function loop()
{
	draw();
	if(keys[32] && !player.charging && player.grounded)
	{
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
	let grounded = false;
	for(var i = 0; i < platforms.length; i++){
		var direction = platformCollisionCheck(platforms[i]);

		if(direction == "left" || direction == "right"){
			player.velX *= -.1;
		} else if(direction == "bottom"){
			player.jumping = false;
			grounded = true;
		} else if(direction == "top"){
			player.velY = 0;
		}
	}
	player.grounded = grounded;
	
	itemCollisionCheck();
	
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

function platformCollisionCheck(platform){

	var collisionDirection = null;
	var vectorX = (player.x + (player.width/2)) - (platform.x + (platform.width/2));
	var vectorY = (player.y + (player.height/2)) - (platform.y + (platform.height/2));

	var halfWidths = (player.width/2) + (platform.width/2);
	var halfHeights = (player.height/2) + (platform.height/2);

	if(Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights){

		var offsetX = halfWidths - Math.abs(vectorX);
		var offsetY = halfHeights - Math.abs(vectorY);
		if(offsetX < offsetY){

			if (vectorX > 0){
				collisionDirection = "left";
				player.x += offsetX;
			} else {
				collisionDirection = "right";
				player.x -= offsetX;
			}

		} else {

			if (vectorY > 0){
				collisionDirection = "top";
				player.y += offsetY;
			} else {
				collisionDirection = "bottom";
				player.y -= offsetY;
			}

		}

	}

	return collisionDirection;
}

function itemCollisionCheck()
{
	for (let i = 0; i < objects.length; i++)
	{
		let object = objects[i];
		if (object.type == "heart")
		{
			if (intersect(player, object))
			{
				player.hearts++;
				player.maxJumpStrength = 5 + player.hearts;
				objects.splice(i, 1);
			}
		}
	}
}

function intersect(a, b) 
{
  return (a.x <= (b.x + b.width) &&
          b.x <= (a.x + a.width) &&
          a.y <= (b.y + b.height) &&
          b.y <= (a.y + a.height))
}

function clearCanvas()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
}