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

  // 点击事件，根据target.id为各个按钮做不同操作
  onClick: function(e) {
    if (e.target.id === "back") {
      this.setData({
        content: this.data.content.slice(0, this.data.content.length - 1)
      })
    } else if (e.target.id === "clean") { // 如果是clean，就重置为0
      this.setData({
        content: '0'
      })
    } else if (e.target.id === "+/-") { // 如果是+/-，就在输入的数字前加+/-
      if (this.data.content.slice(0, 1) !== '-') { // 如果是+，就在输入的数字前加-（负号）
        this.setData({
          content: '-' + this.data.content
        })
      } else { // 如果是-，就在输入的数字前加+（正号）
        this.setData({
          content: this.data.content.slice(1, this.data.content.length)
        })
      }
    } else if (e.target.id === "point") {
      this.setData({
        content: this.data.content + '.'
      })
    } else if (e.target.id === "equal") { //根据保存的字符串计算结果如：1×2÷4-1，结果为-0.5
      //除法计算，输入数组，计算除法
      function divideMath(arr) {
        let result = arr[0];
        if (arr.length > 1) {
          for (let r = 1; r < arr.length; r++)
            result = parseFloat(result) / parseFloat(arr[r]);
        }
        return result;
      }
      //乘法计算，输入数组，计算各数相乘结果
      function multiplyMath(arr) {
        let result = arr[0];
        if (arr.length > 1) {
          for (let r = 1; r < arr.length; r++)
            result = parseFloat(result) * parseFloat(arr[r]);
        }
        return result;
      }
      //加法计算，输入数组，计算各数相加结果
      function addMath(arr) {
        let result = arr[0];
        if (arr.length > 1) {
          for (let r = 1; r < arr.length; r++)
            result = parseFloat(result) + parseFloat(arr[r]);
        }
        return result;
      }
      //减法计算，输入数组，计算各数相减结果
      function reduceMath(arr) {
        let result = arr[0];
        if (arr.length > 1) {
          for (let r = 1; r < arr.length; r++)
            result = parseFloat(result) - parseFloat(arr[r]);
        }
        return result;
      }
      let result = 0;
      //使用split，层层取的每个元素的计算结果
      let arr1 = this.data.content.split('+');
      for (let i = 0; i < arr1.length; i++) {
        let arr2 = arr1[i].split('-');
        if (arr2[0] === '') {
          arr2[0] = '0';
        }
        for (let s = 0; s < arr2.length; s++) {
          let arr3 = arr2[s].split('×');
          for (let p = 0; p < arr3.length; p++) {
            let arr4 = arr3[p].split('÷');
            //计算所有相除结果
            arr3[p] = divideMath(arr4);
          }
          //计算所有相乘结果
          arr2[s] = multiplyMath(arr3);
        }
        //计算所有相减结果
        arr1[i] = reduceMath(arr2);
      }
      //计算相加结果
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
    } else { // 如果是数字或操作符
      if (!this.data.content.startsWith('0') && !this.data.isResult) { // 如果不以0开头，并且不是显示结果状态，在输出后面加上新的字符
        this.setData({
          content: this.data.content + e.target.id
        })
      } else if (this.data.content.startsWith('0') && !this.data.isResult) {
        this.setData({
          content: isNaN(parseInt(e.target.id)) ? this.data.content : e.target.id
        })
      } else if (this.data.isResult) {
        // 如果是显示结果状态，并且输入操作符，则显示0，否则显示输入的数字
        this.setData({
          content: isNaN(parseInt(e.target.id)) ? '0' : e.target.id,
          isResult: false
        })
      }
    }
  },
})