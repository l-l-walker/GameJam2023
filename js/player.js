class Player 
{
    constructor()
    {
        this.player;
        this.player_pointer;
        this.player_x
        this.player_y;
        this.mouse_pos_x;
        this.mouse_pos_y;
        this.player_moving = false;
        this.player_selector;
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
    

    getPlayer()
    {
        return this.player;
    }

    player_sprite(){
        this.player = new Sprite();
        this.player.h = 20;
        this.player.color = "pink";
        this.player.stroke = "red";
    }

     player_movement(){
        if(mouse.presses()) {
            this.mouse_pos_x = mouse.position.x;
            this.mouse_pos_y = mouse.position.y;
            this.player_moving = true;
            this.player.moveTo(mouse, 2); // pos, speed
            this.player.rotateTo(mouse, 5, 0); //pos, speed, facing
        }
    }
    
    player_path(){
        if(this.player_moving){
            push();
            this.player_x = this.player.position.x;
            this.player_y = this.player.position.y;
            let d = dist(this.player_x, this.player_y, this.mouse_pos_x, this.mouse_pos_y); // distance from the player to the mouse position
            let deltaX = (this.mouse_pos_x - this.player_x) / d;
            let deltaY = (this.mouse_pos_y - this.player_y) / d;
            // the pathing line 
            for (let i = 0; i < d; i += 10) {
                let x = this.player_x + i * deltaX;
                let y = this.player_y + i * deltaY;
                point(x, y);
                stroke("green");
                strokeWeight(3);
            }
            if(d > 0){
                strokeWeight(10);
                point(this.mouse_pos_x, this.mouse_pos_y);
            }
            pop();
        }
    }

    test_selector(){
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
                    this.mouse_pos_x, this.mouse_pos_y,               // click position
                    mouse.position.x, this.mouse_pos_y,          // x axis
                    mouse.position.x, mouse.position.y,     // y axis
                    this.mouse_pos_x, mouse.position.y           // mouse position
                );
            pop();
        }
    }
    


}