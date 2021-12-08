// components/blog-card/blog-card.js
// import formatTime from '../../utils/formatTime.js'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blog: {
      type: Object
    }
  },

  observers: {
    ['blog.createTime'](val) {
      if(val) {
        //concole.log(val)
        this.setData({
          _createTime: app.globalData.formatTime(new Date(val))
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    _createTime: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPreviewImage(event) {
      const ds = event.target.dataset
      wx.previewImage({
        urls: ds.imgs,
        current: ds.imgsrc,
      })
    },
  }
})
