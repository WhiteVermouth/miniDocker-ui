// pages/standalone/index.js
const Toast = require('../../utils/zanui/toast/toast');
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    servers: [
      // {
      //   "address": "127.0.0.1",
      //   "remark": "Qcloud",
      //   "containers": [
      //     {
      //       "name": "nginx",
      //       "image": "nginx:latest",
      //       "shortid": "1"
      //     },
      //     {
      //       "name": "tomcat8",
      //       "image": "tomcat:8",
      //       "shortid": "2"
      //     },
      //     {
      //       "name": "mysql",
      //       "image": "mysql:latest",
      //       "shortid": "3"
      //     }
      //   ]
      // }
    ]
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
    this.loadContainerInfo()
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
    this.loadContainerInfo()
    wx.stopPullDownRefresh()
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
   * 用户点击添加服务器
   */
  addServer: function () {
    wx.navigateTo({
      url: "../server_form/index"
    })
  },

  deleteServer: function (event) {
    Toast.loading({
      selector: '#zan-toast'
    })
    var remark = event.target.dataset.remark
    var servers = wx.getStorageSync("servers")
    delete servers[remark]
    wx.setStorageSync("servers", servers)
    this.loadContainerInfo()
    Toast.clear()
  },

  loadContainerInfo: function () {
    var servers = wx.getStorageSync("servers")
    var res_server = {}
    var page_servers = []
    for (var server in servers) {
      var containers = []
      const address = servers[server]["address"]
      const token = servers[server]["token"]
      const remark = server
      wx.request({
        url: app.globalData.requestDomain + '/list_containers',
        method: 'POST',
        data: {
          "address": address,
          "token": token
        },
        dataType: "json",
        success: (res) => {
          if (res.data.warn) {
            console.log(res.data.warn)
            return
          }
          containers = res.data.slice()
          res_server = {
            "address": address,
            "token": token,
            "remark": remark,
            "containers": containers
          }
          page_servers.push(res_server)
          this.setData({
            servers: page_servers
          })
        },
        fail: (res) => {
          console.log(res)
        }
      })
    }
    if (Object.keys(servers).length == 0) {
      this.setData({
        servers: []
      })
    }
  }


})