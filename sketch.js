var birdy,birdyAnimation;
var enemy_dragon,enemy_dragon_moving;
var obstacle1a,obsatcle1b,obstacle2a,obstacle2b,obstacle3a,obstacle3b,obstacle4a,obstacle4b,obstacle5a,obstacle5b,obstacle6a,obstacle6b,obstacleImg;
var enemy_projectile,enemy_projectileImg;
var flying_enemy1,flying_enemy2;
var flying_enemy_group,obstacles_group,enemy_projectiles_group;
var start_backgroundImg;
var backgroundImg;
var IRdown,IRup;
var start_button,startImg,logo,logoImg;
var restart_button_1,restart_button_1Img,game_over,game_overImg;
var gamestate = 'start';
var score = 0;

function preload(){

    backgroundImg = loadImage('background(2).png');
    start_backgroundImg = loadImage('start background.png');
    startImg = loadImage('pixil-frame-0(1).png');
    birdyAnimation = loadAnimation('pixil-frame-0(2).png','Birdy-2-removebg-preview.png');
    logoImg = loadImage('pixil-frame-0.png');
    obstacleImg = loadImage('Colums_uncropped_background-removebg-preview.png');
    enemy_projectileImg = loadImage('Enemy_projectile_2.0-removebg-preview.png');
    restart_button_1Img = loadImage('Restart_button-removebg-preview.png');
    
}

function setup() {
    createCanvas(1000,500)

    //Objects in start gamestate
    start_button = createSprite(500,310,50,25);
    start_button.scale = 5;
    start_button.addImage(startImg);

    logo = createSprite(500,150,100,40);
    logo.scale = 4;
    logo.addImage(logoImg);   
    
    //Objects in play gamestate
    birdy = createSprite(350,150,20,50);
    birdy.scale = 0.17;
    birdy.addAnimation('flying',birdyAnimation);
    birdy.visible = false;
    birdy.setCollider('circle',0,0,40);

    enemy_dragon = createSprite(100,100,30,60);
    enemy_dragon.velocityY = 10;
    enemy_dragon.visible = false;

    IRdown = createSprite(500,500,1000,20);
    IRdown.visible = false;

    IRup = createSprite(500,0,1000,20);
    IRup.visible = false;

    //Groups
    obstacles_group = new Group();
    flying_enemy_group = new Group();
    enemy_projectiles_group = new Group();

    // Objects in restart/game over gamestate
    restart_button_1 = createSprite(500,250,50,100);
    restart_button_1.addImage(restart_button_1Img);
    restart_button_1.scale = 0.5;
    restart_button_1.visible = false;

 
}

function draw() {
    background(backgroundImg);

    //Start mode code
    if (gamestate === 'start') {

    //Code to start the game
    if (mousePressedOver(start_button)) {

        gamestate = 'play';
        start_button.visible = false;
        start_button.destroy();
        logo.visible = false;
        logo.destroy();

    }

    }    

    //Play mode code
    if (gamestate === 'play'){

        birdy.visible = true;
        enemy_dragon.visible = true;
        text('Score:'+ score,30,50);
        
        //Score code
        if (frameCount % 35 === 0) {

            score = score + 1;

        }

        //Birdy code
        if (keyDown('space')) {

            birdy.y = birdy.y - 15;
            birdy.rotation = -25;

        }
        
        else if (birdy.rotation = -25) {

            birdy.rotation = 25;

        }

        //Game over code
        if (birdy.isTouching(obstacles_group)) {

            obstacles_group.setVelcoityXEach(0);
            gamestate = 'restart';

        }

        if (birdy.isTouching(flying_enemy_group)) {

            birdy.collide();
            gamestate = 'restart';

        }

        if (birdy.isTouching(IRdown)) {
            birdy.y = 490;
            gamestate = 'restart';
        }

        if (birdy.isTouching(IRup)) {

            birdy.y = 490;
            gamestate = 'restart';

        }

        if (birdy.isTouching(enemy_projectiles_group)) {

            birdy.collide();
            gamestate = 'restart';

        }

        birdy.collide(IRdown);
        birdy.collide(IRup);
        birdy.collide(obstacles_group);
        birdy.collide(flying_enemy_group);

        birdy.y = birdy.y + 7.4;

        //Enemy_dragon code
        if (enemy_dragon.isTouching(IRup)) {

            enemy_dragon.velocityY = 10;

        }

        if (enemy_dragon.isTouching(IRdown)) {

            enemy_dragon.velocityY = -10;

        }

        spawn_enemy_projectiles();
        spawn_flying_enemy();
        spawn_obstacles();

    }

    //Restart screen code
     if (gamestate === 'restart') {

        birdy.visible = true; 
        enemy_dragon.visible = false;

        restart_button_1.visible = true;

        obstacles_group.remove();
        flying_enemy_group.remove();
        enemy_projectile.remove();  

        if (mousePressedOver(restart_button)) {

            gamestate = 'start';
            score = 0;

        }

    }

    drawSprites();
 
}

