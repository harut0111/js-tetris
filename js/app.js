
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