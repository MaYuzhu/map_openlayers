var height = document.documentElement.clientHeight;// 获取可见域高度
var width = document.documentElement.clientWidth// 获取可见域宽度
var beidou = {};
	beidou.current = null;
	beidou.data = null;
var mapdevice7 = {
		chn:'-1'
};

$(function() {
	$("#device7_shift").height(500);
	$("#device7_shift").width(width*0.4);
	$("#device7").height(height*0.35);
//	$("#device7").width(width*0.5);
	login();
	Data("#date_day","7");
//	dataBD(analogData);
	scatterData(7);//散点图一年的数据
});

function dataBD(data){
	var changeInfo = "日";

	if (data != null) {
		// 北斗
		var da = {};
		da.time = [];
		da.obj = [];
		da.name = [];
		
		for (i = 0; i < data.length; i++) {
			if (data[i].devcode != null) {
				var type = data[i].devcode.substring(13, 14);
				if (type == "7") {
					var devname = data[i].name;
					var devices = data[i].data;

					var obj1 = {};
					var obj2 = {};
					var avg_zs = [];
					var avg_xys = [];
					da.time = [];
					for (var j = 0; j < devices.length; j++) {

						var o1 = devices[j].avgS;
						avg_zs.push(Math.abs(Math.round(o1.z*10)/10));
						avg_xys.push(Math.abs(Math.round(o1.xy*10)/10));
						var daytime = devices[j].time.$date;
						var hourtime = devices[j].time.$date;
						
						if (changeInfo == "日") {
							da.time.push(hourtime.substring(
									hourtime.indexOf("T") + 1,
									hourtime.indexOf("T") + 3));
						} else if (changeInfo == "周"
								|| changeInfo == "月") {
							da.time.push(daytime.substring(
									daytime.indexOf("-") + 4,
									daytime.indexOf("-") + 6));
						}
					}
					// obj1.name = devices[j].name + " 位移";
					obj1.name = " 沉降";
					obj1.type = 'line';
					obj1.smooth = false;
					obj1.itemStyle = {
						normal : {}
					};
					obj1.data = avg_zs;
					da.obj.push(obj1);
					da.name.push(obj1.name);

					// obj2.name = devices[j].name + " 沉降";
					obj2.name = " 位移";
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
					da.type = "北斗监测终端";
					da.stype = "mm";

				}
			}
		}
		sensor(da);
	}
}
function map_beidou(chn){
	if(mapdevice7.chn == chn){
		mapdevice7.chn = '-1';
	}else{
		mapdevice7.chn = chn;
		scatterData_beidou_current('北斗监测点'+chn);
	}
	
	
	Data(hi_data_info,"7");
}
//setInterval(function(){dataG()},3000);
//function sensor(obj) {
//	var linegraphchart = echarts.init(document.getElementById(obj.divId));
//	linegraphchart.setOption({
////		title : {
////			x : 'center',
////			text : obj.type,
////		},
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

