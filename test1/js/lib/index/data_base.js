//var url ="http://36.110.66.202/";
//var url ="http://192.168.20.23:8181/";
var url = pFun.config.url;
var buildcode = "1101B0002";
function login(){
//	$.ajax({
//        type: "get",
//        async: false,
//        url: url + "zzcismp/user/login.shtml?username=admin&password=123456",
//        contentType: "application/javascript;charset=UTF-8",
//        dataType: "jsonp",
//        jsonp: "callback",
//        success: function(json){
////        	console.log(json);
//        },
//        error: function(){
//            // alert('fail');
//        }
//    });
}
var fvx = null;
var fvy = null


var hi_data_info = null;
function Data(info,sensorType){
	hi_data_info = info;
	info = $(info).html();
	var changeInfo = info;
	//timetype: minute，hour，day，month
	//sensorType : 7北斗 A倾斜 C裂缝 D静力
	var start = StartDate(info);
	var end = NowDate();
	
//	console.log(start);
//	console.log(end);

	var day = Day(changeInfo);
	var timetype = "hour";
	if(info == "日"){
		timetype = "hour";
		$("#date_day").css("background-color", "#009ee6");
		$("#date_week").css("background-color", "#FFFFFF");
		$("#date_month").css("background-color", "#FFFFFF");
	}else if(info == "周"){
		timetype = "day";
		$("#date_day").css("background-color", "#FFFFFF");
		$("#date_week").css("background-color", "#009ee6");
		$("#date_month").css("background-color", "#FFFFFF");
	}else if(info == "月"){
		timetype = "day";
		$("#date_day").css("background-color", "#FFFFFF");
		$("#date_week").css("background-color", "#FFFFFF");
		$("#date_month").css("background-color", "#009ee6");
	}else{
		start = $("#t_starttime").val();
		end = $("#t_endtime").val();
		$("#date_day").css("background-color", "#FFFFFF");
		$("#date_week").css("background-color", "#FFFFFF");
		$("#date_month").css("background-color", "#FFFFFF");
	}
	$.ajax({
        type: "get",
        async: false,
//        url: url + "zzcismp/tsd/getBuildDevsData.shtml",//之前请求接口
        url: url + "zzcismp/tsd/getBuildDevsDataByType.shtml",
        data:{buildcode:buildcode,starttime:start,endtime:end,timetype:timetype,devicetype:sensorType},
        contentType: "application/javascript;charset=UTF-8",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(data){
//        	console.log(data);
       	if(data != null){
       		//精力水准仪使用 --cm
       		try{ 
       			if(getSubside && typeof(getSubside)=="function"){ 
       				getSubside(data);
       			}
       		}catch(e){}     		 	
				// 北斗
				var da = {};
				da.time = [];
				da.obj = [];
				da.name = [];
				// 倾斜传感器
				var qxda = {};
				qxda.time = [];
				qxda.obj = [];
				qxda.name = [];
				// 裂缝传感器
				var lfda = {};
				lfda.time = [];
				lfda.obj = [];
				lfda.name = [];
				// 静力水准仪
				var jlda = {};
				jlda.time = [];
				jlda.obj = [];
				jlda.name = [];
				
				var i_n = 1;
				
				//清空倾角计里的设备菜单
				$(".equipment").empty();
				$(".equipment").append('<option value="all">全部</option>');

				
				for (i = 0; i < data.length; i++) {
					if (data[i].devcode != null) {
						var type = data[i].devcode.substring(13, 14);
						if (type == "A") {
							var devname = data[i].devname;
							var sensors = data[i].data;

							var obj1 = {};
							var obj2 = {};
							var avg_x = [];
							var avg_y = [];
							qxda.time = [];
							for (var j = 0; j < sensors.length; j++) {

								var o1 = sensors[j].data;
								avg_x.push(Math.round(o1.x*1000)/1000);
								if (o1.y != null) {
									avg_y.push(Math.round(o1.y*1000)/1000);
								}
								//var daytime = sensors[j].time;
								//var hourtime = sensors[j].time;
								var born = new Date(sensors[j].time);

								if (changeInfo == "日") {
									qxda.time.push(born.getHours());
								} else if (changeInfo == "周"
										|| changeInfo == "月") {
									qxda.time.push(born.getDate());
								}
							}
//							obj1.name = devname + " 东倾/西倾";
							obj1.name = devname.replace("倾斜传感器",'') + "东西倾斜";
							obj1.type = 'line';
							obj1.smooth = false;
							obj1.itemStyle = {
								normal : {}
							};
							obj1.data = avg_x;
							qxda.obj.push(obj1);
							qxda.name.push(obj1.name);

							if (avg_y.length > 0) {
//								obj2.name = devname + " 南倾/北倾";
								obj2.name = devname.replace("倾斜传感器",'') + "南北倾斜";
								obj2.type = 'line';
								obj2.smooth = false;
								obj2.itemStyle = {
									normal : {}
								};
								obj2.data = avg_y;
								qxda.obj.push(obj2);
								qxda.name.push(obj2.name);
							}

							qxda.divId = "device" + type;
							if (changeInfo == "日") {
								qxda.xName = "时";
							} else if (changeInfo == "周"
									|| changeInfo == "月") {
								qxda.xName = "日";
							}
							qxda.type = "倾斜传感器" + day;
							qxda.stype = "mm";
							
							qxda.grid = {
						        top: '60px',
						        left: '3%',
						        right: '9%',
						        bottom: '70px',
						        containLabel: true
						    }
							
							
							//添加下拉设备菜单
							$(".equipment").append('<option value="'+data[i].devname+'">'+data[i].devname+'</option>');
							
							
						} else if (type == "C") {

							var devname = data[i].devname;
							var sensors = data[i].data;

							var obj1 = {};
							var obj2 = {};
							var avg_x = [];
							var avg_y = [];
							lfda.time = [];
							for (var j = 0; j < sensors.length; j++) {

								var o1 = sensors[j].data;
								avg_x.push(Math.round(o1.x*100)/100);
								if (o1.y != null) {
									avg_y.push(Math.round(o1.y*100)/100);
								}
								//var daytime = sensors[j].time;
								//var hourtime = sensors[j].time;
								var born = new Date(sensors[j].time);

								if (changeInfo == "日") {
									lfda.time.push(born.getHours());
								} else if (changeInfo == "周"
										|| changeInfo == "月") {
									lfda.time.push(born.getDate());
								}
							}
							obj1.name = devname + " 宽度变化";
							obj1.type = 'line';
							obj1.smooth = false;
							obj1.itemStyle = {
								normal : {}
							};
							obj1.data = avg_x;
							lfda.obj.push(obj1);
							lfda.name.push(obj1.name);

							if (avg_y.length > 0) {
								obj2.name = devname + " 宽度变化";
								obj2.type = 'line';
								obj2.smooth = false;
								obj2.itemStyle = {
									normal : {}
								};
								obj2.data = avg_y;
								lfda.obj.push(obj2);
								lfda.name.push(obj2.name);
							}
							lfda.divId = "device" + type;
							if (changeInfo == "日") {
								lfda.xName = "时";
							} else if (changeInfo == "周"
									|| changeInfo == "月") {
								lfda.xName = "日";
							}
							lfda.type = "裂缝传感器" + day;
							lfda.stype = "mm";

						} else if (type == "D") {

							var devname = data[i].devname;
							var sensors = data[i].data;

							var obj1 = {};
							var obj2 = {};
							var avg_x = [];
							var avg_y = [];
							jlda.time = [];
							for (var j = 0; j < sensors.length; j++) {

								var o1 = sensors[j].data;
								avg_x.push(o1.a);
								if (o1.b != null) {
									avg_y.push(o1.b);
								}
								//var daytime = sensors[j].time;
								//var hourtime = sensors[j].time;
								var born = new Date(sensors[j].time);

								if (changeInfo == "日") {
									jlda.time.push(born.getHours());
								} else if (changeInfo == "周"
										|| changeInfo == "月") {
									jlda.time.push(born.getDate());
								}
							}
							obj1.name = devname + " a" + (i_n++);
							obj1.type = 'line';
							obj1.smooth = false;
							obj1.itemStyle = {
								normal : {}
							};
							obj1.data = avg_x;
							jlda.obj.push(obj1);
							jlda.name.push(obj1.name);

							if (avg_y.length > 0) {
								obj2.name = devname + " b" + (i_n++);
								obj2.type = 'line';
								obj2.smooth = false;
								obj2.itemStyle = {
									normal : {}
								};
								obj2.data = avg_y;
								jlda.obj.push(obj2);
								jlda.name.push(obj2.name);
							}
							jlda.divId = "device" + type;
							if (changeInfo == "日") {
								jlda.xName = "时";
							} else if (changeInfo == "周"
									|| changeInfo == "月") {
								jlda.xName = "日";
							}
							jlda.type = "静力水准仪" + day;
							jlda.stype = "mm";
							
						} else if (type == "7") {
							if(data[i].devcode != "1101B00020020701"){

							var devname = data[i].devname;
							var devices = data[i].data;

							var obj1 = {};
							var obj2 = {};
							var avg_zs = [];
							var avg_xys = [];
							da.time = [];
							for (var j = 0; j < devices.length; j++) {

								var o1 = devices[j].data;
//								avg_zs.push(Math.abs(Math.round(o1.z*10)/10));
//								avg_xys.push(Math.abs(Math.round(o1.xy*10)/10));
								avg_zs.push(o1.z);
								avg_xys.push(o1.xy);
								//var daytime = devices[j].time;
								//var hourtime = devices[j].time;
								var born = new Date(devices[j].time);

								if (changeInfo == "日") {
									da.time.push(born.getHours());
								} else if (changeInfo == "周"
										|| changeInfo == "月") {
									da.time.push(born.getDate());
								}
							}
							// obj1.name = devices[j].name + " 位移";
							obj1.name = devname + " 沉降";
							obj1.type = 'line';
							obj1.smooth = false;
							obj1.itemStyle = {
								normal : {}
							};
							obj1.data = avg_zs;
							da.obj.push(obj1);
							da.name.push(obj1.name);

							// obj2.name = devices[j].name + " 沉降";
							obj2.name = devname + " 位移";
							obj2.type = 'line';
							obj2.smooth = false;
							obj2.itemStyle = {
								normal : {}
							};
							obj2.data = avg_xys;
							da.obj.push(obj2);
							da.name.push(obj2.name);

							da.divId = "device" + type;
							if (changeInfo == "日") {
								da.xName = "时";
							} else if (changeInfo == "周"
									|| changeInfo == "月") {
								da.xName = "日";
							}
							da.type = "北斗监测终端" + day;
							da.stype = "mm";

						}
						}
					}
				}
				if (sensorType == "7") {
					
	       		 	//倾角计页面调用这个方法，scatterData报错，qingxietu相关的页面找不到scatterData方法，先注释
		       		 //这个好像只有北斗页面用
//						scatterData(data);//北斗散点图
					
					Sensor(da);
				}else if (sensorType == "A") {
//					console.log(data);
//					计算最大最小值
					var ts = data[7];
					for(var a in ts.data){
						if(fvx==null || fvx>Math.abs(ts.data[a].data.x)){
							fvx = Math.abs(ts.data[a].data.x);
						}
						
						if(fvy==null || fvy>Math.abs(ts.data[a].data.y)){
							fvy = Math.abs(ts.data[a].data.y);
						}
					}
					
					Sensor(qxda);
				}else if (sensorType == "C") {
					Sensor(lfda);
				}else if (sensorType == "D") {
					Sensor(jlda);
				}
       	 }
        },
        error: function(){
            // alert('fail');
        }
    });
	
}
//setInterval(function(){dataG()},3000);
var linegraphchart = null;
var linegraphchart_obj = null;
function Sensor(obj) {
	linegraphchart_obj = obj;

	linegraphchart = echarts.init(document.getElementById(obj.divId));
	var option = {
		title : {
			x : 'center',
			text : obj.type,
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : obj.name,
			x : "center",
			y : "bottom",
			"textStyle": {
	            "padding": [
	                0,
	                110,
	                0,
	                0
	            ],
	            "borderColor": "#ff0",
	            "borderWidth": 3
	        }
		},
		calculable : true,
		xAxis : [ {
			name : obj.xName,
			type : 'category',
			boundaryGap : false,
			// 时间
			data : obj.time,
//			splitLine:{show: true},
			axisLabel : {
				show : true,
				// X轴刻度配置
				interval : 0
			// 0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
			}
		} ],
		yAxis : [ {
			name : obj.stype,
			type : 'value'
		} ],
		series : obj.obj
	};
	
	if(obj.grid){
		option.grid = obj.grid;
	}
	if(obj.divId == "device7"){
//		北斗

		for(var a in option.series){
			if(mapdevice7.chn != '-1'){
				option.series[a].itemStyle.normal.color = option.series[a].name.indexOf(mapdevice7.chn)>0?"#c23531":"#9e9e9e"//焦点c23531
				
			}
			option.series[a].name += "        ";
		}
		
//		沉降位移分组
		var temp_series = [[],[]];
		for(var a in option.legend.data){
			if(option.legend.data[a].indexOf("沉降") > 0){
				temp_series[0].push(option.legend.data[a]+"        ");
			}else{
				temp_series[1].push(option.legend.data[a]+"        ");
			}
		}
		option.legend.data = [];
		option.legend.data = temp_series[0].concat(temp_series[1]);
		
	}else if(obj.divId == "deviceD"){
//		静力水准仪
		for(var a in option.series){
			if(mapjinglishuizhunyi.chn != '-1'){
				option.series[a].itemStyle.normal.color = option.series[a].name.indexOf(mapjinglishuizhunyi.chn)>0?"#c23531":"#9e9e9e"//焦点c23531
				
			}
			option.series[a].name += "        ";
		}
	}else if(obj.divId == "deviceA"){
//		倾斜
//		var equipment = $(".equipment").val();
//		var direction = $(".direction").val();
		
//		console.log(equipment);
//		console.log(direction);
	}
//	console.log(JSON.stringify(option));
//	console.log(option);
	linegraphchart.setOption(option);
};
//修改倾斜
function updeviceA(){
	var equipment = $(".equipment").val();//设备
	var direction = $(".direction").val();//方向
	
//	console.log(linegraphchart_obj);
	
	var option = {
			legend:{
				selected:{
					
				}
			}
		};
	for(var i in linegraphchart_obj.name){
		if((linegraphchart_obj.name[i].indexOf(equipment.substring(0,2)) > -1 || equipment == "all") && (linegraphchart_obj.name[i].indexOf(direction) > -1 || direction == "all")){
			option.legend.selected[linegraphchart_obj.name[i]] = true;
		}else{
			option.legend.selected[linegraphchart_obj.name[i]] = false;
		}
	}
	
	//console.log(option);
	
	linegraphchart.setOption(option);
}

