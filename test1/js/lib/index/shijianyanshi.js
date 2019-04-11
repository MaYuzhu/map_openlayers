var shijianyanshi = {};
	shijianyanshi.obj = null;
	shijianyanshi.uploadFile = false;
	shijianyanshi.findChannels = false;
	shijianyanshi.findDataValidation = false;
	shijianyanshi.findDataValidation_data = null;
	
	shijianyanshi.findFourierTransform = false;
	shijianyanshi.findFourierTransform_data = null;
	shijianyanshi.findFourierTransform_log = false;
	shijianyanshi.findPowerOne = false;
	shijianyanshi.findPowerOne_data = null;
	shijianyanshi.findPowerOne_log = false;
	shijianyanshi.findDampingFactorTwo = false;

	a3d.data = "--";
	
$(function(){
	$("#findPowerOne").on("click","a",function(e){
		var thin = $(this);
		if(thin.prop("class") == "flog"){
			shijianyanshi.findPowerOne_log = true;
// thin.find("flog").css("color","#ff0000");
		}else{
			shijianyanshi.findPowerOne_log = false;
// thin.find("fraw").css("color","#ff0000");
		}
		findPowerOne();
	});
	
	$("#findFourierTransform").on("click","a",function(){
		var thin = $(this);
		if(thin.prop("class") == "flog"){
			shijianyanshi.findFourierTransform_log = true;
// thin.find("flog").css("color","#ff0000");
		}else{
			shijianyanshi.findFourierTransform_log = false;
// thin.find("fraw").css("color","#ff0000");
		}
		findFourierTransform();
	});
});

	/*
	 * http://192.168.1.56:8080/zzcismp/file/uploadFile.shtml
	 * 
	 * 崔敏～研发 2017/9/14 11:31:56
	 * http://192.168.1.56:8080/zzcismp/file/findChannels.shtml 获取通道
	 * 
	 * 崔敏～研发 2017/9/14 11:32:33
	 * http://192.168.1.56:8080/zzcismp/file/findDataValidation.shtml?num=1 数据验证
	 * 
	 * 
	 * 崔敏～研发 2017/9/14 11:33:22
	 * ttp://192.168.1.56:8080/zzcismp/file/findFourierTransform.shtml 傅里叶变换
	 * 
	 * 崔敏～研发 2017/9/14 11:34:16
	 * ttp://192.168.1.56:8080/zzcismp/file/findPowerOne.shtml
	 * ，功率谱ttp://192.168.1.56:8080/zzcismp/file/findDampingFactorTwo.shtml 阻尼分析
	 * 
	 * 请教模型数据，单独接口
	 * http://192.168.20.23:8181/zzcismp/file/uploadInclinometerFile.shtml
	 * 
	 * 罗杰，模拟的上传和获取修改
	 * /zzcismp/file/uploadDisplacementFiles.shtml上传
	 * /zzcismp/file/findDataDemonstration.shtml?num=1获取震动演示
	 */
