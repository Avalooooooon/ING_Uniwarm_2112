// pages/secret/secret.js
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
        showdata: [],

        hasMore: true, //列表是否有数据未加载
        page: 0,
        size: 18, //每页8条数据
        scrollYHeight: 0, //scroll-view高度

        imglist: [],
    },
    todraw: function () {
        wx.navigateTo({
            url: '/pages/goodmoring/goodmoring',
        })
    },
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
        if (!loadingMore && hasMore && (scrollHeight - scrollYHeight - scrollTop < 40) && lastScollTop <= scrollTop) {
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
        let tmpi = this.data.showdata.findIndex(o => o.image == currentUrl)
        if (this.data.showdata[tmpi].locked === 'no') {
            wx.previewImage({
                current: 'http://www.bizspace.cn:8690' + currentUrl, // 当前显示图片的http链接
                urls: this.data.imglist, // 需要预览的图片http链接列表
                //showmenu:true
            })
        } else {
            var app = getApp(); //获取全局对象
            var lockurl = this.data.showdata[tmpi].image;
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
            url: 'https://www.bizspace.cn/api/wechatweb/v1/images/secret',
            data: {
                token: wx.getStorageSync('token') ,
                bizid: 'uniwarm', //string。企业id, 固定为uniwarm
                page: page, //int。页数，从0开始，每页10条
                device: '',
                wechat: ''
            },
            method: "get", //http请求方法，主要有POST和GET
            header: {},

            success: (res) => {
                // console.log('submit success');

                if (res.data.res != 0) {
                    console.log("服务器返回请求不成功，出现某种问题，需要处理")
                } else if (res.data.res == 0) {
                    // console.log("服务器返回请求成功")
                    let showdata = res.data.data || [];
                    if (showdata.length == 0) {
                        this.setData({
                            hasMore: false,
                            page,
                        })
                    } else {
                        this.setData({
                            showdata: this.data.showdata.concat(showdata),
                            hasMore: showdata.length == this.data.size,
                            page,
                        })
                        let tmpshowdata = this.data.showdata;
                        for (let i = 18 * total; i < this.data.showdata.length; i++) {
                            if (this.data.showdata[i].locked === 'yes') {
                                let a = this.newurl(this.data.showdata[i].image);
                                tmpshowdata[i].image = a;
                            }
                        }
                        this.setData({
                            showdata: tmpshowdata,
                        });

                        let tmpimglist = [];
                        let j = 0;
                        for (let i = 0; i < this.data.showdata.length; i++) {
                            if (this.data.showdata[i].locked === 'no') {
                                var head = "http://www.bizspace.cn:8690";
                                let a = this.data.showdata[i].image;;
                                tmpimglist[j] = head + a;
                                j++;
                            }
                        }
                        this.setData({
                            imglist: tmpimglist
                        });
                        console.log(this.data.showdata)
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.fetchList(0) //加载第0页数据
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})