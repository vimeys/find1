// pages/findPassword/findPassword.js
import  url from '../../utils/url'
import  ajax from '../../utils/ajax'
import Zan from '../../component/dist/toast/index'
var app =getApp();
Page(Object.assign({},Zan,{

  /**
   * 页面的初始数据
   */
  data: {
      time:88888,
      num:60,
      second:'获取验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
    // 电话失去焦点
    blur(e){
        let value=e.detail.value;
        let reg=/^1[3,4,5,6,7,8,9]\d{9}$/g;

        if(!reg.test(value)){
            this.showZanToast('请输入正确手机号')
        }else{
            this.setData({
                phone:value
            })
        }
        if(isNaN(value)){
            this.showZanToast('请输入正确手机号')
        }
    },
    getCode(){
        let phone=this.data.phone;
        var time=new Date().getTime();
        let timed=this.data.time;
        let diff=time-timed;
        console.log(diff);
        if(phone){
            if(diff>60000){
                console.log('发送成功');
                ajax.promise(url.url.code,{mobile:phone}).then((json)=>{
                    this.setData({
                        time:time,
                        second:'60S'
                    });
                    let that=this;
                    let timer=setInterval(()=>{
                        let num= this.data.num;
                        num--;
                        if(num==0){

                            clearInterval(timer);
                            that.setData({
                                num:60,
                                second:'获取验证码'
                            });
                            return
                        }
                        that.setData({
                            second:num+'S',
                            num:num
                        })
                    },1000)
                })
            }else{
                this.showZanToast('请等待60S,再点击')
            }
        }else{
            this.showZanToast('请输入号码');
        }
    },
    formSubmit(e){
    let value=e.detail.value;
      let obj={}
      obj.mobile=value.phone;
      obj.password=value.password
      obj.code=value.code
        for(let key in obj){
          if(obj[key]==""){
            this.showZanToast('请完成表达填写')
              return
          }
        }
      ajax.promiseX(url.url.change,obj).then((json)=>{
          console.log(json);
          if(json.code==200){
              wx.setStorageSync('time',new Date().getTime());
              wx.setStorageSync('user',json.data)
              app.time=new Date().getTime();
              app.user=json.data
              wx.setStorageSync('userId',json.data)
              wx.switchTab({
                  url: '../'+app.url
              })
          }else if(json.code==0){
              this.showZanToast(json.info)
          }

      })
    }
}));