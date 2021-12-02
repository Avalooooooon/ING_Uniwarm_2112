// pages/unimeme/unimeme.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showdata: {},
        showModal: false
    },
    todeclare: function () {
        this.setData({
            showModal: true
        })
    },
    hideMask: function () {
        this.setData({
            showModal: false
        })
    },
    toMemedet: function (e) {
        var memelistid = e.currentTarget.id;
        var app = getApp(); //获取全局对象
        app.requestMemelistid = memelistid; // 设置全局的请求访问时传递的参数
        wx.navigateTo({
            url: '/pages/unimemedet/unimemedet',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.request({
            url: 'https://www.bizspace.cn/api/wechatweb/v1/images/lele_series',
            data: {
                token: '',
                bizid: 'uniwarm', //string。企业id, 固定为uniwarm
                device: '',
                wechat: ''
            },
            method: "get", //http请求方法，主要有POST和GET
            header: {},

            success: function (res) {
                console.log('submit success');

                if (res.data.res != 0) {
                    console.log("服务器返回请求不成功，出现某种问题，需要处理")
                } else if (res.data.res == 0) {
                    console.log("服务器返回请求成功")
                    that.setData({
                        showdata: res.data.data
                    })
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
