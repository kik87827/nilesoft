function mainSwiper() {
  let mainSwiper = new Swiper('.mv_container', {
    direction: 'vertical',
    mousewheel: true,
    freeMode: false,
    autoHeight: false,
    slidesPerView: 1,
    /* freeMode: true,
    slidesPerView: "auto",
    autoHeight : true, */
    speed: 1000,
    //initialSlide : 2,
    pagination: {
      el: '.mv_container .swiper-pagination.mv_global',
      clickable: true,
    },
  });
  /* mainSwiper.params.freeMode.enabled = true;
  mainSwiper.update(); */
  console.log(mainSwiper.params.autoHeight);

  const mainGateSwiper = new Swiper(".gate_swiper_container", {
    speed: 1000,
    loop: true,
    pagination: {
      el: '.mv_gate_swiper_wrap .swiper-pagination.mv_inner',
      clickable: true,
    },
  });

  const front_body = document.querySelector(".front_body");
  const btn_main_top_go = document.querySelector(".main .btn_top_go");
  const bottom_layer = document.querySelector(".bottom_layer");
  const footer_wrap = document.querySelector(".footer_wrap");
  const mv_container = document.querySelector(".mv_container");
  let resizeMargin = 0;

  screenAction();
  //bottomMove();
  copyMaxHeight();
  scrollModeAction();

  window.addEventListener("resize", () => {
    scrollModeAction();
  });

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

    screenAction();

    //bottomMove();
  });
  btn_main_top_go.addEventListener("click", (e) => {
    e.preventDefault();
    mainSwiper.slideTo(0, 0);
  });
  window.addEventListener("resize", () => {
    bottomResize();
    copyMaxHeight();
  });

  function screenAction() {
    //if(mv_container.classList.contains("scrollmode")){return;}
    if (mainSwiper.realIndex == 0) {
      if (mainGateSwiper.realIndex == 2) {
        front_body.classList.add("main_skin2");
      }
    } else if (mainSwiper.realIndex == 2 || mainSwiper.realIndex == 3) {
      front_body.classList.add("main_skin2");
    }
  }

  function scrollModeAction() {
    if (window.innerHeight < 900) {
      mv_container.classList.add("scrollmode");
      mainSwiper.params.freeMode.enabled = true;
    } else {
      mv_container.classList.remove("scrollmode");
      mainSwiper.params.freeMode.enabled = false;
    }
    console.log(mainSwiper.params.autoHeight);
    mainSwiper.update();
  }

  /*  function bottomMove(){
       bottomResize();
       if(mainSwiper.realIndex === 3){
           bottom_layer.style.bottom = (footer_wrap.getBoundingClientRect().height + resizeMargin) + "px";
       }else{
           bottom_layer.style.removeProperty("bottom");
       }
   } */

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


function copyMaxHeight() {
  const mv_cbox_sub = document.querySelectorAll(".mv_cbox_sub");
  let subcopyHeight = [];
  if (!!mv_cbox_sub) {
    mv_cbox_sub.forEach((item) => {
      item.style.removeProperty("height");
      subcopyHeight.push(item.getBoundingClientRect().height);
    });
    mv_cbox_sub.forEach((item) => {
      item.style.height = Math.max.apply(null, subcopyHeight) + "px";
    });
  }
}