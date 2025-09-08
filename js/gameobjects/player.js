class Player {
    constructor(x, y, w, h) {
        this.sprite = new Sprite(x, y, w, h);
        this.sprite.color = "red";
        this.pixel_scale = w;

        this.sprite.collider = "dynamic";
        this.sprite.rotationLock = true;
        this.sprite.drag = 0.4;
        
        this.speed = 5;
        this.jumpForce = 10;

        this.grounded = false;
        this.holdingSpace = false;
        this.jumping = false;

        this.jumpFrames = 0;
        this.maxJumpFrames = 15;

        // create feet for realistic ground collision
        this.feet = new Sprite(
            this.sprite.x, this.sprite.y + this.sprite.height/2 + 2,
            this.sprite.width - 2, 4);

        this.sprite.bounciness = this.feet.bounciness = 0;
        this.feet.visible = false;
        this.feet.rotationLock = true;
        this.feet.collider = "none";
    }

    get_sprite() {
        return this.sprite;
    }

    get_scale() {
        return this.pixel_scale;
    }

    set_grounded(v) {
        this.grounded = v;
    }

    update() {
        // update foot position
        this.feet.x = this.sprite.x;
        this.feet.y = this.sprite.y + this.sprite.height / 2;

        if (kb.pressing("a") || kb.pressing("left")) {
            this.sprite.vel.x = -this.speed;
        } else if (kb.pressing("d") || kb.pressing("right")) {
            this.sprite.vel.x = this.speed;
        } else {
            // no movement
            this.sprite.vel.x = 0;
        }

        if (this.grounded === true) {
            if (this.holdingSpace) {
                if (!kb.pressing("space")) {
                    this.jumping = false;
                    this.jumpFrames = 0;
                    this.holdingSpace = false;
                }
            } else {
                if (kb.pressing("space")) {
                    console.log("jumped");

                    this.sprite.vel.y = -this.jumpForce;
                    this.grounded = false;
    
                    this.jumping = true;
                    this.holdingSpace = true;
                }
            }
        } else {
            if (kb.pressing("space") && this.jumping &&
                (this.jumpFrames < this.maxJumpFrames)) {
                this.jumpFrames += 1;
            } else {
                this.jumpFrames = 0;
                this.jumping = false;
                if (this.sprite.vel.y < 0) {
                    // smooth transition back down to ground
                    this.sprite.vel.y = this.sprite.vel.y / 1.15;
                }
            }
        }
    }
}