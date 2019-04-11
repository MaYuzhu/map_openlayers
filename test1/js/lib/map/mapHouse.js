var height = document.documentElement.clientHeight;// 获取可见域高度
var width = document.documentElement.clientWidth// 获取可见域宽度
$("#map").height(height-93);
$("#map").width(width-320);
var map = new OpenLayers.Map("map", {
	maxExtent : new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34,
			20037508.34),
	numZoomLevels : 17,
	maxResolution : 39135.7585,
	units : 'm',
	projection : new OpenLayers.Projection("EPSG:900913"),
	displayProjection : new OpenLayers.Projection("EPSG:4326"),
	controls : [],
	theme : null
});
var style = new OpenLayers.Style({  
	strokeColor: "#00FF00",
	strokeOpacity: 1,
	strokeWidth: 3,
	fillColor: "#FF5500",
	fillOpacity: 1,
	pointRadius: 6,
	pointerEvents: "visiblePainted",
	externalGraphic: "${img}" ,
	graphicWidth:18,  
    graphicHeight : 28, 
    
    label : "${name}",
	fontColor: "${favColor}",
	fontSize: "6px",
	fontFamily: "Courier New, monospace",
	fontWeight: "bold",
	labelAlign: "${align}",
	labelXOffset: "${xOffset}",
	labelYOffset: "${yOffset}",
	labelOutlineColor: "white",
	labelOutlineWidth: 3
}, {  
    rules: [  
        new OpenLayers.Rule({  
            minScaleDenominator: 200000000,  
            symbolizer: {  
                pointRadius: 7,  
                fontSize: "9px"  
            }  
        }),  
        new OpenLayers.Rule({  
            maxScaleDenominator: 200000000,  
            minScaleDenominator: 100000000,  
            symbolizer: {  
                pointRadius: 10,  
                fontSize: "12px"  
            }  
        }),  
        new OpenLayers.Rule({  
            maxScaleDenominator: 100000000,  
            symbolizer: {  
                pointRadius: 13,  
                fontSize: "15px"  
            }  
        })  
    ]  
});
//区域层
var featureLayer = new OpenLayers.Layer.Vector("featureLayer", {  
    styleMap: new OpenLayers.StyleMap(style)
});
//建筑层
var polygonLayer = new OpenLayers.Layer.Vector("PolygonLayer",{
	styleMap: new OpenLayers.StyleMap(
		{
			'default':{
				zIndex:10000001,
				strokeColor: "#00FF00",
				strokeOpacity: 0.2,
				strokeWidth: 5,
				fillColor: "#FF5500",
				fillOpacity: 0.2,
				pointRadius: 0,
				pointerEvents: "visiblePainted",
				label : "${name}",
				
				fontColor: "${favColor}",
				fontSize: "12px",
				fontFamily: "Courier New, monospace",
				fontWeight: "bold",
				labelAlign: "${align}",
				labelXOffset: "${xOffset}",
				labelYOffset: "${yOffset}",
				labelOutlineColor: "white",
				labelOutlineWidth: 1
			},
			'select':{
				zIndex:10000001,
				strokeColor: "red",
				strokeOpacity: 1,
				strokeWidth: 5,
				fillColor: "#FF5500",
				fillOpacity: 0.5,
				pointRadius: 0,
				pointerEvents: "visiblePainted"
			}
		})
	}	
);
//传感器层
var sensorLayer = new OpenLayers.Layer.Vector("sensorLayer",{
	styleMap: new OpenLayers.StyleMap(
		{
			'default':{
				strokeColor: "#00FF00",
				strokeOpacity: 1,
				strokeWidth: 3,
				fillColor: "#FF5500",
				fillOpacity: 1,
				pointRadius: 6,
				pointerEvents: "visiblePainted",
				externalGraphic: "${img}" ,
				graphicWidth:16,  
			    graphicHeight : 16,
			    graphicXOffset: -15,
			    graphicYOffset: -16,
			    
			    label : "${name}",
				fontColor: "${favColor}",
				fontSize: "3px",
				fontFamily: "Courier New, monospace",
				fontWeight: "bold",
				labelAlign: "${align}",
				labelXOffset: "${xOffset}",
				labelYOffset: "${yOffset}",
				labelOutlineColor: "white",
				labelOutlineWidth: 3
			},
			'select':{
				zIndex:10000001,
				strokeColor: "red",
				strokeOpacity: 1,
				strokeWidth: 5,
				fillColor: "#FF5500",
				fillOpacity: 0.5,
				pointRadius: 0,
				pointerEvents: "visiblePainted"
			}
		})
	}	
);
//线路样式 
var style_green = { 
	strokeColor: "#00FF00", 
	strokeWidth: 3, 
	strokeDashstyle: "solid", 
	pointRadius: 6, 
	pointerEvents: "visiblePainted" 
}; 

