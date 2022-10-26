var addfile = false;
var filename = "fuck";
const add_excel_file = () => {
    return new Promise((resolve, reject) => {
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
                        analysis(res).then(res => {
                            resolve(res);
                        })
                    })
                }
                else {
                    wx.showToast({
                        title: '请检查文件',
                        icon: 'error',
                        duration: 1000
                    })
                    reject(res);
                }
            }
        })
    })
}
const analysis = fileID => {
    return new Promise((resolve, reject) => {
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
                    wx.showLoading({
                        title: '加载中',
                    })
                    generate_list().then(res => {
                        wx.showToast({
                            title: '完成',
                            icon: 'success',
                            duration: 1000
                        })
                        resolve(res);
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
                reject(res);
            }
        })
    })
}
const generate_list = () => {
    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: "get_database",
            data: {
                filename: filename,
                type: 0
            },
            success: res => {
                console.log(res);
                var app = getApp();
                app.globalData.array = res.result.data;
                app.globalData.total = res.result.data.length;
                resolve(res);
            },
            fail: err => {
                console.log(err);
                reject(err);
            }
        })
    })
}

const uploadfile = (tempFile) => {
    // console.log("要上传文件的临时路径", tempFile)
    return new Promise((resolve, reject) => {
        let timestamp = (new Date()).valueOf()
        var app = getApp();
        app.globalData.filename = timestamp;
        filename = timestamp;
        // console.log(filename);
        wx.cloud.init();
        wx.cloud.uploadFile({
            cloudPath: + timestamp + '.xls', //云存储的路径，开发者自定义
            filePath: tempFile, // 文件路径
        }).then(res => {
            console.log("上传成功", res)
            app.globalData.fileID = res.fileID;
            // console.log(app.globalData.fileID);
            resolve(res.fileID)
        })
    })
}

var callnext = () => {
    var app = getApp();
    if (app.globalData.currentId == app.globalData.total - 1) {
        return false;
    } else {
        app.globalData.currentId++;
        return true;
    }
}
var setCurrentId = (_id) => {
    var app = getApp();
    app.globalData.currentId = _id;
}


const revoke = () => {
    var app = getApp();
    if (app.globalData.currentId == 0) {
        return false;
    } else {
        app.globalData.currentId--;
        return true;
    }
}

const updatestate = (state) => {
    var app = getApp();
    var currentId = app.globalData.currentId;
    var student_ID = app.globalData.array[currentId].student_ID;
    var name = app.globalData.array[currentId].name;
    app.globalData.array[currentId].state = state;
    wx.cloud.callFunction({
        name: "get_database",
        data: {
            filename: filename,
            type: 1,
            student_ID: student_ID,
            name: name,
            state: state
        },
        success: res => {
            console.log(res);
        },
        fail: err => {
            console.log(err);
        }
    })
}

module.exports = {
    add_excel_file,
    analysis,
    generate_list,
    uploadfile,
    callnext,
    setCurrentId,
    revoke,
    updatestate
}