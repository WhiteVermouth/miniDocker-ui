//app.js
App({
  onLaunch: function() {
    if (this.globalData.isDebug) {
      this.globalData.requestDomain = "http://172.28.128.10:5000"
    }
  },
  globalData: {
    isDebug: false,
    requestDomain: "https://minidocker.yourarcher.com"
  }
})