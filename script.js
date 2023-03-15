// Define canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
const canvasWidth = 1260;
const canvasHeight = 540;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Define initial snake position and size
let snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];
const snakeSize = 20;

// Define initial food position and size
let food = { x: 5, y: 5 };
const foodSize = 20;

// Define initial direction of the snake
let direction = "right";

// Define initial score
let score = 0;



function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);
  }

  function drawName(name) {
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText("Name: " + name, 10, 60);
  }

  function drawInst() {
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText("(use arrow keys)", 10, 90);
  }

  


// Define function to draw a square on the canvas
function drawSquare(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * size, y * size, size, size);
}


function drawRoundHead(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x * size + size / 2, y * size + size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
  
    // Draw the eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x * size + size / 4, y * size + size / 4, size / 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x * size + 3 * size / 4, y * size + size / 4, size / 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x * size + size / 4, y * size + size / 4, size / 16, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x * size + 3 * size / 4, y * size + size / 4, size / 16, 0, 2 * Math.PI);
    ctx.fill();
  
    // Draw the mouth
    ctx.fillStyle = "white";
    ctx.beginPath();
    if (direction === "right") {
      ctx.moveTo(x * size + 3 * size / 4, y * size + 3 * size / 4);
      ctx.lineTo(x * size + size / 2, y * size + 5 * size / 8);
      ctx.lineTo(x * size + size / 4, y * size + 3 * size / 4);
    } else if (direction === "left") {
      ctx.moveTo(x * size + size / 4, y * size + 3 * size / 4);
      ctx.lineTo(x * size + size / 2, y * size + 5 * size / 8);
      ctx.lineTo(x * size + 3 * size / 4, y * size + 3 * size / 4);
    } else if (direction === "up") {
      ctx.moveTo(x * size + size / 4, y * size + 3 * size / 4);
      ctx.lineTo(x * size + size / 2, y * size + 5 * size / 8);
      ctx.lineTo(x * size + 3 * size / 4, y * size + 3 * size / 4);
    } else if (direction === "down") {
      ctx.moveTo(x * size + 3 * size / 4, y * size + 3 * size / 4);
      ctx.lineTo(x * size + size / 2, y * size + 5 * size / 8);
      ctx.lineTo(x * size + size / 4, y * size + 3 * size / 4);
    }
    ctx.fill();
  }
  

// Define function to move the snake
function moveSnake() {
  // Remove the last segment of the snake
  const tail = snake.pop();
  // Get the coordinates of the new head of the snake based on the current direction
  let newHead;
  switch (direction) {
    case "up":
      newHead = { x: snake[0].x, y: snake[0].y - 1 };
      break;
    case "down":
      newHead = { x: snake[0].x, y: snake[0].y + 1 };
      break;
    case "left":
      newHead = { x: snake[0].x - 1, y: snake[0].y };
      break;
    case "right":
      newHead = { x: snake[0].x + 1, y: snake[0].y };
      break;
  }
  // Add the new head to the beginning of the snake
  snake.unshift(newHead);

  if (newHead.x < 0 || newHead.y < 0 || newHead.x >= canvasWidth / snakeSize || newHead.y >= canvasHeight / snakeSize || checkCollision()) {
    // Display game over message
    alert(`Game over! Your score was ${score}.`);
    // Reset the game
    snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    direction = "right";
    spawnFood();
    score = 0;
  }

  // If the snake's head is on the food, increase the snake size, spawn new food, and update the score
  if (newHead.x === food.x && newHead.y === food.y) {
    snake.push(tail);
    spawnFood();
    score += 10;
  }
}

// Define function to spawn new food in a random position on the canvas
function spawnFood() {
  food = {
    x: Math.floor(Math.random() * canvasWidth / snakeSize),
    y: Math.floor(Math.random() * canvasHeight / snakeSize),
  };
}

// Define function to handle key presses
function handleKeyPress(event) {
  switch (event.code) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
}

// Define function

function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true;
      }
    }
    return false;
  }


// Define game loop
function gameLoop() {
    
  // Clear the canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // Move the snake
  moveSnake();
  // Draw the snake
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
        drawRoundHead(snake[i].x, snake[i].y, snakeSize, "green");
      } else {
        drawSquare(snake[i].x, snake[i].y, snakeSize, "green");
      }
      
  }
  // Draw the food
  drawSquare(food.x, food.y, foodSize, "red");
    // Draw the score
    drawScore();
    drawName("Satyavanth");
    drawInst();
  
  // Set timeout for the next loop iteration
  setTimeout(gameLoop, 100);
}

// Add event listener for key presses
document.addEventListener("keydown", handleKeyPress);

// Start the game loop
gameLoop();
