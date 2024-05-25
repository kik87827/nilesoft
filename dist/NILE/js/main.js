function mainSwiper() {
  let mainSwiper = new Swiper('.mv_container', {
    observer: true,
    observeParents: true,
    direction: 'vertical',
    mousewheel: true,
    freeMode: false,
    /* autoHeight : false, */
    slidesPerView: "auto",
    autoHeight: true,
    // autoHeight : true, 
    /* freeMode: true,
    slidesPerView: "auto",
    autoHeight : true, */
    speed: 1000,
    initialSlide: 0,
    pagination: {
      el: '.mv_container .swiper-pagination.mv_global',
      clickable: true,
    },
  });
  /* mainSwiper.params.freeMode.enabled = true;
  mainSwiper.update(); */

  const mainGateSwiper = new Swiper(".gate_swiper_container", {
    speed: 1000,
    loop: true,
    observer: true,
    observeParents: true,
    pagination: {
      el: '.mv_gate_swiper_wrap .swiper-pagination.mv_inner',
      clickable: true,
    },
    initialSlide: 0,
    /* autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    }, */
  });

  const front_body = document.querySelector(".front_body");
  const btn_main_top_go = document.querySelector(".main .btn_top_go");
  const bottom_layer = document.querySelector(".bottom_layer");
  const header_wrap = document.querySelector(".header_wrap");
  const footer_wrap = document.querySelector(".footer_wrap");
  const mv_container = document.querySelector(".mv_container");
  const check_height = document.querySelectorAll(".check_height");

  screenAction();
  //bottomMove();
  copyMaxHeight();
  // scrollModeAction();

  heightCheck();

  window.addEventListener("resize", () => {
    // scrollModeAction();
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


    screenAction();

    //bottomMove();
  });
  btn_main_top_go.addEventListener("click", (e) => {
    e.preventDefault();
    mainSwiper.slideTo(0, 0);
  });
  window.addEventListener("resize", () => {
    copyMaxHeight();
    heightCheck();
  });

  function heightCheck() {
    let header_wrap_height = 0;
    if (!!header_wrap) {
      header_wrap_height = header_wrap.getBoundingClientRect().height;
    }
    if (!!check_height) {
      check_height.forEach((item) => {
        if (item.getBoundingClientRect().height >= window.innerHeight - header_wrap_height) {
          item.classList.add("overHeight");
        } else {
          item.classList.remove("overHeight");
        }
      });
      let overHeightItem = document.querySelectorAll(".overHeight");
      if (overHeightItem.length > 0) {
        mv_container.classList.add("scrollmode");
        mainSwiper.params.freeMode.enabled = true;
      } else {
        mv_container.classList.remove("scrollmode");
        mainSwiper.params.freeMode.enabled = false;
      }
      mainSwiper.update();
    }
  }

  function screenAction() {
    //if(mv_container.classList.contains("scrollmode")){return;}
    front_body.classList.remove("main_skin2");
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
    mainSwiper.update();
  }


  mainGateSwiper.on("slideChange", () => {
    if (mainSwiper.realIndex > 0) {
      return;
    }
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