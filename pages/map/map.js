var app=getApp();
import  ajax from '../../utils/ajax'
import  url from '../../utils/url'
import utils from '../../utils/util'
import Zan from '../../component/dist/toast/index'
import  dialog from '../../component/dist/dialog/index'
Page(Object.assign({},Zan,dialog,{
    data: {
        showOpt:true,
        operator:'联通',
        san:'▼',
        active:1,
        isCover:false,
        value:"",//输入框的值
        longitude:"113.324520",
        latitude:"23.099994",
        addr:'',//地名
        phone:'',//电话
        markers: [{
            iconPath: "../image/ding.png",
            id: 0,
            latitude: 23.099994,
            longitude: 113.324520,
            width: 34,
            height: 50
        },{
            iconPath: "../image/twenty.png",
            id: 1,
            latitude: 23.010164,
            longitude: 113.324520,
            width: 40,
            height: 13
        },{
            iconPath: "../image/fifty.png",
            id: 2,
            latitude: 22.874769,
            longitude: 113.324520,
            width: 40,
            height: 13
        }],
       
        // controls: [{
        //     id: 1,
        //     iconPath: '../resources/addr.png',
        //     position: {
        //         left: 0,
        //         top: 300 - 50,
        //         width: 50,
        //         height: 50
        //     },
        //     clickable: true
        // }],
        circles:[{
            latitude: 23.099994,
            longitude: 113.324520,
            color: '#FF8400DD',
            fillColor: '#7cb5ec00',
            radius: 1500,
            strokeWidth: 15
        },{
            latitude: 23.099994,
            longitude: 113.324520,
            color: '#FF8400DD',
            fillColor: '#7cb5ec00',
            radius: 5000,
            strokeWidth: 1
        },
        {
            latitude: 23.099994,
            longitude: 113.324520,
            color: '#FF8400DD',
            fillColor: '#7cb5ec00',
            radius: 10000,
            strokeWidth: 1
        },{
                latitude: 23.099994,
                longitude: 113.324520,
                color: '#FF8400DD',
                fillColor: '#7cb5ec00',
                radius: 25000,
                strokeWidth: 1
            }]
    },
    // 选择运营商
    select(){
        this.setData({
            showOpt:false,
            san:'▲'
        })
    },
    //选择
    optSelect(e){
        let type=e.currentTarget.dataset.type;
        if(type==1){
            this.setData({
                operator:'联通',
                active:1,
            })
            setTimeout( ()=> {
                this.setData({
                    showOpt:true,
                    san:'▼'
                })
            },250)
        }else{
            this.setData({
                operator:'电信',
                active:2,
            });
            setTimeout( ()=> {
                this.setData({
                    showOpt:true,

                    san:'▼'
                })
            },250)
        }
    },
    // 是否禁止地图滑动
    switchChange(e){
        let value =e.detail.value;
        console.log(value);
        this.setData({
            isCover:value
        })
    },

    // 校验
    test(e){

        console.log(app.user, app.time);
        if(!app.time&&!app.user){//未注册
            app.url="map/map"
            wx.navigateTo({
                url: '../signIn/signIn'
            })
        }else  if(!app.user){//过期
            app.url="map/map"
            wx.navigateTo({
                url: '../login/login'
            })
        }else{//正常调起查询
            let id=utils.storage('userId');
            let obj={}
            obj.address=this.data.value;
            obj.mobile=this.data.phone;
            for (let key in obj){
                if(obj[key]==""){
                    this.showZanToast('请完成表单');
                    return
                }
            }
            console.log(id);
            wx.showModal({
              title: '提示',
              content: `本次核验需要消耗${this.data.gold}个金币，确认核验吗？,`,
              success: res=>{
                if (res.confirm) {
                    ajax.promise(url.url.testLat,{uid:id.id,address:this.data.value,type:this.data.active,mobile:this.data.phone}).then((json)=>{
                        console.log(json.data.basevalue)
                        switch (json.data.basevalue){
                            case '0:<=3':
                                console.log(123);
                                // this.showZanDialog({
                                //     title:'结果',
                                //     message:'YES+3KM'
                                // })
                                this.showZanDialog({
                                    title: '检验结果',
                                    content: 'YES+3KM',
                                    showCancel: false
                                })
                                break;
                            case '>3:<=10':
                                this.showZanDialog({
                                    content: 'YES+10KM'
                                });
                                break;
                            case '>10:<=20':
                                this.showZanDialog({
                                    content: 'YES+20KM'
                                })
                                break
                            case '>20:<=50':
                                this.showZanDialog({
                                    content: 'YES+50KM'
                                })
                                break
                            case  '>50:':
                                this.showZanDialog({
                                    content: 'NO+大于50KM'
                                })
                                break
                        }
                        // this.showZanDialog('')
                    })
                }
              }
            })

        }
    },
    // 获取电话
    getPhone(e){
        let value=e.detail.value;
        this.setData({
            phone:value
        })
    },
    // 获取经纬度
    getLon(e){
        let value=e.detail.value;
        this.setData({
            addr:value
        })
        let that=this
        // this.setData({
        //     latitude: 30.659367,
        //     longitude: 104.075729
        // })
        // let arr=this.data.circles;
        // arr.forEach((item)=>{
        //     item.latitude=json.data.lat;
        //     item.longitude=json.data.log;
        // })
        ajax.promise(url.url.log_lat,{address:value}).then((json)=>{
            console.log(json);

            let circles=that.data.circles
            let markers=that.data.markers
            let latitude=that.data.latitude;
            let longitude=that.data.longitude;
            markers[0].latitude=json.data.lon
            markers[0].longitude=json.data.lat
            latitude=json.data.lon
            longitude=json.data.lat
            circles.forEach((item)=>{
                item.latitude=json.data.lon
                item.longitude=json.data.lat
            })
            that.setData({
                markers:markers,
                circles:circles,
                latitude,
                longitude
            })
        })
    },
    regionchange(e) {
        console.log(e)
    },
    markertap(e) {
        console.log(e.markerId)
    },
    controltap(e) {
        console.log(e.controlId)
    },
    onLoad(){
        // wx.getLocation({success:res=>{
        //         console.log(res);
        //     }})
        this.setData({
            gold:wx.getStorageSync('gold1').gold
        })
    },
    // test(){
    //     let obj={}
    //     obj.address=
    //     ajax.promise(url.url.)
    // },
    onShow(){
        this.mapCtx=wx.createMapContext('map');
    },
    //地图控件
    getCenterLocation:function () {
        // console.log(this);
        let that=this;
        // that.mapCtx.getScale({
        //     success:(res)=>{
        //         console.log(res.scale)
        //         if(res.scale<8){
        //             let markers=that.data.markers
        //             that.setData({
        //                 markers:markers[0]
        //             })
        //             return
        //             // that.mapCtx.getCenterLocation({
        //             //     success: function(res){
        //             //         console.log(res);
        //             //         ajax.promise(url.url.getLot,{lat:res.longitude,lon:res.latitude}).then((json)=>{
        //             //             that.setData({
        //             //                 value:json.data
        //             //             })
        //             //         })
        //             //         let circles=that.data.circles
        //             //         let markers=that.data.markers
        //             //         markers[0].latitude=res.latitude
        //             //         markers[0].longitude=res.longitude
        //             //         markers[1].latitude=res.latitude-0.08983
        //             //         markers[1].longitude=res.longitude
        //             //         circles.forEach((item)=>{
        //             //             item.latitude=res.latitude
        //             //             item.longitude=res.longitude
        //             //         })
        //             //         that.setData({
        //             //             markers:markers,
        //             //             circles:circles
        //             //         })
        //             //
        //             //     }
        //             // });
        //         }else if(res.scale==10){
        //             that.mapCtx.getCenterLocation({
        //                 success: function(res){
        //                     console.log(res);
        //                     ajax.promise(url.url.getLot,{lat:res.longitude,lon:res.latitude}).then((json)=>{
        //                         that.setData({
        //                             value:json.data
        //                         })
        //                     })
        //                     let circles=that.data.circles
        //                     let markers=that.data.markers
        //                     markers[0].latitude=res.latitude
        //                     markers[0].longitude=res.longitude
        //                     markers[1].latitude=res.latitude-0.08983
        //                     markers[1].longitude=res.longitude
        //                     circles.forEach((item)=>{
        //                         item.latitude=res.latitude
        //                         item.longitude=res.longitude
        //                     })
        //                     that.setData({
        //                         markers:markers,
        //                         circles:circles
        //                     })
        //
        //                 }
        //             });
        //         }else{
        //             switch (res.scale){
        //                 case 11:
        //
        //
        //             }
        //         }
        //
        //     }
        // })
        that.mapCtx.getCenterLocation({
            success: function(res){
                console.log(res);
                ajax.promise(url.url.getLot,{lat:res.longitude,lon:res.latitude}).then((json)=>{
                    that.setData({
                        value:json.data
                    })
                })
                let circles=that.data.circles
                let markers=that.data.markers
                markers[0].latitude=res.latitude
                markers[0].longitude=res.longitude
                markers[1].latitude=res.latitude-0.08983
                markers[1].longitude=res.longitude
                circles.forEach((item)=>{
                    item.latitude=res.latitude
                    item.longitude=res.longitude
                })
                that.setData({
                    markers:markers,
                    circles:circles
                })

            }
        });
    },
    // 选择字母的显示隐藏
    is:(num,)=>{
        let markers=this.data.markers

    }
}));