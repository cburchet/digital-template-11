window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() 
    {
        game.load.image( 'crosshair', 'assets/crosshair.png' );
        game.load.image( 'target1', 'assets/target1.png' );
        game.load.image( 'target2', 'assets/target2.png' );
        game.load.image( 'target3', 'assets/target3.png' );
        game.load.image('bullet', 'assets/bullet.png');
    }
    
    var crosshair;
    var group1;
    var target1;
    var group2;
    var target2;
    var group3;
    var target3;
    
    var bullet;
    var fireRate = 100;
    var nextFire = 0;
    
    function create() 
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        crosshair = game.add.sprite(game.input.activePointer.x, game.input.activePointer.y, 'crosshair');
       // crosshair.scale.setTo(.25);
        
        group1 = game.add.group();
        group1.enableBody = true;
        group2 = game.add.group();
        group2.enableBody = true;
        group3 = game.add.group();
        group3.enableBody = true;
        
        
        game.time.events.loop(Phaser.Timer.SECOND * 3, sendTarget1, this);
        game.time.events.loop(Phaser.Timer.SECOND * 5, sendTarget2, this);
        game.time.events.loop(Phaser.Timer.SECOND * 7, sendTarget3, this);
    }
    
    function update() 
    {
        
        crosshair.x = game.input.activePointer.x - 16;
        crosshair.y = game.input.activePointer.y - 16; 

    }
    
    function fire()
    {
    	if (game.time.now > nextFire)
    	{
    		nextFire = game.time.now + fireRate;
	    	bullet = game.add.sprite(game.input.activePointer.x, game.input.activePointer.y, 'bullet');
	    	bullet.lifespan = 50;
    	}
    }
    
    function sendTarget1()
    {
        target1 = group1.create(-150, 450, 'target1');
        target1.body.velocity.x = 150;
    }
    
    function sendTarget2()
    {
        target2 = group2.create(-150, 300, 'target2');
        target2.body.velocity.x = 185;
    }
    
    function sendTarget3()
    {
        target3 = group3.create(-150, 150, 'target3');
        target3.body.velocity.x = 220;
    }
};
