// helper function to extract textures from atlas
function getTile(col, row) {
    //             get(start_x,start_y, width,height)
    let tileSize = 6;
    return tileset.get(
        col * tileSize, row * tileSize,
        tileSize, tileSize
    );
}

// wrapper to help generate platforms
function createPlatform(textureSize, tileCount, x, y) {
    // x and y represent the center of the sprite
    let width = textureSize * tileCount;
    let height = textureSize;

    let platform = new Sprite(x, y, width, height);
    platform.collider = "static";
    platform.visible = true;
    platform.bounciness = 0;

    // precompute so we dont keep changing the texture
    let tiles = [];
    for (let i = 0; i < tileCount; i++) {
        // pull random texture
        let rand = Math.floor(Math.random() * 5); // 0-4
        tiles.push(getTile(rand, 0));
    }

    let lowerTiles = [];
    for (let i = 0; i < tileCount; i++) {
        // pull random texture
        let rand = Math.floor(Math.random() * 2) + 2;
        lowerTiles.push(getTile(rand, 1));
    }

    // draw executes on each frame
    platform.draw = function() {
        for (let i = 0; i < tileCount; ++i) {
            // image(texture, 0, 0)
            // the position 0,0 is the center of the platform object
            // image local position based off platform in summary
            
            // left most tile center position
            let baseX = -((width / 2) - (textureSize/2));
            image(tiles[i], baseX + (textureSize * i), 0, textureSize, textureSize);
        }

        for (let i = 0; i < tileCount; ++i) {
            let baseX = -((width / 2) - (textureSize/2));
            image(lowerTiles[i], baseX + (textureSize * i), textureSize, textureSize, textureSize);
        }
    };

    return platform;
}

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
        
        if (isgrounded && this.player.sprite.vel.y === 0) {
            this.player.set_grounded(true);
        } else {
            this.player.set_grounded(false);
        }
    }

    // draws the sprites and stores platforms within a group
    // for simple collision detection concerning ground
    draw_sprites() {
        let originX = 200;
        let originY = 400;

        this.platforms.add(
            createPlatform(50, 10, originX, originY)
        );

        this.platforms.add(
            createPlatform(50, 10, originX + 600, originY - 50)
        );

        this.platforms.add(
            createPlatform(50, 4, originX + 300, originY - 200)
        );
    }
}