function uploadFile(objId,Tagging) {
	$(".center_table").css("display","none");
	$(".center_table>div").css("display","none");

	
	
	if(!objId) return;
	shijianyanshi.obj = objId;
	// alert(obj);
// var fileObj = document.getElementById("upload_file_jsdj").files[0]; //
	// 获取文件对象
	if(myBrowser() == 'IE'){
		if(ieEdition() == '11' || ieEdition() == '10'){
			var fileObj = $("#"+objId)[0].files[0];
		}else{
			alert("请用IE10+浏览器查看");
			return;
		}
	}else{
		var fileObj = $("#"+objId)[0].files[0];
	}
	
// console.log(fileObj);
	
	if (fileObj) {
		$(".Tagging").html(Tagging);
		
		// FormData 对象
		// var form = new FormData();
		// form.append("file", fileObj);// 文件对象
		//  
		// // XMLHttpRequest 对象
		// var xhr = new XMLHttpRequest();
		// xhr.open("post", FileController, true);
		// xhr.onload = function () {
		// console.log(xhr);
		// };
		// xhr.send(form);

		var formData = new FormData();
		formData.append("file", fileObj);
		if(objId == "upload_file_qingjiao"){
// 倾角计的
			$.ajax({
				url : pFun.config.url + "zzcismp/file/uploadInclinometerFile.shtml",
				type : 'POST',
				data : formData,
			　　timeout : 1000000,
				// dataType : 'jsonp',
				// 告诉jQuery不要去处理发送的数据
				processData : false,
				// 告诉jQuery不要去设置Content-Type请求头
				contentType : false,
				crossDomain : true,
				beforeSend : function() {
// console.log("正在进行，请稍候");
				},
				success : function(responseStr) {
					$(".center_table").css("display","block");
					tw = 100;

					 $(".three").css({
					 display:"block",
					 background:"none"
					 });

					 a3d.data = responseStr;
					 a3d.frequency = 1000;
//					 a3d.enlargement = 10;
					
					
			        $(".three").append('<span style="color:#000"><input type="radio" name="Mxyz" value="X" checked />X方向&nbsp; <input type="radio" name="Mxyz" value="Y" />Y方向&nbsp; <input type="radio" name="Mxyz" value="Z" />合成方向&nbsp;</span>');

				},
				error : function(responseStr) {
					 console.log(responseStr);
					// alert("上传完成！");
				}
			});
		}else{
			// 之前加速度的
			formData.append("data_type", objId=='upload_file_ss'?'1':'0');

			// console.log(formData);
			// return;
			
			//20171114 模拟数据换接口上传
			var purl = pFun.config.url + "zzcismp/file/uploadFile.shtml";//实时数据
			if(objId == "upload_file_jsdj"){
				var purl = pFun.config.url + "zzcismp/file/uploadDisplacementFiles.shtml";//模拟数据
			}
			
			$.ajax({
				url : purl,
				type : 'POST',
				xhrFields:{withCredentials:true},
				data : formData,
			　　timeout : 1000000,
				// dataType : 'jsonp',
				// 告诉jQuery不要去处理发送的数据
				processData : false,
				// 告诉jQuery不要去设置Content-Type请求头
				contentType : false,
				crossDomain : true,
				beforeSend : function() {
// console.log("正在进行，请稍候");
				},
				success : function(responseStr) {
					shijianyanshi.uploadFile = true;
// console.log(responseStr);
					if(objId=='upload_file_ss'){
						// 实时数据请求通道
						findChannels();
						$(".shijianyanshi-left li").css("display","block");
						$(".zdys").css("display","none");
					}else if(objId=='upload_file_jsdj'){
						Vibration();
//						模拟数据，直接调用动画
						$(".shijianyanshi-left").css("display","block");
						$(".shijianyanshi-left li").css("display","none");
						$(".zdys").css("display","block");
					}
					
				},
				error : function(responseStr) {
					 console.log(responseStr);
					// alert("上传完成！");
				}
			});
		}
		
	} else {
		alert("未选择文件");
	}
}

