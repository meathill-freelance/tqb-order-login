/**
 * Created by meathill on 2017/6/13.
 */
import getWechatShareSign from './weixin_share';
import {validatePhoneNumber} from './common';
import {baseUrl} from './config';

// 所有页面增加微信分享 add by liwei at 20160912 begin
let signUrl = location.href.split("#")[0];
let shareTitle = '遇到坏天气就赔钱 - 天气宝';
let shareDesc = '中国首个专注坏天气保障的服务平台，帮你摆平各类大雨降温等坏天气！';
let merchantId = $("#merchantId").val();
let shareLink = 'http://m.baotianqi.cn/contract/show_search';
if (merchantId) {
  shareLink += '?merchantId=' + merchantId;
}
let shareImgUrl = baseUrl + '/static/images/logo_200X200.png';
getWechatShareSign(signUrl, shareTitle, shareDesc, shareLink, shareImgUrl);


function checkMobile() {
  let mobile = $('#mobile').val().trim();
  let isValid = validatePhoneNumber(mobile);
  $('.modal').toggleClass('hide', isValid);
  return isValid;
}

/**
 * 初始化事件
 **/
let timeSec = 60;
let fetchButton = $('.fetch-verify-code-button');
$('#mobile').change( checkMobile );
$('.modal').click( event => {
  event.target.classList.add('hide');
});
fetchButton.click(event => {
  if (!checkMobile() || timeSec !== 60) {
    return;
  }
  $.ajax({
    type : "POST",
    url : baseUrl + '/deal/verify',
    data : {
      "mobile": $('#mobile').val()
    },
    dataType : "json"
  });
  fetchButton.text('已发送')
    .prop('disabled', true);
  countDown();
});

function countDown() {
  timeSec -= 1;
  if (timeSec < 1) {
    timeSec = 60;
    fetchButton.text("发送验证码");
  } else {
    fetchButton.text(timeSec + "s后重新获取");
    setTimeout(countDown, 1000);
  }
}