function spawn_enemy_projectiles ()  {
    //Enemy projectiles code
    if (frameCount % 100 === 0) {

        var enemy_projectile = createSprite(enemy_dragon.x,enemy_dragon.y,50,10);
        enemy_projectile.addImage(enemy_projectileImg);
        enemy_projectile.scale = 0.075;
        enemy_projectile.velocityX = 10;
        enemy_projectile.lifetime = 700;

        enemy_projectiles_group.add(enemy_projectile);

    }

}

function spawn_flying_enemy () {
    //Flying enemy code
    if (frameCount % 120 === 0) {

        var flying_enemy1 = createSprite(1000,Math.round(random(200,400)),20,50);
        flying_enemy1.velocityX = -15;
        flying_enemy1.lifetime = 600;

        flying_enemy_group.add(flying_enemy1);

    }

    if (frameCount % 150 === 0) {

        var flying_enemy2 = createSprite(1000,Math.round(random(100,400)),10,25);
        flying_enemy2.velocityY = -20;
        flying_enemy2.lifetime = 600;
        flying_enemy_group.add(flying_enemy2);

    }

}

function spawn_obstacles () {
    //Obstacles code
    if (frameCount % 35 === 0) {

        var rand = Math.round(random(2,5));
        switch(rand) {
            case 1:  obstacle1a = createSprite(1000,50,50,100);
                     obstacle1a.addImage(obstacleImg);
                     obstacle1a.scale = 0.5;
                     obstacle1a.velocityX = -10;
                     obstacle1a.lifetime = 800;
                     obstacles_group.add(obstacle1a);

                     obstacle1b = createSprite(1000,450,50,200);
                     obstacle1b.addImage(obstacleImg);
                     obstacle1b.scale = 0.5;
                     obstacle1b.velocityX = -10;
                     obstacle1b.lifetime = 800;
                     obstacles_group.add(obstacle1b);
            break;
            case 2:  obstacle2a = createSprite(1000,50,50,300);
                     obstacle2a.addImage(obstacleImg); 
                     obstacle2a.scale = 0.5;
                     obstacle2a.velocityX = -10;
                     obstacle2a.lifetime = 800;
                     obstacles_group.add(obstacle2a);

                     obstacle2b = createSprite(1000,450,50,200);
                     obstacle2b.addImage(obstacleImg);
                     obstacle2b.scale = 0.5;
                     obstacle2b.velocityX = -10;
                     obstacle2b.lifetime = 800;
                     obstacles_group.add(obstacle2b);
            break;
            case 3:  obstacle3a = createSprite(1000,450,50,400);
                     obstacle3a.addImage(obstacleImg);
                     obstacle3a.scale = 0.5;
                     obstacle3a.velocityX = -10;
                     obstacle3a.lifetime = 800;
                     obstacles_group.add(obstacle3a);

                     obstacle3b = createSprite(1000,50,50,150);
                     obstacle3b.addImage(obstacleImg);
                     obstacle3b.scale = 0.5;
                     obstacle3b.velocityX = -10;
                     obstacle3b.lifetime = 800;
                     obstacles_group.add(obstacle3b);
            break;
            case 4:  obstacle4a = createSprite(1000,50,50,400);
                     obstacle4a.addImage(obstacleImg);
                     obstacle4a.scale = 0.5;
                     obstacle4a.velocityX = -10;
                     obstacle4a.lifetime = 800;
                     obstacles_group.add(obstacle4a);

                     obstacle4b = createSprite(1000,450,50,150);
                     obstacle4b.addImage(obstacleImg);
                     obstacle4b.scale = 0.5;
                     obstacle4b.velocityX = -10;
                     obstacle4b.lifetime = 800;
                     obstacles_group.add(obstacle4b);
            break;
            case 5:  obstacle5a = createSprite(1000,450,50,100);
                     obstacle5a.addImage(obstacleImg);
                     obstacle5a.scale = 0.5;
                     obstacle5a.velocityX = -10;
                     obstacle5a.lifetime = 800;
                     obstacles_group.add(obstacle5a);

                     obstacle5b = createSprite(1000,50,50,350);
                     obstacle5b.addImage(obstacleImg);
                     obstacle5b.scale = 0.5;
                     obstacle5b.velocityX = -10;
                     obstacle5b.lifetime = 800;
                     obstacles_group.add(obstacle5b);
            break;
            case 6:  obstacle6a = createSprite(1000,450,50,500);
                     obstacle6a.addImage(obstacleImg);
                     obstacle6a.scale = 0.5;
                     obstacle6a.velocityX = 10;
                     obstacle6a.lifetime = 800;
                     obstacles_group.add(obstacle6a);
                     
                     obstacle6b = createSprite(1000,50,50,100);
                     obstacle6b.addImage(obstacleImg);
                     obstacle6b.scale = 0.5;
                     obstacle6b.velocityX = -10;
                     obstacle6b.lifetime = 800;
                     obstacles_group.add(obstacle6b);
            break;

            default: break;

        }

        

    }

}


