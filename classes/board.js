class Board {
    constructor(x, y, width, height) {
        this.width = width;
        this.height = height;

        var options = {
            isStatic: true
        };

        this.body = Bodies.rectangle(x, y, width, height, options);
        World.add(world, this.body);

        this.image = loadImage("./assets/board.png");
        this.removed = false;
    }

    remove(index) {
        this.removed = true;
        World.remove(world, this.body);
        delete arrows[index];
    }

    display() {
        var pos = this.body.position;

        push();
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.width, this.height);
        pop();
    }
}