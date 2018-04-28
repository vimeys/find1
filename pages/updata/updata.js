// pages/updata/updata.js
import  url from '../../utils/url'
import  ajax from '../../utils/ajax'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      src:'../image/updata.png',
      url_2:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //上传图片
    updata(){
      wx.chooseImage({
          count:1,
        success: res => {
            console.log(res)
            wx.uploadFile({
                url:url.url.upload,
                filePath: res.tempFilePaths[0],
                name: 'file',
                success:res=>{
                    console.log(JSON.parse(res.data).url);
                    this.setData({
                        src:JSON.parse(res.data).url,
                        url_2:JSON.parse(res.data).url_2
                    })
                }
            })
        }
      });
    },
    // 确认上传
    confirm(){
        let uid=wx.getStorageSync('user').uid;
        ajax.promiseX(url.url.confirm,{uid:uid,url_2:this.data.url_2}).then((json)=>{
            if(json.code=200){
                wx.showToast({
                    title: '提交成功'
                })
                setTimeout(()=>{
                    wx.switchTab({
                        url: '../my/my'
                    })
                },1000)
            }else if(json.code==401){
                wx.showToast({
                    title: '您已上传了营业执照，请等待审核结果！'
                })
            }


        })
    }
})