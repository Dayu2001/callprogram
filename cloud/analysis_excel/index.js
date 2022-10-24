// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: 'dayu2001-cloud-0gryg11k1dbc3ebb' }) // 使用当前云环境

//引入node-xlsx文件
var xlsx = require('node-xlsx');
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    console.log("filename : " + event.filename);
    let fileID = event.fileID;
    let filename = event.filename;
    //通过fileID下载云存储里的excel文件
    const res = await cloud.downloadFile({
        fileID: fileID,
    })
    console.log('下载的文件', res);
    const file_xlsx = res.fileContent
    //解析excel文件
    var files = xlsx.parse(file_xlsx); //获取到已经解析的对象数组
    var arr = files[0].data;
    console.log('获得内容表格数组', arr);
    var row = 0;
    // console.log(arr[row][0].length + " " + arr[row][0][0]);
    function judgeID(s) {
        var len = s.length;
        if(len == 0) return false;
        var flag = true;
        for(var i = 0; i < arr[row][0].length; ++i)
            if(!(s[i] >= '0' && s[i] <= '9'))
                flag = false;
        return flag;
    }
    while (row <= arr.length) {
        if(arr[row].length == 0) {
            row++;
            continue ;
        }
        if(judgeID(arr[row][0])) break;
        row++;
    }
    // console.log("数据从第" + row + "行开始");
    if(row == arr.length) {
        return "error";
        //返回错误
    }
    // var namelist = "namelist" + filename;
    // console.log("namelist = " + namelist);
    while(row <= arr.length && arr[row].length > 0 && judgeID(arr[row][0])) {
        var _student_ID = arr[row][0].toString();
        while(_student_ID.length < 9) _student_ID = '0' + _student_ID;
        var _name = arr[row][1];
        // console.log(_student_ID + " " + _name);
        db.collection("namelist").add({
            data: {
                student_ID: _student_ID,
                name: _name,
                filename : filename,
                state : "present"
            }
        })
        row++;
    }
    console.log("数据上传完成");
    console.log(fileID);
    cloud.deleteFile({
        fileList: [fileID],
        success(res) {
            console.log(res, '文件删除成功')
        },
        fail(res) {
            console.log(res, "文件删除失败")
        }
    })
    return "success";
}