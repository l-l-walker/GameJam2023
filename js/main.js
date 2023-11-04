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


function preload() {

    resources.preload();
    currentPlayer.preload();
    allBabies.preload();
   // bg = loadImage("./assets/background/bg.png");
}

function setup() {
    new Canvas(1000, 800);

    //Access the resource_sprite method in the Resource class 
    resources.resource_sprite();
    //Honey
    honey = resources.getHoney();

    //Call the player_sprite method  in the player class 
    currentPlayer.player_sprite();

    //Access the player method in the player class which returns the player object 
    player = currentPlayer.getPlayer();

    // player overlapping with the resource 'honey'
    player.overlapping(honey, resources.collect);

}

function draw() {
    clear();
    background("green");
    playerMenu.player_resources_menu();

    // player stuff
    currentPlayer.player_movement();
    currentPlayer.player_path();

    // babies
    allBabies.create_baby();
    allBabies.baby_follow();
    allBabies.draw();

    // player resources
    currentPlayer.test_selector();
}

// key pressed function
function keyPressed() {
    if (keyCode === 69) {
        print("show player resource")
        playerMenu.resource_menu_switch = !playerMenu.resource_menu_switch;
    }
}

