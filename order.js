/*
オーダーページにて諸々の条件を選んで
オーダーボタンのurlに入れるコードを決める為のjs
コードには
条件によって上書きする「subscription_issue」「subscription」と
条件によって追加する「binder」「backnumber」などがある
例：
  /order/index.php?mod=bulk&subscription_issue[000000XXX]=1&subscription[000000XXX]=1
  /order/index.php?mod=bulk&subscription_issue[000000XXX]=1&subscription[000000XXX]=1&binder[0000000000000000]=1&backnumber[0000000000000000]=1
*/


/*----------------------
    タイトルコード
----------------------*/
var ttlCode = "NDF",


/*----------------------
    コード(上書き用)
  subscription_issueと
  subscriptionの値
----------------------*/
var subscCodes = {
  //定期購読
  "teiki1" : "teiki1"
}


/*----------------------
    コード(追加用)
----------------------*/
var addCodes = {
  //バインダー
  "binder1" : "binder1",
  //アップセル2
  "upsell2" : "upsell2"
}


/*---------------------------
  最新発売号のoption要素を
  apiで取得しselectに入れる
---------------------------*/
//最新発売号の数字
var id_teikiStartBuy;
//最新発売号の次号の数字
var id_teikiStartBuyNext;
//最新発売号の前号の数字
var id_teikiStartBuyPrev;
$(document).ready(function () {
  var obj = new XMLHttpRequest();
  obj.open('GET', '/api/getSubscriptionStartIssue.php?title_code=' + ttlCode, true);
  obj.send(null);
  obj.onreadystatechange = function () {
    if (obj.readyState == 4) {
      var selectHtml = obj.responseText;
      $("#id_teikiStart").html(selectHtml);
      teikiStart = $('#last_issue').val();
      id_teikiStartBuy = parseInt(teikiStart);
      id_teikiStartBuyNext = id_teikiStartBuy + 1;
      id_teikiStartBuyPrev = id_teikiStartBuy - 1;
    }
  }
});


/*-----------------
    ボタン用関数
-----------------*/
function btnOff(){
  $('#order_btnBox').addClass("off");
  $('#order_url').attr('href', 'javascript:void(0)');
}
function btnOn(url){
  $('#order_btnBox').removeClass("off");
  $('#order_url').attr('href', url);
}


/*----------------
    全体の関数
----------------*/
function fun_order() {
  var teikiCheck = $('#teikiCheck').prop('checked');
  var id_teikiStart = $('#id_teikiStart').val();
  var binderCheck = $('#binderCheck').prop('checked');
  var id_binderNum = $('#id_binderNum').val();
  if ($('#campaignCode').val()) {
    var topCode = $('#campaignCode').val().slice(0, 2); //キャンペーンコード
  }

  var url = '/order/index.php?mod=bulk&';

  /*----- 定期購読 -----*/
    //定期購読にチェックが無い場合はセレクトを使用不可に
    if (teikiCheck) {
      $('#id_teikiStart').prop('disabled', false);
    } else {
      $('#id_teikiStart').prop('disabled', true);
      $('#id_teikiStart').val(0);
    }
    //定期購読ｎ号から
    if (0 < id_teikiStart && id_teikiStart <= id_teikiStartBuyNext) {
      url = url + 'subscription_issue[' + subscCodes.teiki1 + ']=1&subscription[' + subscCodes.teiki1 + ']=1';
    }
  /*----- 定期購読 -----*/

  if (teikiCheck) {
    //$(".btnWrap").hide(); 必要？
  }

  /*----- バインダー -----*/
    //バインダーにチェックが無い場合はセレクトを使用不可に
    if (binderCheck) {
      $('#id_binderNum').prop('disabled', false);
    } else {
      $('#id_binderNum').prop('disabled', true);
      $('#id_binderNum').val(0);
    }
    //バインダーの数
    if (id_binderNum > 0) {
      url = url + '&binder[' + binder + ']=' + id_binderNum;
    }
  /*----- /バインダー -----*/

  /*----- ボタンのonOff -----*/
  if (teikiCheck == true || binderCheck == true) {
    $('#order_btnBox').css('opacity', 1);
    $('#order_url').attr('href', url);
  } else {
    $('#order_btnBox').css('opacity', 0.3);
    $('#order_url').attr('href', 'javascript:void(0)');
  }
  /*----- /ボタンのonOff -----*/

  console.log(url)
}


/*----------------
    ループ処理
----------------*/
$(document).ready(function () {
  (function order_l() {
    setTimeout(order_l, 100);
    fun_order();
  })();
})


/*----------------------------
  オーダーボタンをclickで
  キャンペーンコードをチェック
----------------------------*/
$(function () {
  //キャンペーンコードが違う場合はアラートを出す
  $("#order_url").click(function () {
    //最初の2桁を取り出す
    var campaignCode = $("#campaignCode").val().slice(0, 2);
    if (!campaignCode) {
      //キャンペーンコードなし
    } else if (campaignCode == 40 || campaignCode == 41 || campaignCode == 61 || campaignCode == 62 || campaignCode == 64 || campaignCode == 67) {
      console.log("キャンーペーンコード" + campaignCode)
    } else {
      alert("キャンペーンコードに誤りがあります")
      return false
    }
  });
});
