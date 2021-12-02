// pages/giftcase/giftcase.js
const app = getApp()
let loadingMore = false
let lastScollTop = 0;
let lastRequestTime = 0;
let total = 0;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        winHeight: 0,
        currentTab: 0,

        // 爱的密语
        showdatalove: [],
        hasMore: true, //列表是否有数据未加载
        page: 0,
        size: 18, //每页8条数据
        scrollYHeight: 0, //scroll-view高度
        imglist: [],

        // 表情包
        showdatameme: {},
        // 红包

        // 卡券
    },
    // 爱的密语
    bindscroll: function (e) {
        const {
            scrollHeight,
            scrollTop
        } = e.detail;
        const {
            scrollYHeight,
            hasMore
        } = this.data;
        //如果当前没有加载中且列表还有数据未加载，且页面滚动到距离底部40px内
        if (!loadingMore && hasMore && (scrollHeight - scrollYHeight + 45 - scrollTop < 40) && lastScollTop <= scrollTop) {
            this.loadMore()
            total += 1;
        }
        lastScollTop = scrollTop
    },
    loadMore: function () {
        const {
            page,
            hasMore
        } = this.data;
        if (!hasMore || loadingMore) return;
        loadingMore = true
        setTimeout(
            () => {
                //下面应该是page+1
                this.fetchList(page, () => {
                    loadingMore = false;
                })
            }, 333
        )
    },
    newurl: function (property) {
        var oldstring = property;
        var urlarr = oldstring.split('.');
        var newstring = urlarr.join("_lock.")
        return newstring;
    },
    preview: function (e) {
        let currentUrl = e.currentTarget.id
        let tmpi = this.data.showdatalove.findIndex(o => o.image == currentUrl)
        if (this.data.showdatalove[tmpi].locked === 'no') {
            wx.previewImage({
                current: 'http://www.bizspace.cn:8690' + currentUrl, // 当前显示图片的http链接
                urls: this.data.imglist, // 需要预览的图片http链接列表
                //showmenu:true
            })
        } else {
            var app = getApp(); //获取全局对象
            var lockurl = this.data.showdatalove[tmpi].image;
            app.requestlockurl = 'http://www.bizspace.cn:8690' + lockurl; // 设置全局的请求访问时传递的参数
            wx.navigateTo({
                url: '/pages/secret/secretlock/secretlock',
            })
        }
    },
    fetchList: function (page, cb) {
        let nowRequestTime = (new Date()).getTime();
        //限制两次网络请求间隔至少1秒
        if (nowRequestTime - lastRequestTime < 1000) {
            if (cb) cb();
            return;
        }
        lastRequestTime = nowRequestTime

        wx.request({
            url: 'https://www.bizspace.cn/api/wechatweb/v1/users/mygift',
            data: {
                bizid: 'uniwarm', 
                token: wx.getStorageSync('token'),
                user_id: wx.getStorageSync('userid'),
                func: 'secret',
                // page: page, //int。页数，从0开始，每页10条
                device: '',
                wechat: ''
            },
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },

            success: (res) => {
                console.log(res);
                console.log(wx.getStorageSync('token'))
                console.log(wx.getStorageSync('userid'))

                if (res.data.res != 0) {
                    console.log("服务器返回请求不成功，出现某种问题，需要处理")
                } else if (res.data.res == 0) {
                    // console.log("服务器返回请求成功")
                    let showdatalove = res.data.data || [];
                    if (showdatalove.length == 0) {
                        this.setData({
                            hasMore: false,
                            page,
                        })
                    } else {
                        this.setData({
                            showdatalove: this.data.showdatalove.concat(showdatalove),
                            hasMore: showdatalove.length == this.data.size,
                            page,
                        })
                        let tmpshowdatalove = this.data.showdatalove;
                        for (let i = 18 * total; i < this.data.showdatalove.length; i++) {
                            if (this.data.showdatalove[i].locked === 'yes') {
                                let a = this.newurl(this.data.showdatalove[i].image);
                                tmpshowdatalove[i].image = a;
                            }
                        }
                        this.setData({
                            showdatalove: tmpshowdatalove,
                        });

                        let tmpimglist = [];
                        let j = 0;
                        for (let i = 0; i < this.data.showdatalove.length; i++) {
                            if (this.data.showdatalove[i].locked === 'no') {
                                var head = "http://www.bizspace.cn:8690";
                                let a = this.data.showdatalove[i].image;;
                                tmpimglist[j] = head + a;
                                j++;
                            }
                        }
                        this.setData({
                            imglist: tmpimglist
                        });
                        console.log(this.data.showdatalove)
                    }
                }
                if (cb) {
                    cb()
                }
            },
            fail: (res) => {
                console.log('submit fail'); //API请求失败
                wx.showToast({
                    title: "列表加载失败",
                    icon: 'none',
                    duration: 1000
                })
                if (cb) { // 这个不知道干啥的
                    cb()
                }
            },
            complete: (res) => {
                console.log('submit complete');

            }
        })
    },
    tosecret: function () {
        wx.navigateTo({
            url: '/pages/secret/secret',
        })
    },

    // 表情包
    tounimeme: function () {
        wx.navigateTo({
            url: '/pages/unimeme/unimeme',
        })
    },
    // 红包
    toserial:function(){
        wx.navigateTo({
            url: '/pages/unimeme/unimeme',
        })
    },
    // 顶部导航栏
    swichNav: function (e) {
        var that = this;
        console.log(e.target.dataset)
        console.log(e.target)
        console.log(e)
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    bindChange: function (e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winHeight: res.windowHeight
                });
            }
        });
        // 爱的密语
        this.fetchList(0)

        // 专属表情包
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
                        showdatameme: res.data.data
                    })
                    console.log(that.data.showdatameme)
                }

            },
            fail: function (res) {
                console.log('submit fail'); //API请求失败
            },
            complete: function (res) {
                console.log('submit complete');
            }
        })
        // 红包
        
        //卡券
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.getSystemInfo({
            success: ({
                windowHeight
            }) => {
                this.setData({
                    scrollYHeight: windowHeight
                }) //设置scrill-view组件的高度为屏幕高度
            }
        })
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