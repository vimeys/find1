// pages/my/my.js
import  ajax from  '../../utils/ajax'
import  url from '../../utils/url'
import  Zan from '../../component/dist/dialog/index'
import Toast from '../../component/dist/toast/index'
var app=getApp()
Page(Object.assign({},Zan,Toast,{

    /**
     * 页面的初始数据
     */
    data: {
        golds:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(app.user);
        // let time=new Date().getTime();
        // let user={};
        // user.phone=17778478980;
        // user.password='aa123456';
        // user.uid=5;
        // user.time=time;
        // wx.setStorageSync('user',user);
        wx.getUserInfo({
            success:res=>{
                var userInfoAvatar = res.userInfo.avatarUrl;
                var nickname = res.userInfo.nickName;
                this.setData({
                    name:nickname,
                    headerImage:userInfoAvatar
                });
                wx.setStorageSync('name', nickname);
                wx.setStorageSync('userInfo',userInfoAvatar);
            }
        })
    },
    onShow(){
        let user=wx.getStorageSync('user');

        if(user){
            ajax.promise(url.url.user,{uid:user.uid}).then((json)=>{
                console.log(json);
                if(json.data.state==1){
                    wx.removeStorageSync('isUp')
                }
                wx.setStorageSync('userId',json.data);
                this.setData({
                    golds:json.data.golds
                })
            })
        }

    },
    onPullDownRefresh: function () {
        let user=wx.getStorageSync('user');
        if(user){
            ajax.promise(url.url.user,{uid:user.uid}).then((json)=>{
                console.log(json);
                wx.setStorageSync('userId',json.data);
                this.setData({
                    golds:json.data.golds
                })
            })
        }
    },
    dialog(){
        let user=wx.getStorageSync('userId');
        let isUp=wx.getStorageSync('isUp');
        if(isUp){
            this.showZanToast('您已上传了营业执照，请等待审核结果！')
        }else{
            if(user.state==0){//0是跳转上传,1是已经通过
                wx.navigateTo({
                    url: '../updata/updata'
                })
            }else{
                ajax.promise(url.url.payList,{}).then((json)=>{
                    let arr=[]
                    json.data.map(function (item,index) {
                        let obj={}
                        obj.text=item.goods_name;
                        obj.type=item.id;
                        obj.color='red'
                        return arr.push(obj)

                    })
                    arr.push({
                        text: '取消',
                        type: 'cancel'
                    });
                    this.showZanDialog({
                        title: '请选择充值套餐',
                        // content: '这是一个模态弹窗',
                        buttonsShowVertical: true,
                        buttons: arr
                    }).then(({ type }) => {
                        console.log(type);
                        ajax.promise(url.url.pay,{uid:user.id,goods_id:type}).then(json=>{
                            let Data=json.data;
                            wx.requestPayment({
                                'timeStamp':Data.timeStamp,
                                'nonceStr': Data.nonceStr,
                                'package': Data.package,
                                'signType': 'MD5',
                                'paySign':Data.paySign,
                                'success':res => {
                                    console.log(res);
                                    ajax.promise(url.url.user,{uid:user.id}).then((json)=>{
                                        console.log(json);
                                        wx.setStorageSync('userId',json.data);
                                        this.setData({
                                            golds:json.data.golds
                                        })
                                    })
                                },
                                'fail': res => {
                                    console.log(res);
                                }
                            })
                        })
                    });
                    console.log(arr);
                });

            }
        }

        console.log(this);

    },
    hrefLogin(e) {
        // app.url = "my/my"
        // wx.navigateTo({
        //     url:'../login/login'
        // })
        console.log(app);
        if (!app.user && !app.time) {
            app.url = "my/my"
            wx.navigateTo({
                url: '../signIn/signIn'
            })
        } else if (!app.user) {
            console.log(app.user);
            app.url = "my/my"
            wx.navigateTo({
                url: '../login/login'
            })
        }else{
            console.log(this);
            console.log(123);
            this.showZanToast('你已登陆')
        }
    }

}));