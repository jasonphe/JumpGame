var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

const castleLevels = 5;
var stage = 0;
var friction = 0.8;
var gravity = 0.5;
var keys = [];
var charger;
var paused = false;
var animationCounter = 0;
var animator = setInterval(function(){ animationCounter++;}, 100);
var counter = 0;
var drawText = none;
const imgFolder = "assets/";
var rightImg = new Image();
rightImg.src = imgFolder + "right.png";
var leftImg = new Image();
leftImg.src = imgFolder + "left.png";
var jumpLeftImg = new Image();
jumpLeftImg.src = imgFolder + "jumpLeft.png";
var jumpRightImg = new Image();
jumpRightImg.src = imgFolder + "jumpRight.png";
var wallImg = new Image(225, 225);
wallImg.src = imgFolder + "darkWall.png";
var wall2Img = new Image(225, 225);
wall2Img.src = imgFolder + "wall2.png";
var torchImg = new Image();
torchImg.src = imgFolder + "torch.png";
var windowImg = new Image();
windowImg.src = imgFolder + "window.png";
var powerImg = new Image();
powerImg.src = imgFolder + "power.png";
var heartImg = new Image();
heartImg.src = imgFolder + "heart.png";
var grassImg = new Image();
grassImg.src = imgFolder + "grass.png";
var woodImg = new Image();
woodImg.src = imgFolder + "wood.png";
var doorImg = new Image(165, 165);
doorImg.src = imgFolder + "door.png";
var binChickenImg = new Image();
binChickenImg.src = imgFolder + "binChicken.png";
var redPandaImg = new Image();
redPandaImg.src = imgFolder + "redPanda.png";
var tposeImg = new Image();
tposeImg.src = imgFolder + "tpose.png";
var yuyukosImg = new Image();
yuyukosImg.src = imgFolder + "yuyukos.png";


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
			width: 400,
			height: platform_height,
		},
		{
			type: "grass",
			x: 700,
			y: 100,
			width: 100,
			height: platform_height,
		},
		{
			type: "wall2",
			x: 800,
			y: 0,
			width: 300,
			height: 550,
			intangible: true,
		},
	],
	//1
	[
		{
			type: "wall2",
			x: 800,
			y: 0,
			width: 300,
			height: canvas.height,
			intangible: true,
		},
	],
	//2
	[
		{
			type: "wall2",
			x: 800,
			y: 0,
			width: 300,
			height: canvas.height,
			intangible: true,
		},
	],
	//3
	[
		{
			type: "wall2",
			x: 800,
			y: 0,
			width: 300,
			height: canvas.height,
			intangible: true,
		},
	],
	//4
	[
		{
			type: "wall2",
			x: 800,
			y: 0,
			width: 300,
			height: canvas.height,
			intangible: true,
		},
		{
			 x: 700,
			 y: 275,
			 width: 400,
			 height: platform_height,
		},
	],
	//5
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
			 x: 0,
			 y: 300,
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
			y: 550,
			width: canvas.width,
			height: 30
		}
	],
	//6
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
	//7
	[
		{
			 x: 250,
			 y: 550,
			 width: 200,
			 height: platform_height,
		},
	],
	//8
	[
		{
			 x: 250,
			 y: 550,
			 width: 200,
			 height: platform_height,
		},
	],
	//9
	[
		{
			 x: 750,
			 y: 550,
			 width: 200,
			 height: platform_height,
		},
		{
			 x: 350,
			 y: 450,
			 width: 200,
			 height: platform_height,
		},
		{
			 x: 0,
			 y: 275,
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
			type: "heart",
			x: 730,
			y: 30,
			width: 40,
			height: 40,
			item: "secret"
		},
		{
			type: "door",
			x: 830,
			y: 400,
			width: doorImg.width,
			height: doorImg.height,
			stage: 5,
			newx: 200,
			newy: 500,
		},
		{
			type: "yuyukos",
			x: 600,
			y: 350,
			width: 150,
			height: 200,
		},
		{
			type: "torch",
			x: 880,
			y: 30,
		},
		{
			type: "torch",
			x: 820,
			y: 250,
		},
		{
			type: "torch",
			x: 950,
			y: 250,
		},
	],
	//1
	[],
	//2
	[],
	//3
	[],
	//4
	[
		{
			type: "door",
			x: 950,
			y: 120,
			width: doorImg.width,
			height: doorImg.height,
			stage: 9,
			newx: 80,
			newy: 200,
		},
	],
	//5
	[
		{
			type: "door",
			x: 0,
			y: 400,
			width: doorImg.width,
			height: doorImg.height,
			stage: 0,
			newx: 750,
			newy: 500,
		},
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
			y: 85,
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
	//6
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
			y: 162,
		},
		{
			type: "heart",
			x: 850,
			y: 480,
			width: 40,
			height: 40,
			item: "red panda"
		},
	],
	//7
	[
		{
			type: "torch",
			x: 450,
			y: 200,
		},
	],
	//8
	[
		{
			type: "torch",
			x: 450,
			y: 200,
		},
	],
	//9
	[
		{
			type: "door",
			x: -100,
			y: 120,
			width: doorImg.width,
			height: doorImg.height,
			stage: 4,
			newx: 900,
			newy: 200,
		},
		{
			type: "torch",
			x: 450,
			y: 470,
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
	maxJumpStrength: 10,
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
		let platformImg = woodImg;
		let imgSize = 40;
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
					platformImg = grassImg;
					secondaryColor = "#907020";
					break;
				}
				case "wall2":
				{
					platformImg = wall2Img;
					imgSize = wall2Img.width;
					break;
				}
			}
		}
		
		context.fillStyle = secondaryColor;
		context.fillRect(platform.x + 5, platform.y, platform.width - 10, platform.height + 5);
		
		let right = platform.x + platform.width;
		let bottom = platform.y + platform.height;
		for (let i = platform.x; i < right; i += imgSize)
		{
			for (let j = platform.y - 2; j < bottom; j+= imgSize)
			{
				let drawWidth = Math.min(right- i, imgSize);
				let drawHeight = Math.min(bottom - j, imgSize);
				context.drawImage(platformImg, 0, 0, drawWidth, drawHeight, i, j, drawWidth, drawHeight);
			}
		}
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
			case "yuyukos":
			{
				context.drawImage(yuyukosImg, object.x, object.y);
				break;
			}
		}
	}
}

