// pegetop
$(document).ready(function () {
  var pagetop = $(".pagetop");
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
  });
  pagetop.click(function () {
    $("body, html").animate({ scrollTop: 0 }, 200);
    return false;
  });
});