// 通道选择
function findChannels() {
	if(!shijianyanshi.uploadFile)
		return;
// $(".findChannels").empty();
	if(shijianyanshi.obj == 'upload_file_ss'){
		$.ajax({
			type : "get",
			
			cache : true,
		　　timeout : 1000000,
			url : pFun.config.url + "zzcismp/file/findChannels.shtml",
			contentType : "application/javascript;charset=UTF-8",
			xhrFields : {
				withCredentials : true
			},
			crossDomain : true,
			dataType : "jsonp",
			jsonp : "callback",
			success : function(json) {
// console.log(json);
				$(".center_table").css("display","block");
				$(".findChannels").css("display","block");
				
				$("#findChannels").empty();
				$("#findChannels").append("<option value=''>请选择通道</option>");
				for(var k in json.channels){
					$("#findChannels").append("<option value='"+json.channels[k]+"'>通道"+(Number(json.channels[k])+1)+"</option>");
				}
			},
			error : function() {
				// alert('fail');
			}
		});
		
	}else{
		$(".center_table").css("display","block");
// $(".findChannels").css("display","block");
		
		$("#findChannels").empty();
		$("#findChannels").append("<option value='-1'>模拟测试</option>");
		
		findDataValidation();

	}

}
// 数据校正
function findDataValidation() {
	if(!shijianyanshi.uploadFile)
		return;
	$(".shijianyanshi-left," +
			".center_table .findDataValidation," +
			".center_table .findFourierTransform," +
			".center_table .findPowerOne," +
			".center_table .findDampingFactorTwo," +
			".center_table .Vibration" +
			"").css("display","none");

	
	$(".findDataValidation").css("background","url(images/loading2.gif) no-repeat center center");

	var num = $("#findChannels").find("option:selected").val();
	if(num == ''){
		alert("请选择通道");
		return;
	}
	$(".findDataValidation").css("display","block");
	$(".findDataValidation").empty();
	$.ajax({
		type : "get",
		
		cache : true,
	　　timeout : 1000000,
		url : pFun.config.url + "zzcismp/file/findDataValidation.shtml?num="+num,
		contentType : "application/javascript;charset=UTF-8",
		xhrFields : {
			withCredentials : true
		},
		crossDomain : true,
		dataType : "jsonp",
		jsonp : "callback",
		success : function(json) {
// console.log(json);
			$(".shijianyanshi-left").css("display","block");
			
			
			shijianyanshi.findDataValidation_data = json;
	        
	        // 指定的配置项和数据
	        var option = {
					title : {
						text: '原始图',
					},
					tooltip : {
						trigger: 'axis'
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							name:"秒",
							type : 'category',
							data : [],
							splitLine:{
								show:false
							},
							axisTick: {
								alignWithLabel: true
							}
						}
					],
					yAxis : [
						{
							name:"mm",
							type : 'value',
							splitLine:{
								show:false
							},
							splitArea:{
								show:true,
							},
						}
					],
					series : [
						{
							name:'校正位移',
							type:'line',
							label:{
							    normal:{
							        show:false,
							        position:'top'
							    }
							},
							itemStyle:{
								normal:{
									color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
								}
							},
							data:json.datas
						}
					]
				};
	        
	        for(var k in json.datas){
	        	option.xAxis[0].data.push((k*0.005).toFixed(3));
// option.series[0].data.push(parseFloat(json.datas[k]).toFixed(8));
	        }

	        var myChart = echarts.init(document.getElementById('findDataValidation'));
	        myChart.setOption(option);
			
			
			
		},
		error : function() {
			// alert('fail');
		}
	});
}

// 傅里叶变换、功率谱、阻尼分析 x轴值 --cm
var xHzValue = 100;

