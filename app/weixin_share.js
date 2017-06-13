/**
 * Created by meathill on 2017/6/13.
 */
import {baseUrl} from './config';

export default function getWechatShareSign(d, g, h, f, c) {
  let e = d.split("#")[0];
  $.get({
    url: baseUrl + "/wx/share/getSign",
    data: {url: e},
    dataType: "json"
  })
    .then(function (i) {
      wx.config({
        debug: false,
        appId: "wxa9efb907fbf2a3c4",
        timestamp: i.data.timestamp,
        nonceStr: i.data.nonceStr,
        signature: i.data.signature,
        jsApiList: ["onMenuShareQQ", "onMenuShareQZone", "onMenuShareWeibo", "onMenuShareTimeline", "onMenuShareAppMessage",]
      })
    }) ;
  wx.ready(function () {
    wx.onMenuShareAppMessage({
      title: g, desc: h, link: f, imgUrl: c, type: "link", dataUrl: "", success: function () {
      }, cancel: function () {
      }
    });
    wx.onMenuShareTimeline({
      title: g, desc: h, link: f, imgUrl: c, type: "link", dataUrl: "", success: function () {
      }, cancel: function () {
      }
    });
    wx.onMenuShareQQ({
      title: g, desc: h, link: f, imgUrl: c, type: "link", dataUrl: "", success: function () {
      }, cancel: function () {
      }
    });
    wx.onMenuShareWeibo({
      title: g, desc: h, link: f, imgUrl: c, type: "link", dataUrl: "", success: function () {
      }, cancel: function () {
      }
    });
    wx.onMenuShareQZone({
      title: g, desc: h, link: f, imgUrl: c, type: "link", dataUrl: "", success: function () {
      }, cancel: function () {
      }
    });
    wx.error(function (i) {
    })
  })
}