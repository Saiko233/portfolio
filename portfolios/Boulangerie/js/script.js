$(".slider").slick({
  arrows: false, //左右の矢印はなし
  autoplay: true, //自動的に動き出すか。初期値はfalse。
  autoplaySpeed: 0, //自動的に動き出す待ち時間。初期値は3000ですが今回の見せ方では0
  speed: 20000, //スライドのスピード。初期値は300。
  infinite: true, //スライドをループさせるかどうか。初期値はtrue。
  pauseOnHover: false, //オンマウスでスライドを一時停止させるかどうか。初期値はtrue。
  pauseOnFocus: false, //フォーカスした際にスライドを一時停止させるかどうか。初期値はtrue。
  cssEase: "linear", //動き方。初期値はeaseですが、スムースな動きで見せたいのでlinear
  slidesToShow: 4, //スライドを画面にx枚見せる
  slidesToScroll: 1, //1回のスライドで動かす要素数
  responsive: [
    {
      breakpoint: 769, //モニターの横幅が769px以下の見せ方
      settings: {
        slidesToShow: 2, //スライドを画面に2枚見せる
      },
    },
    {
      breakpoint: 426, //モニターの横幅が426px以下の見せ方
      settings: {
        slidesToShow: 1.5, //スライドを画面に1.5枚見せる
      },
    },
  ],
});

// pegetop
$(document).ready(function () {
  var pagetop = $(".pagetop");
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
  });
  pagetop.click(function () {
    $("body, html").animate({ scrollTop: 0 }, 100);
    return false;
  });
});

// pagejump
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

// scroll
const targetElement = document.querySelectorAll(".news-list , .news , .menu-title , #menu-text , #menu-img , #menu-reverse , #img-reverse , #address-h , .map , .address-text");
console.log("画面の高さ", window.innerHeight);
document.addEventListener("scroll", function () {
  for (let i = 0; i < targetElement.length; i++) {
    const getElementDistance = targetElement[i].getBoundingClientRect().top + targetElement[i].clientHeight * 0.7;
    if (window.innerHeight > getElementDistance) {
      targetElement[i].classList.add("show");
    }
  }
});
