class Enemy {
    constructor(x, y, w, h, movementSpeed, playerRef, platformsRef) {
        this.sprite = new Sprite(x, y, w, h);
        this.sprite.color = "orange";
        this.pixel_scale = w;

        this.sprite.collider = "dynamic";
        this.sprite.rotationLock = true;
        this.sprite.drag = 0.4;

        this.speed = movementSpeed;
        this.lookDir = 1;
        this.idleFrames = 0;
        this.idleWait = 60 * 5; // idle for 5 seconds (game runs at 60 fps)

        this.moveState = "IDLE";
        this.alive = true;

        this.player = playerRef;
        this.platforms = platformsRef;

        // edge detection sprites
        // create feet for realistic ground collision
        this.leftFoot = new Sprite(
            this.sprite.x + (this.sprite.width/2), this.sprite.y + this.sprite.height/2 + 2,
            5, 4);

        this.rightFoot = new Sprite(
            this.sprite.x - (this.sprite.width/2), this.sprite.y + this.sprite.height/2 + 2,
            5, 4);

        this.sprite.bounciness = this.leftFoot.bounciness = this.rightFoot.bounciness = 0;
        this.leftFoot.visible = this.rightFoot.visible = true;
        this.leftFoot.rotationLock = this.rightFoot.rotationLock = true;
        this.leftFoot.collider = this.rightFoot.collider = "none";

        this.initMovement();
    }

    initMovement() {
        this.moveState = (Math.random() < 0.5) ? "LEFT" : "RIGHT";
        if (this.moveState === "LEFT") {
            this.lookDir = -1;
        } else {
            this.lookDir = 1;
        }
    }

    get_sprite() { return this.sprite; }

    update() {
        console.log("enemy update")
        if (!this.alive) return;
        this.movement();
        this.attack();
    }

    attack() {

    }

    // wonder along a platform
    movement() {
        // update positions of ledge sensors
        this.leftFoot.x = this.sprite.x + (this.sprite.width/2) + 25;
        this.leftFoot.y = this.sprite.y + this.sprite.height / 2;
        
        this.rightFoot.x = this.sprite.x - (this.sprite.width/2) - 25;
        this.rightFoot.y = this.sprite.y + this.sprite.height / 2;

        if (this.moveState !== "IDLE") {
            let leftOverlay = this.leftFoot.overlapping(this.platforms);
            let rightOverlay = this.rightFoot.overlapping(this.platforms);
            
            if ((leftOverlay === 0 && this.moveState === "RIGHT") ||
                (rightOverlay === 0 && this.moveState === "LEFT")) {
                // transition to an idle-state before moving the opposite direction
                this.sprite.vel.x = 0;
                this.moveState = "IDLE";
            } else {
                // move in decided direction
                this.sprite.vel.x = this.speed * this.lookDir;
            }
        } else {
            if (this.idleFrames < this.idleWait) {
                this.idleFrames += 1;
            } else {
                this.idleFrames = 0;
                this.lookDir *= -1; // invert lookDir

                if (this.lookDir === -1) {
                    this.moveState = "LEFT";
                } else {
                    this.moveState = "RIGHT";
                }
            }
        }
    }
}