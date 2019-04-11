/**
 * 20171102 火烧
 * 
 * 下面模型和webgl3d的代码都在这，其他地方的走作废
 */

var floor = {};
floor.name = [];
floor.Z = [];
floor.textZ = [];


var a3d = {};

if(!a3d.data)
	a3d.data = null;// 数据

a3d.floor_max = {
	x : null,
	y : null,
	z : null
};// 记录第8层最大值

//放大倍数
a3d.enlargement = 1;

//频率
a3d.frequency = 1000 / 20;


//var floor = null;

$(function() {
	
//	if($("#swmx_x").length > 0){
//		addModel();
		
//	}
	
	if($("#afloor").length > 0){
		threeStart();
	}

	if ($("#swmx_x").length > 0 || $("#afloor").length > 0) {
//		console.log(a3d.data);
		
		if (a3d.data) {
			if(a3d.data == "--"){
//				等待数据
				var d_data = setInterval(function(){
					console.log(a3d.data);
					if(a3d.data != "--"){
						a3d.updateModel(a3d.data);
						a3d.webgl(a3d.data);
						clearInterval(d_data);
					}
				},500);
			}else{
				a3d.updateModel(a3d.data);
				a3d.webgl(a3d.data);
			}
		} else {
			a3d.getDisplacementCorrection();
		}
	}
});
// 获取数据
a3d.getDisplacementCorrection = function() {

	var thisDate = pFun.date.getNowFormatDate(0);
	$.ajax({
		type : "get",
		cache : true,
		url : url + "zzcismp/earthquakeData/getDisplacementCorrection.shtml",
		data : {
			location : "middle",
			groundfloor : 0,
			topfloor : 7,
			flag : 10,// 稀释，每秒数量掉5
			starttime : pFun.date.getDate(thisDate, 0, 0, 0, 0, 0, -30),
			endtime : thisDate
		},
		contentType : "application/javascript;charset=UTF-8",
		xhrFields : {
			withCredentials : true
		},
		crossDomain : true,
		dataType : "jsonp",
		jsonp : "callback",
		success : function(json) {
			// a3d.data = json;
			a3d.updateModel(json);
			a3d.webgl(json);
		}
	});
}

// 修改模型
addmodel = false;
a3d.updateModel = function(data) {
	if ($("#swmx_x").length == 0)
		return;
	
	if(!addmodel){
		addModel();
		addmodel = true;
	}
	
	var dataFormat = a3d.dataFormat(data);
//	console.log(dataFormat);
//	return;

//	$(".ruler .red div").html((((a3d.floor_max.y) * floorValueColor.red).toFixed(8) * 1) + "m");
//	$(".ruler .yellow div").html((((a3d.floor_max.y) * floorValueColor.yellow).toFixed(8) * 1) + "m");
//	$(".ruler .green div").html((((a3d.floor_max.y) * floorValueColor.green).toFixed(8) * 1) + "m");
//	console.log(floor);

	var fk = 0;
	var floor_animation = setInterval(function() {
		var thisTime = [];
		for ( var f=0;f<=7;f++) {
			thisTime[f] = {
				x : parseFloat(dataFormat[f][fk].x)*a3d.enlargement/2,
				y : parseFloat(dataFormat[f][fk].y)*a3d.enlargement/2,
				z : parseFloat(dataFormat[f][fk].z)*a3d.enlargement/2,
				angle : parseFloat(dataFormat[f][fk].angle)
			};
		}
		updateModel(thisTime, $("input[name=Mxyz]:checked").val());
		
//		if (fk > 20)
//			clearInterval(floor_animation);

		fk++;
		if (fk >= dataFormat[0].length) {
			if(a3d.data){
				fk = 0;
			}else{
				clearInterval(floor_animation);
				a3d.getDisplacementCorrection();
			}
		}
	}, a3d.frequency);
}


