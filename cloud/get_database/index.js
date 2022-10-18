// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: 'dayu2001-cloud-0gryg11k1dbc3ebb' }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    console.log(event.filename);
    const wxContext = cloud.getWXContext()
    if(event.type == 0) {
        //增序返回所有学生
        return await db.collection('namelist').where({
            filename : _.eq(event.filename)
        }).orderBy('student_ID', 'asc').limit(500).get();
    } else if(event.type == 1) {
        console.log(event.student_ID);
        console.log(event.name);
        console.log(event.state);
        //修改对应学生的状态
        return await db.collection('namelist').where({
            filename : _.eq(event.filename),
            student_ID : _.eq(event.student_ID),
            name : _.eq(event.name)
        }).update({
            data : {
                state : event.state
            }
        });
    } else {
        //增序查询对应状态的所有学生
        return await db.collection('namelist').where({
            filename : _.eq(event.filename),
            state : _.eq(event.state)
        }).orderBy('student_ID', 'asc').limit(500).get();
    }
}
