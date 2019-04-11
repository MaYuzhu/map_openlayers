var height = document.documentElement.clientHeight;// 获取可见域高度
var width = document.documentElement.clientWidth// 获取可见域宽度

$(function() {
	login();
	getPic();
});

//var url ="http://192.168.20.41/";
//var url ="http://192.168.20.23:8181/";
var url = pFun.config.url;

function login(){
	$.ajax({
        type: "get",
        async: false,
        url: url + "zzcismp/user/login.shtml?username=admin&password=123456",
        contentType: "application/javascript;charset=UTF-8",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(json){
        },
        error: function(){
            // alert('fail');
        }
    });
}
function getPic(){
	$.ajax({
        type: "get",
        async: false,
        url: url + "zzcismp/file/getNewestFile.shtml?num=0",
        contentType: "application/javascript;charset=UTF-8",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(json){
        	//照片
			$(".photo1").prop("src",url+json.url1);
			$(".photo2").prop("src",url+json.url2);
			$(".photo3").prop("src",url+json.url3);
			$(".photo4").prop("src",url+json.url4);
			$(".photo5").prop("src",url+json.url5);
			$(".photo6").prop("src",url+json.url6);
        },
        error: function(){
            // alert('fail');
        }
    });
}
$(function(){
    // 初始化轮播
    $(".start-slide").click(function(){
        $("#myCarousel").carousel('cycle');
    });
    // 停止轮播
    $(".pause-slide").click(function(){
        $("#myCarousel").carousel('pause');
    });
    // 循环轮播到上一个项目
    $(".prev-slide").click(function(){
        $("#myCarousel").carousel('prev');
    });
    // 循环轮播到下一个项目
    $(".next-slide").click(function(){
        $("#myCarousel").carousel('next');
    });
    // 循环轮播到某个特定的帧 
    $(".slide-one").click(function(){
        $("#myCarousel").carousel(0);
    });
    $(".slide-two").click(function(){
        $("#myCarousel").carousel(1);
    });
    $(".slide-three").click(function(){
        $("#myCarousel").carousel(2);
    });
    $(".slide-four").click(function(){
        $("#myCarousel").carousel(3);
    });
    $(".slide-five").click(function(){
        $("#myCarousel").carousel(4);
    });
    $(".slide-six").click(function(){
        $("#myCarousel").carousel(5);
    });
    
});
