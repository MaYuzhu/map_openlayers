var height = document.documentElement.clientHeight;// 获取可见域高度
var width = document.documentElement.clientWidth// 获取可见域宽度
var mapjinglishuizhunyi = {
		chn:'-1'
};
$(function() {
	$("#deviceD_shift").height(height*0.3);
	$("#deviceD_shift").width(width*0.2);
	$("#deviceD").height(height*0.35);
	/*$("#deviceD").width(width*0.5);*/
	$("#skeleton_map").height(height*0.35-180);
	$("#skeleton_map").width(width*0.2-2);
	Data("#date_day","D");
//	dataCZ(analogData);
	test();
	
	getSubside();
	
});
function test(){
	function p(name){this.name = name;}
	p.prototype.showName = function(){
//		alert(this.name);
	}
	function w(name,job){p.apply(this,arguments)
		this.job = job;}
	for(var i in p.prototype){w.prototype = p.prototype;}
	new w('s1','coders').showName();
}

//左边模型，热点事件
function map_jinglishuizhunyi(sm){
	$("#skeleton_map span").css({
		background:'none'
	});
	if(mapjinglishuizhunyi.chn == sm){
		mapjinglishuizhunyi.chn = "-1";
	}else if(sm >= 0){
		mapjinglishuizhunyi.chn = sm;
		$("#skeleton_map .sm"+sm).css({
			background:'#5eccff'
		});
	}
	Data(hi_data_info,"D");
}

function dataCZ(data){
	var changeInfo = "日";

	if (data != null) {
		// 静力水准仪
		var jlda = {};
		jlda.time = [];
		jlda.obj = [];
		jlda.name = [];
		for (var i = 0; i < data.length; i++) {
			if (data[i].devcode != null) {
				var type = data[i].devcode.substring(13, 14);
				if (type == "D") {
					var devname = data[i].name;
					var sensors = data[i].data;

					var obj1 = {};
					var obj2 = {};
					var avg_x = [];
					var avg_y = [];
					jlda.time = [];
					var sum_x = 0;
					var sum_y = 0;
					for (var j = 0; j < sensors.length; j++) {

						var o1 = sensors[j].avgS;
						avg_x.push(Math.round(o1.x*100)/100);
						sum_x += o1.x;
						if (o1.y != null) {
							avg_y.push(Math.round(o1.y*100)/100);
							sum_y += o1.y;
						}
						var daytime = sensors[j].time.$date;
						var hourtime = sensors[j].time.$date;

						if (changeInfo == "日") {
							jlda.time.push(hourtime.substring(
									hourtime.indexOf("T") + 1,
									hourtime.indexOf("T") + 3));
						} else if (changeInfo == "周"
								|| changeInfo == "月") {
							jlda.time.push(daytime.substring(
									daytime.indexOf("-") + 4,
									daytime.indexOf("-") + 6));
						}
					}
					sum_x = Math.round(sum_x*100)/100;
					if(devname.substring(5,6) == 1){
						$("#deviceD_one").html(sum_x + "mm");
					}else if(devname.substring(5,6) == 2){
						$("#deviceD_two").html(sum_x + "mm");
					}else if(devname.substring(5,6) == 3){
						$("#deviceD_three").html(sum_x + "mm");
					}else if(devname.substring(5,6) == 4){
						$("#deviceD_four").html(sum_x + "mm");
					}
					obj1.name = devname + " 沉降";
					obj1.type = 'line';
					obj1.smooth = false;
					obj1.itemStyle = {
						normal : {}
					};
					obj1.data = avg_x;
					jlda.obj.push(obj1);
					jlda.name.push(obj1.name);

					if (avg_y.length > 0) {
						obj2.name = devname + " 沉降";
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
					jlda.type = "静力水准仪";
					jlda.stype = "mm";

				}
			}
		}
		sensor(jlda);
	}
}
//setInterval(function(){dataG()},3000);
//function sensor(obj) {
//	var linegraphchart = echarts.init(document.getElementById(obj.divId));
//	linegraphchart.setOption({
//		tooltip : {
//			trigger : 'axis'
//		},
//		legend : {
//			data : obj.name,
//			x : "center",
//			y : "bottom"
//		},
//		calculable : true,
//		xAxis : [ {
//			name : obj.xName,
//			type : 'category',
//			boundaryGap : false,
//			// 时间
//			data : obj.time,
////			splitLine:{show: true},
//			axisLabel : {
//				show : true,
//				// X轴刻度配置
//				interval : 0
//			// 0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
//			}
//		} ],
//		yAxis : [ {
//			name : obj.stype,
//			type : 'value'
//		} ],
//		series : obj.obj
//	});
//};
/**********页面右上图4个沉降值*************/
var url = pFun.config.url;

function getSubside(data){
	console.log(data)
	if(data != null){
		for (i = 0; i < data.length; i++) {
			if (data[i].devcode == "1101B00020020D06:1101B00020020D07") {
				var no = data[i].data;
				if(no!=null && no.length>0){
					console.log(no[no.length-1]);
//					第一个
					var one = no[no.length-1].data.a;
					var span_1 = document.getElementById ("deviceD_one");
					span_1.innerHTML = one;
//					第二个
					var two = no[no.length-1].data.b;
					var span_2 = document.getElementById ("deviceD_two");
					span_2.innerHTML = two;
				}
			}
			if (data[i].devcode == "1101B00020020D08:1101B00020020D09") {
				var no = data[i].data;
				if(no!=null && no.length>0){
					console.log(no[no.length-1]);
//					第三个
					var three = no[no.length-1].data.a;
					var span_3 = document.getElementById ("deviceD_three");
					span_3.innerHTML = three;
//					第四个
					var four = no[no.length-1].data.b;
					var span_4 = document.getElementById ("deviceD_four");
					span_4.innerHTML = four;
				}
			}
		}
	}
}