// 傅里叶变换
function findFourierTransform() {
	if(!shijianyanshi.uploadFile)
		return;
	$(".findFourierTransform").css("display","block");
	$(".findFourierTransform").css("background","url(images/loading2.gif) no-repeat center center");
	$(".findFourierTransform").empty();
	$.ajax({
		type : "get",
		cache : true,
	　　timeout : 1000000,
		url : pFun.config.url + "zzcismp/file/findFourierTransform.shtml",
		contentType : "application/javascript;charset=UTF-8",
		xhrFields : {
			withCredentials : true
		},
		crossDomain : true,
		dataType : "jsonp",
		jsonp : "callback",
		success : function(json) {
// console.log(json);
			shijianyanshi.findFourierTransform_data = json;
	        
	        // 指定的配置项和数据
	        var option = {
					title : {
						text: '傅里叶变换',
					},
					tooltip : {
						trigger: 'axis'
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							name : 'Hz',
							type : 'category',
							data : [],
							splitLine:{
								show:false
							},
							axisTick: {
								alignWithLabel: true
							}
						}
					],
					yAxis : [
						{
							type : 'value',
							splitLine:{
								show:false
							},
							splitArea:{
								show:true,
							},
						}
					],
					series : [
						{
							name:'傅里叶变换',
							type:'line',
							label:{
							    normal:{
							        show:false,
							        position:'top'
							    }
							},
							itemStyle:{
								normal:{
									color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
								}
							},
							data:shijianyanshi.findFourierTransform_log?json.logdatas:json.datas
						}
					]
				};
	        
	        for(var k in json.datas){
	        	option.xAxis[0].data.push(parseInt(k*xHzValue/json.datas.length));
	        }

	        var myChart = echarts.init(document.getElementById('findFourierTransform'));
	        myChart.setOption(option);
	        
	        $("#findFourierTransform").append("<span><a href=\"javascript:;\" class=\"fraw\" style=\"color:"+(shijianyanshi.findFourierTransform_log?"#333":"#ff0000")+"\">原始谱</a> | <a href=\"javascript:;\" class=\"flog\" style=\"color:"+(shijianyanshi.findFourierTransform_log?"#ff0000":"#333")+"\">Log谱</a></span>");
		},
		error : function() {
			// alert('fail');
		}
	});
}
// 功率谱
function findPowerOne() {
	if(!shijianyanshi.uploadFile)
		return;
	$(".findPowerOne").css("display","block");
	$(".findPowerOne").css("background","url(images/loading2.gif) no-repeat center center");

	$(".findPowerOne").empty();
	$.ajax({
		type : "get",
		cache : true,
	　　timeout : 1000000,
		url : pFun.config.url + "zzcismp/file/findPowerOne.shtml",
		contentType : "application/javascript;charset=UTF-8",
		xhrFields : {
			withCredentials : true
		},
		crossDomain : true,
		dataType : "jsonp",
		jsonp : "callback",
		success : function(json) {
// console.log(json);
			shijianyanshi.findPowerOne_data = json;

	        
	        // 指定的配置项和数据
	        var option = {
					title : {
						text: '功率谱',
					},
					tooltip : {
						trigger: 'axis'
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							name : 'Hz',
							type : 'category',
							data : [],
							splitLine:{
								show:false
							},
							axisTick: {
								alignWithLabel: true
							}
						}
					],
					yAxis : [
						{
							type : 'value',
							splitLine:{
								show:false
							},
							splitArea:{
								show:true,
							},
						}
					],
					series : [
						{
							name:'功率谱',
							type:'line',
							label:{
							    normal:{
							        show:false,
							        position:'top'
							    }
							},
							itemStyle:{
								normal:{
									color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
								}
							},
							data:shijianyanshi.findPowerOne_log?json.logdatas:json.datas
						}
					]
				};
	        
	        for(var k in json.datas){
	        	option.xAxis[0].data.push(parseInt(k*xHzValue/json.datas.length));
	        }

	        var myChart = echarts.init(document.getElementById('findPowerOne'));
	        myChart.setOption(option);
	        
	        
	        $("#findPowerOne").append("<span><a href=\"javascript:;\" class=\"fraw\" style=\"color:"+(shijianyanshi.findPowerOne_log?"#333":"#ff0000")+"\">原始谱</a> | <a href=\"javascript:;\" class=\"flog\" style=\"color:"+(shijianyanshi.findPowerOne_log?"#ff0000":"#333")+"\">Log谱</a></span>");
		},
		error : function() {
			// alert('fail');
		}
	});
}
// 阻尼分析
function findDampingFactorTwo() {
	if(!shijianyanshi.uploadFile)
		return;
	$(".findDampingFactorTwo").css("display","block");
	$(".findDampingFactorTwo").css("background","url(images/loading2.gif) no-repeat center center");

	$(".findDampingFactorTwo").empty();

	$.ajax({
		type : "get",
		
		cache : true,
	　　timeout : 1000000,
		url : pFun.config.url + "zzcismp/file/findDampingFactorTwo.shtml",
		contentType : "application/javascript;charset=UTF-8",
		xhrFields : {
			withCredentials : true
		},
		crossDomain : true,
		dataType : "jsonp",
		jsonp : "callback",
		success : function(json) {
// console.log(json);
			
	        
	        // 指定的配置项和数据
	        var option = {
					title : {
						text: '阻尼分析',
					},
					tooltip : {
						trigger: 'axis'
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							name : 'Hz',
							type : 'category',
							data : [],
							splitLine:{
								show:false
							},
							axisTick: {
								alignWithLabel: true
							}
						}
					],
					yAxis : [
						{
							type : 'value',
							splitLine:{
								show:false
							},
							splitArea:{
								show:true,
							},
						}
					],
					series : [
						{
							name:'阻尼分析',
							type:'line',
							label:{
							    normal:{
							        show:false,
							        position:'top'
							    }
							},
							itemStyle:{
								normal:{
									color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
								}
							},
							data:json.datas
						}
					]
				};
	        
	        for(var k in json.datas){
	        	option.xAxis[0].data.push(parseInt(k*xHzValue/json.datas.length));
	        }

	        var myChart = echarts.init(document.getElementById('findDampingFactorTwo'));
	        myChart.setOption(option);
		},
		error : function() {
			// alert('fail');
		}
	});
}

