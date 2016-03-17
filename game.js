var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

	game.load.image('sky', 'images/sky.png');
	game.load.image('ground', 'images/platform.png');
	game.load.image('star', 'images/star.png');
	game.load.image('health', 'images/firstaid.png');
	game.load.image('jewel', 'images/diamond.png');
	game.load.image('ball', 'images/ball.png');
	game.load.spritesheet('dude', 'images/dude.png', 32, 48);
	//game.load.spritesheet('baddie', 'images/baddie.png', 0, 0)

}

var platforms;

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.add.sprite(0, 0, 'sky');

	platforms = game.add.group();
	platforms.enableBody = true;

	var ground = platforms.create(0, game.world.height - 64, 'ground');
	ground.scale.setTo(2, 2);
	ground.body.immovable = true;

	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-150, 250, 'ground');
	ledge.body.immovable = true;

	player = game.add.sprite(32, game.world.height - 150, 'dude');
	game.physics.arcade.enable(player);

	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;

	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8,], 10, true);

	//enemy = game.add.sprite(616, game.world.height - 150, 'baddie');
	//game.physics.arcade.enable(enemy);

	//enemy.body.bounce.y = 0.2;
	//enemy.body.gravity.y = 300;
	//enemy.body.collideWorldBounds = true;

	/*stars = game.add.group();

	stars.enableBody = true;

	for (var i = 0; i < 12; i++) {
		var star = stars.create(i * 70, 0, 'star');
		star.body.gravity.y = 70;
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}*/

	balls = game.add.group();
	balls.enableBody = true;

	for (var i = 0; i < 6; i++) {
		var ball = balls.create(i * 140, 0, 'ball');
		ball.body.gravity.y = 200;
		ball.body.bounce.y = 1;

		if (ball.y >= game.world.height) {
			ball.collideWorldBounds = false;
		} else {
			ball.collideWorldBounds = true;
		}
	}

	jewel = game.add.sprite(84, 166, 'jewel');
	game.physics.arcade.enable(jewel);

	jewel.body.immovable = true;

	healths = game.add.group();
	healths.enableBody = true;

	/*for (var i = 0; i < 4; i++) {
		var health = healths.create(i * 70, 0, 'health');
		health.body.gravity.y = 70;
		health.body.bounce.y = 0.2;
	}*/

}

/*function collectStar(player, star) {

	star.kill();

	score += 10;
	scoreText.text = 'Score: ' + score;

}*/

function ballAttack(player, ball) {

	player.kill();
	loseText = game.add.text(150, 255, 'You Lose!', { fontSize: '100px', fill: '#e74c3c' });

}

function hitJewel(player, jewel) {

	winText = game.add.text(200, 225, 'You Win!', { fontSize: '100px', fill: '#f1c40f' });

}

function update() {

	game.physics.arcade.collide(player, platforms);
	player.body.velocity.x = 0;

	//game.physics.arcade.collide(enemy, platforms);
	//enemy.body.velocity.x = 0;

	game.physics.arcade.collide(jewel, platforms);
	jewel.body.velocity.x = 0;

	cursors = game.input.keyboard.createCursorKeys();

	if (cursors.left.isDown) {
		player.body.velocity.x = -150;
		player.animations.play('left');
	}
	else if (cursors.right.isDown) {
		player.body.velocity.x = 150;
		player.animations.play('right');
	}
	else {
		player.animations.stop();
		player.frame = 4;
	}

	if (cursors.up.isDown && player.body.touching.down) {
		player.body.velocity.y = -350;
	}

	//game.physics.arcade.collide(stars, platforms);
	//game.physics.arcade.overlap(player, stars, collectStar, null, this);

	game.physics.arcade.collide(balls, platforms);
	game.physics.arcade.collide(player, balls, ballAttack, null , this)
	game.physics.arcade.collide(balls, balls);

	game.physics.arcade.collide(player, jewel, hitJewel, null, this)

}
