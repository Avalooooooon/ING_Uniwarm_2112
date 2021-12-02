// pages/newsdet/newsdet.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showdata: {},
        newsurl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var newsid = getApp().requestNewsid;
        var that = this;
        console.log(newsid);
        wx.request({
            url: 'https://www.bizspace.cn/api/v3/news/detail',
            data: {
                bizid: 'uniwarm',
                listid: '1',
                itemid: newsid,
            },
            method: "get",
            header: {},

            success: function (res) {
                console.log('submit success');
                //console.log(res.data) //res.data是服务器给的所有数据，打印出来的是Object。例子：如果是要电话，格式应为我res.data.number
                if (res.data.res != 0) {
                    console.log("服务器返回请求不成功，出现某种问题，需要处理")
                } else if (res.data.res == 0) {
                    console.log("服务器返回请求成功")
                    that.setData({
                        showdata: res.data.lists
                    })
                    console.log(that.data.showdata)

                    // 把url都先变成http开头（没有的加上），再改成https
                    var tempurl = that.data.showdata[0].web_url;
                    if(tempurl.substring(0, 4)!="http"){
                        tempurl = "http://www.bizspace.cn:8690" + tempurl
                    }
                    tempurl = tempurl.substring(0, 4) + "s" + tempurl.substring(4, 22) + tempurl.substring(27, tempurl.length)
                    that.setData({
                        newsurl: tempurl,
                    })
                    console.log(that.data.newsurl);
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