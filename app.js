//app.js
App({
    user:'',
  onLaunch: function () {
    // 展示本地存储能力

      let timed= wx.getStorageSync('time')||15247146049830;//之前缓存时间
      let user =wx.getStorageSync('user');//获取用户id

      let time=new Date().getTime();//当前时间
      let newTime=time-timed;
      console.log(timed);
      console.log(newTime);
      // if(timed&&user){
      //     this.ok=user;
      //     this.time=timed;
      //     this.user=user13722431444847
      // }
      if(newTime <100000000&&newTime>0){
          this.time=timed;
          this.user=user
      }else if(newTime>1000000){
          this.time=time;
        wx.removeStorageSync('user')
      }else if(newTime<12722431444847) {

      }

      var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})