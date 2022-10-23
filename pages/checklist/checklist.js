// pages/checklist/checklist.js
var file = require('../../utils/file.js');

const app = getApp()

Page({
    data: {
        previewData: null,
        mark: [
            {value: 'present', name: '点到'},
            {value: 'cut', name: '旷课'},
            {value: 'leave', name: '请假'},
        ]
    },
    onLoad () {
        var that = this;
        file.generate_list().then(res => {
            that.setData({
                previewData : app.globalData.array,
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
        for(let i = 0, len = items.length; i < len; i++) {
            items[i].checked = items[i].value === e.detail.value;
            if(items[i].checked == true) {
                file.updatestate(items[i].value);
                console.log("global: " + app.globalData.array[id].state);
                console.log("preview: " + this.data.previewData[id].state);
            }
        }
        this.setData({
            items
        });
    }
})