var vectorGroup,imageGroup,pointLayer,projection;
var layerType = "da";
//传感器数目
var sensorSum = {};
/**
 * 初始化
 */
init = function() {
	var resolutions = [ 156543.034,  
	                    78271.517,  
	                    39135.7585,  
	                    19567.87925,  
	                    9783.939625,  
	                    4891.9698125,  
	                    2445.98490625,  
	                    1222.992453125,  
	                    611.4962265625,  
	                    305.74811328125,  
	                    152.874056640625,  
	                    76.4370283203125,  
	                    38.21851416015625,  
	                    19.10925708007813,  
	                    9.554628540039063,  
	                    4.777314270019532,  
	                    2.388657135009766,  
	                    1.194328567504883,  
	                    0.5971642837524414  ];
	if (!map) {
		map = new OpenLayers.Map('map', {
			maxExtent : new OpenLayers.Bounds(-20037508.34, -20037508.34,
					20037508.34, 20037508.34),
			resolutions : resolutions,
			units : 'm',
			projection : new OpenLayers.Projection("EPSG:900913"),
			displayProjection : new OpenLayers.Projection("EPSG:4326"),
			controls : [],
			theme : null
		});
	}

	// 移除全部layers
	layers = map.layers;
	for (var i = 0; i < layers.length;) {
		var layer = layers[0];
		if (layer)
			map.removeLayer(layer);
	}
	// 路网按钮对象
	// 定义矢量图层组
	vectorGroup = [ new OpenLayers.Layer.TMS("矢量底图",
		 [
			"http://t1.tianditu.com/DataServer",
			"http://t2.tianditu.com/DataServer",
			"http://t3.tianditu.com/DataServer",
			"http://t4.tianditu.com/DataServer"
		 ], {
			type : "vec_w",
			getURL : get_my_url,
			isBaseLayer : true,
			maxExtent : new OpenLayers.Bounds(-20037508.34, -20037508.34,
					20037508.34, 20037508.34),
			resolutions : resolutions,
			wrapDateLine : true,
			displayOutsideMaxExtent : true,
			buffer : 1
		}),new OpenLayers.Layer.TMS("注记底图",
				 [
					"http://t1.tianditu.com/DataServer",
					"http://t2.tianditu.com/DataServer",
					"http://t3.tianditu.com/DataServer",
					"http://t4.tianditu.com/DataServer"
				 ], {
			type : "cva_w",
			getURL : get_my_url,
			isBaseLayer : false,
			maxExtent : new OpenLayers.Bounds(-20037508.34, -20037508.34,
					20037508.34, 20037508.34),
			resolutions : resolutions,
			wrapDateLine : true,
			displayOutsideMaxExtent : true,
			buffer : 1
		}) ];
	imageGroup = [
			new OpenLayers.Layer.TMS(
				 "影像底图",
				 [
						"http://t1.tianditu.cn/img_w/wmts",
						"http://t2.tianditu.cn/img_w/wmts",
						"http://t3.tianditu.cn/img_w/wmts",
						"http://t4.tianditu.cn/img_w/wmts"
				 ],
				 {
					type : "img",
					sateTiles:"jpg",
					getURL : getURL,
					isBaseLayer : true,
					maxExtent : new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
					resolutions: resolutions,
					wrapDateLine : true,
					displayOutsideMaxExtent : true,
					buffer : 1
				 }
			),
			new OpenLayers.Layer.TMS(
				 "影像注记",
				 [
						"http://t1.tianditu.com/cia_w/wmts",
						"http://t2.tianditu.com/cia_w/wmts",
						"http://t3.tianditu.com/cia_w/wmts",
						"http://t4.tianditu.com/cia_w/wmts"
				 ],
				 {
					type : "cia",
					sateTiles:"",
					getURL : getURL,
					isBaseLayer : false,
					maxExtent : new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
					resolutions: resolutions,
					wrapDateLine : true,
					displayOutsideMaxExtent : true,
					buffer : 1
				 }
			)
		];	
		vectorGroup[0].events.register("tileerror", layer, function(evt) {
			evt.tile.setImgSrc(OpenLayers.ImgPath + "vec404.png");
			return false;
		});
	
	map.addLayers(vectorGroup);
	
	//计算最大经纬度
//	var lnglats = [{lon:116.3012,lat:39.97843}]
//	console.log(lnglats);
   	var maxl = lnglats[0].buildlon, minl=lnglats[0].buildlon, maxlat=lnglats[0].buildlat, minlat=lnglats[0].buildlat;  
   	$.each(lnglats,  
   	    function(i, res) {  
   	        if(res.buildlon > maxl) maxl =res.buildlon;  
   	        if(res.buildlon < minl) minl =res.buildlon;  
   	        if(res.buildlat > maxlat) maxlat =res.buildlat;  
   	        if(res.buildlat < minlat) minlat =res.buildlat;  
   	    });  
   	//地图中心点
   	var cenLat = (parseFloat(maxlat)+parseFloat(minlat))/2;  
   	var cenLon = (parseFloat(maxl)+parseFloat(minl))/2;
   	//缩放级别
   	var countzoom = getZoom(maxl, minl, maxlat, minlat);  
   	//通过经纬度缩放级别  
   	function getZoom(maxJ, minJ, maxW, minW) {  
   	    if (maxJ == minJ && maxW == minW) return 13;  
   	    var diff = maxJ - minJ;  
   	    if (diff < (maxW - minW) * 2.1) diff = (maxW - minW) * 2.1;  
   	    diff = parseInt(10000 * diff) / 10000;  
   	  
   	    var zoomArr = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);  
   	    var diffArr = new Array(180, 90, 45, 22, 11, 5.5, 2.75, 1.37, 0.68, 0.34, 0.17, 0.08, 0.04);  
   	  
   	    for (var i = 0; i < diffArr.length; i++) {  
   	        if ((diff - diffArr[i]) >= 0) {  
   	            return zoomArr[i];  
   	        }  
   	    }  
   	    return 14;  
   	} 
	// 定位中心点
	var center = map.getCenter();
	if (!center) {
		var zoom = map.getZoom();
//		center = new OpenLayers.LonLat(120.955636, 31.387954);
		center = new OpenLayers.LonLat(cenLon, cenLat);
		center.transform(new OpenLayers.Projection("EPSG:4326"),
				new OpenLayers.Projection("EPSG:900913"));
		zoom = countzoom;
		map.setCenter(center, zoom + 1);
	}
	
	House();
