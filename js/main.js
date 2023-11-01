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
let honey_amount = 3;
let resource_counter = 0;


let player_selector;

// resource menu
let resource_menu_switch = false;

function preload(){

}

function setup(){
    new Canvas(1000, 800);

    resource_sprite();
    player_sprite();

    // player overlapping with the resource 'honey'
    player.overlapping(honey, collect);
}

function resource_sprite(){
    honey = new Group();
    honey.w = 20;
    honey.h = 20;
    honey.color = "#fcba03";
    // random spawn
    honey.x = () => random(200, canvas.w - 200);
    honey.y = () => random(100, canvas.h - 100);
    honey.health = 50;
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
    honey.health -= 1;
    honey_amount -= 1;
    resource_counter += 1;
    if(honey.health === 0){
        honey.remove();
    }
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

    // player resources
    player_resources_menu();
    test_selector();
}

function test_selector(){
    if(mouse.pressing()){
        push();
        fill("green");
        // player_selector = new Sprite([
        //     [mouse_pos_x, mouse_pos_y],
        //     [mouse.position.x, mouse_pos_y],
        //     [mouse.position.x, mouse.position.y],
        //     [mouse_pos_x, mouse.position.y]
        // ]);
        quad(
                mouse_pos_x, mouse_pos_y,               // click position
                mouse.position.x, mouse_pos_y,          // x axis
                mouse.position.x, mouse.position.y,     // y axis
                mouse_pos_x, mouse.position.y           // mouse position
            );
        pop();
    }
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
        text(`honey: ${resource_counter}`, 50, 55);
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
