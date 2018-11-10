// pages/detali/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    imgList: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      name: options.name,
      imgList: options.imgList
    })
  },
  download () {
    var that = this
    wx.downloadFile({
      url: that.data.imgList,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
          }
        })
      }
    })
  }
})