//	setTimeout("Sensor()",1000); 
	map.addLayer(featureLayer);

	var measureControls = {  
		selectFeatureControl : new OpenLayers.Control.SelectFeature(featureLayer,
			{ 
				onSelect:function(f){
					houseShow(f);
				},
				multiple:false, 
				toggle:true,
				hover:true
			}
		)
	};  
	map.addControl(measureControls["selectFeatureControl"]);
	measureControls["selectFeatureControl"].activate();
	
	var sensorControls = {  
		selectFeatureControl : new OpenLayers.Control.SelectFeature(sensorLayer,
			{ 
				onSelect:function(f){
					sensorShow(f);
				},
				multiple:false, 
				toggle:true,
				hover:true
			}
		)
	};  
	map.addControl(sensorControls["selectFeatureControl"]);
	sensorControls["selectFeatureControl"].activate();
	
	//鼠标缩放事件
	map.events.register("zoomend",map,zoomedEvent);
	
	var panZoomBarControl = map.getControlsByClass("TDTPanZoomBar");
	if (!panZoomBarControl[0]) {
		initControl();// 初始化控件
	}
	
};

//危房
function House(){	 
	for(var i=0;i<HouseInformation.length;i++)
	{ 
		var pointList = [];
		var s = HouseInformation[i].data.outline;
		var j = s.split(";");
		for(var k =0; k<j.length-1; k++){
			var w = j[k].split(",");
		    var newPoint = new OpenLayers.Geometry.Point(w[0]*1,w[1]*1); 
			newPoint.transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));
			pointList.push(newPoint); 
		}
		var linearRing = new OpenLayers.Geometry.LinearRing(pointList);
		var polygon = new OpenLayers.Geometry.Polygon([linearRing]);
	
		var polygonFeature = new OpenLayers.Feature.Vector(polygon);
		polygonFeature.attributes = {
			name: "",
			favColor:"red"
		};
		polygonLayer.addFeatures([polygonFeature]);
		
		var newPoint = new OpenLayers.Geometry.Point(HouseInformation[i].data.buildlon, HouseInformation[i].data.buildlat); 
		newPoint.transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));
		var img = "";
		var build_status = "";
		switch(HouseInformation[i].data.status){
	    	case 0:
	    		build_status = "正常";
	    		img = "images/td_zhengc.png";
	    		break;
	    	case 1:
	    		build_status = "一级";
	    		img = "images/td_yiji.png";
	    		break;
	    	case 2:
	    		build_status = "二级";
	    		img = "images/td_erji.png";
	    		break;
	    	default:
	    		build_status = "三级";
	    		img = "images/td_sanji.png";
	    		break;
	    };
		
	    var Feature = new OpenLayers.Feature.Vector(newPoint);
	    Feature.attributes = {
		    	img: img,
				name: "",
				favColor: '#000',
				align: "cm",
				yOffset:17
			};
	    Feature.buildcode = HouseInformation[i].data.buildcode;
	    Feature.name = HouseInformation[i].data.buildname;
	    Feature.addr = HouseInformation[i].data.buildaddr;
	    Feature.build_status = build_status;
