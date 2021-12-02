// index.js
// 获取应用实例
const app = getApp()

// 数据绑定
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,

    userrank: '',
    rawData: '',
    signature: '',
  },
  toGiftcase: function () {
    wx.navigateTo({
      url: '/pages/giftcase/giftcase',
    })
  },
  toseviceitems: function () {
    wx.navigateTo({
      url: '/pages/seviceitems/seviceitems',
    })
  },
  topersonalitems: function () {
    wx.navigateTo({
      url: '/pages/personalitems/personalitems',
    })
  },
  toApp: function () {
    wx.navigateTo({
      url: '/pages/toapp/toapp',
    })
  },


  onLoad: function () {
    console.log(getApp().globalData.overdue)
    if (getApp().globalData.overdue === "true") { // 已过期，需要重新登录
      console.log("true");
      // 缓存置空
      wx.setStorageSync('userInfo', null);
      wx.setStorageSync('token', null);
      wx.setStorageSync('userid', null);
      wx.setStorageSync('userrank', null);
    } else if (getApp().globalData.overdue === "false") { //未过期，直接显示
      console.log("false")
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
        userrank: wx.getStorageSync('userrank'),
        hasUserInfo: true
      })
    }
  },


  getUserProfile(e) {
    var p1 = new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          console.log(res)
          wx.setStorageSync('code', res.code)
          resolve(res)
        },
        fail: res => {
          console.log('submit fail')
        },
        complete: res => {
          console.log('submit complete')
        }
      })
    })
    var p2 = new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: res => {
          console.log(res)
          wx.setStorageSync('userInfo', res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            rawData: res.rawData,
            signature: res.signature
          })
          var that = this;
          wx.request({
            url: 'https://www.bizspace.cn/api/wechatweb/v1/users/login',
            data: {
              bizid: 'uniwarm',
              code: wx.getStorageSync('code'),
              rawdata: that.data.rawData,
              signature: that.data.signature,
              device: '',
              wechat: '',
            },
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              console.log(res)
              if (res.data.res != 0) {
                console.log("服务器返回请求不成功，出现某种问题，需要处理")
              } else if (res.data.res == 0) {
                console.log("服务器返回请求成功")
                wx.setStorageSync('userid', res.data.user_id)
                wx.setStorageSync('userrank', res.data.rank)
                wx.setStorageSync('token', res.data.token)
                that.setData({
                  userrank: res.data.rank,
                })
              }
            }
          })

          resolve(res)
        },
        fail: res => {
          console.log('submit fail')
        },
        complete: res => {
          console.log('submit complete')
        }
      })
    })

    // 同时执行p1和p2，并在它们都完成后执行then
    Promise.all([p1, p2]).then((results) => {
      // results是一个长度为2的数组，放置着p1、p2的resolve
      this.handleUserInfo({
        // 这里也可以选择性返回需要的字段
        ...results[0],
        ...results[1]
      })
    })
  },

  // 组织好后端需要的字段，并调用接口
  handleUserInfo(data) {
    const {
      code,
      encryptedData,
      userInfo,
      iv,
      rawData,
      signature,
      cloudID
    } = data
    const params = {
      userInfo,
      // ....
    }
    // 调用接口维护本地登录态
  }
})
