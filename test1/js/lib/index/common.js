//服务接口地址
var interface_url ="http://192.168.20.23:8181/";

/**
 * ajax请求公共方法
 * @param url  请求地址
 * @param async 是否异步，true为异步， false为同步， 默认为true
 * @param type  请求类型， get|post|put|delete, 默认为get
 * @param succFunc 请求成功回调函数
 * @param errorFunc 请求失败回调函数
 * @returns
 */
function remoteInterfaceMethod(url, async, type, succFunc, errorFunc){
	if(async == null){
		async = true;
	}
	if(type == null){
		type = "get";
	}
	$.ajax({
        type: type,
        async: async,
        url: url,
        contentType: "application/javascript;charset=UTF-8",
        dataType: "jsonp",
        jsonp: "callback",
        success: succFunc(json),
        error: errorFunc()
    });
}