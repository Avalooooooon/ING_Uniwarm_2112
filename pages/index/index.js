// index.js
// 获取应用实例
const app = getApp()

// 数据绑定

Page({
  data: {},
  toNetwork:function(){
    wx.redirectTo({
      url: '/pages/out/out',
    })
  },
  toDiscovery:function(){
    wx.navigateTo({
      url: '/pages/discovery/discovery',
    })
  },
  toStorys:function(){
    wx.navigateTo({
      url: '/pages/storys/storys',
    })
  },
  toGoodmoring:function(){
    wx.navigateTo({
      url: '/pages/goodmoring/goodmoring',
    })
  },
  toSecret:function(){
    wx.navigateTo({
      url: '/pages/secret/secret',
    })
  },
  toMeme:function(){
    wx.navigateTo({
      url: '/pages/meme/meme',
    })
  },
  toUnimeme:function(){
    wx.navigateTo({
      url: '/pages/unimeme/unimeme',
    })
  },
  togame:function(){
    wx.navigateTo({
      url: '/pages/game/game',
    })
  },
  towallpaper:function(){
    wx.navigateTo({
      url: '/pages/wallpaper/wallpaper',
    })
  },
  toredbag:function(){
    wx.navigateTo({
      url: '/pages/redbag/redbag',
    })
  },
  toNews:function(){
    wx.navigateTo({
      url: '/pages/news/news',
    })
  }
})
