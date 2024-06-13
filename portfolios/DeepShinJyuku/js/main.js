const swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  spaceBetween:30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

function scan(hoge, setting) {
  const target = hoge === undefined ? '.animation-box' : hoge;
  const add = setting === undefined ? 'active' : setting;

  const targets = [].slice.call(document.querySelectorAll(target));
  const options = {
    root: null,
    rootMargin: "0px 0px -50%",
    threshold: 0
  };

  const observer = new IntersectionObserver(callback, options);

  targets.forEach(function(target) {
    observer.observe(target);
  });

  function callback(entries, object) {
    entries.forEach(function(entry, i){
      if(!entry.isIntersecting) return;
      const item = entry.target;
      animation(item);
      object.unobserve(item);
    })
  }

  function animation(target) {
    if (!target.classList.contains(add)) {
      target.classList.add(add);
    }
  }
}

const menuBtnObj = document.getElementById('menuBtn');
const closeText = document.getElementById('close');
const openText = document.getElementById('open');
const gNav = document.getElementById('g-nav');
const links = document.querySelectorAll('#nav-link');
let flag = 0;
menuBtnObj.addEventListener('click', () => {
  if(flag === 0) {
    gNav.classList.add('panelactive');
    closeText.style.opacity = 1;
    closeText.style.zIndex = 10;
    openText.style.opacity = 0;
    menuBtnObj.style.background = "#ffff6a";
    flag = 1;
  }else {
    gNav.classList.remove('panelactive');
    closeText.style.zIndex = -1;
    closeText.style.opacity = 0;
    openText.style.opacity = 1;
    menuBtnObj.style.background = "#fff";
    flag = 0;
  }
})
links.forEach((link) => {
  link.addEventListener('click', () => {
    gNav.classList.remove('panelactive');
    closeText.style.zIndex = -1;
    closeText.style.opacity = 0;
    openText.style.opacity = 1;
    menuBtnObj.style.background = "#fff";
  })
})

