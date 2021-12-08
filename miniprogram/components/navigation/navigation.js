// components/navigation.js
const statusBarHeight = getApp().globalData.statusBarHeight
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '云音乐'
    },
    showIcon: {
      type: Boolean,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: statusBarHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
