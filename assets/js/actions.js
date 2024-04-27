const tablero= document.querySelector(".tablero");
const scoreGame= document.querySelector(".score");
const highscoreGame= document.querySelector(".high-Score");

let gameOver = false;
let comidaX, comidaY;
let snakeX=5, snakeY=10;
let velocidadX=0, velocidadY=0;
let snakeBody = [];
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-Score")|| 0;

highscoreGame.innerHTML = `high Score: ${highScore}`;

const CambiarPosicionComida = () => {
    comidaX = Math.floor(Math.random() *30)+1;
    comidaY = Math.floor(Math.random() *30)+1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over!");
    location.reload();
}

const cambiarDireccion = (e) => {
    if(e.key === "ArrowUp" && velocidadY!=1){
        velocidadX= 0;
        velocidadY= -1;

    }else if(e.key === "ArrowDown" && velocidadY!=-1){
        velocidadX= 0;
        velocidadY= 1;

    }else if(e.key === "ArrowLeft" && velocidadX!=1){
        velocidadX= -1;
        velocidadY= 0;

    }
    else if(e.key === "ArrowRight" && velocidadX!=-1){
        velocidadX= 1;
        velocidadY= 0;

    }
    //initGame();
}

const initGame = ()=>{
    if(gameOver) return handleGameOver();

    let HtmlMarkUp = `<div class="comida" style="grid-area: ${comidaY} / ${comidaX}"></div>`;

    if(snakeX===comidaX && snakeY===comidaY){
        CambiarPosicionComida();
        snakeBody.push([comidaX,comidaY])
        score++;

        highScore= score>= highScore ? score: highScore;
        localStorage.setItem("high-Score", highScore);
        scoreGame.innerHTML = ` score: ${score}`;

        highscoreGame.innerHTML = `high Score: ${highScore}`;
    }

    for( let i = snakeBody.length -1; i>0; i--) {
        snakeBody[i] = snakeBody[i -1];
    }

    snakeBody[0] = [snakeX,snakeY];

    snakeX+= velocidadX;
    snakeY+= velocidadY;

    if(snakeX<=0|| snakeX>30||snakeY<=0|| snakeY>30) {
        gameOver = true;       
    }

    for(let i = 0; i< snakeBody.length; i++) {
        HtmlMarkUp += `<div class="cabeza" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !==0 && snakeBody[0][1]===snakeBody[i][1] &&snakeBody[0][0]===snakeBody[i][0]) {
            gameOver = true;
        }
    }

    
    tablero.innerHTML=HtmlMarkUp;
}
CambiarPosicionComida();
//initGame();
setIntervalId=setInterval(initGame, 125);
document.addEventListener("keydown", cambiarDireccion);