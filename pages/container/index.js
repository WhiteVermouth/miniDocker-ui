// pages/container/index.js
const {
  $Toast
} = require('../../ui/iview/base/index');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    container_index: -1,
    address: "",
    token: "",
    remark: "",
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
      stat_button_title: "读取运行状态",
      log_button_title: "读取日志"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      container_index: options.container_index,
      address: options.address,
      token: options.token,
      remark: options.remark,
      name: options.name,
      image: options.image,
      short_id: options.short_id,
      status: options.status
    })
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
   * 容器启动/暂停
   */
  play: function() {
    $Toast({
      content: this.data.status == "running" ? "正在暂停" : "正在启动",
      duration: 0,
      type: "loading"
    })
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
            this.update_standalone_page_container_status(this.data.status)
            if (this.data.status == "running") {
              $Toast({
                content: '容器启动成功',
                type: 'success'
              });
            } else {
              $Toast({
                content: '容器暂停成功',
                type: 'success'
              });
            }
          }
        },
        fail: (res) => {
          if (this.data.status == "running") {
            $Toast({
              message: '容器暂停失败',
              type: 'error'
            });
          } else {
            $Toast({
              message: '容器暂停失败',
              type: 'error'
            });
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
            this.update_standalone_page_container_status(this.data.status)
            $Toast({
              content: '容器启动成功',
              type: 'success'
            })
          } else {
            $Toast({
              message: '容器启动失败',
              type: 'error'
            })
          }
        },
        fail: (res) => {
          $Toast({
            message: '容器启动失败',
            type: 'error'
          })
        }
      })
    }
  },

  update_standalone_page_container_status: function(status) {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    var prevPageStatus = 'servers.' + this.data.remark + '.containers[' + this.data.container_index + '].status'
    prevPage.setData({
      [prevPageStatus]: status
    })
  },

  stop: function() {
    $Toast({
      content: '正在停止',
      duration: 0,
      type: 'loading'
    })
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
          this.update_standalone_page_container_status(this.data.status)
          $Toast({
            content: '容器停止成功',
            type: 'success'
          });
        } else {
          $Toast({
            content: '容器停止失败',
            type: 'error'
          });
        }
      },
      fail: (res) => {
        $Toast({
          content: '容器停止失败',
          type: 'error'
        });
      }
    })
  },

  remove: function() {
    $Toast({
      content: '正在删除',
      duration: 0,
      type: 'loading'
    })
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
        if (res.data.status == "success") {
          var pages = getCurrentPages()
          var prevPage = pages[pages.length - 2]
          var prevPageContainers = 'servers.' + this.data.remark + '.containers'
          prevPage.data.servers[this.data.remark].containers.splice(this.data.container_index, 1)
          prevPage.setData({
            [prevPageContainers]: prevPage.data.servers[this.data.remark].containers
          })
          $Toast.hide()
          wx.navigateBack({
            delta: '1'
          })
        } else {
          $Toast({
            content: '容器删除失败',
            type: 'error'
          })
        }
      },
      fail: (res) => {
        $Toast({
          content: '容器删除失败',
          type: 'error'
        })
      }
    })
  },

  getStats: function() {
    if (this.data.button.stat_button_title == "屏蔽运行状态") {
      this.setData({
        info: {
          show: false,
          title: "",
          content: "",
          kind: ""
        },
        button: {
          stat_button_title: "读取运行状态",
          log_button_title: "读取日志"
        }
      })
      return
    }
    $Toast({
      content: '正在读取运行状态',
      duration: 0,
      type: 'loading'
    })
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
              title: "运行状态",
              content: stats,
              kind: "stats"
            },
            button: {
              stat_button_title: "屏蔽运行状态",
              log_button_title: "读取日志"
            }
          })
          $Toast.hide()
        } else {
          $Toast({
            content: '读取失败',
            type: 'error'
          })
        }
      },
      fail: (res) => {
        $Toast({
          content: '读取失败',
          type: 'error'
        })
      }
    })
  },

  getLogs: function() {
    if (this.data.button.log_button_title == "屏蔽日志") {
      this.setData({
        info: {
          show: false,
          title: "",
          content: "",
          kind: ""
        },
        button: {
          stat_button_title: "读取运行状态",
          log_button_title: "读取日志"
        }
      })
      return
    }
    $Toast({
      content: '正在读取日志',
      duration: 0,
      type: 'loading'
    })
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
              stat_button_title: "读取运行状态",
              log_button_title: "屏蔽日志"
            }
          })
          $Toast.hide()
        } else {
          $Toast({
            content: '读取失败',
            type: 'error'
          })
        }
      },
      fail: (res) => {
        $Toast({
          content: '读取失败',
          type: 'error'
        })
      }
    })
  }
})