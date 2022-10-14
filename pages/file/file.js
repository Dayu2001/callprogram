var addfile = false;
var filename = "fuck";
Page({
    data: {
        array: [],
    },
    add_excel_file() {
        var that = this;
        wx.chooseMessageFile({
            count: 1,
            type: 'file',
            success(res) {
                wx.showLoading({
                    title: '上传中',
                })
                console.log(res);
                const path = res.tempFiles[0].path;
                var suffix = path.split('.').pop().toLowerCase();
                // console.log(suffix);
                if (suffix == "xlsx" || suffix == "xls") {
                    uploadfile(path).then(res => {
                        wx.showLoading({
                            title: '解析中',
                        })
                        that.analysis(res)//将文件id传到解析方法
                    })
                }
                else {
                    wx.showToast({
                        title: '请检查文件',
                        icon: 'error',
                        duration: 1000
                    })
                }
            }
        })
    },
    analysis(fileID) {
        wx.cloud.callFunction({
            name: "analysis_excel",
            data: {
                filename: filename,
                fileID: fileID,
            },
            success: res => {
                wx.hideLoading()
                console.log('解析成功', res);
                if (res.result == "error") {
                    wx.showToast({
                        title: '错误',
                        icon: 'error',
                        duration: 1000
                    })
                }
                else {
                    addfile = true;
                    wx.showToast({
                        title: '完成',
                        icon: 'success',
                        duration: 1000
                    })
                }
            },
            fail: err => {
                wx.hideLoading()
                console.log('解析失败', err);
                wx.showToast({
                    title: '错误',
                    icon: 'error',
                    duration: 1000
                })
            }
        })
    },
    generate_list() {
        if (!addfile) {
            wx.showToast({
                title: '请先上传文件',
                icon: 'error',
                duration: 1000
            })
        }
        else {
            wx.cloud.callFunction({
                name: "get_database",
                data: {
                    filename: filename
                },
                success: res => {
                    console.log(res);
                    this.setData({
                        array: res.result.data,
                    });
                },
                fail: err => {
                    console.log(err);
                }
            })
        }
    }
})
const uploadfile = (tempFile) => {
    // console.log("要上传文件的临时路径", tempFile)
    return new Promise((resolve, reject) => {
        let timestamp = (new Date()).valueOf()
        filename = timestamp;
        // console.log(filename);
        wx.cloud.init();
        wx.cloud.uploadFile({
            cloudPath: +timestamp + '.xls', //云存储的路径，开发者自定义
            filePath: tempFile, // 文件路径
        }).then(res => {
            console.log("上传成功", res)
            resolve(res.fileID)
        })
    })
}
exports.uploadfile = uploadfile;