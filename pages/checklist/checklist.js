// pages/checklist/checklist.js

var file = require('../../utils/file.js');

const app = getApp()

Page({
    data: {
        previewData: null,
        mark: [
            { value: 'present', name: '点到' },
            { value: 'cut', name: '旷课' },
            { value: 'leave', name: '请假' },
        ]
    },
    onLoad() {
        var that = this;
        file.generate_list().then(res => {
            that.setData({
                previewData: app.globalData.array,
            });
        });
        console.log(app.globalData.course);
        console.log(app.globalData.teacher);
        console.log(app.globalData.date);
        console.log(app.globalData.weekday);
        console.log(app.globalData.start);
        console.log(app.globalData.end);

        // console.log(previewData);
    },
    radioChange: function (e) {
        const items = this.data.mark;
        var id = e.currentTarget.id;
        file.setCurrentId(id);
        for (let i = 0, len = items.length; i < len; i++) {
            items[i].checked = items[i].value === e.detail.value;
            if (items[i].checked == true) {
                file.updatestate(items[i].value);
                console.log("global: " + app.globalData.array[id].state);
                console.log("preview: " + this.data.previewData[id].state);
            }
        }
        this.setData({
            items
        });
    },
    // 下载 excel 文件
    load_excel_file: function (e) {
        var app = getApp();
        // console.log(app.globalData.fileID);
        wx.showLoading({
            title: '加载中',
        })
        wx.cloud.callFunction({
            name : "generate_excel",
            data : {
                filename : app.globalData.filename,
                fileID : app.globalData.fileID,
                course : app.globalData.course,
                teacher : app.globalData.teacher,
                date : app.globalData.date,
                weekday : app.globalData.weekday,
                start : app.globalData.start,
                end : app.globalData.end
            },
            success(res) {
                console.log(res);
                wx.cloud.downloadFile({
                    fileID: res.result.fileID,
                    success(res) {
                        wx.hideLoading(),
                        wx.openDocument({
                            filePath: res.tempFilePath,
                            showMenu: true,
                            success: function (res) {
                                console.log(res);
                            }
                        })
                    },
                    fail(res) {
                        console.log(res);
                    }
                })
            }
        })
        
    },
})