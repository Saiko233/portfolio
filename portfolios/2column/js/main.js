// jump
window.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const anchorLinksArr = Array.prototype.slice.call(anchorLinks);

  anchorLinksArr.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.hash;
      const targetElement = document.querySelector(targetId);
      const targetOffsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top;
      window.scrollTo({
        top: targetOffsetTop,
        behavior: "smooth",
      });
    });
  });
});

// Slide show
const img = ["./images/69men.jpeg", "./images/ichizou.jpeg", "./images/jagura.jpeg"];
let count = -1;
picChange();
function picChange() {
  count++;
  if (count == img.length) count = 0;
  slide.src = img[count];
  setTimeout("picChange()", 4900);
}

// hbg
$('.menu-content a[href^="#"]').on("click", function () {
  $(".menu-btn").click(); // .menuをクリックした時と同じ処理
  return false; //a要素のリンク先移動防ぐ
});

// menu
//基準点の準備
var elemTop = [];

//現在地を取得するための設定を関数でまとめる
function PositionCheck() {
  //headerの高さを取得
  var headerH = $("#slideshow").outerHeight(true);
  //.scroll-pointというクラス名がついたエリアの位置を取得する設定
  $(".feature").each(function (i) {
    //.scroll-pointクラスがついたエリアからトップまでの距離を計算して設定
    elemTop[i] = Math.round(parseInt($(this).offset().top - headerH)); //追従するheader分の高さ（70px）を引き小数点を四捨五入
  });
}

//ナビゲーションに現在地のクラスをつけるための設定
function ScrollAnime() {
  //スクロールした際のナビゲーションの関数にまとめる
  var scroll = Math.round($(window).scrollTop());
  var NavElem = $("#g-nav li"); //ナビゲーションのliの何番目かを定義するための準備
  $("#g-nav li").removeClass("current"); //全てのナビゲーションの現在地クラスを除去
  if (scroll >= 0 && scroll < elemTop[1]) {
    //スクロール値が0以上 .scroll-point 1つめ（area-1）の高さ未満
    $(NavElem[0]).addClass("current"); //1つめのliに現在地クラスを付与
  } else if (scroll >= elemTop[1] && scroll < elemTop[2]) {
    //.scroll-point 1つめ（area-1）以上.scroll-point 2つめ（area-2）未満
    $(NavElem[1]).addClass("current"); //2つめのliに現在地クラスを付与
  } else if (scroll >= elemTop[2] && scroll < elemTop[3]) {
    //.scroll-point 2つめ（area-2）以上.scroll-point 3つめ（area-3）未満
    $(NavElem[2]).addClass("current"); //3つめのliに現在地クラスを付与
  } else if (scroll >= elemTop[3]) {
    // .scroll-point 3つめ（area-3）以上
    $(NavElem[3]).addClass("current"); //4つめのliに現在地クラスを付与
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PositionCheck(); /* 現在地を取得する関数を呼ぶ*/
  ScrollAnime(); /* ナビゲーションに現在地のクラスをつけるための関数を呼ぶ*/
});

$(window).resize(function () {
  //リサイズされたときの処理
  PositionCheck();
});
