// pages/singlethreed/singlethreed.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        name:'',
        threedurl:'',

        skulist: {},
        currentid: '',
        detailinfo: {},
        color: '',
        swiperimage: [],

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
    todetailimages: function (e) {
        console.log("66666")
        wx.navigateTo({
            url: '/pages/detailimages/detailimages',
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
    tonewcolorpage: function (colorid) {
        var that = this 
        //that指向问题
        wx.request({
            url: 'https://www.bizspace.cn/api/vtshop/v1/product/detail', 
            data: { 
                bizid: 'uniwarm', 
                user_id: wx.getStorageSync('userid'), 
                language: 'ch',
                region:'china',
                itemid:colorid,
            },
            method: "get", 
            header: { },
            dataType: "text",

            success: function (res) {
                res.data = JSON.parse(that.JTO(res.data));
                console.log('submit success');
                console.log(res.data)

                if (res.data.res != 0) {
                    console.log("服务器返回请求不成功，出现某种问题，需要处理")
                } else if (res.data.res == 0) {
                    console.log("服务器返回请求成功")
                    that.setData({
                        name: res.data.title,
                        threedurl:res.data.url_3d,
                        skulist: res.data.sku_list,
                        detailinfo: res.data.s_attr,
                    })
                    console.log(that.data.skulist);
                    console.log(that.data.detailinfo);
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
                    console.log(that.data.skulist);
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
                    console.log(that.data.skulist);

                    // 把3durl改成https
                    var tempurl=that.data.threedurl;
                    tempurl=tempurl.substring(0,4)+"s"+tempurl.substring(4,22)+tempurl.substring(27,tempurl.length) // 如果是bizspace的域名，按此规则
                    if(tempurl.substring(12,22)==="visiontech"){ // 如果是visiontech.site的域名，按此规则
                        tempurl = tempurl.substring(0,22) + ".site" + tempurl.substring(27,tempurl.length)
                    }
                    that.setData({
                        threedurl:tempurl,
                    })
                    console.log(that.data.threedurl);
                }

            },
            fail: function (res) {
                console.log('submit fail'); //API请求失败
            },
            complete: function (res) {
                console.log('submit complete');
                wx.setNavigationBarTitle({
                  title: that.data.name,
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var defaultthreeditemid=getApp().requestthreeditemid
        console.log(defaultthreeditemid)
        if (this.data.tag) {
            this.setData({
                currentid: defaultthreeditemid
            })
        }
        this.tonewcolorpage(this.data.currentid);

        var app=getApp(); //获取全局对象
        app.detailitemid=this.data.currentid; // 设置全局的请求访问时传递的参数
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

