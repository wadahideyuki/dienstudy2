// タイトルコード
var code = 'TBH';

//定期購読
//創刊号からアップセル[有]＋組立【毎月】＋月１[有]※常に創刊号
var teiki_kumitate_tsukiichi = '7075622AABSUPS';
//創刊号からアップセル[有]＋組立【毎月】＋月１[無]※常に創刊号
var teiki_kumitate = '7075622AABSUPS';
//創刊号からアップセル[有]＋組立【一括】＋月１[有]※常に創刊号
var teiki_kumitate_ikkatsu_tsukiichi = '7075622BABSUPS';
//創刊号からアップセル[有]＋組立【一括】＋月１[無]※常に創刊号
var teiki_kumitate_ikkatsu = '7075622BABSUPS';
//2号からアップセル[有]＋月１[有]
var jigou_teiki_kumitate_tsukiichi = '70756229UPS';
//2号からアップセル[有]＋月１[無]
var jigou_teiki_kumitate = '70756229UPS';
//創刊号からアップセル[無]＋組立【毎月】＋月１[有]※常に創刊号
var nominicar_teiki_kumitate_tsukiichi = '7075622AABS';
//創刊号からアップセル[無]＋組立【毎月】＋月１[無]※常に創刊号
var nominicar_teiki_kumitate = '7075622AABS';
//創刊号からアップセル[無]＋組立【一括】＋月１[有]※常に創刊号
var nominicar_teiki_kumitate_ikkatsu_tsukiichi = '7075622BABS';
//創刊号からアップセル[無]＋組立【一括】＋月１[無]※常に創刊号
var nominicar_teiki_kumitate_ikkatsu = '7075622BABS';
//2号からアップセル[無]＋月１[有]
var nominicar_jigou_teiki_kumitate_tsukiichi = '70756229';
//2号からアップセル[無]＋月１[無]
var nominicar_jigou_teiki_kumitate = '70763320';

//定期購読（キャンペーン）頭2桁を消す
//創刊号からアップセル[有]＋組立【毎月】＋月１[有]※常に創刊号
var teiki_c_kumitate_tsukiichi = '75621AABSUPS';
//創刊号からアップセル[有]＋組立【毎月】＋月１[無]※常に創刊号
var teiki_c_kumitate = '75621AABSUPS';
//創刊号からアップセル[有]＋組立【一括】＋月１[有]※常に創刊号
var teiki_c_kumitate_ikkatsu_tsukiichi = '75621BABSUPS';
//創刊号からアップセル[有]＋組立【一括】＋月１[無]※常に創刊号
var teiki_c_kumitate_ikkatsu = '75621BABSUPS';
//2号からアップセル[有]＋月１[有]
var jigou_teiki_c_kumitate_tsukiichi = '756219UPS';
//2号からアップセル[有]＋月１[無]
var jigou_teiki_c_kumitate = '756219UPS';
//創刊号からアップセル[無]＋組立【毎月】＋月１[有]※常に創刊号
var nominicar_teiki_c_kumitate_tsukiichi = '75621AABS';
//創刊号からアップセル[無]＋組立【毎月】＋月１[無]※常に創刊号
var nominicar_teiki_c_kumitate = '75621AABS';
//創刊号からアップセル[無]＋組立【一括】＋月１[有]※常に創刊号
var nominicar_teiki_c_kumitate_ikkatsu_tsukiichi = '75621BABS';
//創刊号からアップセル[無]＋組立【一括】＋月１[無]※常に創刊号
var nominicar_teiki_c_kumitate_ikkatsu = '75621BABS';
//2号からアップセル[無]＋月１[有]
var nominicar_jigou_teiki_c_kumitate_tsukiichi = '756219';
//2号からアップセル[無]＋月１[無]
var nominicar_jigou_teiki_c_kumitate = '763310';




//定期購読無
//アップセル単体購入
var ikkatsumaebarai = '7075620AUPS';

//バインダー
var binder = '1007632101000000';

