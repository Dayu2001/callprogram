// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: 'dayu2001-cloud-0gryg11k1dbc3ebb' }) // 使用当前云环境

const xlsx = require('node-xlsx')    //导入Excel类库
const db = cloud.database()   //声明数据库对象
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    let call_information = await db.collection('namelist').where({
        filename: _.eq(event.filename),
        state: _.neq("present")
    }).orderBy('state', 'asc').orderBy('student_ID', 'asc').limit(500).get();
    let cloudPath = event.fileID;
    var allData = [];
    var arr = [];
    arr = ["课程名称", event.course];
    allData.push(arr);
    arr = ["任课老师", event.teacher];
    allData.push(arr);
    arr = ["日期", event.date];
    allData.push(arr);
    arr = [event.weekday + ":" + event.start + "-" + event.end];
    allData.push(arr);
    arr = ["学号", "姓名", "状态"];
    allData.push(arr);
    for(let i = 0; i < call_information.data.length; ++i) {
        arr = [];
        arr.push(call_information.data[i].student_ID);
        arr.push(call_information.data[i].name);
        if(call_information.data[i].state == "cut") arr.push("旷课");
        else arr.push("请假");
        allData.push(arr);
    }
    console.log(allData);
    var buffer = await xlsx.build([{
        name : event.filename.toString(),
        data : allData
    }]);
    console.log(cloudPath);
    // cloud.deleteFile({
    //     fileList: [cloudPath],
    //     success(res) {
    //         console.log(res, '文件删除成功')
    //     },
    //     fail(res) {
    //         console.log(res, "文件删除失败")
    //     }
    // })
    return await cloud.uploadFile({
        cloudPath : event.filename + ".xlsx",
        fileContent : buffer
    })
}