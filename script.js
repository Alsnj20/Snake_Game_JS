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
  ArrowLeft: -1
}

//Game Variables
let snake = [];
let score = 0;
let direction;
let boardSquares = {};
let emptySquares = [];
let moveInterval;

const boardSize = 10;
const gameSpeed = 100; //100 milisegundos


const createBord = () => {
  boardSquares.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const squareValue = `${rowIndex}${columnIndex}`;
      const squareDiv = document.createElement('div');
      squareDiv.classList.add('square', 'emptySquare');
      squareDiv.setAttribute('id', squareValue);
      board.appendChild(squareDiv);
      emptySquares.push(squareValue);
    })
  })
}

const drawSnake = () => {
  //Remeber snake = ['00', '01', '02', '03'];
  snake.forEach(square => drawSquare(square, 'snakeSquare'));

}

const drawSquare = (position, type) => {
  const [row, column] = position.split('');
  boardSquares[row][column] = squareTypes[type];
  const square = document.getElementById(position);
  square.setAttribute('class', `square ${type}`);

  if (type === 'EmptySquare') {
    emptySquares.push(position);
  } else {
    if (emptySquares.indexOf(position) !== -1) {
      emptySquares.splice(emptySquares.indexOf(position), 1);
    }
  }
}

const moveSnake = () => {
  //Obteniendo la ultima posicion de snake
  const newSquare = String(
    Number(snake[snake.length-1])+directions[direction])
    .padStart(2, '0');
    const [row, col] = newSquare.split('');
    if(newSquare < 0 || newSquare > boardSize*boardSize || 
      direction === 'ArrowRight' && col == 0 ||
      direction === 'ArrowLeft' && col == 9 || 
      boardSquares[row][col] === squareTypes.snakeSquare){
      gameOverP();
    }else{
      snake.push(newSquare);
      // es decir 2 = 2
      if(boardSquares[row][col] === squareTypes.foodSquare){
        //si esto es cierto entonces crece
        addFood()
      }else{
        const emptySquare = snake.shift();
        drawSquare(emptySquare, 'emptySquare');
      }
      drawSnake();
    }
}
const addFood = () => {
  score++;
  updateScore();
  createFood();
}
const gameOverP = () =>{
  gameOver.style.display = 'block';
  clearInterval(moveInterval)
  startBtn.disabled = false;
}

const updateScore = () => scoreBoard.textContent = score;

const createFood = () => {
  const random = Math.floor(Math.random() * emptySquares.length);
  const emptyCeil = emptySquares[random];
  drawSquare(emptyCeil, 'foodSquare');
}

const setDirection = (newDirection) => direction = newDirection;

const directionEvent = (key) => {
  console.log(key.code);
  switch (key.code) {
    case 'ArrowUp':
      if (direction != 'ArrowDown') { setDirection(key.code) }
      break;
    case 'ArrowDown':
      if (direction != 'ArrowUp') { setDirection(key.code) }
      break;
    case 'ArrowRight':
      if (direction != 'ArrowLeft') { setDirection(key.code) }
      break;
    case 'ArrowLeft':
      if (direction != 'ArrowRight') { setDirection(key.code) }
      break;
  }
}

setGame = () => {
  snake = ['00', '01', '02', '03'];
  score = snake.length;
  direction = 'ArrowRight';
  /*Table 10 x 10 */
  boardSquares = Array.from(Array(boardSize), () =>
    new Array(boardSize).fill(squareTypes.emptySquare)
  );
  console.log(boardSquares);
  board.innerHTML = "";
  emptySquares = [];
  createBord();
}


const startGame = () => {
  //Inicializar valores
  setGame();
  gameOver.style.display = 'none';
  /*desactivado*/
  startBtn.disabled = true;
  drawSnake();
  updateScore();
  createFood();
  document.addEventListener('keydown', directionEvent);
  moveInterval = setInterval(() => moveSnake(), 200);
  console.log(moveInterval);

}

startBtn.addEventListener('click', startGame);
