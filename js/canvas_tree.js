const canvas3 = document.getElementById('waveCanvas');
const ctx3 = canvas3.getContext('2d');

canvas3.width = window.innerWidth;
canvas3.height = window.innerHeight;

const radiatingLines = []; // 放射状の線を格納する配列

// 放射状の線のクラス
class BranchingLine {
    constructor(x, y, angle, maxDepth, depth = 0) {
        this.x = x; // 開始点のX
        this.y = y; // 開始点のY
        this.angle = angle; // 線の角度
        this.length = 0; // 現在の長さ
        this.speed = Math.random() * 1.5 + 0.5; // ランダムな速度で線が伸びる（0.5〜2）
        this.maxLength = Math.random() * 50 + 50; // ランダムな最大長さ（50〜100）
        this.opacity = 1 - depth * 0.2; // 深さに応じて不透明度を低下
        this.depth = depth; // 現在の深さ
        this.maxDepth = maxDepth; // 最大の深さ
        this.branches = []; // 枝分かれのリスト
        this.hasBranched = false; // 一度枝分かれしたかどうか
        this.lifespan = 450; // 線の寿命（500フレーム）
    }

    update() {
        this.length += this.speed; // 線がランダムな速度で伸びる
        this.lifespan -= 1; // 寿命を減少させる

        // 寿命が尽きたら不透明度を減少
        if (this.lifespan < 30) {
            this.opacity = this.lifespan / 30; // 残り寿命に応じて不透明度を調整
        }

        if (this.length > this.maxLength) {
            this.length = this.maxLength; // 最大長さに達したら止まる

            // 枝分かれ条件（まだ枝分かれしておらず、最大深度に達していない場合）
            if (!this.hasBranched && this.depth < this.maxDepth) {
                this.branchOut();
                this.hasBranched = true;
            }
        }

        // 子の枝も更新
        for (let branch of this.branches) {
            branch.update();
        }
    }

    draw() {
        if (this.lifespan <= 0) return; // 寿命が尽きたら描画しない

        // 深さに基づいて色を変更
        let color;
        if (this.depth === 0) {
            color = `rgba(69, 80, 29, ${this.opacity})`; // 幹（深さ0）の色
        } else {
            color = `rgba(108, 129, 33, ${this.opacity})`; // 枝（深さ1以上）の色
        }

        ctx3.strokeStyle = color;
        ctx3.lineWidth = 2;
        ctx3.beginPath();

        const endX = this.x + this.length * Math.cos(this.angle); // 終点X
        const endY = this.y + this.length * Math.sin(this.angle); // 終点Y

        ctx3.moveTo(this.x, this.y);
        ctx3.lineTo(endX, endY);
        ctx3.stroke();

        // 子の枝も描画
        for (let branch of this.branches) {
            branch.draw();
        }
    }

    // 枝分かれをランダムな角度で作成
    branchOut() {
        const branchCount = Math.floor(Math.random() * 3) + 2; // 2〜4本の枝をランダムに生成
        for (let i = 0; i < branchCount; i++) {
            const newAngle = this.angle + (Math.random() * Math.PI / 3 - Math.PI / 6); // ±30度の範囲で枝分かれ
            const branch = new BranchingLine(
                this.x + this.length * Math.cos(this.angle), // 現在の終点が次の枝の開始点
                this.y + this.length * Math.sin(this.angle),
                newAngle,
                this.maxDepth,
                this.depth + 1 // 深さを増やす
            );
            this.branches.push(branch); // 新しい枝を追加
        }
    }
}

// マウスクリックで放射状の線を発生させる
canvas3.addEventListener('click', (event) => {
    const rect = canvas3.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // 新しい放射状の線を追加
    radiatingLines.push(new BranchingLine(mouseX, mouseY, Math.random() * 2 * Math.PI, 4));
});

// ランダムな位置に放射状の線を発生させる
function spawnRandomBranchingLine() {
    const randomX = Math.random() * canvas3.width;
    const randomY = Math.random() * canvas3.height;

    radiatingLines.push(new BranchingLine(randomX, randomY, Math.random() * 2 * Math.PI, 4));
}

// 一定間隔でランダムに放射状の線を生成
setInterval(spawnRandomBranchingLine, 1500); // 1.5秒ごとにランダムな位置に放射状の線を生成

// アニメーションのループ
function animate_tree() {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height); // キャンバスをクリア

    // すべての放射状の線を更新して描画
    for (let i = 0; i < radiatingLines.length; i++) {
        radiatingLines[i].update();
        radiatingLines[i].draw();
        // 寿命が尽きた線を削除
        if (radiatingLines[i].lifespan <= 0) {
            radiatingLines.splice(i, 1);
            i--; // インデックスを調整
        }
    }

    myReq = requestAnimationFrame(animate_tree);
}