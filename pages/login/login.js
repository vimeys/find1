// pages/login/login.js
// import Zan from '../../component/dist/toast/index'
import  url from '../../utils/url'
import ajax from '../../utils/ajax'
var app=getApp();
const { Toast, extend } = require('../../component//dist/index');
Page(extend({}, Toast,{

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // this.showZanToast("123")
      console.log(app.url);
  },
    
    //提交表单
    formSubmit(e){

        console.log(1);
        let value =e.detail.value;
    let obj={};
    obj.name=value.phone;
    obj.password=value.psssword;
    for(let key in obj){
      if(obj[key]){

      }
    }
    // obj.psssword='yangsen0';
    ajax.promise(url.url.login,obj).then((json)=>{
      wx.setStorageSync('user',json.userInfo);
      wx.setStorageSync('time',new Date().getTime());
      app.user=json.userInfo.id
        wx.switchTab({
            url: '../'+app.url
        })
    })
  },

}))