//散点图
//function scatterData(data){
//	var beidouTest = [];
//	if(data != null){
//		for(var i=0;i<data.length;i++){
//			if (data[i].devcode != null) {
//				var type = data[i].devcode.substring(13, 14);
//				if (type == "7") {
//					var devname = data[i].name;
//					var devices = data[i].data;
//					for (var j = 0; j < devices.length; j++) {
//						var o1 = devices[j].avgS;
//						//测试
//						var beidouxy = [];
//						beidouxy.push(Math.round(o1.x*100)/100);
//						beidouxy.push(Math.round(o1.y*100)/100);
//						beidouTest.push(beidouxy);
//						//end
//					}
//				}
//			}
//		}
//		scatter(beidouTest);
//	}
//}
function scatterData(analogData){
	$.ajax({
        type: "get",
        async: false,
//        url: url + "zzcismp/tsd/getBuildDevsData.shtml",//之前请求接口
        url: url + "zzcismp/tsd/getBuildDevsDataByType.shtml",
        data:{buildcode:"1101B0002",starttime:pFun.date.getDate(pFun.date.getNowFormatDate(0),-1,0,0,0,0,0),endtime:pFun.date.getNowFormatDate(0),timetype:"hour",devicetype:"7"},
        contentType: "application/javascript;charset=UTF-8",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(data){
        	analogData = data;
        	var option = {
//        	    title: {
//        	        text: '大规模散点图'
//        	    },
        		grid:{
        			top:0,
        			left:0,
        			right:0,
        			bottom:0
        		},
        	    tooltip : {
        	        trigger: 'axis',
        	        showDelay : 0,
        	        axisPointer:{
        	            show: true,
        	            type : 'cross',
        	            lineStyle: {
        	                type : 'dashed',
        	                width : 1
        	            }
        	        },
        	        zlevel: 1
        	    },
        	    legend: {
        	        // data:['sin','cos']
        	        data:[]
        	    },
        	    toolbox: {
        	        show : true,
        	        feature : {
//        	            mark : {show: true},
//        	            dataZoom : {show: true},
//        	            dataView : {show: true, readOnly: false},
//        	            restore : {show: true},
//        	            saveAsImage : {show: true}
        	        }
        	    },
        	    xAxis : [
        	        {
        	            type : 'value',
        	            scale:true,
        	            min:null,
        	            max:null,
        	            show:true,
        	            splitLine:{
        	            	show:false
        	            }
        	        }
        	    ],
        	    yAxis : [
        	        {
        	            type : 'value',
        	            scale:true,
        	            min:null,
        	            max:null,
        	            show:true,
        	            splitLine:{
        	            	show:false
        	            }
        	        }
        	    ],
        	    series : [
        	        // {
        	        //     name:'sin',
        	        //     type:'scatter',
        	        //     large: true,
        	        //     symbolSize: 3,
        	        //     data: []
        	        // },
        	        // {
        	        //     name:'cos',
        	        //     type:'scatter',
        	        //     large: true,
        	        //     symbolSize: 2,
        	        //     data: []
        	        // }
        	    ]
        	};
//        	console.log(analogData);

//        	var avgs_color = {
//        		initial:"#00900c",//初始绿
//        		end:"#000000",//结束黑
//        		normal:"#daea00",//正常黄
//        		spilled:"#bd0000"//溢出红
//        	};
        	
        	var avgs_color = {
        		initial:"#909090",//初始绿
        		end:"#00ce0d",//结束黑
        		normal:"#909090",//正常黄
        		spilled:"#909090"//溢出红
        	};

        	var area_radius = 0.002;//限制距离

        	$("#device7_shift_beidou").empty();
        	
        	var n = 0;
        	for (var db_key in analogData) {
        		if(analogData[db_key].devname.substr(0,5) != '北斗监测点')
        			continue;

        //绘制各个监测点
        		$("#device7_shift_beidou").append("<div class=\"beidou"+analogData[db_key].devname.substr(5,1)+"\"><span></span><font><a href=\"javascript:scatterData_beidou_current(\'"+analogData[db_key].devname+"\')\">"+analogData[db_key].devname+"</a></font></div>");
        		
        		if(beidou.current == null){
//        			第一个默认现实
        			beidou.current = analogData[db_key].devname;
        		}
        		
        		if(beidou.current != analogData[db_key].devname){
        			continue;
        		}else{
//        			给当前现实的标注
        			$("#device7_shift_beidou div span").css({
        				backgroundColor:"#9e9e9e"
        			});
        			$("#device7_shift_beidou div font").css({
        				color:"#9e9e9e"
        			});
        			
        			$("#device7_shift_beidou .beidou"+beidou.current.substr(5,1)+" span").css({
        				backgroundColor:"#28596e"
        			});
        			$("#device7_shift_beidou .beidou"+beidou.current.substr(5,1)+" font").css({
        				color:"#252525"
        			});
        		}
//        		console.log(analogData[db_key].data);
        		for(var avgs_key in analogData[db_key].data){
        			
        			// 点样式
        			option.series[n] = {
//        		            name:analogData[db_key].devname + " - " + (Number(avgs_key)+1),
        		            name:analogData[db_key].devname + " - " + analogData[db_key].data[avgs_key].time,
        	            type:'scatter',
        	            itemStyle: {
        		            normal: {
        		                // shadowBlur: 10,
        		                // shadowColor: 'rgba(120, 36, 50, 0.5)',
        		                // shadowOffsetY: 5,
        		                color: avgs_key==0?avgs_color.initial:(avgs_key==analogData[db_key].data.length-1?avgs_color.end:avgs_color.normal)
        		            }
        		        },
        	            large: true,
        	            symbolSize: 10,
        	            data: [[]]
        	        }


        	        // 对应坐标
        			var x = analogData[db_key].data[avgs_key].data.x;
        			var y = analogData[db_key].data[avgs_key].data.y;

        			var abs_x = Math.abs(x) * 1.2;
        			var abs_y = Math.abs(y) * 1.2;

        			if(abs_x > option.xAxis[0].max || option.xAxis[0].max == null){
        				option.xAxis[0].max = abs_x.toFixed(3);
        				option.xAxis[0].min = 0-option.xAxis[0].max;
        			}
        			if(abs_y > option.yAxis[0].max || option.yAxis[0].max == null){
        				option.yAxis[0].max = abs_y.toFixed(3);
        				option.yAxis[0].min = 0-option.yAxis[0].max;
        			}

        	        // 计算出圈的点样式
        	        if((Math.abs(x - analogData[db_key].data[0].data.x) > area_radius || Math.abs(y - analogData[db_key].data[0].data.y) > area_radius) && avgs_key!=analogData[db_key].data.length-1){
        	        	option.series[n].itemStyle.normal.color = avgs_color.spilled;
        	        }
        	        

        			// 点坐标
        			option.series[n].data[avgs_key] = [x.toFixed(3),y.toFixed(3)];

        			n++;
        		}

        	}

//        	console.log(option);

        	var myChart = echarts.init(document.getElementById('device7_shift'));

        	myChart.setOption(option);
        }
	});
}
function scatterData_beidou_current(current){
	beidou.current = current;
	scatterData(beidou.data);
}


