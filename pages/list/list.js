// pages/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    curNav: '欧美',
    listImg: [],
    showImg: []
  },
  getList: function () {
    const that = this
    wx.request({
      url: 'http://route.showapi.com/126-1?showapi_appid=' + app.globalData.showapi_appid + '&showapi_sign=' + app.globalData.showapi_sign,
      success: function (res) {
        console.log(res.data.showapi_res_body.allTypeList)
        that.setData({
          list: res.data.showapi_res_body.allTypeList
        })
      }
    })
  },
  getmsg () {
    const that = this
    // console.log(that)
    wx.request({
      url: 'https://route.showapi.com/126-2?showapi_appid=' + app.globalData.showapi_appid + '&showapi_sign=' + app.globalData.showapi_sign,
      data: {
        type: that.data.curNav,
        page: 1
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.showapi_res_body.pagebean.contentlist)
        that.setData({
          listImg: res.data.showapi_res_body.pagebean.contentlist
        })
      }
    })
  },
  showImg (e) {
    var that = this
    this.setData({
      showImg: e.currentTarget.dataset.index
    })
    console.log(this.data.showImg)
    wx.navigateTo({
      url: '../img/img?showImg=' + JSON.stringify(that.data.showImg) ,
    })
  },
  giveinfo: function (e) {
    console.log(e.target.dataset.type)
    this.setData({
      curNav: e.target.dataset.type
    })
    this.getmsg()
  },
  onReady: function () {
    this.getList()
    this.getmsg()
  },
})