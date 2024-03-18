const board = document.querySelector('#board');
const scoreBoard = document.querySelector('#scoreBoard');
const startBtn = document.querySelector('#start');
const gameOver = document.querySelector('#gameOver');

const squareTypes = {
  emptySquare: 0,
  snakeSquare: 1,
  foodSquare: 2
}

const directions = {
  ArrowUp: -10,
  ArrowDown: 10,
  ArrowRight: 1,
  ArrowLeft : -1
}

//Game Variables
let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

const boardSize = 10;
const gameSpeed = 100; //100 milisegundos

setGame = () => {
  snake = ['00', '01', '02', '03'];
  score = snake.length;
  direction = 'ArrowRight';
  /*Table 10 x 10 */
  boardSquares = Array.from(Array(boardSize), ()=> 
    new Array(boardSize).fill(squareTypes.emptySquare)
  );
}
setGame();
boardSquares.map((row) => {
  row.forEach((cell) => console.log(`|${cell}|`));
  console.log("\n");
});

const startGame = () => {
  //Inicializar valores
  setGame();

}

startBtn.addEventListener('click', startGame);
