// pages/container/index.js
const Toast = require('../../utils/zanui/toast/toast');
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    token: "",
    name: "",
    image: "",
    short_id: "",
    status: "",
    info: {
      show: false,
      title: "",
      content: "",
      kind: ""
    },
    button: {
      stat_button_title: "显示容器运行状态",
      log_button_title: "显示容器日志"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      address: options.address,
      token: options.token,
      name: options.name,
      image: options.image,
      short_id: options.short_id,
      status: options.status
    })
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

  play: function () {
    Toast.loading({
      selector: '#zan-toast'
    });
    if (this.data.status == "running" || this.data.status == "paused") {
      wx.request({
        url: app.globalData.requestDomain + '/switch_pause_status',
        data: {
          "name": this.data.name,
          "token": this.data.token,
          "address": this.data.address
        },
        method: 'POST',
        dataType: 'json',
        success: (res) => {
          if (res.data.status == "success") {
            this.setData({
              status: this.data.status == "paused" ? "running" : "paused"
            })
            if (this.data.status == "running") {
              Toast({
                message: '容器已成功启动',
                selector: '#zan-toast'
              });
            } else {
              Toast({
                message: '容器已成功暂停',
                selector: '#zan-toast'
              });
            }
          }
        }
      })
    } else {
      wx.request({
        url: app.globalData.requestDomain + '/start_container',
        data: {
          "name": this.data.name,
          "token": this.data.token,
          "address": this.data.address
        },
        method: 'POST',
        dataType: 'json',
        success: (res) => {
          if (res.data.status == "success") {
            this.setData({
              status: "running"
            })
            Toast({
              message: '容器已成功启动',
              selector: '#zan-toast'
            });
          }
        }
      })
    }
  },

  stop: function () {
    Toast.loading({
      selector: '#zan-toast'
    });
    wx.request({
      url: app.globalData.requestDomain + '/stop_container',
      data: {
        "name": this.data.name,
        "token": this.data.token,
        "address": this.data.address
      },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        if (res.data.status == "success") {
          this.setData({
            status: "exited"
          })
          Toast({
            message: '容器已成功停止',
            selector: '#zan-toast'
          });
        }
      }
    })
  },

  remove: function () {
    Toast.loading({
      selector: '#zan-toast'
    });
    wx.request({
      url: app.globalData.requestDomain + '/remove_container',
      data: {
        "name": this.data.name,
        "token": this.data.token,
        "address": this.data.address
      },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        Toast.clear()
        if (res.data.status == "success") {
          wx.navigateBack({
            delta: '1'
          })
        }
      }
    })
  },

  getStats: function () {
    if (this.data.button.stat_button_title == "屏蔽容器运行状态") {
      this.setData({
        info: {
          show: false,
          title: "",
          content: "",
          kind: ""
        },
        button: {
          stat_button_title: "显示容器运行状态",
          log_button_title: "显示容器日志"
        }
      })
      return
    }
    Toast.loading({
      selector: '#zan-toast'
    });
    wx.request({
      url: app.globalData.requestDomain + '/get_stats',
      data: {
        "name": this.data.name,
        "token": this.data.token,
        "address": this.data.address
      },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        if (res.data.status == "success") {
          var stats = res.data.stats
          this.setData({
            info: {
              show: true,
              title: "运行信息",
              content: stats,
              kind: "stats"
            },
            button: {
              stat_button_title: "屏蔽容器运行状态",
              log_button_title: "显示容器日志"
            }
          })
          Toast.clear()
        }
      }
    })
  },

  getLogs: function () {
    if (this.data.button.log_button_title == "屏蔽容器日志") {
      this.setData({
        info: {
          show: false,
          title: "",
          content: "",
          kind: ""
        },
        button: {
          stat_button_title: "显示容器运行状态",
          log_button_title: "显示容器日志"
        }
      })
      return
    }
    Toast.loading({
      selector: '#zan-toast'
    });
    wx.request({
      url: app.globalData.requestDomain + '/get_logs',
      data: {
        "name": this.data.name,
        "token": this.data.token,
        "address": this.data.address
      },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        if (res.data.status == "success") {
          var logs = res.data.logs
          this.setData({
            info: {
              show: true,
              title: "日志信息",
              content: logs,
              kind: "logs"
            },
            button: {
              stat_button_title: "显示容器运行状态",
              log_button_title: "屏蔽容器日志"
            }
          })
          Toast.clear()
        }
      }
    })
  }
})