class Player_Menu {
    constructor(resource) {
        this.resource_menu_switch = false;
        this.resources = resource;
        this.playerFormBtn;
    }

    preload() {
        
    }

    setUp() {
        
    }

    changePlayerImgBtn() {
        this.playerFormBtn = createButton("Change Player Form");
        this.playerFormBtn.position(10, 840);
        this.playerFormBtn.mousePressed(() => {
            print("ADJKASD");
        });
    }

    draw() {

    }
    // must change, the text looks gross rn
    player_resources_menu() {
        if (this.resource_menu_switch) {
            // Menu box
            push();
                fill(242, 208, 208, 200);
                strokeWeight(0);
                rect(0, 600, canvas.w, 200);
            pop();
            // Headers
            push();
                strokeWeight(1);
                // Header Boxes
                rect(0, 550, 200, 50);
                rect(600, 550, 200, 50);
                // Header Titles
                textSize(25);
                text(`Mama Bear`, 10, 585);
                text(`Shop`, 610, 585);
            pop();
            
            // Resources
            push();
                textSize(25);
                // Resource Title
                text(`Resources:`, 210, 630);
                // Resource Text
                text(`honey: ${this.resources.resource_counter}`, 240, 660);
                text(`flowers: `, 240, 695);
                // Resource icons
                fill("#fcba03");
                square(210, 640, 20); // will change this to the image for honey
                fill("purple");
                square(210, 675, 20); // will change this to the image for honey
            pop();

            // Bears
            push();
                // Bear Titles
                textSize(25);
                text(`Bears:`, 210, 730);
                // Bear Text
                text(`3x`, 270, 775);
                text(`2x`, 400, 775);
                text(`1x`, 530, 775);
                // Bear icons
                square(210, 740, 50);
                square(340, 740, 50);
                square(470, 740, 50);
            pop();

            // Shop
            push();
                // Bear Shop icons
                square(610, 610, 50);
                square(610, 675, 50);
                square(610, 740, 50);
                // Bear Shop details
                rect(670, 610, 320, 180);
                // Buy Button
                rect(880, 730, 100, 50);
                textSize(20)
                text("this bear does this and this", 680, 640)
                textSize(30)
                text(`Buy`, 905, 765);
            pop();

            // Dividers
            line(200, 600, 200, 800)
            line(600, 600, 600, 800)
        }
    }
}
