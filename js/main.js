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
 let currentPlayer = new Player()

function preload(){

    resources.preload();
    currentPlayer.preload();
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
    create_baby();
    baby_follow();

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


// just trying out the baby stuff 
function baby_sprite(){
    babies = new Sprite(currentPlayer.player_x, currentPlayer.player_y );
    babies.h = 10;
    babies.w = 20;
    babies.color = "brown";
    babies.stroke = "blue";
    babies.health = 0;
}

function create_baby(){
    if(kb.presses(' ')){
        baby_alive = true;
        baby_sprite();
        
    }
}

let resource_arr = [];

function baby_follow(){
    if(baby_alive){
        babies_x = babies.position.x;
        babies_y = babies.position.y;

        // let distance = dist(currentPlayer.player_x, currentPlayer.player_y, babies_x, babies_y);

        
        
        // else if(distance < 50){
        //     babies.speed = 0;
        // }
        // else if(distance > 50){
        //     babies.direction = babies.angleTo(currentPlayer.player); // makes the sprite move to the player
        //     babies.rotateTo(currentPlayer.player, 5, 0);
        //     babies.speed = 2;
        // }


        // stuff i have added - bella
        // the baby ship goes to the nearest resource
        for(let i = 0; i < resources.honey.length; i++){
            let resource_dist = dist(resources.honey[i].x, resources.honey[i].y, babies_x, babies_y);

            resource_arr.push({
                resource: resources.honey[i], 
                distance: resource_dist
            });
        }

            resource_arr.sort((a, b) => a.distance - b.distance)
            print(resource_arr);
        if(resource_arr.length > 3){
            resource_arr = resource_arr.slice(0, 3);
        }
        
        if(resource_arr.length > 0){
            let closest_resource = resource_arr[0].resource;
            babies.moveTo(closest_resource.x, closest_resource.y, 1);
            babies.rotateTo(closest_resource.x, closest_resource.y, 1, 0);
            if(babies.overlapping(closest_resource)){
                print("asjhda");
                resources.resource_counter += 1;
                closest_resource.health -= 1;
                if(closest_resource.health === 0){
                    closest_resource.remove();
                    // after this part, the baby ship does not go back to the mother ship
                }
            }
        }
    }
}
