const Url='http://39.108.177.168/mapapi/';
const url={};



url.code=Url+'login/sendSms';//获取短信
url.sign=Url+'login/register';//注册
url.upload=Url+'index/upload';//上传图片
url.login=Url+'login/dologin';//登陆
url.payList=Url+'index/rechargeList';//充值列表
url.pay=Url+'pay/pay_now';//充值

url.province=Url+'index/province';//获取省份
url.city=Url+'index/city';//获取城市
url.isAddr=Url+'active/addressTrue';//常用地址核验
url.isCity=Url+'active/city';//城市核验
url.log_lat=Url+'active/amap_lon_lat';//获取经纬度
url.confirm =Url+'index/uploadSave';//确认提交图片
url.user =Url+'user/userInfo';//获取用户信息
url.getLot=Url+'active/amap_address';//根据经纬度获取详细地址
url.testLat=Url+'active/latLon';
module.exports={
    url
};