const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let playerX = canvasWidth / 2;
let playerY = canvasHeight / 2;
let playerSize = 2;  // 플레이어(하트)의 크기를 2로 설정
let playerRotation = 0; // 플레이어(하트)의 회전 각도
let rotationSpeed = Math.PI / 180; // 회전 속도 (라디안 단위)
let moveSpeed = 2; // 이동 속도

let enemies = []; // 적을 저장할 배열

document.addEventListener('DOMContentLoaded', function () {
    const titleScreen = document.querySelector('.title-screen');
    const startButton = document.getElementById('startButton');

    startButton.addEventListener('click', function () {
        titleScreen.style.display = 'none'; // 타이틀 화면 숨기기
        canvas.style.display = 'block'; // 캔버스 표시
        initializeGame(); // 게임 초기화
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

function drawEnemy(x, y, size, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
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

    // 적 생성
    if (Math.random() < 0.5) { // 화면 바깥에서 랜덤으로 생성
        const side = Math.floor(Math.random() * 4); // 0: 위, 1: 아래, 2: 오른쪽, 3: 왼쪽
        let spawnX, spawnY;
        switch (side) {
            case 0: // 위
                spawnX = Math.random() * canvasWidth + playerX - canvasWidth / 2;
                spawnY = -20 + playerY - canvasHeight / 2;
                break;
            case 1: // 아래
                spawnX = Math.random() * canvasWidth + playerX - canvasWidth / 2;
                spawnY = canvasHeight + 20 + playerY - canvasHeight / 2;
                break;
            case 2: // 오른쪽
                spawnX = canvasWidth + 20 + playerX - canvasWidth / 2;
                spawnY = Math.random() * canvasHeight + playerY - canvasHeight / 2;
                break;
            case 3: // 왼쪽
                spawnX = -20 + playerX - canvasWidth / 2;
                spawnY = Math.random() * canvasHeight + playerY - canvasHeight / 2;
                break;
        }
        const size = Math.random() * 10 + 5; // 적의 크기는 5에서 15 사이의 랜덤값
        const color = '#' + Math.floor(Math.random() * 16777215).toString(16); // 랜덤 색상
        enemies.push({ x: spawnX, y: spawnY, size: size, color: color });
    }

    // 적 이동
    const speed = 1; // 적의 이동 속도
    enemies.forEach((enemy) => {
        const dx = playerX - enemy.x;
        const dy = playerY - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const vx = dx / distance;
        const vy = dy / distance;

        enemy.x += vx * speed;
        enemy.y += vy * speed;
    });
}

function render() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.translate(-playerX + canvasWidth / 2, -playerY + canvasHeight / 2);

    // 적 그리기
    enemies.forEach((enemy) => {
        drawEnemy(enemy.x, enemy.y, enemy.size, enemy.color);
    });

    // 플레이어(하트) 그리기
    drawHeart(playerX, playerY, playerSize, playerRotation, 'rgb(192, 0, 0)', '#000000');

    ctx.restore();
}

const keys = {};
document.addEventListener('keydown', function (event) {
    keys[event.code] = true;
});

document.addEventListener('keyup', function (event) {
    keys[event.code] = false;
});

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

function initializeGame() {
    canvas.addEventListener('keydown', function (event) {
        keys[event.code] = true;
    });

    canvas.addEventListener('keyup', function (event) {
        keys[event.code] = false;
    });

    playerX = canvas.width / 2;
    playerY = canvas.height / 2;


    gameLoop();
}

gameLoop();