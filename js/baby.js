class Baby {
    constructor(resource, currentPlayer) {
        this.resource_arr = [];
        this.babies = [];
        this.resources = resource;
        this.currentPlayer = currentPlayer;
        this.ships = [];
    }

    preload() {
        for (let i = 1; i < 6; i++) {
            this.ships[i] = loadImage(`assets/spawn_ship/ship${i}.png`)
        }
    }

    baby_sprite() {
        let baby = new Sprite(this.currentPlayer.player_x, this.currentPlayer.player_y);
        baby.h = 10;
        baby.w = 20;
        baby.health = 0;
        baby.text = baby.health;
        baby.img = random(this.ships);

        // Assign a unique resource to each baby
        baby.assignedResource = null;
        this.babies.push(baby);
    }

    create_baby() {
        if (kb.presses(' ')) {
            this.baby_sprite();
        }
    }

    babyMovement(currentBaby, x, y) {
        currentBaby.moveTo(x, y, 7);
        currentBaby.rotation = 0;
    }

    checkOverlappingResource(currentBaby) {
        return this.resources.honey.find(resource => currentBaby.overlapping(resource));
    }

    baby_follow() {
        this.babies.forEach(currentBaby => {
            // If the baby is not assigned a resource, assign one
            if (!currentBaby.assignedResource) {
                this.assignResource(currentBaby);
            }

            switch (currentBaby.babyTrigger) {
                case "MoveToResource":
                    this.goToResource(currentBaby);
                    break;
                case "onResource":
                    this.collectingResource(currentBaby);
                    break;
                case "FinishResource":
                    this.depositResources(currentBaby);
                    break;
                case "StopBaby":
                    this.followMotherShip(currentBaby);
                    break;
            }
        });
    }

    assignResource(currentBaby) {
        // Filter out resources that are already assigned to other babies
        const availableResources = this.resources.honey.filter(resource =>
            !this.babies.some(baby => baby.assignedResource === resource)
        );

        // If there are available resources, randomly assign one to the baby
        if (availableResources.length > 0) {
            currentBaby.assignedResource = random(availableResources);
            currentBaby.babyTrigger = "MoveToResource";
        } else {
            // No available resources, stop the baby
            currentBaby.babyTrigger = "StopBaby";
        }
    }

    goToResource(currentBaby) {
        const assignedResource = currentBaby.assignedResource;

        if (assignedResource) {
            this.babyMovement(currentBaby, assignedResource.position.x, assignedResource.position.y);

            // Check for overlapping with assigned resource
            if (currentBaby.overlapping(assignedResource)) {
                // Update baby position to the overlapping resource
                currentBaby.position.set(assignedResource.position.x, assignedResource.position.y);
                currentBaby.babyTrigger = "onResource";
            }
        }
    }

    collectingResource(currentBaby) {
        const { assignedResource } = currentBaby;

        if (assignedResource) {
            assignedResource.health -= 1;
            assignedResource.text = assignedResource.health;
            currentBaby.health += 1;
            currentBaby.text = currentBaby.health;
            // Check if the assigned resource is finished
            if (assignedResource.health === 0) {
                currentBaby.babyTrigger = "FinishResource";
            }
        }
    }

    depositResources(currentBaby) {
        const { assignedResource } = currentBaby;
        if (assignedResource) {
            // Remove the assigned resource
            const index = this.resources.honey.indexOf(assignedResource);
            this.resources.honey.splice(index, 1);
            assignedResource.remove();

            // Move the baby to the currentPlayer position
            this.babyMovement(currentBaby, this.currentPlayer.player_x, this.currentPlayer.player_y);
            currentBaby.assignedResource = null;
            currentBaby.babyTrigger = "MoveToResource";
        }
    }

    followMotherShip(currentBaby) {
        const { assignedResource } = currentBaby;
        const stopDist = dist(this.currentPlayer.player_x, this.currentPlayer.player_y, currentBaby.position.x, currentBaby.position.y);

        
        if (stopDist <= 100) {
            this.resources.resource_counter += currentBaby.health;
            currentBaby.health = 0;
            currentBaby.text = currentBaby.health;

            currentBaby.direction = currentBaby.angleTo(this.currentPlayer.player);
            currentBaby.rotation = 0;
            currentBaby.speed = 0;
        } else if (stopDist > 100) {
            currentBaby.direction = currentBaby.angleTo(this.currentPlayer.player);
            currentBaby.rotation = 0;
            currentBaby.speed = 4;
        }
    }
}