// 修改webgl
a3d.webgl = function(data) {
	if ($("#afloor").length == 0)
		return;
	var dataFormat = a3d.dataFormat(data);

	
	var fk = 0;
	var floor_animation = setInterval(function() {
		var thisTime = [];
		for ( var f=0;f<=7;f++) {
			thisTime[f] = {
				x : parseFloat(dataFormat[f][fk].x)*a3d.enlargement,
				y : parseFloat(dataFormat[f][fk].y)*a3d.enlargement,
				z : parseFloat(dataFormat[f][fk].z)*a3d.enlargement,
				angle : dataFormat[f][fk].angle
			};
		}
		render(thisTime, $("input[name=Mxyz]:checked").val());
		
//		if(fk>10)
//			clearInterval(floor_animation);

		fk++;
		if (fk >= dataFormat[0].length) {
			if(a3d.data){
				fk = 0;
			}else{
				clearInterval(floor_animation);
				a3d.getDisplacementCorrection();
			}
		}
	}, a3d.frequency);
}

// 整理数据
a3d.dataFormat = function(data) {
	dataFormat = data;
//	console.log(dataFormat[7]);

	// 计算八楼最大值
	var xyz_arr = {
		x : [],
		y : [],
		z : []
	};
	for ( var i in dataFormat[7]) {
		xyz_arr.x.push(parseFloat(dataFormat[7][i].x));
		xyz_arr.y.push(dataFormat[7][i].y);
		xyz_arr.z.push(dataFormat[7][i].z);
	}

	for ( var a in xyz_arr) {
		var tmax = Math.max.apply(null, xyz_arr[a]);
		var tmin = Math.min.apply(null, xyz_arr[a]);

		if (Math.abs(tmax) > Math.abs(tmin)) {
			a3d.floor_max[a] = Math.abs(tmax)*a3d.enlargement;
		} else {
			a3d.floor_max[a] = Math.abs(tmin)*a3d.enlargement;
		}
	}
	
	return data;
}

// 开启关闭固定视角
function setManipulatorEnable(input) {
	var b = $(input).is(':checked');

	if (b) {
		pluginX().setManipulatorEnable(false);
	} else {
		pluginX().setManipulatorEnable(true);
	}
}

// 三维模块
function pluginDomX() {
	return document.getElementById('swmx_x');
}
pluginX = pluginDomX;

function updateModel(floorData, offset) {
	if (!floorData)
		return;
	
	var s = 1;
//	console.log(floorData);
	
	floor.Z[7] = floorData[7];
	floor.Z[6] = floorData[6];
	floor.Z[5] = floorData[5];
	floor.Z[4] = floorData[4];
	floor.Z[3] = floorData[3];
	floor.Z[2] = floorData[2];
	floor.Z[1] = floorData[1];
	floor.Z[0] = floorData[0];

//	console.log(floor.name.length);
	
	var a, b, c;
	for (var i = 0; i < floor.name.length; i++) {
		var random = floor.Z[i];


		if (Math.abs(random.angle) >= floorValueColor.red) {
			// 红
			a = 0.866666;
			b = 0.317647;
			c = 0.298039;
		} else if (Math.abs(random.angle) >= floorValueColor.yellow) {
			// 黄
			a = 0.952941;
			b = 0.478431;
			c = 0.113725;
		} else if (Math.abs(random.angle) >= floorValueColor.green) {
			// 绿
			a = 0.368627;
			b = 0.725490;
			c = 0.368627;
		} else {
			// 黑
			a = 0.368627;
			b = 0.725490;
			c = 0.368627;
//			a = 0.2;
//			b = 0.2;
//			c = 0.2;
		}
		// if(pluginX().valid&&pluginY().valid&&pluginXY().valid)
		if (pluginX().valid) {
			var modelX = {};
			modelX.name = floor.name[i];
			// modelX.text = floor.Z[i];
			modelX.textX = 80;
			modelX.textY = -30;
			modelX.textZ = floor.textZ[i];
			// 动态位移设置
			if (offset == "X") {
				modelX.offsetX = random.x/s;
				modelX.offsetY = 0;
			} else if (offset == "Y") {
				modelX.offsetX = 0;
				modelX.offsetY = random.y/s;
			} else if (offset == "Z") {
				modelX.offsetX = random.x/s;
				modelX.offsetY = random.y/s;
			}
			// end
			modelX.offsetZ = 0;
			pluginX().updatemodel(modelX);
			// console.log(i);
			// console.log(a);
			// console.log('---------d');
			if (a != 0.2) {
				pluginX().setModelColor(floor.name[i], a, b, c, 1);
			} else {
				pluginX().clearModelColor(floor.name[i]);
			}
		} else {
			alert("plugin is not working :(");
		}
	}
}

