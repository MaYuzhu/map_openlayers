var SensorInformation = [];
var preHouse = [];
// 获取设备和建筑
function getSensorImplements() {
	$.ajax({
		async : false,
		url : './buildingEquipment/queryProjectListImplement.shtml',
		type : 'POST',
		data : {
			"project[]" : [ 32050012, 32050022 ]
		},
		dataType : 'json',
		success : function(data) {
			if (data != null) {
				for (var i = 0; i < data.length; i++) {
					var equipment = data[i].equipmentList; // 获得project数据中所有equipmentList的的数据
					for (var j = 0; j < equipment.length; j++) {
						SensorInformation.push(equipment[j]); // 将equipment数据存入SensorInfomation
					}
					;
				}
			}
		},
	});
}
// 传感器弹出框
function sensorShow(f) {
	var sbBH = [];
	var judge = 0;
	if (preHouse.length>0) {
		for (var n = 0; n < preHouse.length; n++) {
			if (preHouse[n] == f.buildcode) {
				judge = 1;
			}
		}
		if (judge == 0) {
			preHouse.push(f.buildcode);
		}
	} else {
		preHouse.push(f.buildcode);
	}
	// 相应设备数据
	if (judge != 1) {
		$.ajax({
			async : false,
			url : './dataListServer.shtml',
			type : 'POST',
			data : {
				"build" : f.buildcode,
				"getstatus" : 1
			},
			dataType : 'json',
			success : function(data) {
				if (data != null) {
					for (var i = 0; i < data.length; i++) {
						sbBH.push(data[i]);
					}
				}
			}
		});
	}

	if(sbBH.length >0){
		for(var k=0;k<SensorInformation.length;k++){
			for(var j=0;j<sbBH.length;j++){
				if(SensorInformation[k].devcode == sbBH[j].devcode){
					var sbBH_data = [];
					var type = sbBH[j].devcode.substring(13,14);
					if (sbBH[j].data.x != null) {
						if (type == "7") {
							sbBH_data
									.push(Math.round(sbBH[j].data.x * 10) / 10);
						} else if (type == "A") {
							sbBH_data.push(Math
									.round(sbBH[j].data.x * 1000) / 1000);
						} else {
							sbBH_data
									.push(Math.round(sbBH[j].data.x * 100) / 100);
						}
					}
					if (sbBH[j].data.y != null) {
						if (type == "7") {
							sbBH_data
									.push(Math.round(sbBH[j].data.y * 10) / 10);
						} else if (type == "A") {
							sbBH_data.push(Math
									.round(sbBH[j].data.y * 1000) / 1000);
						} else {
							sbBH_data
									.push(Math.round(sbBH[j].data.y * 100) / 100);
						}
					}
					if (sbBH[j].data.z != null) {
						if (type == "7") {
							sbBH_data
									.push(Math.round(sbBH[j].data.z * 10) / 10);
						} else if (type == "A") {
							sbBH_data.push(Math
									.round(sbBH[j].data.z * 1000) / 1000);
						} else {
							sbBH_data
									.push(Math.round(sbBH[j].data.z * 100) / 100);
						}
					}
					SensorInformation[k].numerical = sbBH_data;
					f.numerical = sbBH_data;
				}
			}
		}
	}else{
		for(var i = 0; i < SensorInformation.length; i++){
			if(SensorInformation[i].devcode == f.devcode){
				f.numerical = SensorInformation[i].numerical;
			}
		}
	}
	
	if (alertPopup != null) {
		map.removePopup(alertPopup);
	}

	var alertLocation;
	if (f.geometry.x == null) {
		return false;
		// alertLocation = new
		// OpenLayers.LonLat(f.geometry.bounds.bottom,f.geometry.bounds.right);
	} else {
		alertLocation = new OpenLayers.LonLat(f.geometry.x, f.geometry.y);
	}
	var html = '';
	html += '<div id="platform">';
	html += '<div id="dd1" style="width: 322px;" class="z_c_box">';
	html += '<h1 class="h1"><a href="javascript:closePopup();" class="r_n_q_s"></a>设备信息</h1>';
	html += '<div class="zc_b_cn_c">';
	html += '<table  width="100%" cellspacing="0" cellpadding="0" border="1" style="border:0px solid #c6d6e9;" class="TCKtable">';
	html += '<tr class="tb2"><td style=" color:#666; text-indent:10px;text-align: initial;" class="boxb"><strong>设备编号</strong>:'
			+ f.devcode + '</td></tr>';
	html += '<tr class="tb2"><td style=" color:#666; text-indent:10px;text-align: initial;" class="boxb"><strong>设备类型</strong>:'
			+ f.type + '</td></tr>';
	if (f.period != null) {
		html += '<tr class="tb2"><td style=" color:#666; text-indent:10px;text-align: initial;" class="boxb"><strong>采集周期</strong>:'
				+ f.period + '秒</td></tr>';
	} else {
		html += '<tr class="tb2"><td style=" color:#666; text-indent:10px;text-align: initial;" class="boxb"><strong>采集周期</strong>:  秒</td></tr>';
	}
	if (f.numerical != null) {
		html += '<tr class="tb2"><td style=" color:#666; text-indent:10px;text-align: initial;" class="boxb"><strong>当前数值</strong>:'
				+ f.numerical + 'mm</td></tr>';
	} else {
		html += '<tr class="tb2"><td style=" color:#666; text-indent:10px;text-align: initial;" class="boxb"><strong>当前数值</strong>:'
				+ '暂无数据' + '</td></tr>';
	}

	html += '<tr class="tb2"><td style=" color:#666; text-indent:10px;text-align: initial;" class="boxb"><a href="show_1.shtml?buildcode='
			+ f.buildcode
			+ '" style="cursor: pointer; text-decoration: underline; color: #1A85E1;">监测详情    </a></td></tr>';
	html += '</table>';
	html += '</div>';
	html += '</div>';
	html += '</div>';

	alertPopup = new OpenLayers.Popup("alertPopup", alertLocation,
			new OpenLayers.Size(325, 180), html, null, false, null);
	alertPopup.autoSize = false;
	alertPopup.fixedRelativePosition = true;
	map.addPopup(alertPopup);

	var left = $("#alertPopup")[0].style.left;
	left = left.substring(0, left.indexOf("p"));
	left = (left * 1) + 5;
	$("#alertPopup")[0].style.left = left + "px";

	var top = $("#alertPopup")[0].style.top;
	top = top.substring(0, top.indexOf("p"));
	top = (top * 1) + 5;
	$("#alertPopup")[0].style.top = top + "px";
}
// 传感器
function Sensor() {
	getSensorImplements();
	sensorSum.beidou = 0;
	sensorSum.cj = 0;
	sensorSum.lf = 0;
	sensorSum.qx = 0;
	for (var i = 0; i < SensorInformation.length; i++) {
		var newPoint = new OpenLayers.Geometry.Point(SensorInformation[i].lon,
				SensorInformation[i].lat);
		newPoint.transform(new OpenLayers.Projection("EPSG:4326"),
				new OpenLayers.Projection("EPSG:900913"));
		var img = "";
		var type = "";
		switch (SensorInformation[i].type) {
		case "1":
			img = "img/beidou.png";
			type = "接收机";
			break;
		case "6":
			img = "img/beidou.png";
			break;
		case "7":
			img = "img/beidou.png";
			type = "接收机";
			break;
		case "9":
			break;
		case "A":
			img = "img/QJcgq.png";
			type = "倾角器/测斜仪";
			break;
		case "B":
			type = "应变计";
			break;
		case "C":
			img = "img/LFcgq.png";
			type = "裂缝计";
			break;
		case "D":
			type = "静力水准仪";
			img = "img/jlszy.png";
			break;
		case "E":
			type = "位移计";
			img = "img/beidou.png";
			break;
		case "F":
			type = "雨量计";
			img = "img/beidou.png";
			break;
		case "G":
			type = "土压力计";
			img = "img/beidou.png";
			break;
		case "H":
			type = "水压力计";
			img = "img/beidou.png";
			break;
		case "M":
			type = "网络摄像机";
			img = "img/wlsxj.png";
			break;
		case "R":
			type = "监测网关";
			img = "img/jcwg.png";
			break;
		default:
			img = "img/beidou.png";
			type = "接收机";
			break;
		}
		;
		var Feature = new OpenLayers.Feature.Vector(newPoint);
		Feature.attributes = {
			img : img,
			name : "",
			favColor : '#000'
		};
		Feature.period = SensorInformation[i].period;
		Feature.buildcode = SensorInformation[i].buildcode;
		Feature.devcode = SensorInformation[i].devcode;
		Feature.numerical = SensorInformation[i].numerical;
		Feature.type = type;
		sensorLayer.addFeatures([ Feature ]);
	}
}