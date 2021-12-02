// pages/unimemedet/unimemedet.js
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
        let tmpi = this.data.showdata.findIndex(o=> o.image==currentUrl)
        console.log(e)
        if (this.data.showdata[tmpi].locked === 'no') {
            wx.previewImage({
                current: 'http://www.bizspace.cn:8690' + currentUrl, // 当前显示图片的http链接
                urls: this.data.imglist, // 需要预览的图片http链接列表
                //showmenu:true
            })
        }else{
            var app=getApp(); //获取全局对象
            var lockurl=this.data.showdata[tmpi].image;
            app.requestlockurl='http://www.bizspace.cn:8690' + lockurl; // 设置全局的请求访问时传递的参数
            wx.navigateTo({
              url: '/pages/unimeme/unimemelock/unimemelock',
            })
        }
    },
        
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var memelistid=getApp().requestMemelistid;
        console.log(memelistid);

        var that = this
        wx.request({
            url: 'https://www.bizspace.cn/api/wechatweb/v1/images/lele',
            data: {
                token:'',
                bizid: 'uniwarm', //string。企业id, 固定为uniwarm
                se_id: memelistid,
                device:'',
                wechat:''
            },
            method: "get", //http请求方法，主要有POST和GET
            header: {},

            success: function (res) {
                if (res.data.res != 0) {
                    console.log("服务器返回请求不成功，出现某种问题，需要处理")
                } else if (res.data.res == 0) {
                    console.log("服务器返回请求成功")
                    that.setData({
                        showdata: res.data.data,
                        title: res.data.se_name,
                    })
                        
                    let tmpimglist = [];     
                    let j = 0;                  
                        for (let i = 0; i < that.data.showdata.length; i++) {
                            if (that.data.showdata[i].locked === 'no') {
                                    var head = "http://www.bizspace.cn:8690";
                                    let a = that.data.showdata[i].image;;
                                    tmpimglist[j] = head + a;    
                                    j++;
                            }   
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
