new Q5();
new Canvas();

// set the world gravity constant
world.gravity.y = 10;

// create global objects the game interacts with
let player;
let level;

let levelId = 0;

// global def of texture atlas
let tileset;

// similar to unity's awake()
function preload() {
    tileset = loadImage("../images/caveAtlas.png");
}

// similar to unity's start()
function setup() {
    noSmooth(); // make pixel perfect textures
    frameRate(60); // set fps cap
    camera.zoom = 1.5;

    // instantiate player object
    player = new Player(200,200,50,50);

    if (levelId === 0) {
        level = new LevelOne(player, tileset);
        player.set_world_objects(level.get_world_objects());
    }
}

// similar to unity's update()
function update() {
    clear(); // clear the screen each frame
    update_camera();

    level.render_level();

    player.update();

    // update the active bullets
    let playerBullets = player.get_bullets();
    for (let i = 0; i < playerBullets.length; ++i) {
        let b = playerBullets[i];
        if (b && b.is_alive()) {
            b.update();
        }
    }
}

function update_camera() {
    camera.x = player.get_sprite().x;
    camera.y = player.get_sprite().y - (player.get_scale() * 1.5);
}