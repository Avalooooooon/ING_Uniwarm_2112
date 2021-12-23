Page({

    /**
     * 页面的初始数据
     */
    data: {
        //声明接收数据的变量
        showdata: {}
    },
    todiscoverydetbag: function (e) {
        console.log(e);
        var newsid=e.currentTarget.id;
        var app=getApp(); //获取全局对象
        app.requestNewsid=newsid; // 设置全局的请求访问时传递的参数
        console.log(newsid);
        wx.navigateTo({
            url: '/pages/discoverydetbag/discoverydetbag',
        })
    },
    todiscoverydethug: function (e) {
        console.log(e);
        var newsid=e.currentTarget.id;
        var app=getApp(); //获取全局对象
        app.requestNewsid=newsid; // 设置全局的请求访问时传递的参数
        console.log(newsid);
        wx.navigateTo({
            url: '/pages/discoverydethug/discoverydethug',
        })
    },
    todiscoverydetjew: function (e) {
        var newsid=e.currentTarget.id;
        var app=getApp(); //获取全局对象
        app.requestNewsid=newsid; // 设置全局的请求访问时传递的参数
        // console.log(newsid);
        wx.navigateTo({
            url: '/pages/discoverydetjew/discoverydetjew',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this // 引用 基础类型与引用类型.调用api后this会被系统创建为新的。
        //that指向问题
        wx.request({
            url: 'https://www.bizspace.cn/api/v3/news/listall', //这里写后台提供的数据链接(接口地址），地址的域名要在微信小程序平台提前设置，请求时需要校验域名，
            data: { //我们发给服务器的数据。花括号中定义要发送的变量名称及值，逗号分隔。
                bizid: 'uniwarm', //string。企业id, 固定为uniwarm
                listid: '1', //int。模块id，固定为 1
                page: '0', //int。页数，从0开始，每页10条
                language: 'ch' //string。语言，ch-中文， en-英文
            },
            method: "get", //http请求方法，主要有POST和GET
            header: { //用法比较固定，，，get方法可以不填
                //'content-type':'application/json' //默认值app.../json。数据发送出去以包的形式进行传输，
                //形成包的过程中需要按照一定格式对包进行组装，服务端必须解析成功才能获得发送的数据。
                //根据请求头（就是这个字段）获取请求中的消息主体是用何种编码，再对主体进行解析
            },
            //这仨是回调函数
            //分为：1.API调用成功或失败   2.服务器处理请求成功或失败。
            //看实际的接口文档，在返回数据中会有关于错误的说明，一般通过一个数字类型的错误码进行标识。
            //下面的是对于第一种：API
            success: function (res) {
                // console.log(res.data) //res.data是服务器给的所有数据，打印出来的是Object。例子：如果是要电话，格式应为我res.data.number

                if (res.data.res != 0) {
                    console.log("服务器返回请求不成功，出现某种问题，需要处理")
                } else if (res.data.res == 0) {
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

