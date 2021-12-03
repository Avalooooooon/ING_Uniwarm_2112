// pages/unimeme/unimeme.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showdata: {},
        imglist: null,
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
    preview: function (e) {
        let currentUrl = e.currentTarget.id
        var index = ''
        var lock = 0
        for (var i = 0; i < this.data.showdata.length; i++) {
            console.log(this.data.showdata[i].show)
            var tmpi = this.data.showdata[i].show.findIndex(o => o.image == currentUrl)
            if (tmpi>=0) {
                if(this.data.showdata[i].show[tmpi].locked === 'yes'){
                    lock = 1
                }
                index = i
                break
            }
        }
        if(lock == 0){
            wx.previewImage({
                current: 'http://www.bizspace.cn:8690' + currentUrl, // 当前显示图片的http链接
                urls: this.data.imglist[index], // 需要预览的图片http链接列表
            })
        }else{
            wx.showToast({
                title: '图片尚未解锁',
                icon: 'none',
                duration: 2000//持续的时间
              })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.request({
            url: 'https://www.bizspace.cn/api/wechatweb/v1/images/lele_series',
            data: {
                token: wx.getStorageSync('token') ,
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
                    var tmpimglist = [];
                    var k = [];
                    for (var i = 0; i < that.data.showdata.length; i++) {
                        tmpimglist[i] = []
                        k[i] = 0
                        for (let j = 0; j < that.data.showdata[i].show.length; j++) {
                            if (that.data.showdata[i].show[j].locked === 'no'){
                                var head = "http://www.bizspace.cn:8690";
                                let a = that.data.showdata[i].show[j].image;
                                tmpimglist[i][k[i]] = head + a;
                                console.log(a)
                                k[i]++;
                            }
                        }
                    }
                    that.setData({
                        imglist: tmpimglist
                    });
                    console.log(that.data.imglist)
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
