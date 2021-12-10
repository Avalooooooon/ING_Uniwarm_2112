// pages/redbag/redbag.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showdata: {},
        isredbagempty: true,
        showModal: false,
    },
    hideMask: function () {
        this.setData({
            showModal: false
        })
    },
    toserial: function () {
        this.setData({
            showModal: true
        })
    },
    taptocopy: function (e) {
        wx.setClipboardData({
            data: e.currentTarget.id, //要复制的数据
            success(res) {
                wx.showToast({
                    title: '序列码已复制',
                    icon: 'success',
                    duration: 2000 //持续的时间
                })
                //   wx.getClipboardData({
                //     success (res) {
                //       console.log(res.data) // data
                //     }
                //   })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: 'https://www.bizspace.cn/api/wechatweb/v1/images/redpacket',
            data: {
                bizid: 'uniwarm',
                token: wx.getStorageSync('token'),
                device: '',
                wechat: ''
            },
            method: 'GET',
            header: {},
            success: function (res) {
                console.log(res)
                console.log('submit success');
                if (res.data.res != 0) {
                    console.log("服务器返回请求不成功，出现某种问题，需要处理")
                } else if (res.data.res == 0) {
                    console.log("服务器返回请求成功")
                    if (res.data.data.length == 0) {
                        that.setData({
                            isredbagempty: true
                        })
                    } else {
                        that.setData({
                            showdata: res.data.data,
                            isredbagempty: false
                        })
                    }
                    console.log(that.data.showdata)
                }

            },
            fail: function (res) {
                console.log('submit fail'); //API请求失败
            },
            complete: function (res) {
                console.log('submit complete');
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})