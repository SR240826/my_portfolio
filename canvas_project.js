import {Player, Image} from './createPlayer.js';
import {keys} from './keys.js';

//const canvas = document.getElementById("canvas");
canvas.width  = innerWidth * 0.70;
canvas.height = (innerWidth * 9/16) *0.50;
let c, cshape, reserver, newPlayer, jug, water, controlkey, waterlevel, n_water, animationFrameId, timer, score, totalScore;
let ground = document.getElementById("ground");
let startTime = null;
canvas.style.top = innerHeight * 0.1 + "px"
c = canvas.getContext('2d');
cshape = canvas.getBoundingClientRect();

let n_obstacle = 10;
let n_waterdrops = 10;

scoreplate.style.left = cshape.x + (cshape.width * 0.75) + "px";
scoreplate.style.top =  cshape.bottom + 10 + "px"
username.style.top = cshape.bottom + 10  + "px";
username.style.left = cshape.x + "px";
time.style.top = cshape.bottom + 40  + "px";
time.style.left = cshape.x + "px";
button.style.top = cshape.top + cshape.height*0.5 - button.getBoundingClientRect().height + "px";
button.style.left = cshape.x + canvas.width * 0.5 + "px";
newPlayer = new Player(canvas, c, "#ff5900", canvas.width/80, canvas.width/80);
controlkey = new keys("a", "d", "w", "s", newPlayer, 0, 0, canvas);
credits.style.top = innerHeight * 0.15+ "px";
tutorial_button.style.top = button.getBoundingClientRect().y + button.getBoundingClientRect().height + 10 + "px";
tutorial_button.style.left = cshape.x + canvas.width * 0.5 - tutorial_button.getBoundingClientRect().width * 0.25 + "px";


class Jug { 
    #playerHeight;
    #playerWidth;
    #ctx;
    #playerPosX;
    #playerPosY;
    #canvas;
    constructor(ctx, canvas, playerPosX, playerPosY, playerWidth, playerHeight) {
        this.#canvas = canvas;
        this.#ctx = ctx;
        this.#playerPosX = playerPosX;
        this.#playerPosY = playerPosY;
        this.#playerWidth = playerWidth;
        this.#playerHeight = playerHeight;
    }
    draw (water) {
        // water jug
        let jugx = this.#playerPosX + this.#playerWidth/2;
        let jugy = this.#playerPosY - this.#playerHeight*0.8;
        var w = this.#canvas.width/water; // water level
        var carve = this.#canvas.width/5000 ;
        
        // Create gradient
        const grd = this.#ctx.createLinearGradient(0,jugy + w,0,jugy+(w-4));
        grd.addColorStop(1,"white");
        grd.addColorStop(0,"#03adfc");
        // Fill with gradient
        this.#ctx.fillStyle = grd;
        this.#ctx.beginPath();
        c.ellipse(jugx, jugy, carve*20, (carve*20)/2, 0, Math.PI * 2, false);
        this.#ctx.ellipse(jugx, (jugy), carve*25, carve*50, 0, Math.PI * 2, Math.PI * 1, false);
        this.#ctx.fill();
        this.#ctx.stroke();
                      
        this.#ctx.fillStyle = "white";
        this.#ctx.beginPath();        
        this.#ctx.ellipse(jugx, jugy, carve*20, (carve*20)/2, 0, Math.PI * 2, false);        
        this.#ctx.stroke();
        this.#ctx.fill();
    }

}

// background image creation
let imagePosX, imagePosY, imageSizeX, imageSizeY, newbackground;
function background(){
    imagePosX = -10;
    imagePosY = -10;
    imageSizeX = canvas.width + 20;
    imageSizeY = canvas.height + 20;
    newbackground = new Image(c, ground, 0, 0, ground.width, ground.height, imagePosX, imagePosY, imageSizeX, imageSizeY);
    newbackground.draw();
}

jug = new Jug(c, canvas, newPlayer.position.x, newPlayer.position.y, newPlayer.size.width, newPlayer.size.height);

// create an array for environment elements to randomize as obstacles
let environment = [];
environment[0] = new Image(c, trees, 160, 135, 30, 20, -500, -500, canvas.width * 0.05, canvas.width*0.03);
environment[1] = new Image(c, trees, 10, 140, 72, 105, -500, -500, canvas.width * 0.1, canvas.width*0.1);
environment[2] = new Image(c, trees, 162, 160, 40, 80, -500, -500, canvas.width * 0.1, canvas.width*0.1);

let obstacles = []; // Array.from({length: 35});