function scatter(obj){
//	console.log(obj);
	
	var scatterchart = echarts.init(document.getElementById("device7_shift"));
	scatterchart.setOption({
//	    title : {
//	    	x:'center',
//	        text: '位移示意图',
//	    },
		grid : {
			x:0,
			y:0,
			x2:0,
			y2:0,
		},
	    tooltip : {
	        trigger: 'axis',
	        showDelay : 0,
	        formatter : function (params) {
	            if (params.value.length > 1) {
	                return params.seriesName + ' :<br/>'
	                   + params.value[0] + 'mm ' 
	                   + params.value[1] + 'mm ';
	            }
	            else {
	                return params.seriesName + ' :<br/>'
	                   + params.name + ' : '
	                   + params.value + 'mm ';
	            }
	        },  
	        axisPointer:{
	            show: true,
	            type : 'cross',
	            lineStyle: {
	                type : 'dashed',
	                width : 1
	            }
	        }
	    },
	    xAxis : [
	        {
	        	show : false,
	            type : 'value',
	            scale:true,
	            max : 10,
	            min : -10,
//	            splitLine:{show: false},
	            axisLabel : {
	                formatter: '{value} mm'
	            }
	        }
	    ],
	    yAxis : [
	        {
	        	show : false,
	            type : 'value',
	            scale : true,
	            max : 10,
	            min : -10,
//	            splitLine:{show: false},
	            axisLabel : {
	                formatter: '{value} mm'
	            }
	        }
	    ],
	    series : [
	        {
	            name:'位移',
	            type:'scatter',
	            data:obj,
//	            markPoint : {
//	                data : [
//	                    {type : 'max', name: '最大值'},
//	                    {type : 'min', name: '最小值'}
//	                ]
//	            },
//	            markLine : {
//	                data : [
//	                    {type : 'average', name: '平均值'}
//	                ]
//	            }
	        },
	    ]});

}