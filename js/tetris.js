

let cvs = document.getElementById('myCanvas');
let ctx = cvs.getContext('2d');

const ROW = 20;
const COLUMN = 10;
const SQ = squareSize = 20;
const VACANT = 'white';


// DR
function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}




let board = [];

// create the board
for(let r = 0; r < ROW; r++) {
    board[r] = [];
    for (let c = 0; c < COLUMN; c++) {
        board[r][c] = VACANT;         
    }
}

//draw the board
function drawBoard() {
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COLUMN; c++) {
            drawSquare(c, r, board[r][c]);  
        }    
    }
}
drawBoard();


//Piece Class
class Piece {
    constructor(tetromino = [], color) {
        this.tetromino = tetromino;
        this.tetrominoN = 0;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.color = color;
        this.x = 3;
        this.y = 2;

    }


    //fill method
    fill(color) {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino.length; c++) {
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
        this.unDraw();
        this.y++;
        this.draw();
    }

    // move right the piece
    moveRight() {
        this.unDraw();
        this.x++;
        this.draw();
    }

    // move left the piece
    moveLeft() {
        this.unDraw();
        this.x--;
        this.draw();
    }

    // rotate the piece
    rotate() {
        this.unDraw();
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }




}


const PIECES = [
    [Z, 'red'],
    [S, 'green'],
    [J, 'yellow'],
    [T, 'blue'],
    [L, 'purple'],
    [I, 'cyan'],
    [O, 'orange'],
];

let p = new Piece(PIECES[0][0], PIECES[0][1]);
p.draw();




// control the piece

document.addEventListener('keydown', control);


function control(event) {

    switch(event.keyCode) {
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


// drop the piece every second
function drop() {
    p.moveDown();
    setTimeout(drop, 1000);
}

