"use strict";

// baby ship variables
let babies, baby;
let babies_x, babies_y;
let baby_alive = false;

let player, honey; 
// resource menu
let resource_menu_switch = false;

 //Instantiate Resource and Plater Class 
 let resources = new Resource();
 let currentPlayer = new Player();
 let allBabies = new Baby(resources, currentPlayer);


function preload(){

    resources.preload();
    currentPlayer.preload();
    allBabies.preload();
}

function setup(){
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

function draw(){
    clear();
    background(125);

    // player stuff
    currentPlayer.player_movement();
    currentPlayer.player_path();

    // babies
    allBabies.create_baby();
    allBabies.baby_follow();
    allBabies.draw();

    // player resources
    player_resources_menu();
    currentPlayer.test_selector();

}


// must change, the text looks gross rn
function player_resources_menu(){
    if (resource_menu_switch){
        // menu box
        push();
        fill(242, 208, 208, 200);
        strokeWeight(0);
        rect(0, 0, 200, canvas.h);
        pop();

        // text and resource icon
        push();
        textSize(20);
        text(`Player resource:`, 10, 20);
        text(`honey: ${resources.resource_counter}`, 50, 55);
        fill("#fcba03");
        square(10, 40, 20); // will change this to the image for honey
        pop();
    }
}

// key pressed function
function keyPressed(){
    if(keyCode === 82){
        print("show player resource")
        resource_menu_switch = !resource_menu_switch;
    }
}


