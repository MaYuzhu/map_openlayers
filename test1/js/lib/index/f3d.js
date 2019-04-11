var height = document.documentElement.clientHeight;// 获取可见域高度
var width = document.documentElement.clientWidth// 获取可见域宽度
var shift_x;
var shift_y;

//楼位移最大值
var fv = 0;

var dataGconfig = {};
	dataGconfig.info = 5;
	dataGconfig.chn = null;
	dataGconfig.r = false;
	dataGconfig.direction = "y";
//var url ="http://36.110.66.202/";
//var url ="http://192.168.20.23:8181/";
var url = pFun.config.url;
$(function() {

	addModel();
});

// 三维模块
function pluginDomX() {
	return document.getElementById('swmx_x');
}
pluginX = pluginDomX;

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
		model1.offsetX = 52.5+30;
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
//		alert("Plugin is not working :(");
	}
}

function updateModel(Model_top_num) {
	if(!Model_top_num) return;
	var type = "";
	var obj = document.getElementsByName("Mxyz");
	for (var i = 0; i < obj.length; i++) {
		if (obj[i].checked) {
			type = obj[i].value;
		}
	}
	
//	console.log(obj[0].checked);
//	console.log(obj[1].checked);
//	console.log(obj[2].checked);

	// Model floor.Z
	var Model = [ {
		floor_name : "1F",
		num : 0.05
	}, {
		floor_name : "2F",
		num : 0.1
	}, {
		floor_name : "4F",
		num : 0.15
	}, {
		floor_name : "8F",
		num : 0.3
	} ];

//	Model[3].num = (parseInt((Math.random() * (10 - 0) + 0))) / 20;
//	Model[3].num = (parseInt((Math.random() * (10 - 0) + 0))) * -1;
//	Model[3].num = Model_3_num;
//	console.log(Model[3].num);
	
	

//	floor.Z[0] = Model[0].num;
//	floor.Z[1] = Model[1].num;
//	floor.Z[3] = Model[2].num;
//	floor.Z[7] = Model[3].num;
//
//	floor.Z[2] = (Model[2].num - Model[1].num) / 2 + Model[1].num;
//	floor.Z[4] = (Model[3].num - Model[2].num) / 4 + Model[2].num;
//	floor.Z[5] = 2 * (Model[3].num - Model[2].num) / 4 + Model[2].num;
//	floor.Z[6] = 3 * (Model[3].num - Model[2].num) / 4 + Model[2].num;
	
//	几层动？
	var fn = 5;
	
	floor.Z[7] = Model_top_num;
	floor.Z[6] = Model_top_num/fn*4;
	floor.Z[5] = Model_top_num/fn*3;
	floor.Z[4] = Model_top_num/fn*2;
	floor.Z[3] = Model_top_num/fn*1;
	floor.Z[2] = 0;
	floor.Z[1] = 0;
	floor.Z[0] = 0;
	
	
	var a, b, c;
	for (var i = 0; i < floor.name.length; i++) {
		var random = floor.Z[i];

		var temp_fv = fv;
//		var temp_fv = fv*1000;
//		random*=1000;
		

		if (Math.abs(random) >= temp_fv*floorValueColor.red) {
//			红
			a = 0.866666;
			b = 0.317647;
			c = 0.298039;
		} else if (Math.abs(random) >= temp_fv*floorValueColor.yellow) {
//			黄
			a = 0.952941;
			b = 0.478431;
			c = 0.113725;
		} else if(Math.abs(random) >= temp_fv*floorValueColor.green) {
//			绿
			a = 0.368627;
			b = 0.725490;
			c = 0.368627;
		}else{
//			黑
			a = 0.2;
			b = 0.2;
			c = 0.2;
		}
		// if(pluginX().valid&&pluginY().valid&&pluginXY().valid)
		if (pluginX().valid) {
			var modelX = {};
			modelX.name = floor.name[i];
			//modelX.text = floor.Z[i];
			modelX.textX = 80;
			modelX.textY = -30;
			modelX.textZ = floor.textZ[i];
			// 动态位移设置
			if (type == "X") {
				modelX.offsetX = random;
				modelX.offsetY = 0;
			} else if (type == "Y") {
				modelX.offsetX = 0;
				modelX.offsetY = random;
			} else if (type == "Z") {
				modelX.offsetX = random;
				modelX.offsetY = random;
			}
			// end
			modelX.offsetZ = 0;
			pluginX().updatemodel(modelX);
//			console.log(i);
//			console.log(a);
//			console.log('---------d');
			if (i>2 && a!=0.2) {
				pluginX().setModelColor(floor.name[i], a, b, c, 1);
			}else{
				pluginX().clearModelColor(floor.name[i]);
			}
		} else {
			alert("plugin is not working :(");
		}
	}
}