function obs() {
    let newObstacle;

    do {
        newObstacle = environment[Math.floor(Math.random() * environment.length)].clone();
        newObstacle.position.x = Math.random() * (canvas.width - newObstacle.size.width);
        newObstacle.position.y = Math.random() * (canvas.height - newObstacle.size.height);

        // Check for overlaps with all existing obstacles
        const isOverlap = obstacles.some(existingObstacle => (
            (existingObstacle && // Ensure existingObstacle exists already [0] of array
                newObstacle.position.x < existingObstacle.position.x + existingObstacle.size.width &&
                newObstacle.position.x + newObstacle.size.width > existingObstacle.position.x &&
                newObstacle.position.y < existingObstacle.position.y + existingObstacle.size.height &&
                newObstacle.position.y + newObstacle.size.height > existingObstacle.position.y)
             ||
            (   // player vs obstacles
                newPlayer && 
                newObstacle.position.x < newPlayer.position.x + newPlayer.size.width &&
                newObstacle.position.x + newObstacle.size.width > newPlayer.position.x &&
                newObstacle.position.y < newPlayer.position.y + newPlayer.size.height &&
                newObstacle.position.y + newObstacle.size.height > newPlayer.position.y
            ) ||
            (   // reserver vs obstacles
                reserver && 
                newObstacle.position.x < reserver.position.x + reserver.size.width &&
                newObstacle.position.x + newObstacle.size.width > reserver.position.x &&
                newObstacle.position.y < reserver.position.y + reserver.size.height &&
                newObstacle.position.y + newObstacle.size.height > reserver.position.y)
        ));

        if (!isOverlap) {
            obstacles.push(newObstacle);
            newObstacle.draw();
        }
    } while (obstacles.length < n_obstacle); // Adjust the condition as needed
}

class Obj  {
    constructor(posx, posy, color) {
        this.position = {
            x: posx,
            y: posy
        }
        this.size = {
            width: canvas.width/90,
            height: canvas.width/90
        }
        this.color = color
    }
    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
}

function waterDrops(object, length, obst) {
    for (var i = 0; i < length; i++) {
        let isOverlap = false;

        do {
            let px = Math.random() * (canvas.width - 50) + 10;
            let py = Math.random() * (canvas.height - 50) + 10;

            // Check for overlaps with existing objects
            isOverlap = object.some(existingObj => (
                (existingObj &&
                px < existingObj.position.x + existingObj.size.width &&
                px + 50 > existingObj.position.x &&
                py < existingObj.position.y + 50 &&
                py + 50 > existingObj.position.y) ||
                (obst.some(old => (
                    old &&
                    px < old.position.x + old.size.width &&
                    px + 50 > old.position.x &&
                    py < old.position.y + old.size.height &&
                    py + 50 > old.position.y                 
                )))
            ));
            
            if (!isOverlap) {
                object.push(new Obj(px, py, "#34dbeb"));
                break; // Break out of the loop if no overlap
            }
        } while (isOverlap);

        object[i].draw();
    }
    return object;
}


function collected(player, collectibles) {
    for (var i = 0; i < collectibles.length; i++) {
        const collectible = collectibles[i];
        if (player.position.x < collectible.position.x + collectible.size.width &&
            player.position.x + player.size.width > collectible.position.x &&
            player.position.y - player.size.height < collectible.position.y + collectible.size.height &&
            player.position.y + player.size.height > collectible.position.y) {
                collectibles.splice(collectibles.indexOf(collectible), 1)
                score ++;    
            }
        if (collectibles.length < 1) {
            waterDrops(water, n_waterdrops, obstacles);
        }
    }
}

function fillreserver(player, reserver) {
    if (player.position.x < reserver.position.x + reserver.size.width &&
        player.position.x + player.size.width > reserver.position.x &&
        player.position.y - player.size.height < reserver.position.y + reserver.size.height &&
        player.position.y + player.size.height > reserver.position.y) {
            return true;   
        }
    return false;
    
}

let maxwaterlevel,fillamount;

function firstload() {  
    waterlevel = 1;
    water = [];  
    fillamount = 1;
    maxwaterlevel = 300;
    score = 0;
    obstacles = [];
    c.clearRect(0, 0, canvas.width, canvas.height);
    background();
    reserver = new Player(canvas, c, "white", canvas.width/10, canvas.height/10);
    reserver.gradient(fillamount);
    newPlayer.draw();
    jug = new Jug(c, canvas, newPlayer.position.x, newPlayer.position.y, newPlayer.size.width, newPlayer.size.height)
    jug.draw(waterlevel);
    
    if ((newPlayer.position.y + newPlayer.size.height > canvas.height &&
        newPlayer.position.x + newPlayer.size.width > canvas.width) ||
        (reserver && // Ensure existingObstacle exists already [0] of array
        reserver.position.x < newPlayer.position.x + newPlayer.size.width &&
        reserver.position.x + reserver.size.width > newPlayer.position.x &&
        reserver.position.y < newPlayer.position.y + newPlayer.size.height &&
        reserver.position.y + reserver.size.height > newPlayer.position.y )
        ) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        newPlayer.position.x = Math.random() * (canvas.width - newPlayer.size.width) + 5;
        newPlayer.position.y = Math.random() * (canvas.height - newPlayer.size.height* 2) + 60;
        background();
        newPlayer.updatePosition(newPlayer.position.x, newPlayer.position.y);
        jug = new Jug(c, canvas, newPlayer.position.x, newPlayer.position.y, newPlayer.size.width, newPlayer.size.height)
        jug.draw(waterlevel);
        reserver.gradient(fillamount)
    }
    obs();

    waterDrops(water, n_waterdrops, obstacles);

    n_water = water.length;
    controlkey.collision.coll_object = obstacles; 
}


