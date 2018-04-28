// pages/addr/addr.js
var app=getApp();
import url from '../../utils/url'
import ajax from '../../utils/ajax'
import  utils from '../../utils/util'
import Zan from '../../component/dist/toast/index'
Page(Object.assign({},Zan,{

  /**
   * 页面的初始数据
   */
  data: {
      showOpt:true,
      operator:'联通',
      san:'▼',
      active:1,
      showResult:false,
      isCity:1,
      province:[],//省份
      pIndex:0,
      disableCity:true,//城市点击
      city:[],
      cIndex:0,
      cityCode:'',//城市区号
      result:'核验结果'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getrovince()//获取省份
  },
    // 选择查询类型
    click(e){
      let type=e.currentTarget.dataset.type;
      if(type==1){
          this.setData({
              isCity:1,
              result:'核验结果',
              showResult:false
          })
      }else if(type==2){
          this.setData({
              isCity:2,
              result:'核验结果',
              showResult:false
          })
      }
    },
  // 开始选择运营商
  select(){
    this.setData({
        showOpt:false,
        san:'▲'
    })
  },
  //选择运营商
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
        })
          setTimeout( ()=> {
              this.setData({
                  showOpt:true,

                  san:'▼'
              })
          },250)
      }
    },
    //核验城市
    isCity(){
      if(!app.user&&!app.time){//跳转注册
          app.url='addr/addr';
          wx.navigateTo({
            url: '../signIn/signIn'
          })
      }else if(!app.user){//跳转登陆
          app.url='addr/addr';
          wx.navigateTo({
            url: '../login/login'
          })
      }else{//正常操作
          wx.showModal({
            title: '提示',
            content: '本次核验需要消耗10个金币，\n' +
            '确认核验吗？',
            success: res=>{

              if (res.confirm) {
                  let info=utils.storage('userId');
                  ajax.promise(url.url.isCity,{areaCode:this.data.cityCode,mobile:this.data.value,type:this.data.active,uid:info.id}).then((json)=>{
                      console.log(json);
                      this.setData({
                            result:json.data.position,
                          showResult:true
                      })
                  })
              }
            }
          })
      }
    },
    // 常用地址核验
    formSubmit(e){
      let that=this
        console.log(app);
        if(!app.user&&!app.time){//跳转注册
            app.url='addr/addr';
            wx.navigateTo({
                url: ''
            })
        }else if(!app.user){//跳转登陆
            app.url='addr/addr';
            wx.navigateTo({
                url: 'url: \'../signIn/signIn\''
            })
        }else{//正常操作
            let value=e.detail.value;
            let obj={}
            obj.name=value.name
            obj.id_card=value.id
            obj.address=value.addr
            for(var key in obj){
                if(obj[key]==""){
                    console.log(obj);
                    this.showZanToast('请完成表单');
                    return
                }
            }

            wx.showModal({
                title: '提示',
                content: '本次核验需要消耗10个金币确认核验吗？',
                success: res=>{
                    if (res.confirm) {
                        let info=utils.storage('userId')
                        console.log(info);
                        obj.uid=info.id
                        ajax.promise(url.url.isAddr,obj).then((json)=>{
                            let boolen=json.result.charge;
                            console.log(boolen);
                            if(boolen){
                                that.setData({
                                    result:'Yes',
                                    showResult:true
                                })
                            }else{
                                that.setData({
                                    result:"No",
                                    showResult:true
                                })
                            }

                        })
                    }
                }
            })
        }

    },


    // 获取省份列表
    getrovince(){
        ajax.promise(url.url.province,{}).then((json)=>{
            let arr=[];
            arr.push({name:'点击选择省份'})
            // arr.concat(json.data)
            let arr2
            arr2=[...arr,...json.data]
            console.log(arr2);
            this.setData({
                    province:arr2
                })
        })
    },
    //获取单个省份
    selectP(e){
      let index=e.detail.value;
      let result=this.data.result
      if(result=='核验结果'){
          this.setData({
              pIndex:index
          })
      }else{
          this.setData({
              pIndex:index,
              result:'核验结果',
              showResult:false
          })
      }

        ajax.promise(url.url.city,{id:this.data.province[index].id}).then((json)=>{
            let arr=[{name:'请选择城市'},...json.data];
            this.setData({
                disableCity:false,
                city:arr
            })
        })
    },
    // 获取城市
    selectC(e){
        let index=e.detail.value;
        this.setData({
            cIndex:index,
            cityCode:this.data.city[index].areacode
        })
    },
    getPhone(e){
      let value=e.detail.value;
      this.setData({
          value:value
      })
    }
}))