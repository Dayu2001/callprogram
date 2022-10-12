var util = require('../../utils/util.js');

const app = getApp()
Page({
    data: {
        currentIndex: 0, //默认是活动项

        time: '',

        multiArray: [
            ['第一节', '第二节', '第三节', '第四节', '第五节', '第六节', '第七节', '第八节', '第九节', '第十节'],
            ['第一节', '第二节', '第三节', '第四节', '第五节', '第六节', '第七节', '第八节', '第九节', '第十节'],
        ],
        multiIndex: [0, 0],
    },

    onLoad() {
        var TIME = util.formatDate(new Date());
        this.setData({
            time: TIME,
        });
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

    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function (e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.multiIndex[0]) {
                    case 0:
                        data.multiArray[1] = ['第一节', '第二节', '第三节', '第四节', '第五节', '第六节', '第七节', '第八节', '第九节', '第十节'];
                        break;
                    case 1:
                        data.multiArray[1] = ['第二节', '第三节', '第四节', '第五节', '第六节', '第七节', '第八节', '第九节', '第十节'];
                        break;
                    case 2:
                        data.multiArray[1] = ['第三节', '第四节', '第五节', '第六节', '第七节', '第八节', '第九节', '第十节'];
                        break;
                    case 3:
                        data.multiArray[1] = ['第四节', '第五节', '第六节', '第七节', '第八节', '第九节', '第十节'];
                        break;
                    case 4:
                        data.multiArray[1] = ['第五节', '第六节', '第七节', '第八节', '第九节', '第十节'];
                        break;
                    case 5:
                        data.multiArray[1] = ['第六节', '第七节', '第八节', '第九节', '第十节'];
                        break;
                    case 6:
                        data.multiArray[1] = ['第七节', '第八节', '第九节', '第十节'];
                        break;
                    case 7:
                        data.multiArray[1] = ['第八节', '第九节', '第十节'];
                        break;
                    case 8:
                        data.multiArray[1] = ['第九节', '第十节'];
                        break;
                    case 9:
                        data.multiArray[1] = ['第十节'];
                        break;
                }
                data.multiIndex[1] = 0;
                break;
        }
        console.log(data.multiIndex);
        this.setData(data);
    },
})