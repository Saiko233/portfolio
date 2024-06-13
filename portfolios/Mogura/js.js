const moguras = document.querySelectorAll(".mogura");
const normalMogura = "img/gab4.png";
const moguraHit = "img/gab3.png";
let timer = 20;
let timeArea = document.getElementById("timer");
let hitCount = 0;
let hitCountArea = document.getElementById("count");
let result = document.getElementById("result");

function init() {
  for (let i = 0; i < moguras.length; i++) {
    moguras[i].addEventListener("click", function (e) {
      let mogura = e.target;
      mogura.src = moguraHit;
      mogura.moguraStatus = 2;
      hitCount += 1;
      hitCountArea.textContent = hitCount;
      setTimeout(hideMogura, 300, mogura);
    });
  }
}
init();

function hideMogura(mogura) {
  mogura.moguraStatus = 0;
  mogura.src = "";
}

function gameStart() {
  let countDown = setInterval(() => {
    timer -= 1;
    if (timer <= 0) {
      clearInterval(countDown);
    }
    timeArea.textContent = timer;
    fin();
  }, 1000);

  let appearMogura = setInterval(() => {
    let random = Math.floor(Math.random() * 9);
    let mogura = moguras[random];
    mogura.src = normalMogura;
    mogura.moguraStatus = 1;
    setTimeout(
      (mogura) => {
        if (mogura.moguraStatus != 2) {
          hideMogura(mogura);
        }
      },
      800,
      mogura
    );
    if (timer <= 2) {
      clearInterval(appearMogura);
    }
  }, 1200);

  function fin() {
    if (timer == 0 && hitCount >= 10) {
      alert("CLEAR!");
    } else if (timer == 0 && hitCount < 10) {
      alert("GAMEOVER");
    }
  }
}

gameStart();