//アップセルその2
var option2 = '1007551901030000';

//バックナンバー
var backnumber = '70763900';

//デジタル版バックナンバー
var backnumber_digital_l = '100763'; // 16桁の左より1～6桁目
var backnumber_digital_r = '000000'; // 16桁の左より11～16桁目


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



//LP「組み立てサービスのご案内」からのリンク設定
$(function () {
  var url_kv = location.href.split("?");
  if (url_kv.length > 1) {
    var url_ps = url_kv[1].split("&");
    var url_ar1 = [];
    var url_ar2 = [];
    for (i = 0; i < url_ps.length; i++) {
      url_ar1 = url_ps[i].split("=");
      url_ar2.push(url_ar1[0]);
      url_ar2[url_ar1[0]] = url_ar1[1];
    }
    //毎月支払いの場合
    if (url_ar2["sct"] == "1") {
      $('#teikiCheck').prop('checked', true);
      $('#id_teikiStart').val(1);
      $('#NokumitateCheck').prop('checked', false);
      $('#kumitateCheck').prop('checked', true);
      $('#kumitateCheck2').prop('checked', false);
      $('#kumitateDoui').prop('checked', false);
      $(".btnWrap").show();
      //一括前払いの場合
    } else if (url_ar2["sct"] == "2") {
      $('#teikiCheck').prop('checked', true);
      $('#id_teikiStart').val(1);
      $('#NokumitateCheck').prop('checked', false);
      $('#kumitateCheck').prop('checked', false);
      $('#kumitateCheck2').prop('checked', true);
      $('#kumitateDoui').prop('checked', false);
      $(".btnWrap").show();
    } else {
      //何もしない
    }
  }
});




$(document).ready(function () {
  (function order_l() {
    setTimeout(order_l, 100);
    fun_order();
  })();
})

