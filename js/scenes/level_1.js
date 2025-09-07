class LevelOne {
    constructor(playerRef) {
        this.player = playerRef;

        this.ground = new Sprite(500, 350, 800, 40);
        this.ground.physics = STATIC;
        this.ground.color = "grey";
    }
    
    render_level() {
        this.inner_update()
    }

    inner_update() {
        let isgrounded = this.player.sprite.colliding(this.ground);
        this.player.set_grounded(isgrounded);
    }
}