var HouseInformation = [];
var lnglats = [];
var alertPopup;
//var url ="http://36.110.66.202/";
//var url ="http://192.168.20.23:8181/";
var url = pFun.config.url;

$(function() {
	var height = document.documentElement.clientHeight;// 获取可见域高度
	login();
	buildStatus();
	alarmNum();
	alarmMsg();
	getBuildingImplements();
});
function login(){
//	$.ajax({
//        type: "get",
//        async: false,
//        url: url + "zzcismp/user/login.shtml?username=admin&password=123456",
//        contentType: "application/javascript;charset=UTF-8",
//        dataType: "jsonp",
//        jsonp: "callback",
//        success: function(json){
//        },
//        error: function(){
//            // alert('fail');
//        }
//    });
}
// 获取设备和建筑
function getBuildingImplements() {
	$.ajax({
        type: "get",
        async: false,
        url: url + "zzcismp/base/queryBuildingImplements.shtml",
        data:{projcode:"11010020 "},
        contentType: "application/javascript;charset=UTF-8",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(data){
        	if (data != null) {
				var sbBH = [];
				for (var i = 0; i < data.length; i++) {
					lnglats.push(data[i]);
					var da = {};
					da.data = data[i];
					if(data[i].buildcode == "1101B0002"){
						for (var j=0; j<data[i].nodes.length; j++) {
							if(data[i].nodes[j].buildtype == "7"){
								da.bd = data[i].nodes[j].status;
							}
							if(data[i].nodes[j].buildtype == "A"){
								da.qx = data[i].nodes[j].status;
							}
							if(data[i].nodes[j].buildtype == "D"){
								da.cj = data[i].nodes[j].status;							
							}
							if(data[i].nodes[j].buildtype == "M"){
								da.sp = data[i].nodes[j].status;
							}
							if(data[i].nodes[j].buildtype == "N"){
								da.g = data[i].nodes[j].status;
							}
						}
						da.lf = 0;
					}else if(data[i].buildcode == "1101B0003"){
						da.bd = 0;
						da.cj = 0;
						da.lf = 0;
						da.qx = 0;
						da.sp = 0;
						da.g = 4;
					}else if(data[i].buildcode == "1101B0004"){//昌平体育馆
						da.bd = 0;
						da.cj = 0;
						da.lf = 0;
						da.qx = 0;
						da.sp = 0;
						da.g = 45;
					}else{
						da.bd = 0;
						da.cj = 0;
						da.lf = 0;
						da.qx = 0;
						da.sp = 0;
						da.g = 0;
					}
					HouseInformation.push(da);
				}
			}
        	init();
        },
        error: function(){
            // alert('fail');
        }
    });
//	$.ajax({
//		async : false,
//		url : './buildingEquipment/queryBuildingImplements',
//		type : 'GET',
//		data : {
//			"project" : "11010020"
//		},
//		dataType : 'json',
//		success : function(data) {
//			if (data != null) {
//				for (var i = 0; i < data.length; i++) {
//					lnglats.push(data[i]);
//					var da = {};
//					da.data = data[i];
//					da.bd = 0;
//					da.cj = 0;
//					da.lf = 0;
//					da.qx = 0;
//					da.sp = 0;
//					da.g = 0;
//					for (var k = 0; k < data[i].equipmentList.length; k++) {
//						switch (data[i].equipmentList[k].type) {
//						case "N":
//							da.g += 1;
//							break;
//						case "7":
//							da.bd += 1;
//							break;
//						case "A":
//							da.qx += 1;
//							break;
//						case "C":
//							da.lf += 1;
//							break;
//						case "D":
//							da.cj += 1;
//							break;
//						case "M":
//							da.sp += 1;
//							break;
//						default:
//							break;
//						}
//						;
//					}
//					HouseInformation.push(da);// 获得project = 33010012的所有数据
//				}
//			}
//		},
//	});
}
//建筑弹出框
function houseShow(f){
	if(alertPopup != null){
		map.removePopup(alertPopup);
	}
	var hrefurl = "";
	if(f.name == "海淀区政府"){
		hrefurl = "";
	}else if(f.name == "昌平体育馆"){
		hrefurl = "";
	}else if(f.name == "北京市防震减灾中心"){
		hrefurl = "jiashutu";
	} 
	var alertLocation;
	if(f.geometry.x == null){
		return false;
		//alertLocation = new OpenLayers.LonLat(f.geometry.bounds.bottom,f.geometry.bounds.right);
	}else{
		alertLocation = new OpenLayers.LonLat(f.geometry.x,f.geometry.y);
	}
	var html = '';
	html += '<div id="platform">';
	html += '<div id="dd1" style="width: 340px;" class="z_c_box">';
	html += '<h1 class="h1"><a href="javascript:closePopup();" class="r_n_q_s"></a>台阵信息</h1>';
	html += '<div class="zc_b_cn_c">';
	html += '<table  width="100%" cellspacing="0" cellpadding="0" border="1" style="border:0px solid #c6d6e9;" class="TCKtable">';
	html += '<tr class="tb2"><td style=" color:#8B8B8B; text-indent:10px;text-align: left;" class="boxb"><strong>名称</strong>：<a href="'+hrefurl+'" style="cursor: pointer; text-decoration: underline; color: #1A85E1;">'+f.name+'</a></td></tr>';
	html += '<tr class="tb2"><td style=" color:#8B8B8B; text-indent:10px;text-align: left;" class="boxb"><strong>状态</strong>：'+f.build_status+'</td></tr>';
	html += '<tr class="tb2"><td style=" color:#8B8B8B; text-indent:10px;text-align: left;" class="boxb"><strong>仪器烈度</strong>：'+""+'</td></tr>';
//	html += '<tr class="tb2"><td style=" color:#666; text-indent:10px;text-align: initial;" class="boxb"><strong>评级</strong>:'+f.buildlevel+'</td></tr>';
	html += '<tr class="tb2"><td style=" color:#8B8B8B; text-indent:10px;text-align: left;" class="boxb"><strong>地址</strong>：'+f.addr+'</td></tr>';
//	html += '<tr class="tb2"><td style=" color:#666; text-indent:10px;text-align: initial;" class="boxb"><strong>监测服务时间</strong>:'+f.servst+'~'+f.servet+'</td></tr>';
	html += '<tr class="tb2"><td style=" color:#8B8B8B; text-indent:10px;text-align: left;" class="boxb"><strong>监测设备</strong>：';
//	html += f.bd+' &nbsp;&nbsp;';
//	html += f.cj;		
//	html += '</td></tr>';
//	html += '<tr class="tb2"><td style=" color:#8B8B8B; text-indent:10px;text-align: initial;" class="boxb"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong> '+f.lf+'&nbsp;'+f.qx+'&nbsp;'+f.sp+'</td></tr>';
//	html += '<tr class="tb2"><td style="color:#8B8B8B; text-indent:10px;text-align: initial;" class="boxb"><a href="show.shtml?buildcode='+f.buildcode+'" style="cursor: pointer; text-decoration: underline; color: #1A85E1;">监测详情    </a></td></tr>';
//	html += '</table>';
	if(f.g > 0){
		html += '加速度计'+f.g+'个&nbsp;';
	}
	if(f.cj > 0){
		html += '静力水准仪'+f.cj+'个';		
	}
	html += '</td></tr>';
	html += '<tr class="tb2"><td style=" color:#8B8B8B; text-indent:10px;text-align: left;" class="boxb"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>';
	if(f.bd > 0){
		html += '北斗监测终端'+f.bd+'个 &nbsp;';
	}
	if(f.qx > 0){
		html += '倾斜传感器'+f.qx+'个&nbsp;';
	}
	if(f.sp > 0){
		html += '网络摄像机'+f.sp+'个';
	}
	html += '</td></tr>';
	//html += '<tr class="tb2"><td style="color:#8B8B8B; text-indent:10px;text-align: left;" class="boxb"><a href="jiashutu" style="cursor: pointer; text-decoration: underline; color: #1A85E1;">监测详情    </a></td></tr>';
	html += '</table>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	alertPopup = new OpenLayers.Popup("alertPopup",
			alertLocation,
			new OpenLayers.Size(344,203),
			html,
			null,
			false,
			null
	);
	alertPopup.autoSize = false;
	alertPopup.fixedRelativePosition = true;
	map.addPopup(alertPopup);
	var left = $("#alertPopup")[0].style.left;
	left = left.substring(0,left.indexOf("p"));
	left = (left*1)+5;
	$("#alertPopup")[0].style.left = left+"px";
	
	var top = $("#alertPopup")[0].style.top;
	top = top.substring(0,top.indexOf("p"));
	top = (top*1)+5;
	$("#alertPopup")[0].style.top = top+"px";
}
function closePopup(){
	map.removePopup(alertPopup);
}
//建筑当前状态
function buildStatus(){
	$.ajax({
        type: "get",
        async: false,
        url: url + "zzcismp/alarm/getTPS.shtml",
        data:{projcode:"11010020 "},
        contentType: "application/javascript;charset=UTF-8",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(data){
//        	if(data.status != 1)
//        		return;
        	if(data !=null){
				var zc = data.result.normal + "&nbsp正常";
				var yj = data.result.oneRank + "&nbsp一级";
				var ej = data.result.twoRank + "&nbsp二级";
				var sj = data.result.threeRank + "&nbsp三级";
				$('#tzzt_zc').html(zc);
				$('#tzzt_yj').html(yj);
				$('#tzzt_ej').html(ej);
				$('#tzzt_sj').html(sj);
			}
        },
        error: function(){
            // alert('fail');
        }
    });
}
//报警统计
function alarmNum(){
	$.ajax({
        type: "get",
        async: false,
        url: url + "zzcismp/alarm/getAlarmStatistics.shtml",
        data:{projcode:"11010020 "},
        contentType: "application/javascript;charset=UTF-8",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(json){
//        	if(json.status != 1)
//        		return;
        	if(json != null){
        		var data = json.result;
        		var jsd,bd,qx,cj,yx;
				var jsd_num,bd_num,qx_num,cj_num,yx_num;
				for(var i=0;i<data.length;i++){
					if(data[i].devcode == "N"){
						if(data[i].alarm_value !=null){
							jsd = data[i].alarm_value;
						}else{
							jsd = 0;
						}
						jsd_num = data[i].level;
					}else if(data[i].devcode == "7"){
						if(data[i].alarm_value !=null){
							bd = data[i].alarm_value;
						}else{
							bd = 0;
						}
						bd_num = data[i].level;
					}else if(data[i].devcode == "A"){
						if(data[i].alarm_value !=null){
							qx = data[i].alarm_value;
						}else{
							qx = 0;
						}
						qx_num = data[i].level;
					}else if(data[i].devcode == "D"){
						if(data[i].alarm_value !=null){
							cj = data[i].alarm_value;
						}else{
							cj = 0;
						}
						cj_num = data[i].level;
					}else if(data[i].devcode == "M"){
						if(data[i].alarm_value !=null){
							yx = data[i].alarm_value;
						}else{
							yx = 0;
						}
						yx_num = data[i].level;
					}
				}
				$('#bjsl_jsd').html(jsd);
				$('#zs_jsd').html(jsd_num);
				$('#bjsl_bd').html(bd);
				$('#zs_bd').html(bd_num);
				$('#bjsl_qx').html(qx);
				$('#zs_qx').html(qx_num);
				$('#bjsl_cj').html(cj);
				$('#zs_cj').html(cj_num);
				$('#bjsl_yx').html(yx);
				$('#zs_yx').html(yx_num);
        	}
        },
        error: function(){
            // alert('fail');
        }
    });
}
//报警详情
function alarmMsg(){
	var alarmmsg = [];
	$.ajax({
        type: "get",
        async: false,
        url: url + "zzcismp/alarm/findDetails.shtml",
        data:{offset:0,limit:5,projcode:"11010020 "},
        contentType: "application/javascript;charset=UTF-8",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(json){
//        	if(json.status != 1)
//        		return;
        	if(json != null){
        		var data = json.result;
        		for(var i=0;i<data.length;i++){
					var alarm = {};
					if(data[i].buildname ==null){
						data[i].buildname = "";
					}else{
						data[i].buildname += ":"
					}
					if(data[i].alarm_reason ==null){
						data[i].alarm_reason = "";
					}
					alarm.alarmInfo = data[i].buildname + data[i].alarm_reason;
					alarm.alarmTime = data[i].alarm_time;
					alarmmsg.push(alarm);
				}
        		extList(alarmmsg);
        	}
        },
        error: function(){
            // alert('fail');
        }
    });
}
function extList(data) {
	var height = document.documentElement.clientHeight;
	$("#alarmList").html("");
	Ext.onReady(function() {
				var store = Ext.create('Ext.data.Store', {
					storeId : 'employeeStore',
					fields : [ 'alarmInfo', 'alarmTime'],
					data : data
				});

				var grid = Ext.create(
								'Ext.grid.Panel',
								{
									store : store,
									hideHeaders : true,
									//border : false,
									columns : [
											// { header: '',width: 40,dataIndex:
											// 'serial'},'serial',
											//new Ext.grid.RowNumberer(),
											{
												//header : '报警信息',
												dataIndex : 'alarmInfo',
												width : 198
											},
											{
												//header : '报警时间',
												dataIndex : 'alarmTime',
												width : 100
											}
											],
									width : 300,
									height : height - 450,
									renderTo : "alarmList"
								});
			});
}
//更新房屋状态 未使用
function undateHouseState(){
	var houselevel = getArchitecturelevel();
	var layers = map.layers;
	for(var i =0; i<layers.length; i++){
		if(layers[i].name == "featureLayer"){
			var features = map.layers[i].features;
			for(var j =0; j<features.length; j++){
				for(var s =0; s<houselevel.length; s++){
					if(houselevel[s].buildcode == features[j].buildcode){
						switch(houselevel[s].level){
					    	case 0:
					    		features[j].build_status = "正常";
					    		features[j].attributes.img = "images/td_zhengc.png";
					    		break;
					    	case 1:
					    		features[j].build_status = "一级";
					    		features[j].attributes.img = "img/greenWF.png";
					    		break;
					    	case 2:
					    		features[j].build_status = "二级";
					    		features[j].attributes.img = "img/orangeWF.png";
					    		break;
					    	default:
					    		features[j].build_status = "三级";
					    		features[j].attributes.img = "img/redWF.png";
					    		break;
					    };
					}
				}
			}
			map.zoomIn();
			map.zoomOut();
		}
	}
}
//setInterval(undateHouseState,600000);
//获取建筑状态 未使用
function getArchitecturelevel() {
	var da = [];
	$.ajax({
		async : false,
		url : './getlevel.shtml',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
		type : 'get',
		data : {},
		dataType : 'json',
		success : function(data) {
			if (data != null) {
				da = data
			}
		}
	});
	return da;
}
