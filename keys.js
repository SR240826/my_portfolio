export class keys {
    // set the intended keys to control and velocity of controllable object    

    constructor(left, right, up, down, player, velocityX, velocityY, canvas) {
        this.canvas = canvas
        this.direction = {
            left: left,
            right: right,
            up: up,
            down: down,
        }

        // public or global variables that may need modification from outside
        this.velocity = {
            x: velocityX,
            y: velocityY
        }
        this.collision = {
            coll_object: [],
            player: player,
        }
    }
    
    // keydown/key pressed event
    control(event) {
        switch (event.key.toLowerCase()) {
            case (this.direction.left):
                this.velocity.x = -1 * (this.canvas.width * 0.003);
                break;
            case (this.direction.right):
                this.velocity.x = 1 * (this.canvas.width * 0.003);
                break;
            case (this.direction.up):
                this.velocity.y = -1 * (this.canvas.width * 0.003);
                break;
            case (this.direction.down):
                this.velocity.y = 1 * (this.canvas.width * 0.003);
                break;
        }
    }

    checkCollision() {
        const player = this.collision.player;
        const obstacles = this.collision.coll_object;

        // Boundary collision checks
        if (player.position.x < 0) {
            player.position.x = 0;
        } else if (player.position.x + player.size.width > this.canvas.width) {
            player.position.x = this.canvas.width - player.size.width;
        }

        if (player.position.y < 0) {
            player.position.y = 0;
        } else if (player.position.y + player.size.height > this.canvas.height) {
            player.position.y = this.canvas.height - player.size.height;
        }

        for (let i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i];

            if (
                // Collision detection criteria
                player.position.x < obstacle.position.x + obstacle.size.width &&
                player.position.x + player.size.width > obstacle.position.x &&
                player.position.y - player.size.height < obstacle.position.y + obstacle.size.height &&
                player.position.y + player.size.height > obstacle.position.y
            ) {
                // update velocities based on the collision direction

                // Horizontal collision
                if (this.velocity.x > 0 && (player.position.x < obstacle.position.x)) 
                    this.velocity.x = 0; // Collided from the left, stop moving right
                else if (this.velocity.x < 0 && (player.position.x < obstacle.position.x))
                    this.velocity.x = -1; // enable to move left ONLY               
                else if (this.velocity.x < 0 && (player.position.x > obstacle.position.x)) 
                    this.velocity.x = 0; // Collided from the right, stop moving left
                else if (this.velocity.x > 0 && (player.position.x  > obstacle.position.x)) 
                    this.velocity.x = 1; // enable move to right ONLY

                // Vertical collision
                if (this.velocity.y > 0 && player.position.y < obstacle.position.y && player.position.x > obstacle.position.x)
                    this.velocity.y = 0; // Collided from the top, stop moving down
                else if (this.velocity.y < 0 && player.position.y < obstacle.position.y) 
                    this.velocity.y = -1; // // enable move to up ONLY
                else if (this.velocity.y < 0 && (player.position.y > obstacle.position.y)) 
                    this.velocity.y = 0; // Collided from the bottom, stop moving up
                else if (this.velocity.y > 0 && (player.position.y  > obstacle.position.y)) 
                    this.velocity.y = 1; //// enable move to down ONLY
            }
        }
    }
}
