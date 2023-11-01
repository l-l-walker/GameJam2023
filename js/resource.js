class Resource 
{
    constructor()
    {
        this.honey;
        this.honey_amount = 3;
        this.resource_counter = 0;
    }

    preload()
    {
        print(this.resource_counter);
    }
    
    setUp()
    {

    }

    draw()
    {

    }

    getHoney()
    {
        return this.honey; 
    }

    getResourceCounter()
    {
        return this.resource_counter;
    }


    resource_sprite(){
        this.honey = new Group();
        this.honey.w = 20;
        this.honey.h = 20;
        this.honey.color = "#fcba03";
        // random spawn
        this.honey.x = () => random(200, canvas.w - 200);
        this.honey.y = () => random(100, canvas.h - 100);
        this.honey.health = 50;
        this.honey.amount = this.honey_amount;
        // want to add resource life and spawn more once the resource reaches a certain amount
    }

    collect(player, honey){
        honey.health -= 1;
        this.honey_amount -= 1;
        this.resource_counter += 1;
        if(honey.health === 0){
            honey.remove();
        }
    }
}