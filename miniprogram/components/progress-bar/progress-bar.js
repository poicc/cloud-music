// components/progress-bar/progress-bar.js
let movableAreaWidth = 0//可移动区域的宽度
let movableViewWidth = 0//可移动元素的宽度
let duration = 0//歌曲总时长
let currentSec = -1//当前的秒数
const  backgroundAudioManager = wx.getBackgroundAudioManager()
let isMoving = false//表示是否拖拽
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime:{
      currentTime: '00:00',
      totalTime: '00:00'
    },
    distance: 0,
    progress: 0
  },
  lifetimes:{
    ready(){
      this._bindBGMEvent()
      this._getDistance()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //滑动视图对象发生改变
    onChange(event){
      console.log(event)
      //判定事件源（引起滑动变化原因有自身和拖动两种）
      if(event.detail.source == 'touch'){
        //根据当前位置计算百分比
        this.data.progress = event.detail.x / (movableAreaWidth - movableViewWidth) * 100
        this.data.distance = event.detail.x
        isMoving = true
        console.log('change' , isMoving)
      }
    },
    onTouchEnd(){
      const currentTimeFmt = this._timeFormat(Math.floor(backgroundAudioManager.currentTime))
      this.setData({
        progress: this.data.progress,
        distance: this.data.distance,
        ['showTime.currentTime']: currentTimeFmt.min + ":" + currentTimeFmt.sec
      })
      //定位歌曲播放位置
      backgroundAudioManager.seek(duration * this.data.progress / 100)
      isMoving = false
      console.log('end' , isMoving)
    },
    _getDistance(){
      const query = this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec((rect) => {
        console.log(rect)
        movableAreaWidth = rect[0].width
        movableViewWidth = rect[1].width
      })
    },
    _bindBGMEvent(){
      backgroundAudioManager.onPlay(() => {
        console.log('onplay')
      })
      backgroundAudioManager.onStop(() => {
        console.log('onStop')
      })
      backgroundAudioManager.onPause(() => {
        console.log('onPause')
      })
      backgroundAudioManager.onWaiting(() => {
        console.log('onWaiting')
      })
      backgroundAudioManager.onCanplay(() => {
        console.log('onCanplay')
        console.log(`歌曲总时长：${backgroundAudioManager.duration}`)
        let duration = backgroundAudioManager.duration
        if(typeof duration != 'undefined'){
          //设置总时长
          this._setTotalTime()
        }
        else{
          setTimeout(() => {
            console.log(`歌曲总时长：${backgroundAudioManager.duration}`)
            this._setTotalTime()
          },1000)
        }
      })
      backgroundAudioManager.onTimeUpdate(() => {
        //console.log('onTimeUpdate')
        if(!isMoving){
          const duration = backgroundAudioManager.duration
        const currentTime = backgroundAudioManager.currentTime
        const sec = currentTime.toString().split('.')[0]
        if(sec != currentSec){
          console.log(currentTime)
        const currentTimeFmt = this._timeFormat(currentTime)
        this.setData({
          distance: (movableAreaWidth - movableViewWidth) * currentTime / duration,
          progress : currentTime / duration * 100,
          ['showTime.currentTime'] : `${currentTimeFmt.min}:${currentTimeFmt.sec}`
        })
          currentSec = sec
          //联动歌词
          this.triggerEvent('timeUpdate', {
            currentTime
          })
        }
        }
      })
      backgroundAudioManager.onEnded(() => {
        console.log('onEnded')
        this.triggerEvent('musicEnd')
      })
      backgroundAudioManager.onError((res) => {
        console.log('onError')
        wx.showToast({
          title: '发生错误' + res.errMsg,
        })
      })
    },
    _setTotalTime(){
      duration = backgroundAudioManager.duration
      const durationFmt = this._timeFormat(duration)
      this.setData({
        ['showTime.totalTime'] : `${durationFmt.min}:${durationFmt.sec}`
      })
      console.log(durationFmt.min,durationFmt.sec)
    },
    _timeFormat(second){
      const min = Math.floor(second / 60)
      const sec = Math.floor(second % 60)
      return {
        'min': this._fillZero(min),
        'sec': this._fillZero(sec),
      }
    },
    _fillZero(num){
      return num < 10 ? '0' + num : num
    }
  }
})
