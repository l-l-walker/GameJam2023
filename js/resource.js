class Resource {
    constructor() {
        this.honey;
        this.honey_amount = 3;
        this.resource_counter = 0;

        // Honey life
        this.max_resources = 3;
        this.minLife = 700;
        this.maxLife = 1000;

        // Image
        this.honeyImg;
    }

    preload() {
        this.honeyImg = loadImage("./assets/resources/resource1.png")
    }

    setUp() {
        this.resource_sprite();
    }

    draw() {
        
    }

    getHoney() {
        return this.honey;
    }

    getResourceCounter() {
        return this.resource_counter;
    }

    resource_sprite() {
        this.honey = new Group();
        this.honey.w = 50;
        this.honey.h = 50;
        this.honey.color = "#fcba03";
        this.honey.img = this.honeyImg;

        // random spawn
        this.honey.x = () => random(100, canvas.w - 200);
        this.honey.y = () => random(100, canvas.h - 250);
        this.honey.health = 50;
        this.honey.amount = this.honey_amount;
        for (let thing of this.honey) {
            thing.nina = this;
        }
        this.honey.text = this.honey.health; // added text to the resource

        // for (let i = 0; i < this.max_resources; i++) {
        //     this.spawnHoney(i >= this.honey.length);
        // }
    }

    collect(player, honey) {
        honey.health -= 1;
        honey.text = honey.health; // text updates
        honey.nina.amount -= 1;
        honey.nina.resource_counter += 1;
        console.log("health:", honey.health)
        if (honey.health === 0) {
            honey.remove();
        }
    }

    // spawnHoney(isNewHoney) {
    //     let newHoney = createSprite(random(50, canvas.w - 200), random(50, canvas.h - 250), 50, 50);
    //     newHoney.addImage(this.honeyImg);
    //     newHoney.health = 50;
    //     newHoney.text = newHoney.health;
    //     newHoney.nina = this; // Reference to the Resource object
    //     newHoney.amount = this.honey_amount; // Store honey_amount separately for each sprite
    //     newHoney.life = random(this.minLife, this.maxLife);
    //     newHoney.isNewHoney = isNewHoney; // Define isNewHoney here
    //     this.honey.add(newHoney);
    // }
    

    // checkLife() {
    //     for (let honey of this.honey) {
    //         honey.life -= 1;
    //         if (honey.life <= 0) {
    //             honey.remove();
    //             this.spawnHoney();
    //         }
    //     }
    // }
}
