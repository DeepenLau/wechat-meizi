Page({
  data: {
    category: 'All',
    currentPage: 1,
    meizi: [],
    meiziUrls: [],
    style: {
      left: -50
    },
    move: {
      startX: 0,
      endX: 0,
      startTs: 0,
      endTs: 0
    },
    nav:[
      { cate: 'All', name: '全部' },
      { cate: 'DaXiong', name: '大胸' },
      { cate: 'QiaoTun', name: '翘臀' },
      { cate: 'HeiSi', name: '黑丝' },
      { cate: 'MeiTui', name: '美腿' },
      { cate: 'QingXin', name: '清新' },
      { cate: 'ZaHui', name: '杂烩' },
    ]
  },
  touchstart: function (e) {
    console.log(e);
    this.data.move.startX = e.changedTouches[0].clientX
    this.data.move.startTs = e.timeStamp
  },
  touchmove: function (e) {
    this.data.move.endX = e.changedTouches[0].clientX
    this.data.move.endTs = e.timeStamp
    const disX = this.data.move.endX - this.data.move.startX
    const disTs = this.data.move.endTs - this.data.move.startTs
    if (disX > 100 && disTs < 100) {
      this.showNav()
    }
  },
  touchend: function (e) {
    console.log(e)
    // this.data.move.endX = e.changedTouches[0].clientX
    // const disX = this.data.move.endX - this.data.move.startX
    // if (disX > 40) {
    //   this.showNav()
    // }
  },
  closeNav: function () {
    // this.data.style.show = false
    // this.data.style.left = -40
    this.setData({
      style: {
        left: -50
      }
    })
  },
  showNav: function () {
    const timer = setInterval(() => {
      if (this.data.style.left >= 0) {
        clearInterval(timer)
        return
      }
      this.data.style.left++
      this.setData({
        style: {
          left: this.data.style.left
        }
      })
    }, 16)
  },
  selectCate: function (e) {
    console.log(e.currentTarget.dataset.cate)
    this.setData({
      category: e.currentTarget.dataset.cate,
      currentPage: 1,
      meizi: []
    })
    this.closeNav()
    this.requestPic()
  },
  requestPic (callback = () => {}) {
    var self = this
    wx.request({
      url: `http://meizi.leanapp.cn/category/${self.data.category}/page/${self.data.currentPage}`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        const Arr = self.data.meizi.concat(res.data.results)
        self.setData({
          meizi: Arr
        })
        let arr = [];
        self.data.meizi.forEach(item => {
          arr.push(item.image_url)
        })
        self.setData({
          meiziUrls: arr
        })
        // wx.showToast({
        //   title: '成功~~~',
        //   icon: 'success',
        //   duration: 2000
        // })
        callback()
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad () {
    this.requestPic()
  },
  showActionSheet () {
    const self = this
    wx.showActionSheet({
      itemList: ['大胸', '翘臀', '黑丝', '美腿', '清新', '杂烩'],
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex === undefined) {
          return
        }
        self.setData({
          currentPage: 1,
          meizi: []
        })
        switch (res.tapIndex) {
          case 0:
            self.setData({
              category: 'DaXiong'
            })
            break;
          case 1:
            self.setData({
              category: 'QiaoTun'
            })
            break;
          case 2:
            self.setData({
              category: 'HeiSi'
            })
            break;
          case 3:
            self.setData({
              category: 'MeiTui'
            })
            break;
          case 4:
            self.setData({
              category: 'QingXin'
            })
            break;
          case 5:
            self.setData({
              category: 'ZaHui'
            })
            break;
          default:
            break;
        }
        self.requestPic()
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  previewImage (event) {
    this.closeNav()
    var self = this
    const url = event.target.dataset.url
    const urls = self.data.meiziUrls
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls, // 需要预览的图片http链接列表
      success () {
        console.log('成功')
      },	
      fail () {
        console.log('失败')
      },
      complete () {}
    })
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    // Do something when page show.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
    setTimeout(() => {
      this.requestPic(() => {
        wx.stopPullDownRefresh()
      })
    }, 1000)
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
    const nextPage = this.data.currentPage + 1
    // console.log(nextPage)
    wx.showToast({
      title: '加载中~~',
      icon: 'loading'
    })
    
    this.setData({
      currentPage: nextPage
    })

    setTimeout(() => {
      this.requestPic()
    }, 1000)
  },
  onShareAppMessage: function () {
   // return custom share data when user share.
   return 'aaa'
  },
})
