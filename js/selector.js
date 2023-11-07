class Selector {
    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer;

    }
    preload() {

    }

    setup() {

    }
    
    draw() {
        const player = new Player();
        player.player_sprite();
        player.player_movement();
        player.player_path();
    }

    test_selector() {
        if (mouse.pressing()) {
            push();
            fill("green");
            quad(
                this.currentPlayer.mouse_pos_x, this.currentPlayer.mouse_pos_y,         // click position
                mouse.position.x, this.currentPlayer.mouse_pos_y,                       // x axis
                mouse.position.x, mouse.position.y,                                     // y axis
                this.currentPlayer.mouse_pos_x, mouse.position.y                        // mouse position
            );
            pop();
        }
    }
}