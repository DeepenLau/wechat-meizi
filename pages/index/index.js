//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'meizi',
    userInfo: {},
    style: {
      left: -40,
      show: false
    },
    move: {
      startX: 0,
      endX: 0 
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindViewTapa: function () {
    wx.navigateTo({
      url: '../test/test'
    })
  },
  touchstart: function (e) {
    console.log(e);
    this.data.move.startX = e.changedTouches[0].clientX
  },
  touchmove: function (e) {
    // console.log(e)
  },
  touchend: function (e) {
    console.log(e)
    this.data.move.endX = e.changedTouches[0].clientX
    console.log(this.data.move)
    const disX = this.data.move.endX - this.data.move.startX
    console.log(disX)
    if (disX > 40) {
      this.showSlider()
    }
  },
  closeSlider: function () {
    // this.data.style.show = false
    // this.data.style.left = -40
    this.setData({
      style: {
        show: false,
        left: -40
      }
    })
  },
  showSlider: function () {
    this.data.style.show = true
    console.log(this.data.style.show)
    const timer = setInterval(() => {
      if (this.data.style.left >= 0) {
        clearInterval(timer)
        return
      }
      this.data.style.left++
      this.setData({
        style: {
          show: true,
          left: this.data.style.left
        }
      })
    }, 16)
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
