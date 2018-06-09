// pages/server_form/index.js
const Toptips = require("../../utils/zanui/toptips/index")
const utils = require("../../utils/util.js")
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 添加按钮
   */

  add: function (e) {
    var address = e.detail.value.address
    var password = e.detail.value.password
    var remark = e.detail.value.remark
    if (!address | !password | !remark) {
      Toptips({
        content: "服务器信息需填写完整"
      })
      return
    }
    // if (!utils.validateIPAddress(address)) {
    //   Toptips({
    //     content: "无效地址"
    //   })
    //   return
    // }
    wx.request({
      url: app.globalData.requestDomain + '/auth',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      data: {
        address: address,
        password: password
      },
      success: (res) => {
        if (res.data.status === "success") {
          const token = res.data.token
          var servers = wx.getStorageSync("servers")
          if (!servers)
            servers = {}
          servers[remark] = {
            "token": token,
            "address": address
          }
          wx.setStorageSync("servers", servers)
          wx.navigateBack({
            delta: 1
          })
        } else {
          Toptips({
            content: "添加失败"
          })
        }
      },
      fail: function (res) {
        Toptips({
          content: "添加失败"
        })
      }
    })
  },

  /**
   * 取消按钮
   */
  cancel: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})