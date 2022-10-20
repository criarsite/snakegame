let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 30;
let snake = [];
let score = 0;

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function drawFood() {
    context.fillStyle = "blue";
    context.fillRect(food.x, food.y, box, box);
}

function criarBG() {
    context.fillStyle = "gray";
    context.fillRect(0, 0, 15 * box, 15 * box);
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

}

function iniciarJogo() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Fim do jogo =(');
            reiniciarJogo();
        }
    }

    criarBG();
    drawFood();
    criarCobrinha();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    else if (direction == "left") snakeX -= box;
    else if (direction == "up") snakeY -= box;
    else if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) snake.pop();
    else {
        let p = document.getElementById("pScore");
        food.x = Math.floor(Math.random() * 14 + 1) * box;
        food.y = Math.floor(Math.random() * 14 + 1) * box;
        score = score + 100;
        p.innerHTML = "Pontos: " + score;
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

function reiniciarJogo() {
    score = 0;
    let p = document.getElementById("pScore");
    p.innerHTML = "Pontos: " + score;
    snake = [];
    snake[0] = {
        x: 8 * box,
        y: 8 * box
    }

    food.x = Math.floor(Math.random() * 14 + 1) * box;
    food.y = Math.floor(Math.random() * 14 + 1) * box;

    jogo = setInterval(iniciarJogo, 100);
}

let jogo = setInterval(iniciarJogo, 100);