// pages/standalone/index.js
const {
  $Toast
} = require('../../ui/iview/base/index');
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    servers: {
      // Qcloud: {
      //   address: "0.0.0.0",
      //   token: "123456",
      //   containers: [{
      //     name: "name",
      //     image: "image",
      //     short_id: "12345",
      //     status: "running"
      //   }]
      // }
    },
    modal: {
      visible: false,
      remark: '',
      address: '',
      token: '',
      actions: [{
        name: '确定'
      }]
    },
    tip: false
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
    var servers = wx.getStorageSync("servers")
    if (Object.keys(this.data.servers).length != Object.keys(servers).length) {
      $Toast({
        content: '加载容器信息',
        duration: 0,
        type: 'loading'
      })
      this.loadContainersAll()
      $Toast.hide()
      this.setData({
        tip: false
      })
    } else if (Object.keys(this.data.servers).length != 0) {
      this.setData({
        tip: false
      })
    } else {
      this.setData({
        tip: true
      })
    }
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
    this.loadContainersAll()
    wx.stopPullDownRefresh()
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
   * 用户点击添加服务器
   */
  addServer: function() {
    wx.navigateTo({
      url: "../server_form/index"
    })
  },

  refreshServer: function(e) {
    $Toast({
      content: '正在刷新',
      duration: 0,
      type: 'loading'
    })
    var key = e.currentTarget.dataset.key
    var server = e.currentTarget.dataset.server;
    this.loadContainersByServer(key, server)
    $Toast({
      content: '刷新完成',
      type: 'success'
    })
  },

  /**
   * 查看服务器信息
   */
  checkServer: function(e) {
    var key = e.currentTarget.dataset.key
    var server = e.currentTarget.dataset.server;
    this.setData({
      ['modal.visible']: true,
      ['modal.remark']: key,
      ['modal.address']: server.address,
      ['modal.token']: server.token
    })
  },

  /**
   * Moal确认按钮
   */
  modalClick: function(e) {
    this.setData({
      ['modal.visible']: false
    })
  },

  deleteServer: function(event) {
    $Toast({
      content: '正在删除',
      duration: 0,
      type: 'loading'
    })
    var storage_servers = wx.getStorageSync("servers")
    var remark = event.target.dataset.remark
    // delete server from the storage
    delete storage_servers[remark]
    wx.setStorageSync("servers", storage_servers)
    // delete server from the page
    var page_servers = this.data.servers
    delete page_servers[remark]
    this.setData({
      servers: page_servers,
      tip: Object.keys(page_servers).length == 0
    })
    $Toast({
      content: '删除成功',
      type: 'success'
    })
  },

  /**
   * 从服务端加载容器信息
   */
  loadContainersAll: function() {
    var servers = wx.getStorageSync("servers")
    if (Object.keys(servers).length == 0) {
      this.setData({
        tip: true
      })
      return
    }
    for (var key in servers) {
      this.loadContainersByServer(key, servers[key])
    }
  },

  loadContainersByServer: function(key, server) {
    wx.request({
      url: app.globalData.requestDomain + '/list_containers',
      method: 'POST',
      data: {
        "address": server.address,
        "token": server.token
      },
      dataType: "json",
      success: (res) => {
        var containers = res.data.slice()
        this.setData({
          ['servers.' + key]: {
            address: server.address,
            token: server.token,
            containers: containers
          }
        })
      },
      fail: (res) => {
        $Toast({
          content: '容器信息加载失败',
          type: 'error'
        })
      }
    })
  }


})