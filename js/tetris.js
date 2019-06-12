
/* debugger; */
let cvs = document.getElementById('myCanvas');
let ctx = cvs.getContext('2d');

const SQ = 20;

function drewSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

const ROW = 20;
const COLUMN = 10;
const VACANT = 'white';

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
            drewSquare(c, r, board[r][c]);  
        }    
    }
}
drawBoard();

//////
const Z = [
    [[1,1,0], [0,1,1], [0,0,0]]
]

let piece = Z[0];
const pieceColor = 'orange';
for (let r = 0; r < piece.length; r++) {
    for (let c = 0; c < piece.length; c++) {
        if (piece[r][c]) {
            drewSquare(c,r,pieceColor);
        }
    } 
}

//Piece Class

class Piece {
    constructor(tetromino, color) {
        this.tetromino = tetromino;
        this.tetrominoN = 0;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.color = color;
        this.x = 3;
        this.y = -2;
    }
}