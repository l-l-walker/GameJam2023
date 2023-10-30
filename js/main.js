"use strict";
// player variables
let player, player_pointer;
let player_x, player_y;

// mouse clicked position
let mouse_pos_x, mouse_pos_y;

// if mouse is clicked (player moving)
let player_moving = false;


// baby ship variables
let babies, baby;
let babies_x, babies_y;
let baby_alive = false;


// resources
let honey;
let honey_amount = 20;
let resource_counter = 0;

function preload(){

}

function setup(){
    new Canvas(1000, 800);

    resource_sprite();
    player_sprite();

    // player overlapping with the resource 'honey'
    player.overlaps(honey, collect);
}

function resource_sprite(){
    honey = new Group();
    honey.w = 15;
    honey.h = 15;
    honey.color = "#fcba03";
    // random spawn
    honey.x = () => random(0, canvas.w);
    honey.y = () => random(0, canvas.h);
    honey.amount = honey_amount;
    // want to add resource life and spawn more once the resource reaches a certain amount
}

function player_sprite(){
    player = new Sprite();
    player.h = 20;
    player.color = "pink";
    player.stroke = "red";
}

function collect(player, honey){
    honey.remove();
    resource_counter += 1;
    honey_amount -= 1;
}


function draw(){
    clear();
    background(125);

    // screen text
    player_resources_txt();
    available_resources_txt();

    // player stuff
    player_movement();
    player_path();

    // babies
    create_baby();
    baby_follow();
}

// must change, the text looks gross rn
function player_resources_txt(){
    push();
    textSize(30);
    text(`Player resource:`, 10, 700);
    fill("#fcba03");
    square(10, 725, 30); // will change this to the image for honey
    text(`honey: ${resource_counter}`, 50, 750);
    pop();
}

// must change, the text looks gross rn
function available_resources_txt(){
    push();
    textSize(30);
    text(`honey present: ${honey_amount}`, 10, 30);
    pop();
}


function player_movement(){
    if(mouse.presses()) {
        mouse_pos_x = mouse.position.x;
        mouse_pos_y = mouse.position.y;
        player_moving = true;
        player.moveTo(mouse, 2); // pos, speed
        player.rotateTo(mouse, 5, 0); //pos, speed, facing
    }
}

function player_path(){
    if(player_moving){
        push();
        player_x = player.position.x;
        player_y = player.position.y;
        let d = dist(player_x, player_y, mouse_pos_x, mouse_pos_y); // distance from the player to the mouse position
        let deltaX = (mouse_pos_x - player_x) / d;
        let deltaY = (mouse_pos_y - player_y) / d;
        // the pathing line 
        for (let i = 0; i < d; i += 10) {
            let x = player_x + i * deltaX;
            let y = player_y + i * deltaY;
            point(x, y);
            stroke("green");
            strokeWeight(3);
        }
        if(d > 0){
            strokeWeight(10);
            point(mouse_pos_x, mouse_pos_y);
        }
        pop();
    }
}


// just trying out the baby stuff 
function baby_sprite(){
    babies = new Sprite();
    babies.h = 5;
    babies.w = 10;
    babies.color = "brown";
    babies.stroke = "blue";
    baby_follow();
}

function create_baby(){
    if(kb.presses(' ')){
        baby_alive = true;
        baby_sprite();
    }
}

function baby_follow(){
    if(baby_alive){
        babies_x = babies.position.x;
        babies_y = babies.position.y;
        let distance = dist(player_x, player_y, babies_x, babies_y);

        if(distance < 50){
            babies.speed = 0;
        }
        else if(distance > 50){
            babies.direction = babies.angleTo(player); // makes the sprite move to the player
            babies.rotateTo(player, 5, 0);
            babies.speed = 2;
        }
    }
}
