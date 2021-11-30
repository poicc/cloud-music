// pages/music/music.js
const MAX_LIMIT = 15
const db = wx.cloud.database()
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
    playlist: []
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
      console.log(res.result.data)
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