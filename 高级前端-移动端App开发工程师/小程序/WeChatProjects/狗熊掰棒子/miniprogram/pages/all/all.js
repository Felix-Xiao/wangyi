// pages/all/all.js
Page({

  /**
   * Page initial data
   */
  data: {
    tagList: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    wx.cloud.callFunction({
      name: "getArticleList",
      data:{page:1},
      success: res=>{
        let result = res.result;
        this.setData({
          tagList: result
        })
      },
      fail: err=>{
        console.error('[云函数] [getArticleList] 调用失败', err);
      }
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})