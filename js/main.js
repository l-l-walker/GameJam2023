"use strict";

// baby ship variables
let babies, baby;
let babies_x, babies_y;
let baby_alive = false;

let player, honey;
let bg;


//Instantiate Resource and Plater Class 
let resources = new Resource();
let currentPlayer = new Player();
let allBabies = new Baby(resources, currentPlayer);
let playerMenu = new Player_Menu(resources);
let playerSelector = new Selector(currentPlayer);


function preload() {
    // Classes
    resources.preload();
    currentPlayer.preload();
    allBabies.preload();
    
    // Background Image
    bg = loadImage("./assets/background/bg.png");
}

function setup() {
    new Canvas(1000, 800);

    //Access the resource_sprite method in the Resource class 
    resources.resource_sprite();
    honey = resources.getHoney();

    //Call the player_sprite method  in the player class 
    currentPlayer.player_sprite();
    player = currentPlayer.getPlayer();

    // player overlapping with the resource 'honey'
    player.overlapping(honey, resources.collect);

    // player menu
    playerMenu.changePlayerImgBtn();

    // Player movement
    currentPlayer.playerMovementBtn();
}

function draw() {
    clear();
    // Assign Background
    background(bg);

    // Draw Player and Resource Sprites first
    resources.honey.draw();
    currentPlayer.player.draw();

    // Resource functions
    // resources.checkLife();

    // Player class functions
    if (currentPlayer.playerMovementSwitch) {
        currentPlayer.player.scale = 1;
        if (mouseIsPressed) {
            // Draw player path continuously when clicking
            currentPlayer.player_movement();
        } else {
            // Draw player path only when hovering
            currentPlayer.player_path();
        }
    }
    else {
        currentPlayer.player.scale = 0.7;
        currentPlayer.player_path();
    }

    // Baby class functions
    allBabies.create_baby();
    allBabies.baby_follow();
    // allBabies.draw();
    
    // Player Resource menu is drawn last to be on the top layer
    playerMenu.player_resources_menu();

    // Selector
    // playerSelector.test_selector();
}

// key pressed function
function keyPressed() {
    if (keyCode === 69) {
        print("show player resource")
        playerMenu.resource_menu_switch = !playerMenu.resource_menu_switch;
    }
    
    if (keyCode === 49) {
        print("player movement", currentPlayer.playerMovementSwitch)
        currentPlayer.playerMovementSwitch = !currentPlayer.playerMovementSwitch;
    }
}