//	    Feature.buildlevel = HouseInformation[i].data.buildlevel;
	    Feature.lon = HouseInformation[i].data.buildlon;
	    Feature.lat = HouseInformation[i].data.buildlat;
	    
//	    if( HouseInformation[i].data.servst != null )
//	    {
//		    var ser = HouseInformation[i].data.servst;
//		    ser = ser.substring(0,ser.indexOf(' '));
//		    Feature.servst = ser;
//	    }
//	    else
//		    Feature.servst = "2016-01-01";
//	    if( HouseInformation[i].data.servet != null )
//	    {
//		    var vet = HouseInformation[i].data.servet;
//		    vet = vet.substring(0,vet.indexOf(' '));
//		    Feature.servet = vet;
//	    }
//	    else
//		    Feature.servet = "2016-01-01";
	    
	    Feature.bd = HouseInformation[i].bd;
	    Feature.cj = HouseInformation[i].cj;
	    Feature.lf = HouseInformation[i].lf;
	    Feature.qx = HouseInformation[i].qx;
	    Feature.sp = HouseInformation[i].sp;
	    Feature.g = HouseInformation[i].g;
		featureLayer.addFeatures([Feature]);
	} 
}
function popup(e){
	 // 显示地图屏幕坐标
	alert(0);
}
//地图类型切换
typeSwitch = function(obj){
	layers = map.layers;
	for (var i = 0; i < layers.length;) {
		var layer = layers[i];
		map.removeLayer(layer);
	}
	if(obj == "img"){
		$("#map_type_vector").css("display","none");
		$("#map_type_image").css("display","block");
		map.addLayers(vectorGroup);
	}else{
		$("#map_type_image").css("display","none");
		$("#map_type_vector").css("display","block");
		map.addLayers(imageGroup);
	}
	
	var zoom = map.getZoom();
	if(zoom < 17){
		map.addLayer(featureLayer);
	}else{
		map.addLayer(polygonLayer);
		map.addLayer(sensorLayer);
	}
}
//鼠标缩放事件
zoomedEvent = function(){
	var zoom = map.getZoom();
	if(zoom < 17 && layerType != "da"){
		removelayer("PolygonLayer");
		removelayer("sensorLayer");
		if(alertPopup != null){
			map.removePopup(alertPopup);
		}
		layerType = "da";
		map.addLayer(featureLayer);
		
	}else if(zoom > 16 && layerType != "xiao"){
		removelayer("featureLayer");
		if(alertPopup != null){
			map.removePopup(alertPopup);
		}
		layerType = "xiao";
		map.addLayer(polygonLayer);
		map.addLayer(sensorLayer);
	}
};
//添加图层
addWMS = function(wmsLayer,id){
//	console.log(wmsLayer);
	var data = {};
	if(id != null && id != ""){
		data = {
				LAYERS: wmsLayer,
				cql_filter:'scenario_type='+id,
				STYLES: '',
				format: 'image/png',
				tiled: true,
				transparent: true,
				tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		}
	}else{
		data = {
				LAYERS: wmsLayer,
				STYLES: '',
				format: 'image/png',
				tiled: true,
				transparent: true,
				tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		}
	}
	//wmsLayer = 'it.geosolutions:TTLINE500';
	var layer = new OpenLayers.Layer.WMS(
		wmsLayer, 
		DC.wmsURL,
		data,
		{
			buffer: 1,
			displayOutsideMaxExtent: true,
			isBaseLayer: false,
			yx : {'EPSG:900913' : true}
		} 
	);
	map.addLayer(layer);
};
//移除掉某个图层
removelayer = function(name){
	layers = map.layers;
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
		if (layer.name == name){
			map.removeLayer(layer);
			i = i-1;
		}
	}
}

