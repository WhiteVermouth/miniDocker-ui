// pages/standalone/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    servers: [
      {
        "address": "127.0.0.1",
        "remark": "Qcloud",
        "containers": [
          {
            "name": "nginx",
            "image": "nginx:latest",
            "shortid": "1"
          },
          {
            "name": "tomcat8",
            "image": "tomcat:8",
            "shortid": "2"
          },
          {
            "name": "mysql",
            "image": "mysql:latest",
            "shortid": "3"
          }
        ]
      }
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
   * 用户点击添加服务器
   */
  addServer: function () {
    wx.navigateTo({
      url: "../server_form/index"
    })
  }

})