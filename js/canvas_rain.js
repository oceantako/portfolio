const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circles = []; // 円を格納する配列
const expansionSpeed = 2; // 拡大速度

// 円クラス
class Circle {
    constructor(x, y) {
        this.x = x; // 中心X
        this.y = y; // 中心Y
        this.radius = 0; // 半径
        this.opacity = 1; // 不透明度
    }

    update() {
        this.radius += expansionSpeed; // 半径を拡大
        this.opacity -= 0.01; // 不透明度を減少
        if (this.opacity < 0) {
            this.opacity = 0; // 最低不透明度を0に
        }
    }

    draw() {
        ctx.strokeStyle = `rgba(0, 119, 190, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
    }
}

// ランダムな位置に円を発生させる
function generateRandomCircle() {
    const randomX = Math.random() * canvas.width;
    const randomY = Math.random() * canvas.height;
    circles.push(new Circle(randomX, randomY));
}

// マウスクリックで円を追加
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    circles.push(new Circle(mouseX, mouseY));
});

// 一定間隔でランダムに円を発生させる
setInterval(generateRandomCircle, 1000); // 1秒ごとにランダム円を生成

// アニメーションのループ
function animate_rain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア

    // すべての円を更新して描画
    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
        circles[i].draw();
        // 不透明度が0になった円を削除
        if (circles[i].opacity <= 0) {
            circles.splice(i, 1);
            i--; // インデックスを調整
        }
    }

    myReq = requestAnimationFrame(animate_rain);
}