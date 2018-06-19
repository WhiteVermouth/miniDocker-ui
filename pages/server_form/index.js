// pages/server_form/index.js
const utils = require("../../utils/util.js")
const {
  $Message
} = require('../../ui/iview/base/index');
const {
  $Toast
} = require('../../ui/iview/base/index');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    password: '',
    remark: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 添加按钮
   */

  add: function() {
    var address = this.data.address
    var password = this.data.password
    var remark = this.data.remark
    if (!address | !password | !remark) {
      $Message({
        content: '请将信息填写完整',
        type: 'warning'
      });
      return
    }
    if (!getApp().globalData.isDebug && !utils.isValidIPAddress(address) && !utils.isValidDomain(address)) {
      $Message({
        content: '无效地址',
        type: 'error'
      });
      return
    }
    $Toast({
      content: '正在添加',
      duration: 0,
      type: 'loading'
    })
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
          $Toast.hide()
          wx.navigateBack({
            delta: 1
          })
        } else {
          $Toast.hide()
          $Message({
            content: "添加失败",
            type: 'error'
          })
        }
      },
      fail: function(res) {
        $Toast.hide()
        $Message({
          content: "添加失败",
          type: 'error'
        })
      }
    })
  },

  /**
   * 取消按钮
   */
  cancel: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 输入框值改变
   */
  change: function(e) {
    this.setData({
      [e.currentTarget.dataset.var]: e.detail.detail.value
    })
  }
})