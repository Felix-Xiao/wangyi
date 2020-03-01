// pages/event1/event1.js
var self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: "",
    password: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    self = this
  },
  submit(event) {
    console.log("subimit", event)
    if (event.detail.target.id == "注册") {
      console.error("注册", event.detail.value.account, event.detail.value.password)
    } else {
      console.error("登录", event.detail.value.account, event.detail.value.password)
    }
  },
  reset(event) {
    console.log("reset", event)
  },
  tapOuter(event) {
    console.log("outer", event)
  },
  tapInner(event) {
    console.log("inner", event)
  },
  register(event) {
    console.error("注册", this.data.account, this.data.password)

  },
  login(event) {
    console.error(event)
    console.error("登录", this.data.account, this.data.password)
  },
  accountInput: function(event) {
    console.error(event)
    // this.data.account = event.detail.value
    this.setData({
      account: event.detail.value
    })
  },
  passwordInput: (event) => {
    console.error(event)
    self.data.password = event.detail.value
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})