function fun_order() {
  var teikiCheck = $('#teikiCheck').prop('checked'); //ID teikiCheck
  var id_teikiStart = $('#id_teikiStart').val(); //ID id_teikiStart
  var subcharaCheck = $('#subcharaCheck').prop('checked'); //ID subcharaCheck
  var option2Check = $('#option2Check').prop('checked'); //ID option2Check
  var id_option2Num = $('#id_option2Num').val(); //ID id_option2Num
  var binderCheck = $('#binderCheck').prop('checked'); //ID binderCheck
  var id_binderNum = $('#id_binderNum').val(); //ID id_binderNum
  var tukiichiCheck = $('#tukiichiCheck').prop('checked'); //ID id_binderNum
  var kumitateCheck = $('.kumitateCheck.no1').prop('checked'); //ID recordCheck1
  var kumitateCheck2 = $('.kumitateCheck.no2').prop('checked'); //ID recordCheck2
  var kumitate1 = $('#kumitate1').prop('checked'); //ID kumitate1
  var ikkatsumaebaraiCheck = $('.ikkatsumaebaraiCheck').prop('checked');
  if ($('#campaignCode').val()) {
    var topCode = $('#campaignCode').val().slice(0, 2); //キャンペーンコード
  }



  if (kumitateCheck || kumitateCheck2) {
    $(".kiyakuWrap").show();
  } else {
    $(".kiyakuWrap").hide();
  }

  var url = '/order/index.php?mod=bulk&';

  if (teikiCheck) {
    $(".sectionWrap").hide();
    $('#id_teikiStart').prop('disabled', false);
    $('#kumitateCheck').prop('disabled', false); //【ステップ2】創刊号からの組み立てサービス
    $('#kumitateCheck2').prop('disabled', false); //【ステップ2】創刊号からの組み立てサービス
    $('#tukiichiCheck').prop('disabled', false); //【ステップ4】お届けについて（月一回まとめてお届け）
    $('#kumitate1').prop('disabled', false); //【ステップ5】あわせて注文！デジタル版
    $('#kumitate2').prop('disabled', false); //【ステップ5】あわせて注文！デジタル版

  } else {
    $(".sectionWrap").show();
    $('#id_teikiStart').prop('disabled', true);
    $('#id_teikiStart').val(0);
    /*
    		$('#kumitateCheck').prop('checked', false);
    		$('#kumitateCheck2').prop('checked', false);
    */
    $('#tukiichiCheck').prop('checked', false);
    //$('#kumitate1').prop('checked', false);
    //$('#kumitate2').prop('checked', false);
    $('#kumitateCheck').prop('disabled', true); //【ステップ2】創刊号からの組み立てサービス
    $('#kumitateCheck2').prop('disabled', true); //【ステップ2】創刊号からの組み立てサービス
    $('#tukiichiCheck').prop('disabled', true); //【ステップ4】お届けについて（月一回まとめてお届け）
    $('#kumitate1').prop('disabled', true); //【ステップ5】あわせて注文！デジタル版
    //$('#kumitate2').prop('disabled',true);			//【ステップ5】あわせて注文！デジタル版
  }
  //【ステップ1】で「4号から」以上を選択したとき【ステップ2】をグレーアウト
  if (teikiCheck) {
    if (id_teikiStart > 1) {
      $('#kumitateCheck').prop('checked', false);
      $('#kumitateCheck2').prop('checked', false);
      $('#kumitateCheck').prop('disabled', true);
      $('#kumitateCheck2').prop('disabled', true);
      $("#step2").show();
      $(".btnWrap").hide();
    } else {
      $("#step2").hide();
    }
    if (id_teikiStart == 4) {
      $(".sectionWrap").show();
      $('.ikkatsumaebaraiCheck').prop('checked', false);
    }
  }
  //【ステップ2】で「組み立てサービスを申し込む（毎月と一括共に）」を選択したとき【ステップ3】を非表示で代わりのテキストを表示
  if (kumitateCheck2) {
    $('#subcharaCheck2').prop('checked', false);
    $('#subcharaCheck2').prop('disabled', true);
    //$(".sougakuTxt").show();
    //$(".kumitateOn").hide();
    //$(".kumitateOff").show();
  } else {
    $('#subcharaCheck').prop('disabled', false);
    $('#subcharaCheck2').prop('disabled', false);
    //$(".sougakuTxt").hide();
    //$(".kumitateOn").show();
    //$(".kumitateOff").hide();
  }


  if (binderCheck) {
    $('#id_binderNum').prop('disabled', false);
  } else {
    $('#id_binderNum').prop('disabled', true);
    $('#id_binderNum').val(0);
  }

  if (option2Check) {
    $('#id_option2Num').prop('disabled', false);
  } else {
    $('#id_option2Num').prop('disabled', true);
    $('#id_option2Num').val(0);
  }

  //定期購読ｎ号から
  if (0 < id_teikiStart && id_teikiStart <= id_teikiStartBuyNext) {
    if (subcharaCheck == true) {
      if (kumitateCheck == true) {
        if (tukiichiCheck == true) {
          if ($('#campaignCode').val()) {
            url = url + 'subscription_issue[' + topCode + teiki_c_kumitate_tsukiichi + ']=1&subscription[' + topCode + teiki_c_kumitate_tsukiichi + ']=1'; //キャンペーンの場合
          } else {
            url = url + 'subscription_issue[' + teiki_kumitate_tsukiichi + ']=1&subscription[' + teiki_kumitate_tsukiichi + ']=1'; //創刊号からアップセル[有]＋組立【毎月】＋月１[有]※常に創刊号

          }

        } else {
          if ($('#campaignCode').val()) {
            url = url + 'subscription_issue[' + topCode + teiki_c_kumitate + ']=1&subscription[' + topCode + teiki_c_kumitate + ']=1'; //キャンペーンの場合
          } else {
            url = url + 'subscription_issue[' + teiki_kumitate + ']=1&subscription[' + teiki_kumitate + ']=1'; //創刊号からアップセル[有]＋組立【毎月】＋月１[無]※常に創刊号
          }
        }
      } else if (kumitateCheck2 == true) {
        if (tukiichiCheck == true) {
          if ($('#campaignCode').val()) {
            url = url + 'subscription_issue[' + topCode + teiki_c_kumitate_ikkatsu_tsukiichi + ']=1&subscription[' + topCode + teiki_c_kumitate_ikkatsu_tsukiichi + ']=1'; //キャンペーンの場合
          } else {
            url = url + 'subscription_issue[' + teiki_kumitate_ikkatsu_tsukiichi + ']=1&subscription[' + teiki_kumitate_ikkatsu_tsukiichi + ']=1'; //創刊号からアップセル[有]＋組立【一括】＋月１[有]※常に創刊号
          }

        } else {
          if ($('#campaignCode').val()) {
            url = url + 'subscription_issue[' + topCode + teiki_c_kumitate_ikkatsu + ']=1&subscription[' + topCode + teiki_c_kumitate_ikkatsu + ']=1'; //キャンペーンの場合
          } else {
            url = url + 'subscription_issue[' + teiki_kumitate_ikkatsu + ']=1&subscription[' + teiki_kumitate_ikkatsu + ']=1'; //創刊号からアップセル[有]＋組立【一括】＋月１[無]※常に創刊号
          }

        }
      } else if (tukiichiCheck == true) {
        if ($('#campaignCode').val()) {
          url = url + 'subscription_issue[' + topCode + jigou_teiki_c_kumitate_tsukiichi + ']=' + id_teikiStart + '&subscription[' + topCode + jigou_teiki_c_kumitate_tsukiichi + ']=1'; //キャンペーンの場合
        } else {
          url = url + 'subscription_issue[' + jigou_teiki_kumitate_tsukiichi + ']=' + id_teikiStart + '&subscription[' + jigou_teiki_kumitate_tsukiichi + ']=1'; //2号からアップセル[有]＋月１[有]

        }
      } else {
        if ($('#campaignCode').val()) {
          url = url + 'subscription_issue[' + topCode + jigou_teiki_c_kumitate + ']=' + id_teikiStart + '&subscription[' + topCode + jigou_teiki_c_kumitate + ']=1'; //キャンペーンの場合
        } else {
          url = url + 'subscription_issue[' + jigou_teiki_kumitate + ']=' + id_teikiStart + '&subscription[' + jigou_teiki_kumitate + ']=1'; //2号からアップセル[有]＋月１[無]
        }

      }
    } else {
      if (kumitateCheck == true) {
        if (tukiichiCheck == true) {
          if ($('#campaignCode').val()) {
            url = url + 'subscription_issue[' + topCode + nominicar_teiki_c_kumitate_tsukiichi + ']=1&subscription[' + topCode + nominicar_teiki_c_kumitate_tsukiichi + ']=1'; //キャンペーンの場合
          } else {
            url = url + 'subscription_issue[' + nominicar_teiki_kumitate_tsukiichi + ']=1&subscription[' + nominicar_teiki_kumitate_tsukiichi + ']=1'; //創刊号からアップセル[無]＋組立【毎月】＋月１[有]※常に創刊号
          }

        } else {
          if ($('#campaignCode').val()) {
            url = url + 'subscription_issue[' + topCode + nominicar_teiki_c_kumitate + ']=1&subscription[' + topCode + nominicar_teiki_c_kumitate + ']=1'; //キャンペーンの場合
          } else {
            url = url + 'subscription_issue[' + nominicar_teiki_kumitate + ']=1&subscription[' + nominicar_teiki_kumitate + ']=1'; //創刊号からアップセル[無]＋組立【毎月】＋月１[無]※常に創刊号
          }

        }
      } else if (kumitateCheck2 == true) {

        if (tukiichiCheck == true) {          
          if ($('#campaignCode').val()) {
            url = url + 'subscription_issue[' + topCode + nominicar_teiki_c_kumitate_ikkatsu_tsukiichi + ']=1&subscription[' + topCode + nominicar_teiki_c_kumitate_ikkatsu_tsukiichi + ']=1'; //キャンペーンの場合
          } else {
            url = url + 'subscription_issue[' + nominicar_teiki_kumitate_ikkatsu_tsukiichi + ']=1&subscription[' + nominicar_teiki_kumitate_ikkatsu_tsukiichi + ']=1'; //創刊号からアップセル[無]＋組立【一括】＋月１[有]※常に創刊号
          }          
        } else {          
          if ($('#campaignCode').val()) {
            url = url + 'subscription_issue[' + topCode + nominicar_teiki_c_kumitate_ikkatsu + ']=1&subscription[' + topCode + nominicar_teiki_c_kumitate_ikkatsu + ']=1'; //キャンペーンの場合
          } else {
            url = url + 'subscription_issue[' + nominicar_teiki_kumitate_ikkatsu + ']=1&subscription[' + nominicar_teiki_kumitate_ikkatsu + ']=1'; //創刊号からアップセル[無]＋組立【一括】＋月１[無]※常に創刊号
          }
          
        }
      } else if (tukiichiCheck == true) {
        if ($('#campaignCode').val()) {
          url = url + 'subscription_issue[' + topCode + nominicar_jigou_teiki_c_kumitate_tsukiichi + ']=' + id_teikiStart + '&subscription[' + topCode + nominicar_jigou_teiki_c_kumitate_tsukiichi + ']=1'; //キャンペーンの場合
        } else {
          url = url + 'subscription_issue[' + nominicar_jigou_teiki_kumitate_tsukiichi + ']=' + id_teikiStart + '&subscription[' + nominicar_jigou_teiki_kumitate_tsukiichi + ']=1'; //2号からアップセル[無]＋月１[有]
        }

      } else {
        if (ikkatsumaebaraiCheck == true) {
          /*一括前払いの場合はコメントアウトはずす                  
					if (id_teikiStart == "1") {
						url = url + 'subscription_issue['+ikkatsumaebarai+']='+id_teikiStart+'&subscription['+ikkatsumaebarai+']=1';				//1号＋一括前払い
					} else if (id_teikiStart == "2") {
						url = url + 'subscription_issue['+ikkatsumaebaraiB+']='+id_teikiStart+'&subscription['+ikkatsumaebaraiB+']=1';				//2号＋一括前払い
					} else if (id_teikiStart == "3") {
						url = url + 'subscription_issue['+ikkatsumaebaraiC+']='+id_teikiStart+'&subscription['+ikkatsumaebaraiC+']=1';				//3号＋一括前払い
					} else {
						url = url + 'subscription_issue['+nominicar_jigou_teiki_kumitate+']='+id_teikiStart+'&subscription['+nominicar_jigou_teiki_kumitate+']=1';				//4号以降＋一括前払い
					}*/
        } else {

          if ($('#campaignCode').val()) {
            url = url + 'subscription_issue[' + topCode + nominicar_jigou_teiki_c_kumitate + ']=' + id_teikiStart + '&subscription[' + topCode + nominicar_jigou_teiki_c_kumitate + ']=1'; //キャンペーンの場合
          } else {
            url = url + 'subscription_issue[' + nominicar_jigou_teiki_kumitate + ']=' + id_teikiStart + '&subscription[' + nominicar_jigou_teiki_kumitate + ']=1'; //2号からアップセル[無]＋月１[無]
          }
        }
      }
    }
  } else {
    //定期購読無し
    if (subcharaCheck == true) {
      url = url + 'subscription_issue[' + ikkatsumaebarai + ']=1&subscription[' + ikkatsumaebarai + ']=1'; //ミニカーのみ
    }
  }

  if (id_binderNum > 0) {
    url = url + '&binder[' + binder + ']=' + id_binderNum;
  } //バインダー

  if (option2Check == true) {
    url = url + '&backnumber[' + option2 + ']=' + id_option2Num;
  } //バインダー

  //バックナンバー	＊ここ＊
  //var backunumber_end = parseInt($('#id_teikiStart').val()) - 1;
  // 組み立てサービス選択が無い場合、下の1つ目と2つ目の判定条件を削除
  // デジタル版選択が無い場合、下の3つ目の判定条件を削除
  // 両方ない場合、下の1行と対応する閉じ括弧をコメントアウト
  //if (kumitateCheck2==false && kumitateCheck==false && kumitate1==false) {
  //    if (backunumber_end >= 1) {
  //        url=url+'&backnumber['+backnumber+']=1&backnumber_issue['+backnumber+']=1_'+ backunumber_end;
  //    }
  //}


  //デジタル版バックナンバー	＊ここ＊　※発売日の度に各号に追加
  // 組み立てサービス選択が無い場合、下の1つ目と2つ目の判定条件を削除
  // デジタル版選択が無い場合、下のif文をすべてコメントアウト
  //if (kumitateCheck2==false && kumitateCheck==false && kumitate1==true){ 
  //    var params = '';
  //    if (backunumber_end >= 1) {
  //        for (i=1; i<=backunumber_end; i++) {
  //            backnumber_digital = backnumber_digital_l + ( '0000' + i ).slice( -4 ) + backnumber_digital_r;
  //            params+='&backnumber['+backnumber_digital+']=1&unit_type['+backnumber_digital+']=1';
  //        }
  //        if (params != '') {
  //            url=url+params;
  //        }
  //    }
  //}

  // デジタル版選択が無い場合、下の1行をコメントアウト
  if (kumitate1 == true) {
    url = url + '&subscription_unit_type=72';
  } //デジタル有り


  if (teikiCheck == true || subcharaCheck == true || binderCheck == true || option2Check == true) {
    $('#order_btnBox').css('opacity', 1);
    $('#order_url').attr('href', url);
    //		$('#test').html(url);
  } else {
    $('#order_btnBox').css('opacity', 0.3);
    $('#order_url').attr('href', 'javascript:void(0)');
    //		$('#test').html('javascript:void(0)');
  }
  console.log(url)


}


