// components/search/search.js
let keyword = ''
Component({
  properties: {
    placeholder: {
      type: String,
      value: '请输入关键字'
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: ''
  },

  methods: {
    onInput(event) {
      keyword = event.detail.value
    },
    onFocus() {
      this.setData({
        inputValue: ''
      })
    },
    onSearch() {
      this.triggerEvent('search', {
        keyword
      })
    }
  },
})