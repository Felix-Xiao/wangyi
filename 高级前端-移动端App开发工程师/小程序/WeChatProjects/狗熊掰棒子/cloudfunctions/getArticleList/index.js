'use strict';
const cloud = require('wx-server-sdk')
// const db = wx.cloud.database();
// cloud.init();
// exports.main = async (event, context, callback) => {
//   const ArticleList = db.collection('ArticleList');
//   // db.collection('ArticleList').limit(4).get({
//   //   success: res => {
//   //     console.log(res);
//   //     this.setData({
//   //       "ArticleList": res.data
//   //     })
//   //   }
//   // })
//   const res = ArticleList.doc('61795c245e721c4700006b3e207a3f05');
//   return {
//     doc: res
//   };
// };
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection("ArticleList").get();
}