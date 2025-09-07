class Player {
    constructor(x, y, w, h) {
        this.sprite = new Sprite(x, y, w, h);
        this.sprite.color = "red";

        this.sprite.collider = "dynamic";
        this.sprite.rotationLock = true;
        this.sprite.drag = 0.4;
        
        this.speed = 5;
        this.jumpForce = 5;
    }

    set_grounded(v) {
        this.grounded = v;
    }

    update() {
        if (kb.pressing("a") || kb.pressing("left")) {
            this.sprite.vel.x = -this.speed;
        } else if (kb.pressing("d") || kb.pressing("right")) {
            this.sprite.vel.x = this.speed;
        } else {
            // no movement
            this.sprite.vel.x = 0;
        }

        if (kb.pressing("space") && this.grounded) {
            this.sprite.vel.y += -this.jumpForce;
        }
    }
}