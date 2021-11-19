/**通常ORDER用**/
/*----------------------
タイトルコード（タイトルに合わせて変更）
----------------------*/
var code = 'KNM';


/*----------------------
購入用コード（subscription_issueとsubscriptionの値）
----------------------*/
var subscCodes = {
  "teikiKumitate1": "70825229", //【定期】【組み立てなし】済
  "teikiKumitate1UPS": "70825229UPS", //【定期】【組立なし】【アップセル】済
  "teikiKumitate1Cam": "825219", //【定期】【組立なし】【キャンペーン】済
  "teikiKumitate1UC": "825219UPS", //【定期】【組立なし】【アップセル】【キャンペーン】済
  "teikiKumitate2": "7082522AABS", //【定期】【組立毎月】済
  "teikiKumitate2UPS": "7082522AABSUPS", //【定期】【組立毎月】【アップセル】済
  "teikiKumitate2Cam": "82521AABS", //【定期】【組立毎月】【キャンペーン】済
  "teikiKumitate2UC": "82521AABSUPS", //【定期】【組立毎月】【アップセル】【キャンペーン】済
  "teikiKumitate3": "7082522BABS", //【定期】【組立一括】済
  "teikiKumitate3UPS": "7082522BABSUPS", //【定期】【組立一括】【アップセル】済
  "teikiKumitate3Cam": "82521BABS", //【定期】【組立一括】【キャンペーン】済
  "teikiKumitate3UC": "82521BABSUPS", //【定期】【組立一括】【アップセル】【キャンペーン】済
  "UPS": "7082520AUPS", //定期は無しで【アップセル】のみ
}/*
var subscCodes = {
  "teikiKumitate1": "【定期】【組み立てなし】", //済
  "teikiKumitate1UPS": "【定期】【組立なし】【アップセル】", //済
  "teikiKumitate1Cam": "【定期】【組立なし】【キャンペーン】", //済
  "teikiKumitate1UC": "【定期】【組立なし】【アップセル】【キャンペーン】", //済
  "teikiKumitate2": "【定期】【組立毎月】", //済
  "teikiKumitate2UPS": "【定期】【組立毎月】【アップセル】", //済
  "teikiKumitate2Cam": "【定期】【組立毎月】【キャンペーン】", //済
  "teikiKumitate2UC": "【定期】【組立毎月】【アップセル】【キャンペーン】", //済
  "teikiKumitate3": "【定期】【組立一括】", //済
  "teikiKumitate3UPS": "【定期】【組立一括】【アップセル】", //済
  "teikiKumitate3Cam": "【定期】【組立一括】【キャンペーン】", //済
  "teikiKumitate3UC": "【定期】【組立一括】【アップセル】【キャンペーン】", //済
  "UPS": "定期は無しで【アップセル】", //のみ
}*/

/*--------------------------
    コード(バインダーなど)
--------------------------*/
var addCodes = {
  "binder1": "1008252101000000",//バインダー
  "backnumber1": "7082520BUPS"
}

/*-----------------
    ボタン用関数
-----------------*/
function btnOff() {
  $('#order_btnBox').addClass("off");
  $('#order_url').attr('href', 'javascript:void(0)');
}

function btnOn(url) {
  $('#order_btnBox').removeClass("off");
  $('#order_url').attr('href', url);
}


