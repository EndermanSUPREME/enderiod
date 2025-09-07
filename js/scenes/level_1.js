class LevelOne {
    constructor(playerRef) {
        this.player = playerRef;

        this.platforms = new Group();
        this.walls = new Group();

        this.draw_sprites();
    }
    
    render_level() {
        this.inner_update()
    }

    inner_update() {
        // check if the players feet is colliding with anything within
        // the platforms group
        let isgrounded = this.player.feet.overlapping(this.platforms);
        if (isgrounded) {
            this.player.set_grounded(true);
        }
    }

    // draws the sprites and stores platforms within a group
    // for simple collision detection concerning ground
    draw_sprites() {
        //                 Sprite(x, y, width, height)
        let platform = new Sprite(500, 350, 800, 40);
        platform.physics = STATIC;
        platform.color = "grey";
        this.platforms.add(platform);
    }
}