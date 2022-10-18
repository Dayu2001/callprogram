// pages/rollcallcard/card.js
var file = require('../../utils/file.js');
Page({
    data: {
        vertIndex: 1,
        horiIndex: 1,
        operationName: '',
        student_ID : "000000001",
        name : "张三",
    },
    onLoad() {
        this._load();
        // console.log(this.data.vertIndex, this.data.horiIndex);
    },
    vertPageChange: function (e) {
        if('touch' == e.detail.source) {
            if(e.detail.current == 0) {
                file.revoke();
                // this.setData({
                //     operationName: 'revoke'
                // });
            }
            else if(e.detail.current == 2) {
                file.updatestate("present");
                // this.setData({
                //     operationName: 'present'
                // });
            }
            console.log(this.data.operationName);
            this.setData({
                vertIndex: 1,
            });
            this._load();
        }
    },
    horiPageChange: function (e) {
        if('touch' == e.detail.source) {
            if(e.detail.current == 0) {
                file.updatestate("cut");
                // this.setData({
                //     operationName: 'cut'
                // });
            }
            else if(e.detail.current == 2) {
                file.updatestate("leave");
                // this.setData({
                //     operationName: 'leave'
                // });
            }
            console.log(this.data.operationName);
            this.setData({
                horiIndex: 1,
            });
            this._load();
        }
    },
    _load: function(e) {
        var app = getApp();
        this.setData({
            student_ID : app.globalData.array[app.globalData.currentId].student_ID,
            name : app.globalData.array[app.globalData.currentId].name,
        })
    },
})