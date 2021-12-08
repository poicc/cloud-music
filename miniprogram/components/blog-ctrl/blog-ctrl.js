// components/blog-ctrl/blog-ctrl.js
let userInfo = {}

const db = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId: String,
    blog: Object,
  },

  options: {
    styleIsolation: 'apply-shared'
  },

  /**
   * 组件的初始数据
   */
  data: {
    loginShow: false,
    modalShow: false,
    content: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(e) {
      this.setData({
        content: e.detail.value
      })
    },
    onComment() {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: (res) => {
                userInfo = res.userInfo
                this.setData({
                  modalShow: true,
                })
              }
            })
          } else {
            this.setData({
              loginShow: true
            })
          }
        }
      })
    },
    onLoginSuccess(e) {
      userInfo = e.detail
      this.setData({
        loginShow: false
      }), () => {
        this.setData({
          modalShow: true
        })
      }
    },
    onLoginFail() {
      wx.showModal({
        title: '授权用户才能评价',
        content: ''
      })
    },
    onSend() {
      let content = this.data.content
      console.log(content)
      if (content.trim() == '') {
        wx.showModal({
          title: '评论内容不能为空',
          content: ''
        })
        return
      }
      wx.showLoading({
        title: '评论中',
        mask: true
      })
      console.log('id')
      console.log(this.properties)
      console.log('id')
      db.collection('blog-comment').add({
        data: {
          content,
          createTime: db.serverDate(),
          blogId: this.properties.blogId,
          nickName: userInfo.nickName,
          avatarUrl: 'https://cdn.jsdelivr.net/gh/1802343228/image@main/avatar.3sylmzwhoqi0.png'
        }
      }).then((res) => {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '评论成功',
        })
        this.setData({
          modalShow: false,
          content: ''
        })
        this.triggerEvent('refreshCommentList')
      })
    },
  }
})