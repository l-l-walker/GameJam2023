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
}

function draw() {
    clear();
    // Assign Background
    background(bg);

    // Draw Player and Resource Sprites first
    resources.honey.draw();
    currentPlayer.player.draw();
    
    // Player class functions
    currentPlayer.player_movement();
    currentPlayer.player_path();
    
    // Baby class functions
    allBabies.create_baby();
    allBabies.baby_follow();
    allBabies.draw();
    
    // Player Resource menu is drawn last to be on the top layer
    playerMenu.player_resources_menu();

    // Selector
    playerSelector.test_selector();
}

// key pressed function
function keyPressed() {
    if (keyCode === 69) {
        print("show player resource")
        playerMenu.resource_menu_switch = !playerMenu.resource_menu_switch;
    }
}