$(function () {

  //キャンペーンコードが違う場合はアラートを出す
  $("#order_url").click(function () {
    var campaignCode = $("#campaignCode").val().slice(0, 2);
    if (!campaignCode) {
      //キャンペーンコードなし
    } else if (campaignCode == 40 || campaignCode == 41 || campaignCode == 61 || campaignCode == 62 || campaignCode == 64 || campaignCode == 67) {
      console.log("キャンーペーンコード" + campaignCode)
    } else {
      alert("キャンペーンコードに誤りがあります")
      return false
    }
  })
  var douiFlg = 0;
  $(".kumitateCheck").change(function () {
    if ($(this).prop("checked")) {
      if ($(this).hasClass("no0")) {
        $('.kumitateCheck.no1').prop('checked', false);
        $('.kumitateCheck.no2').prop('checked', false);
      } else if ($(this).hasClass("no1")) {
        $('.kumitateCheck.no0').prop('checked', false);
        $('.kumitateCheck.no2').prop('checked', false);
      } else {
        $('.kumitateCheck.no0').prop('checked', false);
        $('.kumitateCheck.no1').prop('checked', false);
      }
    }

    kumitateCheck = $('.kumitateCheck.no1').prop('checked'); //ID recordCheck1
    kumitateCheck2 = $('.kumitateCheck.no2').prop('checked'); //ID recordCheck2
    console.log(
      "kumitateCheck" + " " + kumitateCheck + "\n" +
      "kumitateCheck2" + " " + kumitateCheck2
    );
    if (kumitateCheck || kumitateCheck2) {
      if (douiFlg == 1) {} else {
        $(".btnWrap").show();
      }
    } else {
      $(".btnWrap").hide();
    }
  });
  $("#kumitateDoui").change(function () {
    if ($(this).prop('checked')) {
      douiFlg = 1;
      $(".btnWrap").hide();
    } else {
      douiFlg = 0;
      $(".btnWrap").show();
    }
  });
})
