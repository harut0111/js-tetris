

let cvs = document.getElementById('myCanvas');
let ctx = cvs.getContext('2d');


const ROW = 20;
const COLUMN = 10;
const SQ = 20;
const VACANT = 'black';

const scoreElement = document.getElementById("score");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const newGameButton = document.getElementById("newGame");

let score = 0;


// draw a th square
function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// create the board
let board = [];

for(let r = 0; r < ROW; r++) {
    board[r] = [];
    for (let c = 0; c < COLUMN; c++) {
        board[r][c] = VACANT;         
    }
}

//draw the board
drawBoard();

function drawBoard() {
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COLUMN; c++) {
            drawSquare(c, r, board[r][c]);  
        }    
    }
}

//Piece Class
class Piece {
    constructor(tetromino = [], color) {
        this.tetromino = tetromino;
        this.tetrominoN = 0;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.color = color;
        this.x = 3;
        this.y = -1;
    }

    //fill method
    fill(color) {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino.length; c++) {
                // draw only squares with value "1"
                if (this.activeTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, color) ;
                }               
            }             
        }
    }

    // draw tetromino
    draw() {
        this.fill(this.color);
    }

    // undraw a piece
    unDraw() {
        this.fill(VACANT);
    }

    // move down the piece
    moveDown() {
        if (!this.collision(0, 1, this.activeTetromino)) {
            this.unDraw();
            this.y++;
            this.draw();
        } else {
            // lock the piece and generate a new one
            this.lock();
            p = randomPiece();
        }
    }

    // move right the piece
    moveRight() {
        if (!this.collision(1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x++;
            this.draw();
        }
    }

    // move left the piece
    moveLeft() {
        if (!this.collision(-1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x--;
            this.draw();
        }
    }

    // rotate the piece
    rotate() {
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
        let kick = 0;
        if(this.collision(0, 0, nextPattern)) {
            if (this.x > COLUMN / 2) {
                // it's the right wall
                kick = -1; 
            } else {
                // it's the left wall
                kick = 1;
            }
        }

        if (!this.collision(kick, 0, nextPattern)) {
            this.unDraw();
            this.x += kick;
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.draw();
        }
    }

    // check the cllision
    collision(x, y, piece) {

        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece.length; c++) {

                if (!piece[r][c]) {
                    continue;
                }
                // coordinates of the piece after movement
                let newX = this.x + c + x;
                let newY = this.y + r + y;

                // conditions for borders
               
                if (newX < 0 || newX >= COLUMN || newY >= ROW) {
                    return true;
                }

                if (newY < 0) {
                    continue;
                }
                // check if there is a locked piece already in piece
                if (board[newY][newX] != VACANT) {
                    return true;
                }
            }   
        }
        return false;
    }

    // lock the pieces
    lock() {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino.length; c++) {
                // skicp teh vacat squares
                if (!this.activeTetromino[r][c]) {
                    continue;
                }
                // pieces to lock on top means game over
                if(this.y + r < 0) {
                    gameOver = true;
                    alert("Game Over");
                    break;
                }
                // lock the piece
                board[this.y + r][this.x + c] = this.color;          
            }             
        }
        // remove full rows
        for (let r = 0; r < ROW; r++) {
            let isRowFull = true;
            for (let c = 0; c < COLUMN; c++) {
                isRowFull = isRowFull && (board[r][c] != VACANT);  
            }
            if (isRowFull) {
                // move down all the rows above it
                for (let y = r; y > 1; y--) {
                    for (let c = 0; c < COLUMN; c++) {
                        board[y][c] = board[y-1][c]  
                    }
                }
                // the top row board has no row above it
                for (let c = 0; c < COLUMN; c++) {
                    board[0][c] = VACANT;
                }
                // increment the score
                score += 10;
            }  
        }
        // update the board
        drawBoard();

        // update the score
        scoreElement.innerHTML = score;
    }

    // class end
}

// the pieces wth their colors
const PIECES = [
    [Z, 'red'],
    [S, 'blue'],
    [J, '#ff801a'],
    [T, 'red'],
    [L, 'blue'],
    [I, '#ff801a'],
    [O, 'red'],
];


// generate random pieces
let p = randomPiece();

function randomPiece() {
    let r = randomN = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[r][0], PIECES[r][1]);
}


// play and pause game

playButton.addEventListener('click', playPause);
pauseButton.addEventListener('click', playPause);

let id;
let play = false;

function playPause(ev) {
    if (ev.target.innerHTML == 'Play') {
        if (!play) {
            drop();
            play = true;
        }
    } else {
        clearTimeout(id);
        play = false;
    }
}

// start new game
newGameButton.addEventListener('click', () => document.location.reload());


// drop the piece every second
let gameOver = false;

function drop() {  
    p.moveDown();
    if (!gameOver) {
        id = setTimeout(drop, 1000);
    }
    
}


// control the piece
document.addEventListener('keydown', control);

function control(event) {

    switch(event.which) {
        case 37: 
            p.moveLeft();
            break;
        case 38:
            p.rotate();
            break;
        case 39:
            p.moveRight();
            break;
        case 40:
            p.moveDown();
    }

} 

