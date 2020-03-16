// pages/calculator/calculator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '0',
    result: '',
    history: '',
    isResult: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },

  onCalculate: function() {

  },

  onClick: function(e) {
    if (e.target.id === "back") {
      this.setData({
        content: this.data.content.slice(0, this.data.content.length - 1)
      })
    } else if (e.target.id === "clean") {
      this.setData({
        content: '0'
      })
    } else if (e.target.id === "+/-") {
      if (this.data.content.slice(0, 1) !== '-') {
        this.setData({
          content: '-' + this.data.content
        })
      } else {
        this.setData({
          content: this.data.content.slice(1, this.data.content.length)
        })
      }
    } else if (e.target.id === "point") {
      this.setData({
        content: this.data.content + '.'
      })
    } else if (e.target.id === "equal") {
      function divideMath(arr) {
        let result = arr[0];
        if (arr.length > 1) {
          for (let r = 1; r < arr.length; r++)
            result = parseFloat(result) / parseFloat(arr[r]);
        }
        return result;
      }
      function multiplyMath(arr) {
        let result = arr[0];
        if (arr.length > 1) {
          for (let r = 1; r < arr.length; r++)
            result = parseFloat(result) * parseFloat(arr[r]);
        }
        return result;
      }
      function addMath(arr) {
        let result = arr[0];
        if (arr.length > 1) {
          for (let r = 1; r < arr.length; r++)
            result = parseFloat(result) + parseFloat(arr[r]);
        }
        return result;
      }
      function reduceMath(arr) {
        let result = arr[0];
        if (arr.length > 1) {
          for (let r = 1; r < arr.length; r++)
            result = parseFloat(result) - parseFloat(arr[r]);
        }
        return result;
      }
      let result = 0;
      let arr1 = this.data.content.split('+');
      for (let i = 0; i < arr1.length; i++){
        let arr2 = arr1[i].split('-');
        if (arr2[0] === ''){
          arr2[0] = '0';
        }
        for (let s = 0; s < arr2.length; s++) {
          let arr3 = arr2[s].split('×');
          for (let p = 0; p < arr3.length; p++) {
            let arr4 = arr3[p].split('÷');
            arr3[p] = divideMath(arr4);
          }
          arr2[s] = multiplyMath(arr3);
        }
        arr1[i] = reduceMath(arr2);
      }
      result = addMath(arr1);
      this.setData({
        content: result.toString(),
        history: this.data.content + "=" + result,
        isResult: true,
      })
    } else if (e.target.id === "history") {
      this.setData({
        content: this.data.history,
        isResult: true
      })
    } else {
      if (!this.data.content.startsWith('0') && !this.data.isResult) {
        this.setData({
          content: this.data.content + e.target.id
        })
      } else if (this.data.content.startsWith('0') && !this.data.isResult) {
        this.setData({
          content: isNaN(parseInt(e.target.id)) ? this.data.content : e.target.id
        })
      } else if (this.data.isResult){
        this.setData({
          content: isNaN(parseInt(e.target.id)) ? '0' : e.target.id,
          isResult: false
        })
      }
    }
  },  
})