addEventListener("load", ()=>{
    if(innerWidth<700) {
        alert("If you are on mobile device, please rotate the phone.");
        return;
    }
    else firstload();
}) 

addEventListener("keydown", () => {
    controlkey.control(event);
    controlkey.checkCollision();
})
addEventListener("touchstart", () => {
    controlkey.control(event);
    controlkey.checkCollision();
})

addEventListener("keyup", () => { 
    controlkey.velocity.x = 0;
    controlkey.velocity.y = 0;
    newPlayer.update(controlkey.velocity.x, controlkey.velocity.y);
})
addEventListener("touchend", () => { 
    controlkey.velocity.x = 0;
    controlkey.velocity.y = 0;
    newPlayer.update(controlkey.velocity.x, controlkey.velocity.y);
})

function animate(timeStamp) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    background();
    
    
    obstacles = obstacles.map((obstacle) => {
            obstacle.draw();
        return obstacle;
    });

    water = water.map((w) => {
        w.draw();
        return w;
    });
    controlkey.checkCollision();
    newPlayer.update(controlkey.velocity.x*0.3, controlkey.velocity.y*0.3);
    jug = new Jug(c, canvas, newPlayer.position.x, newPlayer.position.y, newPlayer.size.width, newPlayer.size.height)
    jug.draw(waterlevel);

    if(fillreserver(newPlayer, reserver)){
        fillamount = totalScore;
    };
    reserver.gradient(fillamount);

    collected(newPlayer, water)
    waterlevel = ((maxwaterlevel/n_water) * score) + 1;

    if (!startTime) {
        startTime = timeStamp;
    }
    const level = 1
    const timelimit = 120; // in sec
    const ms = 10
    const elapsedTime = timeStamp - startTime;
    timer = (timelimit*ms) - Math.round((elapsedTime / 1000)*ms)
    time.innerHTML = "Time: " + timer;
    totalScore = (waterlevel) * level
    scoreplate.innerHTML = "Score: " + (totalScore - 1);
    
    animationFrameId = requestAnimationFrame(animate);

    // game over timer
    timeout();
    gameover(fillamount);
    
}

button.addEventListener("click", () => {
    if (button.innerHTML === "Restart?") {
        firstload();
    }
    animate();
    button.style.display = "none";
    tutorial_button.style.display = "none";
    waterlevel = 1;
    
});

button.addEventListener("touchstart", () => {
    if (button.innerHTML === "Restart?") {
        firstload();
    }
    animate();
    button.style.display = "none";
    tutorial_button.style.display = "none";
    waterlevel = 1;
})

// game over timer
function timeout() {
    if (timer < 1) {
    cancelAnimationFrame(animationFrameId);
    c.font = innerWidth*.1 + "px Comic Sans MS";
    c.fillStyle = "yellow";
    c.textAlign = "center";
    c.strokeStyle = "Red";
    c.strokeText("Time's up!", canvas.width/2, canvas.height/2);
    c.fillText("Time's up!", canvas.width/2, canvas.height/2);
    button.innerHTML = "Restart?"
    button.style.display = "block";
    tutorial_button.style.display = "block";
    startTime = 0;
    }}

function gameover(fillamount) {
    if (fillamount >= 500) {
        cancelAnimationFrame(animationFrameId);
        c.font = innerWidth*.1 + "px Comic Sans MS";
        //c.fillStyle = "Blue";
        c.textAlign = "center";
        c.strokeStyle = "Red";
        c.strokeText("The reserver is filled!", canvas.width/2, canvas.height/2);
        c.fillText("The reserver is filled!", canvas.width/2, canvas.height/2);
        button.innerHTML = "Restart?"
        button.style.display = "block";
        tutorial_button.style.display = "block";
        startTime = 0;
        
    }
}
let width = innerWidth;
addEventListener("resize", (e) => {
    // alert("Game and score is going to reset!")
    
    if (innerWidth < 700) {
        cancelAnimationFrame(animationFrameId);
        alert("Window size has been changed. This page will reload. If you are on mobile device, please rotate the phone.");
        return;
    }
    else if (innerWidth<width){
        alert("Window size has been changed. This page will reload.")
        location.reload();
    }
})



