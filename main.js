// Making Const variables and colors for ball and paddles
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "lightblue";
const paddle1Color = "black";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "yellow";
const ballBordercolor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed = 1;
let ballx = gameWidth / 2;
let bally = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
// Let Variables for paddle size
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
};
// btn clicked and event listeners
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
//game start
gameStart();


function gameStart(){
    createBall();
    nextTick();
};
function nextTick(){
    intervalID = setTimeout(() => {
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballx, bally);
        checkCollision();
        nextTick();
    }, 10)
}; // drawing background
function clearBoard(){
    ctx.fillStyle = boardBackground; 
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}; // drawing paddles
function drawPaddles(){
    ctx.strokeStyle = paddleBorder;

    ctx.fillstyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillstyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}; // drawing ball
function createBall(){
    ballSpeed = 1;
    if(Math.round(Math.random()) == 1){
    ballXDirection = 1;
    } 
    else {
        ballXDirection = -1;
    }
    if(Math.round(Math.random()) == 1){
        ballYDirection = 1;
        } 
        else {
            ballYDirection = -1;
        }
        ballx = gameWidth / 2;
        bally = gameWidth / 2;
        drawBall(ballx, bally);
}; // moving ball
function moveBall(){
    ballx += (ballSpeed * ballXDirection);
    bally += (ballSpeed * ballYDirection);
};
function drawBall(ballx, bally){
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBordercolor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballx, bally, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}; // Collosion detection for ball and paddles
function checkCollision(){
    if(bally <= 0 + ballRadius) {
        ballYDirection  *= -1;
    }
    if(bally >= gameHeight - ballRadius){
        ballYDirection  *= -1;

    } 
    if(ballx <= 0){
        player2Score+=1;
        updateScore();
        createBall();
        return;
    }
    if(ballx >= gameWidth){
        player1Score+=1;
        updateScore();
        createBall();
        return;
    }

    if(ballx <= (paddle1.x + paddle1.width + ballRadius)){
    if(bally > paddle1.y && bally < paddle1.y + paddle1.height){
        ballx = (paddle1.x + paddle1.width) + ballRadius // if the ball gets stuck
    ballXDirection *= -1;
    ballSpeed += 1;
    }
}
    if(ballx >= (paddle2.x - ballRadius)){
        if(bally > paddle2.y && bally < paddle2.y + paddle2.height){
        ballx = paddle2.x - ballRadius; // if the ball gets stuck
        ballXDirection *= -1;
        ballSpeed += 1;
    }
    }
}; // changing direction of ball
function changeDirection(){
    const keyPressed = event.keyCode;
    console.log(keyPressed);
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;

    switch(keyPressed) {
        case(paddle1Up):
        if(paddle1.y > 0){
        paddle1.y -= paddleSpeed;
      
        }
        break;
        case(paddle1Down):
        if(paddle1.y < gameHeight - paddle1.height){
        paddle1.y += paddleSpeed;
        }
        break;

        case(paddle2Up):
        if(paddle2.y > 0){
        paddle2.y -= paddleSpeed;
        }
        break;

        case(paddle2Down):
        if(paddle2.y < gameHeight - paddle2.height){
        paddle2.y += paddleSpeed;
        }
        break;
    }
}; // updating score after getting point
function updateScore(){
    scoreText.textContent = `${player1Score} : ${player2Score}`;
}; // game reset with paddles and ball
function resetGame(){
    player1Score = 0;
    player2Score = 0;
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    };
    ballSpeed = 1;
    ballx = 0;
    bally = 0;
ballXDirection = 0;
ballYDirection = 0;
updateScore(); // score update
clearInterval(intervalID);
gameStart(); // game start again
};
