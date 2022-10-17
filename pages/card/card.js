// pages/rollcallcard/card.js
Page({
    data: {
        vertIndex: 1,
        horiIndex: 1,
        operationName: '',
    },
    onLoad() {
        // console.log(this.data.vertIndex, this.data.horiIndex);
    },
    vertPageChange: function (e) {
        if('touch' == e.detail.source) {
            if(e.detail.current == 0) {
                this.setData({
                    operationName: 'revoke'
                });
            }
            else if(e.detail.current == 2) {
                this.setData({
                    operationName: 'present'
                });
            }
            console.log(this.data.operationName);
            this.setData({
                vertIndex: 1
            });
        }
    },
    horiPageChange: function (e) {
        if('touch' == e.detail.source) {
            if(e.detail.current == 0) {
                this.setData({
                    operationName: 'cut'
                });
            }
            else if(e.detail.current == 2) {
                this.setData({
                    operationName: 'leave'
                });
            }
            console.log(this.data.operationName);
            this.setData({
                horiIndex: 1
            });
        }
    },
})