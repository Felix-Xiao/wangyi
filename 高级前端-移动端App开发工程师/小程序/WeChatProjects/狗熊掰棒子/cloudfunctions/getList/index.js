'use strict';
exports.main = (event, context, callback) => {
  console.log(event);
  let result = [{
    title: "文章1",
    description: "文章1描述",
    createTime: "文章1创建时间",
    viewCount: "文章1观看数量"
  },
  {
    title: "文章2",
    description: "文章2描述",
    createTime: "文章2创建时间",
    viewCount: "文章2观看数量"
  },
  {
    title: "文章3",
    description: "文章3描述",
    createTime: "文章3创建时间",
    viewCount: "文章3观看数量"
  }, {
    title: "文章4",
    description: "文章4描述",
    createTime: "文章4创建时间",
    viewCount: "文章4观看数量"
  }, {
    title: "文章5",
    description: "文章5描述",
    createTime: "文章5创建时间",
    viewCount: "文章5观看数量"
  }];

  return result;
};