function Vibration(){
	var num = $("#findChannels").find("option:selected").val();
	if(!num) num = -1;


	var purl = pFun.config.url + "zzcismp/file/findDataDemonstration.shtml?num="+num;
	
	$.ajax({
		type : "get",
		cache : true,
	　　timeout : 1000000,
		url : purl,
		contentType : "application/javascript;charset=UTF-8",
		xhrFields : {
			withCredentials : true
		},
		crossDomain : true,
		dataType : "jsonp",
		jsonp : "callback",
		success : function(data) {
//			console.log(data);
			// $(".Vibration,.f3d").css({
			// display:"block",
			// background:"none"
			// });
			$(".center_table").css("display","block");
				$(".f3d").css({
					display:"block",
					background:"none"
				});
				
//				var json = data.datas;
				a3d.data = data;
//				a3d.enlargement = 10;
//				console.log(json);
		}
	});
}
var video = {};
function afloor(x){
	// 获取左边3d图的尺寸
	var f3d = {};
	f3d.width = $(".Vibration").width() - 20;
// f3d.height = $(".f3d").height();
	f3d.height = 500;
	
// $("#afloor").width(f3d.width);
// $("#afloor").height(f3d.height);
	

// 颜色
// console.log(fv);
// console.log(x);
	var strokeStyle = '#000';
	if(Math.abs(x) >= (fv*0.9)){
		strokeStyle = 'red';
	}else if(Math.abs(x) >= (fv*0.75)){
		strokeStyle = 'yellow';
	}else if(Math.abs(x) >= (fv*0.5)){
		strokeStyle = 'green';
	}
	
	x*=1000;
	
	video.canvas=document.getElementById('afloor');

	video.bessel = {
		frame:0,// 帧
	};
	video.bessel.left = {
		heigth:460,// 楼高m


		start:[360,480],
		start_control:[],
		end:[],
		end_control:[]
	};

	// 楼底初始控制点
	video.bessel.left.start_control = [
		video.bessel.left.start[0],
		video.bessel.left.start[1]-video.bessel.left.heigth*0.4
	];

	// 楼顶初始位置
	video.bessel.left.end = [
		video.bessel.left.start[0],
		video.bessel.left.start[1]-video.bessel.left.heigth
	];
	// 楼顶初始控制点
	video.bessel.left.end_control = [
		video.bessel.left.end[0],
		video.bessel.left.end[1]+video.bessel.left.heigth*0.3
	];



	video.bessel.right = {
		heigth:460,// 楼高m

		start:[460,480],
		start_control:[],
		end:[],
		end_control:[]
	};

	// 楼底初始控制点
	video.bessel.right.start_control = [
		video.bessel.right.start[0],
		video.bessel.right.start[1]-video.bessel.right.heigth*0.4
	];

	// 楼顶初始位置
	video.bessel.right.end = [
		video.bessel.right.start[0],
		video.bessel.right.start[1]-video.bessel.right.heigth
	];
	// 楼顶初始控制点
	video.bessel.right.end_control = [
		video.bessel.right.end[0],
		video.bessel.right.end[1]+video.bessel.right.heigth*0.3
	];

	video.frame = function(){

		var bessel = JSON.parse(JSON.stringify(video.bessel));  


		var canvas = video.canvas;

	    canvas.height=f3d.height;
	    canvas.width=f3d.width;

	    var context=canvas.getContext('2d');

	    // 清空画布
		context.clearRect(0,0,canvas.width,canvas.height);

	    // 来个背景色
// context.fillStyle='#eee';
// context.fillRect(0, 0, canvas.width, canvas.height);
// context.fill();

	    // ----------------------------------------------
// if(bessel.left.frame%10 == 0)
// console.log(x);

		
	    // 贝塞尔线
	    context.strokeStyle=strokeStyle;// 红
	    context.beginPath();
	    // 楼左边
	    // 起始点固定 楼底
	    bessel.left.start_control[0]	-=(x*0.1);
		bessel.left.end_control[0]		+=(x*0.1);
		bessel.left.end_control[1]		-=(Math.abs(x)*0.3);
		bessel.left.end[0]				+=x;
		if(x < 0){
			bessel.left.end[1]			+=(Math.abs(x)*0.2);
		}else{
			bessel.left.end[1]			-=(Math.abs(x)*0.1);
		}
// console.log(bessel);
		context.moveTo(bessel.left.start[0],bessel.left.start[1]);
		context.bezierCurveTo(
			// 楼底定位
			bessel.left.start_control[0],
			bessel.left.start_control[1],
			// 楼顶定位
			bessel.left.end_control[0],
			bessel.left.end_control[1],
			// 楼顶
			bessel.left.end[0],
			bessel.left.end[1]
		); // 创建弧
	    context.stroke();



	    // 楼右边
	    bessel.right.start_control[0]	-=(x*0.1);
		bessel.right.end_control[0]		+=(x*0.1);
		bessel.right.end_control[1]		-=(Math.abs(x)*0.3);
		bessel.right.end[0]				+=x;
		if(x > 0){
			bessel.right.end[1]			+=(Math.abs(x)*0.2);
		}else{
			bessel.right.end[1]			-=(Math.abs(x)*0.1);
		}

		context.moveTo(bessel.right.start[0],bessel.right.start[1]);
		context.bezierCurveTo(
			// 楼底定位
			bessel.right.start_control[0],
			bessel.right.start_control[1],
			// 楼顶定位
			bessel.right.end_control[0],
			bessel.right.end_control[1],
			// 楼顶
			bessel.right.end[0],
			bessel.right.end[1]
		); // 创建弧
	    context.stroke();


		// 楼低
		context.moveTo(bessel.left.start[0],bessel.left.start[1]);
        context.lineTo(bessel.right.start[0],bessel.right.start[1]);
	    context.stroke();

		// 楼顶
		context.moveTo(bessel.left.end[0],bessel.left.end[1]);
        context.lineTo(bessel.right.end[0],bessel.right.end[1]);
	    context.stroke();

	    video.canvas = canvas;


// $("#frame").html(video.bessel.frame +"-"+ json[video.bessel.frame]);

	    video.bessel.frame++;
// if(!json[video.bessel.frame]){
			// window.requestAnimationFrame(video.frame);
			// clearInterval(fr);
// video.bessel.frame = 0;
// }
	};	

	
	video.frame();
	// window.requestAnimationFrame(video.frame);

// var fr = setInterval(video.frame,1000/(200/10)/10);
	
	
}