/*----------------
    全体の関数
----------------*/
function fun_order() {
  var teikiCheck = $('#teikiCheck').prop('checked'); //定期購読
  var id_teikiStart = $('#id_teikiStart').val(); //定期購読開始号
  var kumitateCheck1 = $('#kumitateCheck1').prop('checked'); //組み立て1
	var kumitateCheck2 = $('#kumitateCheck2').prop('checked'); //組み立て2
	var kumitateCheck3 = $('#kumitateCheck3').prop('checked'); //組み立て3
  var upsCheck = $('#upsCheck').prop('checked'); //アップセル
  var campaignCheck = $('#campaignCode').val(); //キャンペーンコード
  var binderCheck = $('#binderCheck').prop('checked'); //バインダー
  var id_binderNum = $('#id_binderNum').val(); //バインダー数量
  var id_backnumberNum = $('#dmkCheck').prop('checked'); //組み立て3
  var douiCheck =$("#kumitateDoui").prop('checked'); //バインダー
  //console.log("---------------------------------");
  //console.log("teikiCheck: " + teikiCheck);
  //console.log("teikiCheck2: " + teikiCheck2);
  //console.log("binderCheck: " + binderCheck);
  //console.log("binderCheck2: " + binderCheck2);
  //console.log("id_binderNum: " + id_binderNum);
  //console.log("id_binderNum2: " + id_binderNum2);


  /*----- 定期購読 -----*/
  var url= 'https://deagostini.jp/order/index.php?mod=bulk&';
  var teikiCode;
  var camp2Code = $('#campaignCode').val().slice(0, 2); //キャンペーンコードの最初の二桁
  
  //定期にチェックが付いたら開始号を選択出来るように
  if(teikiCheck) { 
    $('#id_teikiStart').prop('disabled', false);
  } else {
    $('#id_teikiStart').prop('disabled', true);
    $('#id_teikiStart').val(0);
  }
  //定期購読の選択が開始号からの時step2を解除
  if(id_teikiStart == 1) {
    $(".sectionWrap").hide();
    
  } else {
    $(".sectionWrap").show();
    $('#kumitateCheck1').prop('checked',true);
    $('#kumitateCheck2').prop('checked',false);
    $('#kumitateCheck3').prop('checked',false)
  }

  //【定期】【組み立て1】
  if(teikiCheck && kumitateCheck1) {
    teikiCode = subscCodes.teikiKumitate1;
  }
  //【定期】【組み立て1】【アップセル】
  if(teikiCheck && kumitateCheck1 && upsCheck) {
    teikiCode = subscCodes.teikiKumitate1UPS;
  }
  //【定期】【組み立て1】【キャンペーン】
  if(teikiCheck && kumitateCheck1 && campaignCheck) {
    teikiCode = camp2Code + subscCodes.teikiKumitate1Cam;
  }
  //【定期】【組み立て1】【アップセル】【キャンペーン】
  if(teikiCheck && kumitateCheck1 && upsCheck && campaignCheck) {
    teikiCode = camp2Code + subscCodes.teikiKumitate1UC;
  }
  //【定期】【組み立て2】
  if(teikiCheck && kumitateCheck2) {
    teikiCode = subscCodes.teikiKumitate2;
  }
  //【定期】【組み立て2】【アップセル】
  if(teikiCheck && kumitateCheck2 && upsCheck) {
    teikiCode = subscCodes.teikiKumitate2UPS;
  }
  //【定期】【組み立て2】【キャンペーン】
  if(teikiCheck && kumitateCheck2 && campaignCheck) {
    teikiCode = camp2Code + subscCodes.teikiKumitate2Cam;
  }
  //【定期】【組み立て2】【アップセル】【キャンペーン】
  if(teikiCheck && kumitateCheck2 && upsCheck && campaignCheck) {
    teikiCode = camp2Code + subscCodes.teikiKumitate2UC;
  }
  //【定期】【組み立て3】
  if(teikiCheck && kumitateCheck3) {
    teikiCode = subscCodes.teikiKumitate3;
  }
  //【定期】【組み立て3】【アップセル】
  if(teikiCheck && kumitateCheck3 && upsCheck) {
    teikiCode = subscCodes.teikiKumitate3UPS;
  }
  //【定期】【組み立て3】【キャンペーン】
  if(teikiCheck && kumitateCheck3 && campaignCheck) {
    teikiCode = camp2Code + subscCodes.teikiKumitate3Cam;
  }
  //【定期】【組み立て3】【アップセル】【キャンペーン】
  if(teikiCheck && kumitateCheck3 && upsCheck && campaignCheck) {
    teikiCode = camp2Code + subscCodes.teikiKumitate3UC;
  }
  //定期は無しで【アップセル】のみ
  if(!teikiCheck && upsCheck) {
    teikiCode = subscCodes.UPS;
    id_teikiStart = 1;
  }
  url = 'https://deagostini.jp/order/index.php?mod=bulk&subscription_issue[' + teikiCode + ']=' + id_teikiStart + '&subscription[' + teikiCode + ']=1';

  //定期もアップセルも無し
  if(!teikiCheck && !upsCheck) {
    url = 'https://deagostini.jp/order/index.php?mod=bulk';
  }

/* 確認用 
if(url.match("823219UPS")){console.log("【定期】【組立なし】【アップセル】【キャンペーン】");
}else if(url.match("82321AABSUPS")){console.log("【定期】【組立毎月】【アップセル】【キャンペーン】");
}else if(url.match("82321AABS")){console.log("【定期】【組立毎月】【キャンペーン】");
}else if(url.match("82321BABSUPS")){console.log("【定期】【組立一括】【アップセル】【キャンペーン】");
}else if(url.match("82321BABS")){console.log("【定期】【組立一括】【キャンペーン】");
}else if(url.match("823219")){console.log("【定期】【組立なし】【キャンペーン】");

}else if(url.match("70823229UPS")){console.log("【定期】【組立なし】【アップセル】");
}else if(url.match("70823229")){console.log("【定期】【組立なし】");
}else if(url.match("7082322AABSUPS")){console.log("【定期】【組立毎月】【アップセル】");
}else if(url.match("7082322AABS")){console.log("【定期】【組立毎月】");
}else if(url.match("7082322BABSUPS")){console.log("【定期】【組立一括】【アップセル】");
}else if(url.match("7082322BABS")){console.log("【定期】【組立一括】");
}else if(url.match("7082320AUPS")){console.log("定期は無しで【アップセル】のみ");
}else{console.log("該当無し");
}
*/


  /*----- バインダー -----*/
  //バインダーにチェックが無い場合はセレクトを使用不可に
  if(binderCheck) {
    $('#id_binderNum').prop('disabled', false);
  } else {
    $('#id_binderNum').prop('disabled', true);
    $('#id_binderNum').val(0);
  }
  //バインダーの数
  if(id_binderNum > 0) {
    url = url + '&binder[' + addCodes.binder1 + ']=' + id_binderNum;
  }
  

  /*----- その他の商品 -----*/
  //その他の商品の数
  if(id_backnumberNum  == true) {
    url = url + '&subscription_issue[7082520BUPS]=0&subscription[7082520BUPS]=1';
  }
  /*----- /その他の商品 -----*/



  /*----- ボタンのonOff -----*/
  if(teikiCheck == true || binderCheck == true || upsCheck == true || id_backnumberNum == true) {
    btnOn(url);
  } else {
    btnOff();
  }
  /*----- /ボタンのonOff -----*/

/*----- /組み立て規約の表示・非表示 -----*/
  if(kumitateCheck2 == true || kumitateCheck3 == true) {
   $(".kiyakuWrap").show();
    $('#order_btnBox').addClass("off");
    if(douiCheck){
      $('#order_btnBox').removeClass("off");
    }else{
      $('#order_btnBox').addClass("off");
    }
  } else {
   $(".kiyakuWrap").hide();
  }
  
  

  console.log(url)
}//fun_order FncEnd