function addModel() {
	if (pluginX().valid) {
		var model = {};
		model.url = "dx714.osgb";
		model.name = "B1"
		model.offsetX = 52.5;
		model.offsetY = 17;
		model.offsetZ = -5;
		model.text = "";
		model.textX = 0;
		model.textY = 0;
		model.textZ = 0;
		pluginX().addmodel(model);

		model.url = "dx714.osgb";
		model.name = "B2"
		model.offsetX = 52.5;
		model.offsetY = 17;
		model.offsetZ = -10;
		model.text = "";
		model.textX = 0;
		model.textY = 0;
		model.textZ = 0;
		pluginX().addmodel(model);

		var model1 = {};
		model1.url = "dxright714.osgb";
		model1.name = "B12";
		model1.offsetX = 52.5 + 30;
		model1.offsetY = 17;
		model1.offsetZ = -10;
		model1.text = "";
		model1.textX = 0;
		model1.textY = 0;
		model1.textZ = 0;
		pluginX().addmodel(model1);

		var model2 = {};
		model2.url = "1F.osgb";
		model2.name = "L1";
		model2.offsetX = 0;
		model2.offsetY = 0;
		model2.offsetZ = 0;
		model2.text = "";
		model2.textX = 80;
		model2.textY = -30;
		model2.textZ = 6;
		pluginX().addmodel(model2);
		floor.name.push(model2.name);
		floor.textZ.push(model2.textZ);

		model2.url = "2F.osgb";
		model2.name = "L2";
		// model2.offsetZ = 3;
		model2.textZ = 10;
		pluginX().addmodel(model2);
		floor.name.push(model2.name);
		floor.textZ.push(model2.textZ);

		model2.url = "3F.osgb";
		model2.name = "L3";
		// model2.offsetZ = 6;
		model2.textZ = 10 + 3 * 1;
		pluginX().addmodel(model2);
		floor.name.push(model2.name);
		floor.textZ.push(model2.textZ);

		model2.url = "4F.osgb";
		model2.name = "L4";
		// model2.offsetZ = 9;
		model2.textZ = 10 + 3 * 2;
		pluginX().addmodel(model2);
		floor.name.push(model2.name);
		floor.textZ.push(model2.textZ);

		model2.url = "5F.osgb";
		model2.name = "L5";
		// model2.offsetZ = 12;
		model2.textZ = 10 + 3 * 3;
		pluginX().addmodel(model2);
		floor.name.push(model2.name);
		floor.textZ.push(model2.textZ);

		model2.url = "6F.osgb";
		model2.name = "L6";
		// model2.url = "box2.OSGB";
		// model2.offsetZ = 15;
		model2.textZ = 10 + 3 * 4;
		pluginX().addmodel(model2);
		floor.name.push(model2.name);
		floor.textZ.push(model2.textZ);

		model2.url = "7F.osgb";
		model2.name = "L7";
		// model2.url = "box2.OSGB";
		// model2.offsetZ = 15;
		model2.textZ = 10 + 3 * 5;
		pluginX().addmodel(model2);
		floor.name.push(model2.name);
		floor.textZ.push(model2.textZ);

		model2.url = "8F.osgb";
		model2.name = "L8";
		// model2.url = "box2.OSGB";
		// model2.offsetZ = 15;
		model2.textZ = 10 + 3 * 6;
		pluginX().addmodel(model2);
		floor.name.push(model2.name);
		floor.textZ.push(model2.textZ);
	} else {
		// alert("Plugin is not working :(");
	}
}
