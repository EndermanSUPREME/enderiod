class Bullet {
    constructor(x, y, size, dir) {
        this.sprite = new Sprite(x, y, size, size);
        this.sprite.color = "yellow";
        this.pixel_scale = size;

        this.sprite.collider = "none";
        this.sprite.rotationLock = true;

        this.speed = 10 * dir;

        this.worldObjects;

        // game runs 60 frames a second
        // 60 * n is roughly n seconds
        this.lifetime = 60 * 5;
        this.aliveTime = 0;
        this.alive = true;
    }

    is_alive() {
        return this.alive;
    }

    disable_bullet() {
        this.alive = false;
        this.sprite.remove();
    }

    set_world_groups(worldObjects) {
        this.worldObjects = worldObjects;
    }

    update() {
        if (this.aliveTime < this.lifetime) {
            this.aliveTime += 1;
    
            // bullet moves in straight line in direction its fired
            this.sprite.vel.y = 0;
            this.sprite.vel.x = this.speed;

            if (this.worldObjects) {
                if (this.sprite.overlapping(this.worldObjects)) {
                    this.disable_bullet();
                }
            }

            /* else if (bullet.sprite.overlapping(enemies)) {
                // damage enemy
                this.disable_bullet();
            } */
        } else {
            this.disable_bullet();
        }
    }
}