/*----------------
    ループ処理
----------------*/
$(document).ready(function () {
  (function order_l() {
    setTimeout(order_l, 500);
    fun_order();
  })();

  //キャンペーンコードが違う場合はアラートを出す
  $("#order_url").click(function () {
    var campaignCode = $("#campaignCode").val().slice(0, 2);
    if(!campaignCode) {
      //キャンペーンコードなし
    } else if(campaignCode == 40 || campaignCode == 61 || campaignCode == 62 || campaignCode == 64 || campaignCode == 66 || campaignCode == 67) {
      console.log("キャンーペーンコード" + campaignCode)
    } else {
      alert("キャンペーンコードに誤りがあります")
      return false
    }
  });

});


//最新発売号の数字
var id_teikiStartBuy;
//最新発売号の次号の数字
var id_teikiStartBuyNext;
//最新発売号の前号の数字
var id_teikiStartBuyPrev;
$(document).ready(function () {
  var obj = new XMLHttpRequest();
  obj.open('GET', '/api/getSubscriptionStartIssue.php?title_code=' + code, true);
  obj.send(null);
  obj.onreadystatechange = function () {
    if(obj.readyState == 4) {
      var selectHtml = obj.responseText;
      $("#id_teikiStart").html(selectHtml);
      teikiStart = $('#last_issue').val();
      id_teikiStartBuy = parseInt(teikiStart);
      id_teikiStartBuyNext = id_teikiStartBuy + 1;
      id_teikiStartBuyPrev = id_teikiStartBuy - 1;
    }
  }
});
