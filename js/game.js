new Q5();
new Canvas();

// set the world gravity constant
world.gravity.y = 10;

// create global objects the game interacts with
let player;
let level;

let levelId = 0;

// similar to unity's awake()
function preload() {

}

// similar to unity's start()
function setup() {
    // instantiate player object
    player = new Player(200,200,50,50);
    if (levelId === 0) {
        level = new LevelOne(player);
    }
}

// similar to unity's update()
function update() {
    clear(); // clear the screen each frame

    level.render_level();

    player.update();
}