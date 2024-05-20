function mainSwiper() {
  const mainSwiper = new Swiper('.mv_container', {
    direction: 'vertical',
    mousewheel: true,
    speed: 1000,
    // If we need pagination
    pagination: {
      el: '.mv_container .swiper-pagination.mv_global',
      clickable: true,
    },
  });
  const mainGateSwiper = new Swiper(".gate_swiper_container", {
    speed: 1000,
    pagination: {
      el: '.mv_gate_swiper_wrap .swiper-pagination.mv_inner',
      clickable: true,
    },
  });

  const front_body = document.querySelector(".front_body");
  const btn_main_top_go = document.querySelector(".main .btn_top_go");
  const bottom_layer = document.querySelector(".bottom_layer");
  const footer_wrap = document.querySelector(".footer_wrap");
  let resizeMargin = 0;

  bottomMove();

  mainSwiper.on("slideChange", () => {
    /* if(mainSwiper.realIndex > 1){
        front_body.classList.add("main_skin2");
    }else{
        front_body.classList.remove("main_skin2");
    } */

    /* front_body.classList.remove("main_skin2");
    
    if(mainSwiper.realIndex == 0){
        if(mainGateSwiper.realIndex == 2){
            front_body.classList.add("main_skin2");
        }else{
            front_body.classList.remove("main_skin2");
        }
    }else if(mainSwiper.realIndex == 1){
        front_body.classList.remove("main_skin2");
    }else if(mainSwiper.realIndex == 2){
        front_body.classList.add("main_skin2");
    }else if(mainSwiper.realIndex == 3){
        front_body.classList.add("main_skin2");
    } */

    front_body.classList.remove("main_skin2");

    if (mainSwiper.realIndex == 0) {
      if (mainGateSwiper.realIndex == 2) {
        front_body.classList.add("main_skin2");
      }
    } else if (mainSwiper.realIndex == 2 || mainSwiper.realIndex == 3) {
      front_body.classList.add("main_skin2");
    }

    bottomMove();
  });
  btn_main_top_go.addEventListener("click", (e) => {
    e.preventDefault();
    mainSwiper.slideTo(0, 0);
  });
  window.addEventListener("resize", () => {
    bottomResize();
  });

  function bottomMove() {
    bottomResize();
    if (mainSwiper.realIndex === 3) {
      bottom_layer.style.bottom = (footer_wrap.getBoundingClientRect().height + resizeMargin) + "px";
    } else {
      bottom_layer.style.removeProperty("bottom");
    }
  }

  function bottomResize() {
    if (window.innerWidth < 1024) {
      resizeMargin = 30;
    } else {
      resizeMargin = 40;
    }
  }

  mainGateSwiper.on("slideChange", () => {
    if (mainGateSwiper.realIndex == 2) {
      front_body.classList.add("main_skin2");
    } else {
      front_body.classList.remove("main_skin2");
    }
  });

}