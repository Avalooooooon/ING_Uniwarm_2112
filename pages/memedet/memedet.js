// pages/memedet/memedet.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showdata: [],
        imglist:[],
        title:''
    },
    preview:function (e){
        let currentUrl = e.currentTarget.id
        console.log(e)
        // let tmpi = this.data.showdata.findIndex(o=> o.image==currentUrl)

            wx.previewImage({
                current: 'http://www.bizspace.cn:8690' + currentUrl, // 当前显示图片的http链接
                urls: this.data.imglist, // 需要预览的图片http链接列表
                //showmenu:true
            })
            console.log(this.data.imglist)

    },
        
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var memelistid=getApp().requestMemelistid;
        console.log(memelistid);

        var that = this
        wx.request({
            url: 'https://www.bizspace.cn/api/wechatweb/v1/images/sticker',
            data: {
                token:wx.getStorageSync('token') ,
                bizid: 'uniwarm', //string。企业id, 固定为uniwarm
                se_id: memelistid,
                device:'',
                wechat:''
            },
            method: "get", //http请求方法，主要有POST和GET
            header: {},

            success: function (res) {
                console.log('submit success');
                console.log(res.data);
                if (res.data.res != 0) {
                    console.log("服务器返回请求不成功，出现某种问题，需要处理")
                } else if (res.data.res == 0) {
                    console.log("服务器返回请求成功")
                    that.setData({
                        showdata: res.data.data,
                        title: res.data.se_name,
                    })

                    let tmpimglist = [];                      
                        for (let i = 0; i < that.data.showdata.length; i++) {
                            
                                    var head = "http://www.bizspace.cn:8690";
                                    let a = that.data.showdata[i].image;;
                                    tmpimglist[i] = head + a;       
                        }
                        that.setData({
                            imglist: tmpimglist
                        });

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
