var base64 = require('/utils/base64_uti.js')
var MD5 = require('/utils/md5.js')
var wechat = {//传给后台的数据用于调起支付
  appid: "wx0000000000000000",
  customerId: "userId",
  discount: 0,
  openid: "olq0Z0ZndKmXw8IyKcq1Zh4_otis",
  sysMemberId: 5
}

function getPayInfo(success, fail) {
  wx.request({
    url: 'https://详细的接口地址',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data: wechat,
    success: function(res) {
      console.log("状态", res)
      if (res.data.state == 2) {
        var stra = "appId="+wechat.appid+"&nonceStr=" + res.data.nonce_str + "&package=prepay_id=" + res.data.prepay_id + "&signType=MD5&timeStamp=" + res.data.timeStamp;
        //这里时拼接商户平台中设置的key，由于后台返回时经过了简单的编码所以使用base64还原
        var strb = stra + "&key=" + base64.decode(res.data.key);
        //将数据进行本地签名后用于提交支付
        var sign = MD5.hex_md5(strb).toUpperCase();
        //使用小程序API开始支付
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonce_str,
          'package': 'prepay_id=' + res.data.prepay_id,
          'signType': 'MD5',
          'paySign': sign,
          'success': function(res) {
            if (fail instanceof Function)
              success("支付成功")
          },
          'fail': function(res) {
            if (fail instanceof Function)
              fail(res)
          }
        })
      }

    },
    fail: function(res) {
      if (fail instanceof Function)
        fail(res);
    }
  })


}
module.exports = {
  getPayInfo: getPayInfo
}