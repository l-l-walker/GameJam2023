class Resource {
    constructor() {
        this.honey;
        this.honey_amount = 3;
        this.resource_counter = 0;
    }

    preload() {

    }

    setUp() {
        
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
        this.honey.w = 30;
        this.honey.h = 30;
        this.honey.color = "#fcba03";
        this.honey.img = "./assets/resources/resource1.png";
        // random spawn
        this.honey.x = () => random(50, canvas.w);
        this.honey.y = () => random(50, canvas.h - 250);
        this.honey.health = 50;
        this.honey.amount = this.honey_amount;
        for (let thing of this.honey) {
            thing.nina = this;
        }
        this.honey.text = this.honey.health; // added text to the resource
        // want to add resource life and spawn more once the resource reaches a certain amount
    }

    collect(player, honey) {
        honey.health -= 1;
        honey.text = honey.health; // text updates
        honey.nina.honey_amount -= 1;
        honey.nina.resource_counter += 1;
        if (honey.health === 0) {
            honey.remove();
        }
    }
}
