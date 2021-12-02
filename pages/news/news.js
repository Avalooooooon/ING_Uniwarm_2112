Page({

    /**
     * 页面的初始数据
     */
    data: {
        //声明接收数据的变量
        showdata: {}
    },
    toNewsdet: function (e) {
        console.log(e);
        var newsid = e.currentTarget.id;
        var app = getApp(); //获取全局对象
        app.requestNewsid = newsid; // 设置全局的请求访问时传递的参数
        console.log(newsid);
        wx.navigateTo({
            url: '/pages/newsdet/newsdet',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        //that指向问题
        wx.request({
            url: 'https://www.bizspace.cn/api/v3/news/listall',
            data: {
                bizid: 'uniwarm',
                listid: '1',
                page: '0',
                language: 'ch'
            },
            method: "get", //http请求方法，主要有POST和GET
            header: {},
            success: function (res) {
                console.log('submit success');
                console.log(res.data) //res.data是服务器给的所有数据，打印出来的是Object。例子：如果是要电话，格式应为我res.data.number

                if (res.data.res != 0) {
                    console.log("服务器返回请求不成功，出现某种问题，需要处理")
                } else if (res.data.res == 0) {
                    console.log("服务器返回请求成功")
                    that.setData({
                        showdata: res.data.lists
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
