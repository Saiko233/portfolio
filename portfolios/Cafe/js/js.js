// Slide show
const img = ["./images/img5.jpg", "./images/img3.jpg", "./images/img4.jpg"];
let count = -1;
picChange();
function picChange() {
  count++;
  if (count == img.length) count = 0;
  slide.src = img[count];
  setTimeout("picChange()", 7900);
}

// onmouseover
function dover1() {
  let elm = document.getElementById("dmimg");
  elm.src = "./images/img10.jpg";
}

function dover2() {
  let elm = document.getElementById("dmimg");
  elm.src = "./images/img12.jpg";
}

function dover3() {
  let elm = document.getElementById("dmimg");
  elm.src = "./images/img49.jpg";
}

function dover4() {
  let elm = document.getElementById("dmimg");
  elm.src = "./images/img50.jpg";
}

function fover1() {
  let flm = document.getElementById("fmimg");
  flm.src = "./images/img11.jpg";
}

function fover2() {
  let flm = document.getElementById("fmimg");
  flm.src = "./images/img13.jpg";
}

function fover3() {
  let flm = document.getElementById("fmimg");
  flm.src = "./images/img16.jpg";
}

function fover4() {
  let flm = document.getElementById("fmimg");
  flm.src = "./images/img34.jpg";
}

// scroll
const targetElement = document.querySelectorAll(".abt , .abtxt , .abimg , .menut , .menu , .newst , .item1 , .item2 , .item3 , .alt , .ar , .atxt");
console.log("画面の高さ", window.innerHeight);
document.addEventListener("scroll", function () {
  for (let i = 0; i < targetElement.length; i++) {
    const getElementDistance = targetElement[i].getBoundingClientRect().top + targetElement[i].clientHeight * 0.7;
    if (window.innerHeight > getElementDistance) {
      targetElement[i].classList.add("show");
    }
  }
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
