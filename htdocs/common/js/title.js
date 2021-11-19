$(document).ready(function (){
  var agent = navigator.userAgent.toLowerCase();
  var ipad = agent.indexOf('ipad') > -1 || agent.indexOf('macintosh') > -1 && 'ontouchend' in document;
  if(ipad == true){
    //viewportの設定
    $('meta[name="viewport"]').attr("content", "width=1200px");
  }
});


$(function (){

  //window幅を取得
  var winW;
  var pc = 768;
  var sp = pc - 1;
  var rszFlg;
  /*リサイズによるイベントの重ね掛けの回避の為
  0 = pc
  1 = sp*/
  $(window).bind("load resize", function (){
    winW = $(window).width();

    /*--- リサイズの処理 ---*/
    if (winW >= pc){
      if (rszFlg != 0){
        //XXXのslide
        $(".sldXXX .slick-initialized").slick("unslick");

        console.log("pc");
      }
      rszFlg = 0;
    } else{ //sp
      if (rszFlg != 1){
        //XXXのslide
        $(".sldXXX ul").slick({
          dots: true,
          arrows: false,
          slidesToShow:1,
          draggable:true,
          slidesToScroll: 1,
          adaptiveHeight: true,
          variableWidth: false,
          centerMode: true,
          centerPadding: 0
        });

        console.log("sp");
      }

      rszFlg = 1;
    }
    /*--- /リサイズの処理 ---*/
  }); //winBndFncEnd


  /*--- スクロールの処理 ---*/
  var winScl = 0;
  $(window).scroll(function (){
    winScl = $(window).scrollTop();
    //console.log(winScl);
    if (winScl > 500){
      $(".toTop").fadeIn("fast");
    } else{
      $(".toTop").fadeOut("fast");
    }
  });
  /*--- /スクロールの処理 ---*/


  /*--- colorbox ---*/
  /*モーダルの大きさでmedia queryが適用されてしまう為
    (macでは600指定の際585で表示される)
    モーダルを600px以上
    @mediaを584以下にする*/
  //画像単数
  $(".mdlImgSingle").colorbox({
    opacity: 0.5
  });
  //画像複数
  $(".mdlImgGroup1").colorbox({
    opacity: 0.5,
    rel: "group1"
  });
  //ページ単数
  $(".mdlPageSingle").colorbox({
    iframe: true,
    opacity: 0.5,
    innerWidth: 600,
    innerHeight: 600
  });
  $(".mdlSpec").colorbox({
    iframe: true,
    opacity: 0.5,
    innerWidth: 600,
    innerHeight: 600
  });
  //ページ複数
  $(".mdlGmk").colorbox({
    iframe: true,
    opacity: 0.5,
    innerWidth: 600,
    innerHeight: 600,
    rel: "grpGmk"
  });
  //近刊
  $(".mdlNum").colorbox({
    iframe: true,
    opacity: 0.5,
    innerWidth: 600,
    innerHeight: 600,
    rel: "grpNum"
  });
  //youtube
  $(".ytCBox").colorbox({
    iframe: true,
    opacity: 0.5,
    innerWidth: 947,
    innerHeight: 600
  });
  $(".ytCBoxGroup1").colorbox({
    iframe: true,
    opacity: 0.5,
    innerWidth: 947,
    innerHeight: 600,
    rel: "grpYt1"
  });
  /*--- /colorbox ---*/


  /*--- クリックスクロール ---*/
  function clkScrl(btn, pos){
    btn.click(function(e){
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $.when(
        $("html, body").animate({
          scrollTop: position
        }, 400, "swing"),
        e.preventDefault()
      ).done(function(){
        var diff = target.offset().top;
        if (diff === position){
        } else{
          $("html, body").animate({
            scrollTop: diff
          }, 10, "swing");
        }
      });
    });
  }
  clkScrl($("a.clkScrl"), 0);
  clkScrl($("a.clkScrl2"), 20);
  /*--- /クリックスクロール ---*/


  /*-- sideNav --*/
  $(".menuShow").click(function (){
    $(".naviArea2").animate({right: -400});
    $(".naviArea").animate({right: -2});
    return false;
  }); //clsNav ClkEnd

  //navのcloseボタン
  $(".clsNav").click(function (){
    $(".naviArea2").animate({right: 0});
    $(".naviArea").animate({right: -400});
    return false;
  }); //clsNav ClkEnd
  /*-- /sideNav --*/


  /*-- 動画 --*/
  $(".movZone .movBox > li").click(function(){
    var ytId = $(this).attr("data-ytId");
    $(".cmBox").show();
    $(".cmBox .cmInner").append(
      '<iframe src="https://www.youtube.com/embed/' +
      ytId +
      '?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>'
    );
  })

  $(".cmBox .close,.cmBox").click(function(event){
    event.preventDefault();
    $(".cmBox").hide();
    $(".cmBox .cmInner").empty();
  })

  $(".cmBox iframe").click(function(event){
    event.stopPropagation();
  })
  /*-- /動画 --*/


  //clickで吹出を表示非表示
  $(".clkBlns > span").click(function(){
    var thisGrp = $(this).parent();

    if($(this).hasClass("show")){
      thisGrp.children().removeClass("show");
    }else{
      thisGrp.children().removeClass("show");
      $(this).addClass("show");
    }
    return false;
  });


  //XXXのslide
  $(".sldXXX ul").slick({
    dots: true,
    arrows: true,
    slidesToShow:1,
    slidesToScroll: 1,
    variableWidth: true,
    draggable:true,
    centerMode: true,
    adaptiveHeight: true,
    responsive: [
     {
        breakpoint: 767,
        settings:{
          dots: true,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
          draggable:true,
          centerMode: true,
          adaptiveHeight: true,
          infinite: true
        }
      }
    ]
  });


  //アコーディオン
  $(".acrdBtn").click(function(){
    $(this).toggleClass("show");
    $(this).parents(".acrdBox").find(".acrdCont").slideToggle();
  });



}); //fncEnd