//获取时间
function currenttime(){
	var myDate = DC.myDate;
	var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
	var month = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
	if(month<10){
		month = "0"+month;
	}
	var day = myDate.getDate();        //获取当前日(1-31)
	if(day<10){
		day = "0"+day;
	}
	var hours = myDate.getHours();       //获取当前小时数(0-23)
	if(hours<10){
		hours = "0"+hours;
	}
	var minutes = myDate.getMinutes();     //获取当前分钟数(0-59)
	if(minutes<10){
		minutes = "0"+minutes;
	}
	var seconds = myDate.getSeconds();     //获取当前秒数(0-59)
	if(seconds<10){
		seconds = "0"+seconds;
	}
	DC.myDate.setSeconds(seconds+5);
	var time = year+"-"+month+"-"+day+"T"+hours+":"+minutes+":"+seconds+"Z";
	return time;
}
/**
 * 初始化地图控件
 */
initControl = function() {
	// 鼠标操作功能
	var navigation = map
			.getControlsByClass("OpenLayers.Control.Navigation");
	if (navigation == "") {
		navigation = new OpenLayers.Control.Navigation({
			dragPanOptions : {
				enableKinetic : true,
				documentDrag : true
			},
			zoomBoxEnabled : true,
			zoomWheelEnabled : true,
			zoomBoxKeyMask : OpenLayers.Handler.MOD_SHIFT
		});
		map.addControl(navigation);
	}
	// 鼠标坐标
	var mousePosition = map
			.getControlsByClass("OpenLayers.Control.MousePosition");
	if (mousePosition == "") {
		mousePosition = new OpenLayers.Control.MousePosition();
		mousePosition.numDigits = 6;
		mousePosition.prefix = "\u7ECF\u5EA6:";// 经度:\u7ECF\u5EA6
		mousePosition.separator = ", \u7EAC\u5EA6:";// 纬度:\u7EAC\u5EA6
		map.addControl(mousePosition);
	}
	// 比例尺
	var ScaleLine = map
			.getControlsByClass("OpenLayers.Control.ScaleLine");
	if (ScaleLine == "") {
		OpenLayers.INCHES_PER_UNIT["\u516C\u91CC"] = OpenLayers.INCHES_PER_UNIT["km"];
		OpenLayers.INCHES_PER_UNIT["\u7C73"] = OpenLayers.INCHES_PER_UNIT["m"];
		OpenLayers.INCHES_PER_UNIT["\u82F1\u5C3A"] = OpenLayers.INCHES_PER_UNIT["ft"];
		OpenLayers.INCHES_PER_UNIT["\u82F1\u91CC"] = OpenLayers.INCHES_PER_UNIT["mi"];

		ScaleLine = new OpenLayers.Control.ScaleLine();
		ScaleLine.bottomInUnits = "\u82F1\u5C3A";// 英尺
		ScaleLine.bottomOutUnits = "\u82F1\u91CC";// 英里
		ScaleLine.topInUnits = "\u7C73";// 米
		ScaleLine.topOutUnits = "\u516C\u91CC";// 公里
		map.addControl(ScaleLine);
	}
}

