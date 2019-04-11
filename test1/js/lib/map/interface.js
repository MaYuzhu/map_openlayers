var alarmRecord = [];
var patrolRecord = [];
var patrolPic = [];
var page = 0;
$(function() {
	// 告警饼图
	getAlarmStatistics("alarmStatistics");
	// 处置饼图
	getDisposalStatistics("disposalStatistics");
	// 建筑统计图
	getbuildingHistograms("buildingHistograms");
})

// 获取建筑信息列表
function getArchitecture(start) {
	HouseInformation = [];
	$.ajax({
		async : false,
		url : 'weifang.bdjzaq.com/getArchitecture.shtml',
		type : 'POST',
		data : {
			"project[]" : [32050012,32050022],
			"start" : start
		},
		dataType : 'json',
		success : function(data) {
			if (data != null) {
				for (var i = 0; i < data.length; i++) {
					switch (data[i].build_status) {
					case 0:
						data[i].build_status = "正常";
						break;
					case 1:
						data[i].build_status = "一级";
						break;
					case 2:
						data[i].build_status = "二级";
						break;
					default:
						data[i].build_status = "三级";
						break;
					}
					;
					var house = {};
					var date = data[i].builttime.$date.substring(0, 4);
					data[i].builttime = date + "年";
					data[i].servst = data[i].servst.substring(0, data[i].servst
							.indexOf(' '));
					data[i].servet = data[i].servet.substring(0, data[i].servet
							.indexOf(' '));
					house = data[i];
					house.serial = (start * 1 + 1) + i;
					HouseInformation.push(house);
				}
			}
		}
	});
}
// 获取危房总数目
function getHouseCount() {
	var count = 0;
	$.ajax({
		async : false,
		url : 'weifang.bdjzaq.com/getHouseCount.shtml',
		type : 'POST',
		data : {
			"project[]":[32050012,32050022]
		},
		dataType : 'text',
		success : function(data) {
			count = data * 1;
//			count = Math.ceil(count / 5);
		}
	});
	return count;
}
// 获取告警列表
function getrecord(start) {

	alarmRecord = [];
	$.ajax({
		async : false,
		url : 'weifang.bdjzaq.com/record1.shtml',
		type : 'POST',
		data : {
			"projcode[]" : [32050012,32050022],
			"start" : start
		},
		dataType : 'json',
		success : function(list) {
			if (list != null) {
				for (var i = 0; i < list.length; i++) {
					switch (list[i].handle_status) {
					case 0:
						list[i].handle_status = "未处置";
						break;
					case 1:
						list[i].handle_status = "处置";
						break;
					case 2:
						list[i].handle_status = "处置完成";
						break;
					}
					switch (list[i].level) {
					case 0:
						list[i].level = "正常";
						break;
					case 1:
						list[i].level = "一级";
						break;
					case 2:
						list[i].level = "二级";
						break;
					default:
						list[i].level = "三级"
						break;
					}
					;
					var obj = {};
					var datetime = list[i].alarm_time.$date;
					var year = list[i].alarm_time.$date.substring(0,
							list[i].alarm_time.$date.indexOf("T"));
					var day = list[i].alarm_time.$date.substring(
							list[i].alarm_time.$date.indexOf("T") + 1,
							list[i].alarm_time.$date.indexOf("."));
					list[i].alarm_time = year + " " + day;
					obj = list[i];
					obj.numStart = (start * 1 + 1) + i;
					alarmRecord.push(obj);
				}
			}
		}
	});
}
// 危房等级统计柱状图
function getbuildingHistograms(id) {
	$.ajax({
				url : 'weifang.bdjzaq.com/rightShow_down.shtml',
				type : 'POST',
				data : {
					"project[]" : [ 32050012, 32050022 ]
				},
				dataType : 'json',
				success : function(data) {
					if (data != null) {
						var da = [ 0, 0, 0, 0, 0 ];
						for (var i = 0; i < data.length; i++) {
							switch (data[i].buildlevel) {
							case 'A':
								da[0] += data[i].number;
								break;
							case 'B':
								da[1] += data[i].number;
								break;
							case 'C':
								da[2] += data[i].number;
								break;
							case 'D':
								da[3] += data[i].number;
								break;
							default:
								da[4] += data[i].number;
								break;
							}
							;
						}
						// 路径配置
						require.config({
							paths : {
								echarts : 'http://echarts.baidu.com/build/dist'
							}
						});
						// 使用
						require(
								[ 'echarts', 'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
								],
								function(ec) {
									// 基于准备好的dom，初始化echarts图表
									var myChart = ec.init(document
											.getElementById(id));
									option = {
										tooltip : {
											trigger : 'axis',
											axisPointer : {
												type : 'shadow'
											},
											formatter : function(params) {
												// for text color
												var res = '<div><strong>'
														+ params[0].name + ':'
														+ params[0].value
														+ '</strong>';
												res += '</div>';
												return res;
											}
										},
										toolbox : {
											show : false,
											feature : {
												mark : {
													show : true
												},
												dataView : {
													show : true,
													readOnly : false
												},
												magicType : {
													show : true,
													type : [ 'line', 'bar' ]
												},
												restore : {
													show : true
												},
												saveAsImage : {
													show : true
												}
											}
										},
										calculable : true,
										xAxis : [ {
											type : 'category',
											data : [ 'A级', 'B级', 'C级', 'D级',
													'其他' ]
										} ],
										yAxis : [ {
											type : 'value',
											show : true
										} ],
										series : [ {
											name : '蒸发量',
											type : 'bar',
											itemStyle : {
												normal : {
													color : function(params) {
														// build a color map as
														// your need.
														var colorList = [
																'#C1232B',
																'#B5C334',
																'#FCCE10',
																'#E87C25',
																'#27727B',
																'#FE8463',
																'#9BCA63',
																'#FAD860',
																'#F3A43B',
																'#60C0DD',
																'#D7504B',
																'#C6E579',
																'#F4E001',
																'#F0805A',
																'#26C0C0' ];
														return colorList[params.dataIndex]
													},
													label : {
														show : true,
														position : 'top',
														formatter : '{c}'
													}
												}
											},
											data : da
										} ]
									}
									// 为echarts对象加载数据
									myChart.setOption(option);
								});
					}
				}
			});
}
// 建筑状态统计饼图
function getAlarmStatistics(id) {
	var buildCount = getHouseCount();
	$.ajax({
		url : 'weifang.bdjzaq.com/rightShow_up_two.shtml',
		type : 'POST',
		data : {
			"project[]" : [32050012,32050022]
		},
		dataType : 'json',
		success : function(data) {
			if (data != null) {
				var x = 0;
				var y = 0;
				var z = 0;
				var w = 0;
				for (var i = 0; i < data.length; i++) {
					if (data[i].build_status == 0) {
						x += data[i].number;
					} else if (data[i].build_status == 1) {
						y += data[i].number;
					} else if (data[i].build_status == 2) {
						z += data[i].number;
					} else {
						w += data[i].number;
					}
				}
				x = buildCount - y - z - w;
				$(".zttj_tx").html(x);
				$(".zttj_yj").html(y);
				$(".zttj_ej").html(z);
				$(".zttj_sj").html(w);
				$("#zttj_zc").html(x + "&nbsp;正常");
				$("#zttj_yj").html(y + "&nbsp;一级");
				$("#zttj_ej").html(z + "&nbsp;二级");
				$("#zttj_sj").html(w + "&nbsp;三级");
				var series = [ {
					name : '访问来源',
					type : 'pie',
					radius : '45%',
					center : [ '53%', '50%' ],
					data : [ {
						value : x,
						name : '正常'
					}, {
						value : y,
						name : '一级'
					}, {
						value : z,
						name : '二级'
					}, {
						value : w,
						name : '三级'
					} ]
				} ];
				pieChart(id, series);
			}
		}
	});
}
// 警告处置饼图
function getDisposalStatistics(id) {
	$.ajax({
		async : false,
		url : 'weifang.bdjzaq.com/rightShow_mean.shtml',
		type : 'POST',
		data : {
			"project[]" : [32050012,32050022]
		},
		dataType : 'json',
		success : function(data) {
			if (data != null) {
				var x = 0;
				var y = 0;
				var z = 0;
				for (var i = 0; i < data.length; i++) {
					if (data[i].handle_status == 0) {
						x += data[i].number;
					} else if (data[i].handle_status == 1) {
						y += data[i].number;
					} else {
						z += data[i].number;
					}
				}
				$("#gjcz_wcz").html(x);
				$("#gjcz_cz").html(y);
				$("#gjcz_yjc").html(z);
				var series = [ {
					name : '访问来源',
					type : 'pie',
					radius : '45%',
					center : [ '53%', '50%' ],
					data : [ {
						value : x,
						name : '未处置'
					}, {
						value : y,
						name : '处置'
					}, {
						value : z,
						name : '已解除'
					} ]
				} ];
				pieChart(id, series);
			}
		}
	});
}
// 生成饼状图
function pieChart(id, series) {
	// 路径配置
	require.config({
		paths : {
			echarts : 'http://echarts.baidu.com/build/dist'
		}
	});
	// 使用
	require([ 'echarts', 'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
	], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById(id));

		option = {
			color : [ '#BCBCBC', '#7CBF77', '#F9C16A', '#E3514C' ],
			toolbox : {
				show : false,
				feature : {
					mark : {
						show : true
					},
					dataView : {
						show : true,
						readOnly : false
					},
					magicType : {
						show : true,
						type : [ 'pie', 'funnel' ],
						option : {
							funnel : {
								x : '25%',
								width : '50%',
								funnelAlign : 'left',
								max : 1548
							}
						}
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			calculable : false,
			series : series
		};

		// 为echarts对象加载数据
		myChart.setOption(option);
	});
}

function getAlarmCount() {
	$.ajax({
		async : false,
		url : 'weifang.bdjzaq.com/pageCount.shtml',
		type : 'get',
		dataType : 'text',
		success : function(data) {
			page = Math.ceil(data / 5);
		}
	});
}
//获取巡检列表
function getListInspectRecord() {
	patrolRecord = [];
	$.ajax({
		async : false,
		url : 'weifang.bdjzaq.com/getListInspectRecord.shtml',
		type : 'get',
		data : {},
		dataType : 'json',
		success : function(list) {
			if (list != null) {
				for (var i = 0; i < list.length; i++) {
					var obj = {};
					obj.numStart = list[i].id;
					if(list[i].biCode == 132)
						obj.buildname = "银华园6号楼";
					switch(list[i].inspectType)
					{
					case 2:
						obj.p_type = "倾斜观测";
						break;
					case 3:
						obj.p_type = "沉降观测";
						break;
					case 4:
						obj.p_type = "裂缝观测";
						break;
					case 5:
						obj.p_type = "构建监测";
						break;
					default:
						obj.p_type = "日常检查";
						break;
					}
					obj.p_patrol = list[i].inspectDescription;
					if(list[i].status == 0 )
						obj.p_status = "无异常";
					else
						obj.p_status = "发现异常";
					obj.p_reason = list[i].inspector;
					obj.p_time = list[i].inspectTime;
					patrolRecord.push(obj);
				}
			}
		}
	});
}
function getInspectRecordCount(){
	$.ajax({
		async:false,
		url:'weifang.bdjzaq.com/getInspectRecordCount.shtml',
		type:'GET',
		data:{},
		dataType:'json',
		seccess:function(data){
			if(data != null){
				alert(data);
			}
		}
	});
}

//获取巡检图片列表
function getListInspectPic( id ) {

	patrolPic = [];
	$.ajax({
		async : false,
		url : 'weifang.bdjzaq.com/getListInspectPic.shtml',
		type : 'POST',
		data : {
			"id" : id
		},
		dataType : 'json',
		success : function(list) {
			if (list != null) {
				for (var i = 0; i < list.length; i++) {
					obj = list[i];
					patrolPic.push(obj);
				}
			}
		}
	});
}
