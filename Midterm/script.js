const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let playerX = canvasWidth / 2;
let playerY = canvasHeight / 2;
let playerSize = 2;  // 하트의 크기를 2로 설정
let playerRotation = 0; // 플레이어(하트)의 회전 각도
let rotationSpeed = Math.PI / 180; // 회전 속도 (라디안 단위)
let moveSpeed = 2; // 이동 속도

let randomX = Math.random() * canvasWidth;
let randomY = Math.random() * canvasHeight;


document.addEventListener('DOMContentLoaded', function() {
    const titleScreen = document.querySelector('.title-screen');
    const startButton = document.getElementById('startButton');
    const canvas = document.getElementById('myCanvas'); // 캔버스 요소

    startButton.addEventListener('click', function() {
        titleScreen.style.display = 'none'; // 타이틀 화면 숨기기

        setTimeout(() => {
            canvas.style.display = 'block'; // 1초 후에 캔버스 표시
            initializeGame();                 // 게임 시작
        }, 1000);
    });
});


function drawHeart(x, y, size, rotation, fillColor, strokeColor) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    
    for (let angle = 0; angle <= Math.PI * 2; angle += 0.01) {
        const heartX = size * (16 * Math.pow(Math.sin(angle), 3));
        const heartY = -size * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
        
        ctx.lineTo(heartX, heartY);
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.restore();
}

function drawStar(x, y, size, fillColor, strokeColor) {
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    
    for (let i = 0; i < 5; i++) {
        const outerX = x + Math.cos((Math.PI * 2 * i) / 5 - Math.PI / 2) * size;
        const outerY = y + Math.sin((Math.PI * 2 * i) / 5 - Math.PI / 2) * size;
        
        const innerX = x + Math.cos((Math.PI * 2 * (i + 0.5)) / 5 - Math.PI / 2) * (size / 2);
        const innerY = y + Math.sin((Math.PI * 2 * (i + 0.5)) / 5 - Math.PI / 2) * (size / 2);
        
        ctx.lineTo(outerX, outerY);
        ctx.lineTo(innerX, innerY);
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function update() {
    if (keys['ArrowLeft']) {
        playerX -= moveSpeed;
    }
    if (keys['ArrowRight']) {
        playerX += moveSpeed;
    }
    if (keys['ArrowUp']) {
        playerY -= moveSpeed;
    }
    if (keys['ArrowDown']) {
        playerY += moveSpeed;
    }
    
    playerRotation += rotationSpeed;
}

function render() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    ctx.save();
    ctx.translate(-playerX + canvasWidth / 2, -playerY + canvasHeight / 2);
    
    drawStar(randomX, randomY, 30, '#FFFF00', '#000000');
    drawHeart(playerX, playerY, playerSize, playerRotation, 'rgb(192, 0, 0)', '#000000');
    
    ctx.restore();
}

const keys = {};
document.addEventListener('keydown', function(event) {
    keys[event.code] = true;
});

document.addEventListener('keyup', function(event) {
    keys[event.code] = false;
});

function gameLoop() {
    update();
    render();
    
    requestAnimationFrame(gameLoop);
}
document.addEventListener('DOMContentLoaded', function() {
    const titleScreen = document.querySelector('.title-screen');
    const startButton = document.getElementById('startButton');
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    startButton.addEventListener('click', function() {
        titleScreen.style.display = 'none';
        canvas.style.display = 'block';

        initializeGame();
    });
});

function initializeGame() {
    canvas.addEventListener('keydown', function(event) {
        keys[event.code] = true;
    });

    canvas.addEventListener('keyup', function(event) {
        keys[event.code] = false;
    });

    playerX = canvas.width / 2;
    playerY = canvas.height / 2;
    playerSize = 2;
    playerRotation = 0;
    rotationSpeed = Math.PI / 180;
    moveSpeed = 2;

    randomX = Math.random() * canvas.width;
    randomY = Math.random() * canvas.height;

    keys = {};

    gameLoop();
}
// 새로고침할 때 별의 위치를 랜덤으로 업데이트
randomX = Math.random() * canvasWidth;
randomY = Math.random() * canvasHeight;

gameLoop();