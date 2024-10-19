const canvas2 = document.getElementById('waveCanvas');
const ctx2 = canvas2.getContext('2d');

canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

const squares = []; // 正方形を格納する配列
const maxSize = 200; // 最大サイズ
const expansionSpeed2 = 2; // 拡張速度
const rotationSpeed = 2; // 回転速度

// 正方形のクラス
class Square {
    constructor(x, y) {
        this.x = x; // 中心X
        this.y = y; // 中心Y
        this.size = 0; // 現在のサイズ
        this.rotation = 0; // 回転角度
        this.opacity = 1; // 不透明度
    }

    update() {
        this.size += expansionSpeed2; // サイズを増加
        this.rotation += rotationSpeed; // 回転角度を増加
        this.opacity -= 0.01; // 不透明度を減少
        if (this.opacity < 0) {
            this.opacity = 0; // 最低不透明度を0に
        }
    }

    draw() {
        ctx2.strokeStyle = `rgba(189, 93, 56, ${this.opacity})`;
        ctx2.lineWidth = 2;
        ctx2.beginPath();

        // 正方形の四隅の座標を計算
        const halfSize = this.size / 2;
        const corners = [
            { x: -halfSize, y: -halfSize },
            { x: halfSize, y: -halfSize },
            { x: halfSize, y: halfSize },
            { x: -halfSize, y: halfSize }
        ];

        ctx2.save(); // 現在の状態を保存
        ctx2.translate(this.x, this.y); // 中心を移動
        ctx2.rotate(this.rotation * Math.PI / 180); // 回転

        // 正方形を描画
        for (let i = 0; i < corners.length; i++) {
            const { x, y } = corners[i];
            if (i === 0) {
                ctx2.moveTo(x, y);
            } else {
                ctx2.lineTo(x, y);
            }
        }
        ctx2.closePath();
        ctx2.stroke();
        ctx2.restore(); // 保存した状態を復元
    }
}

// マウスクリックで正方形を発生させる
canvas2.addEventListener('click', (event) => {
    const rect = canvas2.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // 新しい正方形を追加
    squares.push(new Square(mouseX, mouseY));
});

// ランダムな位置に正方形を発生させる
function spawnRandomSquare() {
    const randomX = Math.random() * canvas2.width;
    const randomY = Math.random() * canvas2.height;

    squares.push(new Square(randomX, randomY));
}

// 一定間隔でランダムに正方形を生成
setInterval(spawnRandomSquare, 1000); // 1秒ごとにランダムな正方形を生成

// アニメーションのループ
function animate_square() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // キャンバスをクリア

    // すべての正方形を更新して描画
    for (let i = 0; i < squares.length; i++) {
        squares[i].update();
        squares[i].draw();
        // 不透明度が0になった正方形を削除
        if (squares[i].opacity <= 0) {
            squares.splice(i, 1);
            i--; // インデックスを調整
        }
    }

    myReq = requestAnimationFrame(animate_square);
}