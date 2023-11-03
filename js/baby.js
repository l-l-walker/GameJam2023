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
            //Initialize baby position
            this.babies_x = this.babies.position.x;
            this.babies_y = this.babies.position.y;

            //Switch Statements for the Babies
            switch (this.babyTrigger){ 
                //CreateResourceArr case   
                case "CreateResourceArr":
                    //Loop through the length of the resources
                    for(let i = 0; i < this.resources.honey.length; i++){
                        //Find distance between the resources and the babies 
                        let resource_dist = dist(this.resources.honey[i].x, this.resources.honey[i].y, this.babies_x, this.babies_y);
            
                        //Push the resource and distance properties into the resource_arr object 
                        this.resource_arr.push({
                            resource: this.resources.honey[i], 
                            distance: resource_dist
                        });
                    }
                    //Sort arrat based on the distance between the resource and the babies 
                    this.resource_arr.sort((a, b) => a.distance - b.distance)
                        // print(resource_arr);
                    if(this.resource_arr.length > 3){
                        this.resource_arr = this.resource_arr.slice(0, 3);
                    }

                    //Assign the babyTrigger object to "MoveToResource"
                    this.babyTrigger = "MoveToResource";
                    break;

                //The "MoveToResource" Case 
                case "MoveToResource":

                    //If the count is less than 3 
                    if(this.count < 3){
                    //Assign the closest_resource object property to the specified count in the resource_arr property object 
                    this.closest_resource = this.resource_arr[this.count].resource;
                    //Make babies move to the closest resource
                    this.babies.moveTo(this.closest_resource.position.x, this.closest_resource.position.y, 1);
                    //Make babies rotate to the closest resource 
                    this.babies.rotateTo(this.closest_resource.x, this.closest_resource.y, 1, 0);
                    //Check if babies are overlapping with the closest resource 
                    if(this.babies.overlapping(this.closest_resource)){
                        //Assign this.babyTrigger to "OnResource"
                        this.babyTrigger = "onResource";
                    }
                    }
                    //If the count is greater or equal to 3 is StopBaby 
                    else{
                        this.babyTrigger = "StopBaby";
                    }
                    break;
                //The "onResource" case 
                case "onResource":
                    //Decrement the resource health 
                    this.closest_resource.health -= 1;
                    //If the resource health is equal to 0 
                    if(this.closest_resource.health === 0){
                        //Assign the babyTrigger property to a Finish Resource 
                        this.babyTrigger = "FinishResource";
                    }
                    break;
                //The "FinishResource" case
                case "FinishResource":
                    //Remove the closes Resource 
                    this.closest_resource.remove();
                    // Move the babies to the currentPlayers position
                    this.babies.moveTo(this.currentPlayer.player_x, this.currentPlayer.player_y, 1);
                    //Move the babies to rotate to the currentPlayers position
                    this.babies.rotateTo(this.currentPlayer.player_x, this.currentPlayer.player_y, 1, 0);
                    //Find the distance between the currentPlayer and the babies 
                    let distance = dist(this.currentPlayer.player_x, this.currentPlayer.player_y, this.babies_x, this.babies_y);
                    //If the distance is less than or equal to 50 
                    if(distance <= 50){
                            //Call the updateResourceTarget function 
                            this.updateResourceTarget(this.resource_arr.length);
                            // NEED TO FIX THIS 
                            this.resources.resource_counter += 50;
                            //Assign the babyTrigger to MoveToResource 
                            this.babyTrigger = "MoveToResource"; 
                    }
                    break;
                //StopBaby case 
                case "StopBaby":
                    //Find distance between player and baby 
                    let stopDist = dist(this.currentPlayer.player_x, this.currentPlayer.player_y, this.babies_x, this.babies_y);
                    //If stop distance is less than or equal to 50 
                    if(stopDist <= 50) {
                        //Set direction of babies to the currentPlayer position
                        this.babies.direction = this.babies.angleTo(this.currentPlayer.player); // makes the sprite move to the player
                        //Rotate the babies to the currentPlayer position
                        this.babies.rotateTo(this.currentPlayer.player, 5, 0);
                        //Set speed to 0 
                        this.babies.speed = 0;
                    }
                    //If stopDist is greater than 50
                    else if (stopDist > 50) {
                        //Set direction of babies to the currentPlayer position
                        this.babies.direction = this.babies.angleTo(this.currentPlayer.player); // makes the sprite move to the player
                        //Rotate the babies to the currentPlayer position
                        this.babies.rotateTo(this.currentPlayer.player, 5, 0);
                        //Else set speed to 2
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
