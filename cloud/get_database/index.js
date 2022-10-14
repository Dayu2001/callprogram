// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: 'dayu2001-cloud-0gryg11k1dbc3ebb' }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    console.log(event.filename);
    const wxContext = cloud.getWXContext()
    return await db.collection('namelist').where({
        filename : _.eq(event.filename)
    }).orderBy('student_ID', 'asc').limit(500).get()
}
