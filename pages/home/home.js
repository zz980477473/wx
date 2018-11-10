// pages/home/home.js
const app = getApp()
Page({
  data: {
    list: [],
    page: 1,
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.getMsg()
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh(); 
  },
  getMsg: function () {
    var that = this
    this.setData({
      page: 1
    })
    wx.request({
      url: 'https://route.showapi.com/126-2?showapi_appid=' + app.globalData.showapi_appid + '&showapi_sign=' + app.globalData.showapi_sign,
      data: {
        page: 1
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.showapi_res_body.pagebean.contentlist)
        that.setData({
          list: res.data.showapi_res_body.pagebean.contentlist
        })
      }
    })
  },
  onReachBottom: function () {
    wx.showLoading({
      title: '玩命加载中',
    })
    var that = this
    this.setData({
      page: that.data.page + 1
    })
    wx.request({
      url: 'https://route.showapi.com/126-2?showapi_appid=' + app.globalData.showapi_appid + '&showapi_sign=' + app.globalData.showapi_sign,
      data: {
        page: that.data.page
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          list: that.data.list.concat(res.data.showapi_res_body.pagebean.contentlist)
        })
        wx.hideLoading();
      }
    })
  },
  onReady: function () {
    this.getMsg()
  }
})