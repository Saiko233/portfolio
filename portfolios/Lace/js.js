const roadarea = document.querySelector(".road");
const scorespan = document.getElementById("score");
const imgS = 80; //画像のサイズ
const loadH = 750; //道の高さ
const border = 10; //道の枠
const LINE_HEIGHT = 100; //ラインの高さ
const LOAD_WIDTH = 400; //道の幅
const ENEMY_INIT_P = -300; //敵の初期位置
const ENEMY_COUNT = 4; //敵の最大の数
let player = { speed: 5 }; //全体のスピード
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
let score = 0;

document.addEventListener("keydown", keyDown);
function keyDown(e) {
  keys[e.key] = true;
}

document.addEventListener("keyup", keyUp);
function keyUp(e) {
  keys[e.key] = false;
}

function moveLines() {
  //ラインを動かす関数
  let roadlines = document.querySelectorAll(".line");
  roadlines.forEach(function (item) {
    //ラインの下部が画面の下まで行ったら
    if (item.y >= loadH - LINE_HEIGHT) {
      item.y = item.y - loadH; //ラインの下部を画面の上まで戻す
    }
    item.y = item.y + player.speed; //スピードの分だけ下へ
    item.style.top = item.y + "px"; //スタイルを適用
  });
}

function isAreaOverlap(cx, cy, cw, ch, ex, ey, ew, eh) {
  if (ex + ew < cx) return false; //キャラの左と敵の右
  if (cx + cw < ex) return false; //キャラの右と敵の左
  if (ey + eh < cy) return false; //キャラの上と敵の下
  if (cy + ch < ey) return false; //キャラの下と敵の上
  return true; // ここまで到達する場合には、どこかしらで重なる
}

function moveEnemies(chara) {
  score++;
  scorespan.textContent = score; //スコアを表示
  let enemies = document.querySelectorAll(".enemy");
  let chara_p = chara.getBoundingClientRect(); //キャラの位置を取得
  enemies.forEach(function (item) {
    let enemy_p = item.getBoundingClientRect(); //敵の位置を取得
    if (score > 1000) {
      player.start = false;
      alert("ゲームクリア");
    }
    if (isAreaOverlap(chara_p.top, chara_p.left, imgS, imgS, enemy_p.top, enemy_p.left, imgS, imgS)) {
      player.start = false;
      alert("ゲームオーバー");
    }
    if (item.y > loadH - imgS) {
      //敵の下部が画面の下まで行ったら
      item.y = ENEMY_INIT_P; //初期位置に戻す         //道の幅内
      item.style.left = Math.floor(Math.random() * (LOAD_WIDTH - imgS)) + "px";
    }
    item.y = item.y + player.speed; //スピードの分だけ下へ
    item.style.top = item.y + "px"; //スタイルを適用
  });
}

function playarea() {
  let chara = document.querySelector(".chara");
  let road = roadarea.getBoundingClientRect(); //道の位置情報を取得
  if (player.start) {
    moveLines(); //ラインを動かす
    moveEnemies(chara); //敵を動かす
    //道の上部
    if (keys.ArrowUp && player.y > road.top + imgS) {
      player.y = player.y - player.speed;
    } //道の下部
    if (keys.ArrowDown && player.y < road.bottom - imgS) {
      player.y = player.y + player.speed;
    } //道の左端
    if (keys.ArrowLeft && player.x > 0) {
      player.x = player.x - player.speed;
    } //道の右端
    if (keys.ArrowRight && player.x < road.width - (imgS + border * 4)) {
      player.x = player.x + player.speed;
    }

    chara.style.top = player.y + "px"; //スタイルを適用
    chara.style.left = player.x + "px"; //スタイルを適用
    window.requestAnimationFrame(playarea);
  }
}

function init() {
  player.start = true; //ゲームスタートのフラグ
  window.requestAnimationFrame(playarea); //アニメーション
  //キャラを作成
  let chara = document.createElement("div");
  chara.setAttribute("class", "chara");
  roadarea.appendChild(chara);
  //キャラの位置を取得
  player.x = chara.offsetLeft;
  player.y = chara.offsetTop;
  //中央のラインを作成
  for (let x = 0; x < 5; x++) {
    let roadlines = document.createElement("div");
    roadlines.setAttribute("class", "line");
    roadlines.y = x * LINE_HEIGHT * 1.5;
    roadlines.style.top = roadlines.y + "px"; //スタイルを適用
    roadarea.appendChild(roadlines);
  }
  //敵を作成
  for (let x = 0; x < ENEMY_COUNT; x++) {
    let enemy = document.createElement("div");
    enemy.setAttribute("class", "enemy");
    enemy.y = (x + 1) * ENEMY_INIT_P;
    enemy.style.top = enemy.y + "px";
    enemy.style.left = Math.floor(Math.random() * (LOAD_WIDTH - imgS)) + "px";
    roadarea.appendChild(enemy);
  }
}

init();
