var util = require('../../utils/util.js');
var file = require('../../utils/file.js');

const app = getApp()
Page({
    data: {
        // 页面下标
        currentIndex: 0,
        // 节数
        multiArray: [
            ['第一节', '第二节', '第三节', '第四节', '第五节', '第六节', '第七节', '第八节', '第九节', '第十节'],
            ['第一节', '第二节', '第三节', '第四节', '第五节', '第六节', '第七节', '第八节', '第九节', '第十节'],
        ],
        // 节数数组下标
        multiIndex: [0, 0],

        // 预览名单
        previewData: null,

        // 是否填完课程数据（取反值）
        complete: true,

        // 课程数据
        course: '',
        teacher: '',
        date: '',
        weekday: '',
        start: '',
        end: '',
        uploaded: false,
        all_spot: false,
    },

    // 加载页面
    onLoad() {
        var DATE = new Date();
        var TIME = util.formatDate(DATE);
        var WEEKDAY = util.formatWeekday(DATE);
        this.setData({
            date: TIME,
            weekday: WEEKDAY
        });
    },

    // 切换swiper-item触发bindchange事件
    pagechange: function (e) {
        // 通过touch判断，改变tab的下标值
        if ('touch' === e.detail.source) {
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
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    getStartEnd: function (e) {
        // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
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
        this.setData(data);
        this.setData({
            start: data.multiArray[0][data.multiIndex[0]],
            end: data.multiArray[1][data.multiIndex[1]],
        });
    },

    // 跳转至点名页面
    gotocard: function (e) {
        app.globalData.course = this.data.course;
        app.globalData.teacher = this.data.teacher;
        app.globalData.date = this.data.date;
        app.globalData.weekday = this.data.weekday;
        app.globalData.start = this.data.start;
        app.globalData.end = this.data.end;
        wx.navigateTo({
            url: '/pages/card/card',
        })
    },

    // 上传 excel 文件
    add_excel_file: function (e) {
        var that = this;
        file.add_excel_file().then(res => {
            that.setData({
                previewData : app.globalData.array,
                uploaded : true,
            });
            that.checkStartButton();
        });
    },
    // 生成预览名单
    // generate_list: function (e) {
        // var that = this;
        // file.generate_list();
        // var app = getApp();
        // that.setData({
        //     previewData: app.globalData.array
        // });
    // },

    checkStartButton: function () {
        if(this.data.course.length == 0) {
            this.setData({complete: true});
            return;
        }
        if(this.data.teacher.length == 0) {
            this.setData({complete: true});
            return;
        }
        if(this.data.uploaded == false) {
            this.setData({complete: true});
            return;
        }
        this.setData({complete: false});
        return;
    },
    getCourse: function (e) {
        this.setData({
            course: e.detail.value
        });
        this.checkStartButton();
    },
    getTeacher: function (e) {
        this.setData({
            teacher: e.detail.value
        });
        this.checkStartButton();
    },
    switch1Change: function (e) {
        this.setData({
            all_spot: e.detail.value
        });
    }
})