function drawBackground()
{
	if (stage < 5)
	{
		context.fillStyle = "#87CEEB";
		context.fillRect(0, 0, canvas.width, canvas.height);
		return;
	}
	
	let imgSize = wallImg.width;
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
	drawPlatforms();
	drawObjects();
	drawText();
	drawText = none;
	player.draw();
	drawJumpPower();
}

function loop()
{
	if (paused)
	{
		if (keys[13])
		{
			paused = false;
		}
		else
		{
			requestAnimationFrame(loop);
			return;
		}
	}
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
	player.velY = Math.min(10, player.velY);
	let grounded = false;
	for(var i = 0; i < platforms.length; i++){
		var direction = platformCollisionCheck(platforms[i]);

		if(direction == "left" || direction == "right"){
			player.velX *= -.4;
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
	if ("intangible" in platform && platform.intangible)
	{
		return;
	}
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
		if (intersect(player, object))
		{
			switch (object.type)
			{
				case "heart":
				{
					player.hearts++;
					player.maxJumpStrength = 5 + player.hearts;
					objects.splice(i, 1);
					itemPickup(object.item);
					break;
				}
				case "door":
				{
					stage = object.stage;
					player.x = object.newx;
					player.y = object.newy;
					player.velX = 0;
					player.velY = 0;
					loadStage();
					break;
				}
				case "yuyukos":
				{
					drawText = function() {
						drawSpeech(object, ["Hey! Some monkey stole my stuff", "and climbed to the top of the castle.", "Can you bring him to me?"]);
					};
					break;
				}
				case "zucc":
				{
					drawText = function() {
						drawSpeech(object, ["Howdy!", "", ""]);
					};
					break;
				}
			}
		}
	}
}

function itemPickup(item)
{
	let text1 = "";
	let text2 = "";
	let itemImg = binChickenImg;
	let continueText = "Press Enter to continue...";
	switch (item)
	{
		case "ibis":
		{
			text1 = "You open the heart to find a bin chicken (ibis) digging in the trash.";
			text2 = "For some reason you feel like you can jump slightly higher.";
			itemImg = binChickenImg;
			break;
		}
		case "tpose":
		{
			text1 = "It's Aphelios T-posing... ";
			text2 = "You T-pose in response to assert dominance.";
			itemImg = tposeImg;
			break;
		}
		case "red panda":
		{
			text1 = "You find a red panda!";
			text2 = "You feel energized by its cuteness.";
			itemImg = redPandaImg;
			break;
		}
	}
	
	context.fillStyle = "black";
	context.fillRect(30, 450, 950, 100);
	context.fillStyle = "white";
	context.font = "15px Arial";
	context.fillText(text1, 40, 475);
	context.fillText(text2, 40, 500);
	context.fillText(continueText, 40, 525);
	context.fillStyle = "red";
	let imgWidth = itemImg.width;
	let imgHeight = itemImg.height;
	let centeredX = (canvas.width - imgWidth -20) / 2;
	let centeredY = (450 - imgHeight - 20) / 2;
	context.fillRect(centeredX, centeredY, imgWidth + 20, imgHeight + 20);
	context.drawImage(itemImg, centeredX + 10, centeredY + 10);
	paused = true;
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

function drawSpeech(object, text)
{
	context.fillStyle = "white";
	let xRect = object.x - 40;
	let yRect = object.y - 40;
	context.fillRect(xRect, yRect, 300, 50);
	context.fillStyle = "black";
	context.font = "15px Arial";
	context.fillText(text[0], xRect + 5, yRect + 15);
	context.fillText(text[1], xRect + 5, yRect + 30);
	context.fillText(text[2], xRect + 5, yRect + 45);
}

function none(){}