class Baby
{
    constructor(resource, currentPlayer)
    {
        this.resource_arr = [];
        this.babies;
        this.baby_alive;
        this.babies_x;
        this.babies_y;
        this.babyTrigger = "CreateResourceArr";
        this.count = 0;
        this.closest_resource;
        this.resources = resource;
        this.currentPlayer = currentPlayer;
    }

    preload()
    { 
    }

      
    setUp()
    {

    }

    draw()
    {

    }

    // just trying out the baby stuff 
    baby_sprite(){
        this.babies = new Group();
        this.babies = new Sprite(currentPlayer.player_x, currentPlayer.player_y);
        this.babies.h = 10;
        this.babies.w = 20;
        this.babies.color = "brown";
        this.babies.stroke = "blue";
        this.babies.health = 0;
    }

    create_baby(){
        if(kb.presses(' ')){
            this.baby_alive = true;
            this.baby_sprite();
        }
    }

    baby_follow(){
        if(this.baby_alive){
            this.babies_x = this.babies.position.x;
            this.babies_y = this.babies.position.y;

            //Switch Statements for the Babies
            switch (this.babyTrigger){   
                case "CreateResourceArr":
                    for(let i = 0; i < this.resources.honey.length; i++){
                        let resource_dist = dist(this.resources.honey[i].x, this.resources.honey[i].y, this.babies_x, this.babies_y);
            
                        this.resource_arr.push({
                            resource: this.resources.honey[i], 
                            distance: resource_dist
                        });
                    }
                    this.resource_arr.sort((a, b) => a.distance - b.distance)
                        // print(resource_arr);
                    if(this.resource_arr.length > 3){
                        this.resource_arr = this.resource_arr.slice(0, 3);
                    }
                    this.babyTrigger = "MoveToResource";
                    break;
                case "MoveToResource":
                    if(this.count < 3){
                    this.closest_resource = this.resource_arr[this.count].resource;
                    this.babies.moveTo(this.closest_resource.position.x, this.closest_resource.position.y, 1);
                    this.babies.rotateTo(this.closest_resource.x, this.closest_resource.y, 1, 0);
                    if(this.babies.overlapping(this.closest_resource)){
                        this.babyTrigger = "onResource";
                    }
                    }
                    else{
                        this.babyTrigger = "StopBaby";
                    }
                    break;
                case "onResource":
                    this.closest_resource.health -= 1;
                    if(this.closest_resource.health === 0){
                        this.babyTrigger = "FinishResource";
                    }
                    break;
                case "FinishResource":
                    this.closest_resource.remove();
                    // after this part, the baby ship does not go back to the mother ship
                    this.babies.moveTo(this.currentPlayer.player_x, this.currentPlayer.player_y, 1);
                    this.babies.rotateTo(this.currentPlayer.player_x, this.currentPlayer.player_y, 1, 0);
                    let distance = dist(this.currentPlayer.player_x, this.currentPlayer.player_y, this.babies_x, this.babies_y);
                    if(distance <= 50){
                            this.updateResourceTarget(this.resource_arr.length);
                            //To make animation work when resources is counted up NEED TO FIX THIS 
                            this.resources.resource_counter += 50;
                            this.babyTrigger = "MoveToResource"; 
                    }
                    break;
                case "StopBaby":
                    //Find distance between player and baby 
                    let stopDist = dist(this.currentPlayer.player_x, this.currentPlayer.player_y, this.babies_x, this.babies_y);
                    //If stop distance is less than or equal to 50 
                    if(stopDist <= 50) {
                        this.babies.direction = this.babies.angleTo(this.currentPlayer.player); // makes the sprite move to the player
                        this.babies.rotateTo(this.currentPlayer.player, 5, 0);
                        //Set speed to 0 
                        this.babies.speed = 0;
                    }
                    else if (stopDist > 50) {
                        this.babies.direction = this.babies.angleTo(this.currentPlayer.player); // makes the sprite move to the player
                        this.babies.rotateTo(this.currentPlayer.player, 5, 0);
                        //Else set speed to 0
                        this.babies.speed = 2;
                    }
                    break;
            }
        }

    }

    updateResourceTarget(length) {
        //Increment count if length is greater than 0 and if count is less than the amount of length 
        if(length > 0 && this.count < length) {
            //Increment count by 1 
            this.count += 1; 
        }
        
    }
}
