// pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [{
        url: 'http://p1.music.126.net/72KFbEzNPAwDxV1EckpMEQ==/109951166667501081.jpg?imageView&quality=89',
      },
      {
        url: 'http://p1.music.126.net/eFto0ACPHc6gyogkXkJ6oA==/109951166668878792.jpg?imageView&quality=89',
      },
      {
        url: 'http://p1.music.126.net/6V4blmbLDnrWpsI6i_D9QQ==/109951166668882359.jpg?imageView&quality=89',
      },
      {
        url: 'http://p1.music.126.net/Ph4yK5nJsLdtcnf1zH0OMg==/109951166668904291.jpg?imageView&quality=89',
      },
      {
        url: 'http://p1.music.126.net/XAW6RujGixc04e1RP6aRlA==/109951166668892761.jpg?imageView&quality=89',
      },
      {
        url: 'http://p1.music.126.net/Ta2wQAe6TeRFlI2hq5r5tQ==/109951166667529716.jpg?imageView&quality=89',
      },
      {
        url: 'http://p1.music.126.net/BiMUwPTijevJHyv3rOX7zg==/109951166668908828.jpg?imageView&quality=89',
      },
      {
        url: 'http://p1.music.126.net/I52H0XVcJ0-5QmGdVNajpg==/109951166668920301.jpg?imageView&quality=89',
      },
      {
        url: 'http://p1.music.126.net/uA8evtLAx5P9KaHQA1-prg==/109951166669667491.jpg?imageView&quality=89',
      },
      {
        url: 'http://p1.music.126.net/fKiabCo-mg0Uf6nExhzDVw==/109951166667567149.jpg?imageView&quality=89',
      },
    ],
    playlist: [{
        "id": "1001",
        "playCount": 1.4641238e+06,
        "name": "来自乐队的炙热|你的冬日取暖指南",
        "coverImgUrl": "http://p3.music.126.net/lOGNhEuFf_Vbh79igUuigw==/109951166632604474.jpg?param=200y200",
      },
      {
        "id": "1002",
        "playCount": 1985,
        "name": "1000首华语乐坛神仙打架8090后经典老歌",
        "coverImgUrl": "http://p3.music.126.net/S4yl2kffKYOGxXNvLkQlRQ==/109951164186039790.jpg?param=200y200"
      },
      {
        "id": "1003",
        "playCount": 622822.6,
        "name": "Dream Pop丨弥漫在云端的七色彩虹",
        "coverImgUrl": "http://p4.music.126.net/Q2X1WwxQkzHb1EmqNpZuvA==/109951164393546660.jpg?param=200y200"
      },
      {
        "id": "1004",
        "playCount": 115624,
        "name": "【旋律控】超级好听的欧美良曲",
        "coverImgUrl": "http://p4.music.126.net/2MsstS-M9w5-li0aRy3sUQ==/1380986606815861.jpg?param=200y200"
      },
      {
        "id": "1005",
        "playCount": 495154,
        "name": "[公路之歌] 在路上 你需要一首公路之歌",
        "coverImgUrl": "http://p3.music.126.net/Jjl0eotC4wYw8I4haEugIA==/109951166035817995.jpg?param=200y200"
      },
      {
        "id": "1006",
        "playCount": 510215,
        "name": "[朋克摇滚] 简单直接的原始呐喊",
        "coverImgUrl": "http://p3.music.126.net/YM-e7-YiytdERwOvCXxvQg==/109951165623853769.jpg?param=200y200"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPlatList()
  },
  _getPlatList() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        start: this.data.playlist.length,
        count: MAX_LIMIT,
        $url: 'playlist',
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        playlist: this.data.playlist.concat(res.result.data)
      })
      wx.stopPullDownRefresh()
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      playlist: []
    })
    this._getPlaylist()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getPlaylist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})