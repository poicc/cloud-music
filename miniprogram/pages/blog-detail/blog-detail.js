const app = getApp()
Page({
  data: {
    blog: {}, //博客对象
    commentList: [], //博客的评论列表
    blogId: '', // 博客id
    statusBarHeight: app.globalData.statusBarHeight,
  },
  onLoad: function (options) {
    console.log(this.data.statusBarHeight);
    console.log(options);
    this.setData({
      blogId: options.blogId
    })
    this._getBlogDetail()
  },
  _getBlogDetail() {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    //请求云函数博客详情数据
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        blogId: this.data.blogId,
        $url: 'detail',
      }
    }).then((res) => {
      //取出博客对象
      const blog = res.result.list[0]
      let commentList = blog.commentList
      //格式化每条评论的时间
      for (let i = 0, len = commentList.length; i < len;i++) {
        commentList[i].createTime = app.globalData.formatTime(new Date(commentList[i].createTime))
      }
      this.setData({
        commentList,
        blog,
      })
      wx.hideLoading()
    })
  }
})