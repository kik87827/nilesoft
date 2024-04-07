window.addEventListener("DOMContentLoaded", () => {
    commonInit();
    selectFunc();
});
window.addEventListener("load", () => {
  layoutFunc();
});

$(function() {
})
  
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
  function resizeAction(callback){
    let windowWid = 0;
    window.addEventListener("resize",()=>{
      if(window.innerWidth !== windowWid){
        if(callback){
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
  