//时间函数
function NowDate() {
	var now = new Date();
	var year = now.getFullYear(); // 年
	var month = now.getMonth() + 1; // 月
	var day = now.getDate(); // 日
	var hh = now.getHours(); // 时
	var mm = now.getMinutes(); // 分
	var ss = now.getSeconds(); // 秒

	var clock = year + "-";
	if (month < 10)
		clock += "0";
	clock += month + "-";
	if (day < 10)
		clock += "0";
	clock += day + " ";
	if (hh < 10)
		clock += "0";
	clock += hh + ":";
	if (mm < 10)
		clock += "0";
	clock += mm + ":";
	if (ss < 10)
		clock += "0";
	clock += ss;

	return (clock);
}
function StartDate(changeInfo) {
	var now = new Date();
	var sda = new Date(now.getTime() - 24 * 3600 * 1000);
	var sdaw = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
	var sdam = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
	if (changeInfo == "月") {
		var year = sdam.getFullYear(); // 年
		var month = sdam.getMonth() + 1; // 月
		var day = sdam.getDate(); // 日
	} else if (changeInfo == "周") {
		var year = sdaw.getFullYear(); // 年
		var month = sdaw.getMonth() + 1; // 月
		var day = sdaw.getDate(); // 日
	} else if (changeInfo == "日") {
		var year = sda.getFullYear(); // 年
		var month = sda.getMonth() + 1; // 月
		var day = sda.getDate(); // 日
	}
	var hh = now.getHours(); // 时
	var mm = now.getMinutes(); // 分
	var ss = now.getSeconds(); // 秒

	var clock = year + "-";
	if (month < 10)
		clock += "0";
	clock += month + "-";
	if (day < 10)
		clock += "0";
	clock += day + " ";
	if (hh < 10)
		clock += "0";
	clock += hh + ":";
	if (mm < 10)
		clock += "0";
	clock += mm + ":";
	if (ss < 10)
		clock += "0";
	clock += ss;

	return (clock);
}
function Day(changeInfo) {
	var now = new Date();
	var year = now.getFullYear(); // 年
	var month = now.getMonth() + 1; // 月
	var day = now.getDate(); // 日

	var clock = year + "-";
	clock += month;
	if (changeInfo == "日") {
		clock += "-";
		clock += day;
	}
	return (clock);
}