styleMouseOver = function(obj) { // 鼠标经过样式
	obj.style.color = "#FFF";
}
styleMouseOut = function(obj) { // 鼠标移出样式
	obj.style.color = "#666";
}
arrayBindId = []; // 存储注册事件ID
mapTypeRegister = function(array_obj) { // 注册事件
	var length = array_obj.length;
	for (var i = 0; i < length; i++) {
		var obj = $(array_obj[i]);
		if (obj != null && obj != undefined) {
			obj.className = "";
		}
	}
}
mapTypeUnregister = function(array_obj) { // 销毁事件
	var length = array_obj.length;
	for (var i = 0; i < length; i++) {
		var obj = $(array_obj[i]);
		if (obj != null && obj != undefined) {
			obj.className = "on";
		}
	}
}

/**
 * 瓦片规则组装url
 * 
 * @param bounds
 * @returns {String}
 */
get_my_url = function(bounds) {
	var res = this.map.getResolution();  
    var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));  
    var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));  
    var z = this.map.getZoom();  
    var path = "?T="+this.type+"&x="+x+"&y="+y+"&l="+z+"&tk=207653a6c628d6e51d1cd31598ae0b9f";
    var url = this.url;  
    if (url instanceof Array) {  
        url = this.selectUrl(path, url);  
    }  
    return url + path;  

};
getURL = function (bounds) {

	 var res = this.map.getResolution();
	    var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	    var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
	    var z = this.map.getZoom();
	    var path = "?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER="+this.type+"&STYLE=default&TILEMATRIXSET=w&TILEMATRIX="+z+"&TILEROW="+y+"&TILECOL="+x+"&FORMAT=tiles";
		//var path = "?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER="+this.type+"&STYLE=default&TILEMATRIXSET=c&TILEMATRIX="+z+"&TILEROW="+y+"&TILECOL="+x+"&FORMAT=tiles";
	    var url = this.url;
	    if (url instanceof Array) {
	        url = this.selectUrl(path, url);
	    }
	    return url + path;
}

modulo = function(a, b) {
	var r = a % b;
	return r * b < 0 ? r + b : r;
}

/**
 * AJAX函数
 */
Ajax = function() {
	function request(url, opt) {
		function fn() {
		}
		var async = opt.async !== false, method = opt.method || 'GET', data = opt.data
				|| null, success = opt.success || fn, failure = opt.failure
				|| fn;
		method = method.toUpperCase();
		if (method == 'GET' && data) {
			url += (url.indexOf('?') == -1 ? '?' : '&') + data;
			data = null;
		}
		var xhr = null;
		if (window.ActiveXObject) {
			var arrayActive = [ "Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0",
					"Msxml2.XMLHTTP.4.0", "Msxml2.XMLHTTP.3.0",
					"Msxml2.XMLHTTP", "Microsoft.XMLHTTP" ];
			for (var i = 0; i < arrayActive.length; i++) {
				try {
					xhr = new ActiveXObject(arrayActive[i]);
					break;
				} catch (e) {
					continue;
				}
			}
		} else if (window.XMLHttpRequest) {
			try {
				xhr = new XMLHttpRequest();
			} catch (e) {
				xhr = null;
			}
		} else {
			xhr = null;
		}

		// var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new
		// ActiveXObject('Microsoft.XMLHTTP');
		xhr.open(method, url, async);
		if (method == 'POST') {
			xhr.setRequestHeader('Content-type',
					'application/x-www-form-urlencoded');
		}
		xhr.onreadystatechange = function() {
			_onStateChange(xhr, success, failure);
		};
		xhr.send(data);
		return xhr;
	}
	// 响应是否成功，注：200~300之间或304的都理解成响应成功，当然你也可以改写成状态为：200
	function _onStateChange(xhr, success, failure) {
		if (xhr.readyState == 4) {
			var s = xhr.status;
			if (s >= 200 && s < 300) {
				success(xhr);
			} else {
				failure(xhr);
			}
		} else {
		}
	}
	return {
		request : request
	};
}();
