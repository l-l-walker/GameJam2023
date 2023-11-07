class Baby {
    constructor(resource, currentPlayer) {
        this.resource_arr = [];
        this.babies = [];
        this.baby_alive;
        this.baby_x;
        this.baby_y;
        this.babyTrigger = "CreateResourceArr";
        this.count = 0;
        this.closest_resource;
        this.resources = resource;
        this.currentPlayer = currentPlayer;
        this.resourceTransferIterations = 0;
        this.ships = [];
        this.ship;
    }

    preload() {
        for (let i = 1; i < 6; i++) {
            this.ships[i] = loadImage(`assets/spawn_ship/ship${i}.png`)
        }
    }

    setUp() {

    }

    draw() {

    }

    baby_sprite() {
        let baby = new Sprite(this.currentPlayer.player_x, this.currentPlayer.player_y)
        baby.h = 10;
        baby.w = 20;
        baby.health = 0;
        baby.text = baby.health;
        baby.img = this.ships[1];
        // baby.img = random(this.ships);   // Randomising images
        this.babies.push(baby);
        print(this.babies);
    }

    create_baby() {
        if (kb.presses(' ')) {
            this.baby_alive = true;
            this.baby_sprite();
        }
    }

    babyMovement(currentBaby, x, y) {
        currentBaby.moveTo(x, y, 1);
        currentBaby.rotateTo(x, y, 1, 0);
    }

    checkOverlappingResource() {
        for (let i = 0; i < this.babies.length; i++) {
            if (this.babies[i].overlapping(this.closest_resource)) {
                return this.babies[i];
            }
        }
        return null;
    }

    baby_follow() {
        if (this.baby_alive) {
            for (let i = 0; i < this.babies.length; i++) {
                let currentBaby = this.babies[i];
                this.baby_x = currentBaby.position.x;
                this.baby_y = currentBaby.position.y;

                //Switch Statements for the baby
                switch (this.babyTrigger) {
                    //CreateResourceArr case   
                    case "CreateResourceArr":
                        this.updateResource();
                        break;

                    //The "MoveToResource" Case 
                    case "MoveToResource":
                        this.goToResource(currentBaby);
                        break;

                    //The "onResource" case 
                    case "onResource":
                        this.collectingResource(currentBaby);
                        break;

                    //The "FinishResource" case
                    case "FinishResource":
                        this.depositResources(currentBaby);
                        break;

                    //StopBaby case 
                    case "StopBaby":
                        this.followMotherShip(currentBaby);
                        break;
                }
            }
        }
    }

    updateResource() {
        for (let i = 0; i < this.resources.honey.length; i++) {     //Loop through the length of the resources
            //Find distance between the resources and the baby 
            let resource_dist = dist(this.resources.honey[i].x, this.resources.honey[i].y, this.baby_x, this.baby_y);
            this.resource_arr.push({    //Push the resource and distance properties into the resource_arr object 
                resource: this.resources.honey[i],
                distance: resource_dist
            });
        }
        //Sort arrat based on the distance between the resource and the baby 
        this.resource_arr.sort((a, b) => a.distance - b.distance)
        if (this.resource_arr.length > 3) {
            this.resource_arr = this.resource_arr.slice(0, 3);
        }
        this.babyTrigger = "MoveToResource";    //Assign the babyTrigger object to "MoveToResource"
    }

    goToResource(currentBaby) {
        //If the count is less than 3 
        if (this.count < 3) {
            //Assign the closest_resource object property to the specified count in the resource_arr property object 
            this.closest_resource = this.resource_arr[this.count].resource;
            //Make baby move to the closest resource
            this.babyMovement(currentBaby, this.closest_resource.position.x, this.closest_resource.position.y);
            const overlappingBaby = this.checkOverlappingResource();
            if (overlappingBaby) {
                currentBaby = overlappingBaby;
                this.baby_x = currentBaby.position.x;
                this.baby_y = currentBaby.position.y;
                //Assign this.babyTrigger to "OnResource"
                this.babyTrigger = "onResource";
            }
        } else {
            this.babyTrigger = "StopBaby";
        }
    }

    collectingResource(currentBaby) {
        this.closest_resource.health -= 1;                          //Decrement the resource health 
        this.closest_resource.text = this.closest_resource.health;  //Resource text 
        // find a baby that is overlapping a resource
        let overlappingBaby = this.babies.find(baby => baby.overlapping(this.closest_resource));
        if (overlappingBaby) {
            overlappingBaby.health += 1;
            overlappingBaby.text = overlappingBaby.health;
            if (this.closest_resource.health === 0 && overlappingBaby.health === 50) {
                this.babyTrigger = "FinishResource";
            }
        }
    }

    depositResources(currentBaby) {
        //Remove the closes Resource 
        this.closest_resource.remove();
        //Finds the baby with resources
        const babyWithResource = this.babies.find(baby => baby.health === 50);
        // Move the baby to the currentPlayers position
        this.babyMovement(currentBaby, this.currentPlayer.player_x, this.currentPlayer.player_y);
        //Find the distance between the currentPlayer and the baby 
        let distance = dist(this.currentPlayer.player_x, this.currentPlayer.player_y, this.baby_x, this.baby_y);
        if (distance <= 50 && babyWithResource) {
            //Call the updateResourceTarget function 
            this.updateResourceTarget(this.resource_arr.length);
            // takes away health from the baby with the resource
            babyWithResource.health -= 50;
            babyWithResource.text = babyWithResource.health;
            this.resources.resource_counter += 50;

            //Assign the babyTrigger to MoveToResource 
            this.babyTrigger = "MoveToResource";
        }
    }

    followMotherShip(currentBaby) {
        //Find distance between player and baby 
        let stopDist = dist(this.currentPlayer.player_x, this.currentPlayer.player_y, this.baby_x, this.baby_y);
        //If stop distance is less than or equal to 50 
        if (stopDist <= 50) {
            //Set direction of baby to the currentPlayer position
            currentBaby.direction = currentBaby.angleTo(this.currentPlayer.player); // makes the sprite move to the player
            //Rotate the baby to the currentPlayer position
            currentBaby.rotateTo(this.currentPlayer.player, 5, 0);
            //Set speed to 0 
            currentBaby.speed = 0;
        }
        //If stopDist is greater than 50
        else if (stopDist > 50) {
            //Set direction of baby to the currentPlayer position
            currentBaby.direction = currentBaby.angleTo(this.currentPlayer.player); // makes the sprite move to the player
            //Rotate the baby to the currentPlayer position
            currentBaby.rotateTo(this.currentPlayer.player, 5, 0);
            //Else set speed to 2
            currentBaby.speed = 2;
        }
    }

    updateResourceTarget(length) {
        //Increment count if length is greater than 0 and if count is less than the amount of length 
        if (length > 0 && this.count < length) {
            //Increment count by 1 
            this.count += 1;
        }
    }
}