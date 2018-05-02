// pages/signIn/signIn.js
import Zan from '../../component/dist/toast/index'
import  url from '../../utils/url'
import  ajax from '../../utils/ajax'
var app=getApp();
Page(Object.assign({},Zan,{

    /**
     * 页面的初始数据
     */
    data: {
        radio:true,
        time:888888,
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

    // 获取code
    getCode(){
      let phone=this.data.phone;
      let radio=!this.data.radio
        var time=new Date().getTime();
        let timed=this.data.time;
        let diff=time-timed;
        console.log(diff);
            if(phone&&radio){
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
            }else if(phone&&!radio){
                this.showZanToast('请点击同意用户协议');
            }else{
                this.showZanToast('请输入号码');
            }
    },

    // 是否同意声明
    radioCheck(){
        this.setData({
            radio:!this.data.radio
        })
    },

    formSubmit(e){
        let radio=this.data.radio;
        if(!radio){
            let value=e.detail.value;
            let obj={};
            obj.mobile=value.name;
            // obj.password=value.password;
            obj.password=value.password;
            obj.code=1234;
            for(var key in obj){
                if(obj[key]==""){
                    console.log(1);
                    this.showZanToast('请完成表单');
                    return
                }
            }
            wx.login({
                success: function(res) {
                    if (res.code) {
                        console.log(res.code);
                        // return
                        obj.wxCode=res.code
                        //发起网络请求
                        // wx.request({
                        //     url: 'https://test.com/onLogin',
                        //     data: {
                        //         code: res.code
                        //     }
                        // })
                        ajax.promise(url.url.sign,obj).then((json)=>{
                            console.log(json);
                            wx.setStorageSync('time',new Date().getTime());
                            wx.setStorageSync('user',json.data)
                            app.time=new Date().getTime();
                            app.user=json.data
                            wx.setStorageSync('userId',json.data)
                            wx.switchTab({
                                url: '../'+app.url
                            })
                        })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            });
        }


    },
    test(e){
        wx.navigateTo({
          url: '../login/login'
        })
    }
}));