// app.js
App({
  onLaunch() {   // 小程序初始化回调函数
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.checkSession({
      success: (res) => {
        getApp().globalData.overdue = "false"
      },
      fail:(res) => {
        getApp().globalData.overdue = "true"
      },
    })
  },
  globalData: {  // 这里的globalData其实可以改为其他名称，这样的格式都可作为全局变量使用。
                 // 使用getApp()方法与全局变量进行交互，如getApp().globalData.userInfo.
    userInfo: null,  // 默认创建的全局变量只有userInfo，其默认值为null
    overdue: null,
  }
})
