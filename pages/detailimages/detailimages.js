// pages/detailimages/detailimages.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        skulist: [],
        detailinfo: {},
        color:'',
        swiperimage:[],

        indicatordots: true, 
        duration: 500, //滑动动画时长
    },
    JTO: function (str) {
        var reg = /: *\d{14,20} */g;
        str = str.replace(reg, function (a) {
            return a.replace(/: */g, ":\"").replace(" ", "") + "\"";
        });

        return str;
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var itemid = getApp().detailitemid;
        console.log(itemid);
        var that = this
        //that指向问题
        wx.request({
            url: 'https://www.bizspace.cn/api/vtshop/v1/product/detail',
            data: {
                bizid: 'uniwarm',
                user_id: '',
                language: 'ch',
                region: 'china',
                itemid: itemid,
            },
            method: "get",
            header: {},
            dataType: "text",

            success: function (res) {
                res.data = JSON.parse(that.JTO(res.data));
                console.log('submit success');
                console.log(res.data);

                if (res.data.res != 0) {
                    console.log("服务器返回请求不成功，出现某种问题，需要处理")
                } else if (res.data.res == 0) {
                    console.log("服务器返回请求成功")
                    that.setData({
                        skulist: res.data.sku_list[0],
                        detailinfo: res.data.s_attr,
                        swiperimage:res.data.images,
                    })
                    console.log(that.data.skulist);
                    console.log(that.data.detailinfo);
                    console.log(that.data.swiperimage);
                }

            },
            fail: function (res) {
                console.log('submit fail'); //API请求失败
            },
            complete: function (res) {
                console.log('submit complete');
            }
        })



        //获取推荐列表
        wx.request({
            url: 'https://www.bizspace.cn/api/vtshop/v1/product/pushlist',
            data: {
                bizid: 'uniwarm',
                uni_id:'1',
                user_id: '',
                language: 'ch',
                region: 'china',
                page:'0',
            },
            method: "get",
            header: {},
            dataType: "text",

            success: function (res) {
                console.log(res.data);
                res.data = JSON.parse(that.JTO(res.data));
                console.log('submit success');
                console.log(res.data);

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
