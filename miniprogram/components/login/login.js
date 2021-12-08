// components/login/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalShow: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo() {
      wx.getUserProfile({
        desc: '用于展示用户信息',
        success: (res) => {
          this.setData({
            modalShow: false
          })
          this.triggerEvent('loginsuccess', res.userInfo)
        },
        fail: (res) => {
          this.triggerEvent('loginfail')
        }
      })
    }
  }
})