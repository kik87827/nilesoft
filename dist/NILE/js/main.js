function mainSwiper() {

  const front_html = document.querySelector("html");
  const front_body = document.querySelector(".front_body");
  const btn_main_top_go = document.querySelector(".main .btn_top_go");
  const bottom_layer = document.querySelector(".bottom_layer");
  const header_wrap = document.querySelector(".header_wrap");
  const footer_wrap = document.querySelector(".footer_wrap");
  const mv_container = document.querySelector(".mv_container");
  const mv_swiper_slide = document.querySelectorAll(".swiper-slide");
  const mv_footer_prev = document.querySelector(".scene_04").closest(".swiper-slide");
  const check_height = document.querySelectorAll(".check_height");
  const gate_bottom_layer = document.querySelector(".gate_bottom_layer");
  const mv_gate_swiper_wrap = document.querySelector(".mv_gate_swiper_wrap");
  const mv_item_slide_item = document.querySelectorAll(".mv_item_slide_item");

  if (!!mv_container) {
    front_html.classList.add("mainfront");
  }

  let mainSwiper = new Swiper('.mv_container', {
    /*  observer: true,
     observeParents: true, */
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
    on: {
      setTranslate: function(translate) {
        //scrollTopCheck(translate);
        if (window.innerWidth >= 1024) {
          return;
        }
        if (translate.translate < 0) {
          header_wrap.classList.add("scroll");
          //gate_bottom_layer.style.display = "none";
        } else {
          header_wrap.classList.remove("scroll");
          //gate_bottom_layer.style.display = "block";
        }
        // console.log('Current translate:', translate.translate);
      },
    }
  });
  /* mainSwiper.params.freeMode.enabled = true;
  mainSwiper.update(); */

  /*  var innerDebug = document.createElement("div");
   innerDebug.setAttribute("id","debug");
   front_body.append(innerDebug); */

  /* if(!!gate_bottom_layer){
     front_body.append(gate_bottom_layer);
  } */


  const mainGateSwiper = new Swiper(".gate_swiper_container", {
    speed: 1000,
    loop: true,
    pagination: {
      el: '.mv_gate_swiper_wrap .swiper-pagination.mv_inner',
      clickable: true,
    },
    initialSlide: 0,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  screenAction();
  //bottomMove();
  copyMaxHeight();
  // scrollModeAction();

  heightCheck();

  window.addEventListener("resize", () => {
    // scrollModeAction();
    header_wrap.classList.remove("scroll");
    if (window.innerWidth >= 1024) {
      header_wrap.classList.remove("scroll");
    }
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

  function scrollTopCheck() {
    const scene_03 = $(".scene_03");
    const scene_04 = $(".scene_04");
    /*  mv_item.each(function(index){
         if($(this).hasClass("scene_03")){
             if(0>$(this).offset().top){
                 front_body.classList.add("main_skin2");
              }else{
                  front_body.classList.remove("main_skin2");
              } 
         }
     }); */
    if (0 > scene_03.offset().top || mainGateSwiper.realIndex == 2) {
      front_body.classList.add("main_skin2");
    } else {

      front_body.classList.remove("main_skin2");
    }
  }

  function heightCheck() {
    let header_wrap_height = 0;
    if (!!header_wrap) {
      header_wrap_height = header_wrap.getBoundingClientRect().height;
    }
    if (!!check_height) {
      check_height.forEach((item) => {
        if (item.getBoundingClientRect().height >= document.documentElement.clientHeight - header_wrap_height) {
          item.classList.add("overHeight");
        } else {
          item.classList.remove("overHeight");
        }
      });
      let overHeightItem = document.querySelectorAll(".overHeight");
      if (overHeightItem.length > 0) {
        mv_container.classList.add("scrollmode");
        mainSwiper.params.freeMode.enabled = true;
        mainSwiper.params.speed = 0;
      } else {
        mv_container.classList.remove("scrollmode");
        mainSwiper.params.freeMode.enabled = false;
        mainSwiper.params.speed = 1000;
      }
      if (window.innerWidth < 1024) {
        mv_container.classList.add("scrollmode");
        mainSwiper.params.freeMode.enabled = true;
      }
      mainSwiper.update();
    }
  }

  function screenAction() {
    //if(mv_container.classList.contains("scrollmode")){return;}
    front_body.classList.remove("main_skin2");
    /* mv_gate_swiper_wrap.style.height = window.innerHeight + "px";
    console.log(window.innerHeight); */
    //gate_bottom_layer.style.display = "none";
    if (mainSwiper.realIndex == 0) {
      //gate_bottom_layer.style.display = "block";
      if (mainGateSwiper.realIndex == 2) {
        front_body.classList.add("main_skin2");
      }
    } else if (mainSwiper.realIndex == 2 || mainSwiper.realIndex == 3 || mainSwiper.realIndex == 4) {
      front_body.classList.add("main_skin2");
    }
    if (mainSwiper.realIndex == 4) {
      if (!!mv_footer_prev) {
        mv_footer_prev.classList.add("prev-active");
      }
    } else {
      if (!!mv_swiper_slide) {
        mv_swiper_slide.forEach((item) => {
          item.classList.remove("prev-active");
        });
      }
    }
    mainSwiper.update();
  }

  /* function scrollModeAction(){
      if(window.innerHeight < 900){
          mv_container.classList.add("scrollmode");
          mainSwiper.params.freeMode.enabled = true;
      }else{
          mv_container.classList.remove("scrollmode");
          mainSwiper.params.freeMode.enabled = false;
      } 
      mainSwiper.update();
  } */


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

  function copyMaxHeight() {
    const selectors = [".mv_pro_sub_copy_wrap", ".mv_pro_summary_wrap"];
    selectors.forEach(selector => action(selector));

    function action(selector) {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        return;
      }

      let maxHeight = 0;

      elements.forEach(item => {
        item.style.removeProperty("height");
        maxHeight = Math.max(maxHeight, item.getBoundingClientRect().height);
      });
      elements.forEach(item => {
        item.style.height = `${maxHeight}px`;
      });
      mainSwiper.update();
    }
  }
}