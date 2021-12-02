// pages/singleinfo/singleinfo.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        threedurl: '',

        skulist: {},
        currentid: '',
        detailinfo: {},
        color: '',
        swiperimage: [],
        modelimage:{},
        flasemodelimage:{}, // 为了修复bug

        indicatordots: true,
        duration: 500, //滑动动画时长

        tag: true
    },
    JTO: function (str) {
        var reg = /: *\d{14,20} */g;
        str = str.replace(reg, function (a) {
            return a.replace(/: */g, ":\"").replace(" ", "") + "\"";
        });
        return str;
    },
    tosinglethreed: function () {
        // var itemid=getApp().requestitemid;
        // var app=getApp(); //获取全局对象
        // app.requestitemid=itemid; // 设置全局的请求访问时传递的参数
        var threeditemid = this.data.currentid;
        var app = getApp(); //获取全局对象
        app.requestthreeditemid = threeditemid;
        console.log(threeditemid);
        wx.navigateTo({
            url: '/pages/singlethreed/singlethreed',
        })
    },
    toanothercolor: function (e) {
        var currentcolorid = e.currentTarget.id;
        console.log(currentcolorid);
        this.setData({
            currentid: currentcolorid,
        })
        this.setData({
            tag: false
        })
        this.tonewcolorpage(this.data.currentid);
    },
    tonewsinglepage: function (e) {
        var currentsingleid = e.currentTarget.id;
        console.log(currentsingleid);
        this.setData({
            currentid: currentsingleid,
        })
        this.setData({
            tag: false
        })
        this.tonewcolorpage(this.data.currentid);
    },
    tonewcolorpage: function (colorid) {
        var that = this
        // 获取商品图
        wx.request({
            url: 'https://www.bizspace.cn/api/vtshop/v1/product/detail',
            data: {
                bizid: 'uniwarm',
                user_id: '',
                language: 'ch',
                region: 'china',
                itemid: colorid,
            },
            method: "get",
            header: {},
            dataType: "text",

            success: function (res) {
                res.data = JSON.parse(that.JTO(res.data));
                // console.log('submit success');
                // console.log(res.data);

                if (res.data.res != 0) {
                    console.log("服务器返回请求不成功，出现某种问题，需要处理")
                } else if (res.data.res == 0) {
                    console.log("服务器返回请求成功")
                    that.setData({
                        name: res.data.title,
                        threedurl: res.data.url_3d,
                        skulist: res.data.sku_list,
                        detailinfo: res.data.s_attr,
                        swiperimage: res.data.images,
                    })
                    // console.log(that.data.detailinfo);
                    // console.log(that.data.swiperimage);
                    // 替换产地
                    let tempdetailinfo=that.data.detailinfo;
                    if(that.data.detailinfo.origin==="china"){
                       tempdetailinfo.origin="中国"
                    }
                    if(that.data.detailinfo.origin==="italy"){
                        tempdetailinfo.origin="意大利"
                    }
                    if(that.data.detailinfo.origin==="france"){
                        tempdetailinfo.origin="法国"
                    }
                    // 替换sml
                    if(that.data.detailinfo.size==="s"){
                        tempdetailinfo.size="S"
                    }
                    if(that.data.detailinfo.size==="m"){
                        tempdetailinfo.size="M"
                    }
                    if(that.data.detailinfo.size==="l"){
                        tempdetailinfo.size="L"
                     }
                    that.setData({
                        detailinfo:tempdetailinfo
                    })
                    // console.log(that.data.skulist);
                    // 替换丑蓝色
                    let tempskulist=that.data.skulist;
                    for(var i=0;i<that.data.skulist.length;i++){
                        if(that.data.skulist[i].d_attr.color==="blue"){
                            tempskulist[i].d_attr.color="#404563"
                        }
                    }
                    that.setData({
                        skulist:tempskulist
                    })
                    // console.log(that.data.skulist);
                }

            },
            fail: function (res) {
                console.log('submit fail'); //API请求失败
            },
            complete: function (res) {
                console.log('submit complete');
            }
        })
        //获取模特图
        wx.request({
            url: 'https://www.bizspace.cn/api/wechatweb/v1/images/model',
            data: {
                token:'',
                bizid: 'uniwarm',
                device:'',
                wechat:'',
                itemid: colorid,
            },
            method: "get",
            header: {},
            // dataType: "text",

            success: function (res) {
                // res.data = JSON.parse(that.JTO(res.data));
                console.log('submit success');
                console.log(res.data);
                console.log(res.data.data);

                if (res.data.res != 0) {
                    console.log("服务器返回请求不成功，出现某种问题，需要处理")
                } else if (res.data.res == 0) {
                    console.log("服务器返回请求成功")
                    that.setData({
                        falsemodelimage: res.data.data,
                    })
                    console.log(that.data.falsemodelimage);
                    // 改modalimage的链接，加上 http://www.bizspace.cn:8690
                    var tempmodelimage = that.data.falsemodelimage
                    for(var i=0;i<that.data.falsemodelimage.length;i++){
                        tempmodelimage[i].image = "http://www.bizspace.cn:8690" + that.data.falsemodelimage[i].image
                    }
                    that.setData({
                        modelimage: tempmodelimage,
                    })
                    console.log(that.data.modelimage);
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var defaultitemid = getApp().requestitemid; //拿到discoverydetbag传递的id，是默认颜色
        console.log(defaultitemid);
        if (this.data.tag) {
            this.setData({
                currentid: defaultitemid
            })
        }
        this.tonewcolorpage(this.data.currentid);

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