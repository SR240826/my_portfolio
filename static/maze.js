class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.walls = [true, true, true, true]; // top, right, bottom, left of cell
        this.visited = false;
    }
}

let canvas = document.getElementById('mazeCanvas');
let c = canvas.getContext('2d');
let cellSize = 40;
let grid = [];
let stack = [];
let playerposition, targetposition;

function initposition() {
    playerposition = grid[Math.floor(Math.random() * grid.length)];
    do {
        targetposition = grid[Math.floor(Math.random() * grid.length)];
    } while (playerposition === targetposition);
}

function setup() {
    if (innerWidth < 500) {
        canvas.width = 200;
        canvas.height = 200;
        cellSize = 20;
        miro.width = 350;
        miro.height = 768;
    }
    for (let y = 0; y < canvas.height / cellSize; y++) {
        for (let x = 0; x < canvas.width / cellSize; x++) {
            let cell = new Cell(x, y);
            grid.push(cell);
        }
    }

    initposition();
    let current = grid[0];
    current.visited = true;
    stack.push(current);

    while (stack.length > 0) {
        let next = check_sidewalls(current);
        if (next) {
            removeWalls(current, next);
            current = next;
            current.visited = true;
            stack.push(current);
        } else {
            current = stack.pop();
        }
    }

    drawMaze("rgb(30, 79, 29)", 'rgb(211, 255, 166)', 'rgb(255, 99, 146)', "black");
}

function check_sidewalls(cell) {
    let sidewalls = [];

    let top = grid[index(cell.x, cell.y - 1)];
    let right = grid[index(cell.x + 1, cell.y)];
    let bottom = grid[index(cell.x, cell.y + 1)];
    let left = grid[index(cell.x - 1, cell.y)];

    if (top && !top.visited) sidewalls.push(top);
    if (right && !right.visited) sidewalls.push(right);
    if (bottom && !bottom.visited) sidewalls.push(bottom);
    if (left && !left.visited) sidewalls.push(left);

    if (sidewalls.length > 0) {
        return sidewalls[Math.floor(Math.random() * sidewalls.length)];
    } else {
        return undefined;
    }
}

function index(x, y) {
    if (x < 0 || y < 0 || x > canvas.width / cellSize - 1 || y > canvas.height / cellSize - 1) {
        return -1;
    }
    return x + y * (canvas.width / cellSize);
}

// check and make the walls in class Cell --> this.wall to false
function removeWalls(grid1, grid2) {
    let x = grid1.x - grid2.x;
    if (x === 1) {
        grid1.walls[3] = false;
        grid2.walls[1] = false;
    } else if (x === -1) {
        grid1.walls[1] = false;
        grid2.walls[3] = false;
    }
    let y = grid1.y - grid2.y;
    if (y === 1) {
        grid1.walls[0] = false;
        grid2.walls[2] = false;
    } else if (y === -1) {
        grid1.walls[2] = false;
        grid2.walls[0] = false;
    }
}

function drawWalls(color) {
    for (let i = 0; i < grid.length; i++) {
        let cell = grid[i];
        let x = cell.x * cellSize;
        let y = cell.y * cellSize;

        c.lineWidth = cellSize/10;
        c.strokeStyle = color;
        if (cell.walls[0]) {
            c.beginPath();
            c.moveTo(x, y);
            c.lineTo(x + cellSize, y);
            c.stroke();
        }
        if (cell.walls[1]) {
            c.beginPath();
            c.moveTo(x + cellSize, y);
            c.lineTo(x + cellSize, y + cellSize);
            c.stroke();
        }
        if (cell.walls[2]) {
            c.beginPath();
            c.moveTo(x + cellSize, y + cellSize);
            c.lineTo(x, y + cellSize);
            c.stroke();
        }
        if (cell.walls[3]) {
            c.beginPath();
            c.moveTo(x, y + cellSize);
            c.lineTo(x, y);
            c.stroke();
        }
    }
}


function drawMaze(wallcolor, playercolor, targetcolor, textcolor) {
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    drawWalls(wallcolor);

    c.fillStyle = playercolor; 
    c.fillRect(playerposition.x * cellSize, playerposition.y * cellSize, cellSize - 2, cellSize - 2);
    c.font = cellSize/4 +"px Verdana"
    c.fillStyle = textcolor;
    c.fillText("Player", (playerposition.x * cellSize) + cellSize/10, (playerposition.y * cellSize) + cellSize/2);
    
    c.fillStyle = targetcolor;
    c.fillRect(targetposition.x * cellSize, targetposition.y * cellSize, cellSize - 2, cellSize - 2);
    c.fillStyle = textcolor;
    c.fillText("Target", (targetposition.x * cellSize) + cellSize/10, (targetposition.y * cellSize) + cellSize/2);
}



let left = false;
let right = false;
let up = false;
let down = false;

let buttons = document.querySelectorAll('button');

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Check which button was clicked based on its ID
      switch (button.id) {
        case 'btn_top':
            up = true;
            left = false;
            right = false;
            down = false;
            break;
        case 'btn_left':
            left = true;
            up = false;
            right = false;
            down = false;
            break;
        case 'btn_right':
            right = true;
            up = false;
            left = false;;
            down = false;
            break;
        case 'btn_down':
            down = true;
            up = false;
            left = false;
            right = false;
            break;
      }
    let x = playerposition.x;
    let y = playerposition.y;    

    gameover ();
    if (left && !playerposition.walls[3]) { // left arrow key
        x--;
    } else if (up && !playerposition.walls[0]) { // up arrow key
        y--;
    } else if (right && !playerposition.walls[1]) { // right arrow key
        x++;
    } else if (down && !playerposition.walls[2]) { // down arrow key
        y++;
    }
    let nextCell = grid[index(x, y)];
    if (nextCell) {
        playerposition = nextCell;
        drawMaze("rgb(30, 79, 29)", 'rgb(211, 255, 166)', 'rgb(255, 99, 146)', "black");
    }
    gameover ();
    });
});


addEventListener("keyup", ()=>{
    left = false;
    right = false;
    up = false;
    down = false;
})
function move(e){
    switch (e.key.toLowerCase()) {
        case ("a"):
            left = true;
            break;
        case ("d"):
            right = true;
            break;
        case("w"):
            up = true;
            break;
        case("s"):
            down = true;
            break;
    }
}

function moveplayer(e) {
    let x = playerposition.x;
    let y = playerposition.y;
    move(e);   
    

    gameover ();
    if (left && !playerposition.walls[3]) { // left arrow key
        x--;
    } else if (up && !playerposition.walls[0]) { // up arrow key
        y--;
    } else if (right && !playerposition.walls[1]) { // right arrow key
        x++;
    } else if (down && !playerposition.walls[2]) { // down arrow key
        y++;
    }
    let nextCell = grid[index(x, y)];
    if (nextCell) {
        playerposition = nextCell;
        drawMaze("rgb(30, 79, 29)", 'rgb(211, 255, 166)', 'rgb(255, 99, 146)', "black");
    }
    gameover ();
    
}

function gameover () {
    if((playerposition.x === targetposition.x) && playerposition.y == targetposition.y){        
        left = false;
        right = false;
        up = false;
        down = false;
        // c.fillStyle = 'white';
        // c.fillRect(targetposition.x * cellSize, targetposition.y * cellSize, cellSize, cellSize);
        drawMaze("white", "white", "white", "white");
        solved.style.display = "block";
    }
}

window.addEventListener('keydown', moveplayer);
setup();

