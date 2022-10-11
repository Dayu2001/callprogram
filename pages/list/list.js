const app = getApp()
Page({
    data: {
        currentIndex: 0, //默认是活动项
    },
    // 切换swiper-item触发bindchange事件
    pagechange: function (e) {
        // 通过touch判断，改变tab的下标值
        if ("touch" === e.detail.source) {
            this.setData({
                currentIndex: e.detail.current
            });
        }
    },

    //点击tab时触发
    titleClick: function (e) {
        this.setData({
            //拿到当前索引并动态改变
            currentIndex: e.currentTarget.dataset.idx
        })
    },
})