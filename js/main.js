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

function preload(){

}

function setup(){
    new Canvas(1000, 800);
    player_sprite();
}

function player_sprite(){
    player = new Sprite();
    player.h = 20;
    player.color = "pink";
    player.stroke = "red";
}


function draw(){
    clear();
    background(125);

    // player stuff
    player_movement();
    player_path();

    // babies
    create_baby();
    baby_follow();
}

function player_movement(){
    if(mouse.presses()) {
        mouse_pos_x = mouse.position.x
        mouse_pos_y = mouse.position.y
        player_moving = true;
        player.moveTo(mouse, 2); // pos, speed
        player.rotateTo(mouse, 5, 0); //pos, speed, facing
    }
}

function player_path(){
    if(player_moving){
        push();
        player_x = player.position.x
        player_y = player.position.y
        let d = dist(player_x, player_y, mouse_pos_x, mouse_pos_y);
        let deltaX = (mouse_pos_x - player_x) / d;
        let deltaY = (mouse_pos_y - player_y) / d;

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
        baby_alive = true
        baby_sprite();
    }
}

function baby_follow(){
    if(baby_alive){
        babies_x = babies.position.x
        babies_y = babies.position.y
        let distance = dist(player_x, player_y, babies_x, babies_y)

        if(distance < 50){
            babies.speed = 0
        }
        else if(distance > 50){
            babies.direction = babies.angleTo(player);
            babies.rotateTo(player, 5, 0);
            babies.speed = 2
        }
    }
}
