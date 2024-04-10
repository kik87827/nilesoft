window.addEventListener("DOMContentLoaded", () => {
  commonInit();
});
window.addEventListener("load", () => {
  layoutFunc();
});

$(function() {})

/**
 * device check
 */
function commonInit() {
  let touchstart = "ontouchstart" in window;
  let userAgent = navigator.userAgent.toLowerCase();
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf("samsung") > -1) {
    browserAdd("samsung");
  }

  if (
    navigator.platform.indexOf("Win") > -1 ||
    navigator.platform.indexOf("win") > -1
  ) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }

  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}

/*
  resize
*/
function resizeAction(callback) {
  let windowWid = 0;
  window.addEventListener("resize", () => {
    if (window.innerWidth !== windowWid) {
      if (callback) {
        callback();
      }
    }
    windowWid = window.innerWidth;
  });
}

/**
 * 레이아웃
 */
function layoutFunc() {
  function scrollTop() {
    const btn_top_go = document.querySelector(".btn_top_go");
    btn_top_go.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    });
  }

  function pcGnb() {
    const header_wrap = document.querySelector(".header_wrap");
    const bg_depth = document.querySelector(".bg_depth");
    const header_nav_list = document.querySelector(".header_nav_list");
    const header_nav_li = document.querySelectorAll(".header_nav_list > li");
    if (!!header_nav_li) {
      header_nav_li.forEach((this_li) => {
        this_li.addEventListener("mouseenter", (e) => {
          const this_item = e.currentTarget;
          const this_item_not = siblings(this_item);
          const this_item_depth = this_item.querySelector(".header_two_list_wrap");

          this_item_not.forEach((item) => {
            item.classList.remove("active");
          });

          this_item.classList.add("active");
          header_wrap.classList.add("active");

          bg_depth.style.height = this_item_depth.getBoundingClientRect().height + "px";
        });
      });
    }
    if (!!header_wrap) {
      header_wrap.addEventListener("mouseleave", () => {
        header_nav_li.forEach((item) => {
          header_wrap.classList.remove("active");
          item.classList.remove("active");
        });
        bg_depth.style.height = "0px";
      });
    }
  }
  pcGnb();
  scrollTop();
}

/**
 * menu rock
 */
function menuRock(target) {
  const targetDom = document.querySelector(target);
  if (!!targetDom) {
    targetDom.classList.add("active");
  }
}

function siblings(t) {
  var children = t.parentElement.children;
  var tempArr = [];

  for (var i = 0; i < children.length; i++) {
    tempArr.push(children[i]);
  }

  return tempArr.filter(function(e) {
    return e != t;
  });
}