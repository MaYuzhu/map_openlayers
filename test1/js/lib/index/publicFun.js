/**
 * 火烧 20170831
 * 公共方法
 */


var pFun = {};

//公共配置-------------------------------------
pFun.config = {};

//pFun.config.url = "http://192.168.20.23:8282/";
//pFun.config.url = "http://192.168.1.104:8080/";
//pFun.config.url = "http://10.11.9.72/";
pFun.config.url = "http://36.110.66.202/";
//pFun.config.url = "http://192.168.20.41/";

//楼动画，颜色
var floorValueColor = {
		red:1/100,
		yellow:1/550,
		green:0
};

//计算时间-------------------------------------
pFun.date = {};
//时间戳转时间，0获取当前时间
pFun.date.getNowFormatDate = function (datetime) {
    var date;
    if(datetime == 0){
        date = new Date();
    }else{
        date = new Date(datetime);
    }

    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var Hours = date.getHours()
    var Minutes = date.getMinutes()
    var Seconds = date.getSeconds()

    if (Hours >= 0 && Hours <= 9) {
        Hours = "0" + Hours;
    }
    if (Minutes >= 0 && Minutes <= 9) {
        Minutes = "0" + Minutes;
    }
    if (Seconds >= 0 && Seconds <= 9) {
        Seconds = "0" + Seconds;
    }

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + Hours + seperator2 + Minutes
            + seperator2 + Seconds;
    return currentdate;
}
//时间计算
pFun.date.getDate = function (datetime,year,month,date,hour,minute,second) {     
    datetime  = datetime.replace(/-/g,'/');
// alert(datetime);
    var now = new Date(datetime);

    var   year=now.getFullYear()+year;     
    var   month=now.getMonth()+month;     
    var   date=now.getDate()+date; 

    var   hour=now.getHours()+hour;     
    var   minute=now.getMinutes()+minute;     
    var   second=now.getSeconds()+second;     


    var date = new Date(year,month,date,hour,minute,second);

    return pFun.date.getNowFormatDate(date);
}


// 时间格式化,日期加上年月日，时分秒
pFun.date.setDateFormat = function (date,Format){
    if(Format!=false)
        Format=true;
    var datetime = '';
    if(Format){
        var dt = {}
        dt.Y = date.substr(0,4);
        dt.m = date.substr(5,2);
        dt.d = date.substr(8,2);
        dt.H = date.substr(11,2);
        dt.i = date.substr(14,2);
        dt.s = date.substr(17,2);

        for(var k in dt){
            if(dt[k]){
                datetime += dt[k];

                if(k == 'Y')
                    datetime += "年";
                if(k == 'm')
                    datetime += "月";
                if(k == 'd')
                    datetime += "日 ";
                if(k == 'H')
                    datetime += "时";
                if(k == 'i')
                    datetime += "分";
                if(k == 's')
                    datetime += "秒";
            }
        }
    }else{
        date = date.replace("年","-");
        date = date.replace("月","-");
        date = date.replace("日","");
        date = date.replace("时",":");
        date = date.replace("分",":");
        date = date.replace("秒","");

        datetime = date
    }
    return datetime;
}
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
    var title = null;
	if (r != null){
        // console.log(r);
        title = unescape(r[2]);

        if((myBrowser() != 'IE' && myBrowser() != 'Edge') || r[2].indexOf("%") >= 0)
            title = decodeURI(escape(title));

    }
    return title; 
}
//判断浏览器
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    // console.log(userAgent);

    var isOpera = userAgent.indexOf("Opera") > -1;
    // console.log(userAgent);
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
    }
    
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
      return "Chrome";
     }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
    if (userAgent.indexOf("rv:11") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器

}
function ieEdition(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串

    
    if(userAgent.indexOf("rv:11") > -1){
        return 11;
    }else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE 10.0;") > -1) {
        return 10;
    }else if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE 9.0;") > -1){
        return 9;
    }else{
        return '<=8'
    }
}

$(function(){
	$.ajax({
        type: "get",
        async: false,
        url: pFun.config.url + "zzcismp/user/login.shtml",
        contentType: "application/javascript;charset=UTF-8",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(json){
        	if(json.status != 1){
        		location.href="login";
        	}
        },
        error: function(){
            // alert('fail');
        }
    });
});