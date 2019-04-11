var height = document.documentElement.clientHeight;// 获取可见域高度
var width = document.documentElement.clientWidth// 获取可见域宽度
var shift_x;
var shift_y;
var floor = {};
floor.name = [];
floor.Z = [];
floor.textZ = [];
$(function() {
	$("#dev_data").height(height-190);
	/*$("#dev_data").width(width*0.5);*/
//	$("#deviceA").height(height-300);
//	$("#deviceA").width(width*0.49);
	$("#deviceA").height(450);
	$("#deviceA").width(730);
//	$("#t_starttime").val(NowDate());
//	$("#t_endtime").val(NowDate());
	login();
	Data("#date_day","A");
//	addModel();
//	addModel2();
//	addModel3();
});





//三维模块
//function pluginDomX()
//{
//    return document.getElementById('swmx_x');
//}
//pluginX = pluginDomX;

//function pluginDomX2()
//{
//    return document.getElementById('swmx_y');
//}
//pluginX2 = pluginDomX2;
//
//function pluginDomX3()
//{
//    return document.getElementById('swmx_xy');
//}
//pluginX3 = pluginDomX3;

//function addModel()
//{
//	if(pluginX().valid)
//	{
//		var model = {};
//		model.url = "dx714.osgb";
//		model.name = "B1"
//		model.offsetX = 52.5;
//		model.offsetY = 17;
//		model.offsetZ = -5;
//		model.text = "";
//		model.textX = 0;
//		model.textY = 0;
//		model.textZ = 0;
//		pluginX().addmodel(model);
//		
//		model.url = "dx714.osgb";
//		model.name = "B2"
//		model.offsetX = 52.5;
//		model.offsetY = 17;
//		model.offsetZ = -10;
//		model.text = "";
//		model.textX = 0;
//		model.textY = 0;
//		model.textZ = 0;
//		pluginX().addmodel(model);
//
//		var model1 = {};
//		model1.url = "dxright714.osgb";
//		model1.name = "B12";
//		model1.offsetX = 52.5+30;
//		model1.offsetY = 17;
//		model1.offsetZ = -10;
//		model1.text = "";
//		model1.textX = 0;
//		model1.textY = 0;
//		model1.textZ = 0;
//		pluginX().addmodel(model1);
//		
//		var model2 = {};
//		model2.url = "1F.osgb";
//		model2.name = "L1";
//		model2.offsetX = 0;
//		model2.offsetY = 0;
//		model2.offsetZ = 0;
//		model2.text = "";
//		model2.textX = 80;
//		model2.textY = -30;
//		model2.textZ = 6;
//		pluginX().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "2F.osgb";
//		model2.name = "L2";
//		model2.textZ = 10;
//		pluginX().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "3F.osgb";
//		model2.name = "L3";
//		model2.textZ = 10 + 3*1;
//		pluginX().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "4F.osgb";
//		model2.name = "L4";
//		model2.textZ = 10+ 3*2;
//		pluginX().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "5F.osgb";
//		model2.name = "L5";
//		model2.textZ = 10 + 3*3;
//		pluginX().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "6F.osgb";
//		model2.name = "L6";
//		model2.textZ = 10+ 3*4;
//		pluginX().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "7F.osgb";
//		model2.name = "L7";
//		model2.textZ = 10 + 3*5;
//		pluginX().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "8F.osgb";
//		model2.name = "L8";
//		model2.textZ = 10 + 3*6;
//		pluginX().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//    } else {
////        alert("Plugin is not working :(");
//    }
//}
//
//function updateModel()
//{
////	return;
//	var type = "";
//	var obj = document.getElementsByName("Mxyz");
//	for (var i = 0; i < obj.length; i++) {
//		if (obj[i].checked) {
//			type = obj[i].value;
//		}
//	}
//	// Model floor.Z
//	var Model = [ {
//		floor_name : "1F",
//		num : 0.05
//	}, {
//		floor_name : "2F",
//		num : 0.1
//	}, {
//		floor_name : "4F",
//		num : 0.15
//	}, {
//		floor_name : "8F",
//		num : 0.3
//	} ];
//
//	Model[3].num = (parseInt((Math.random() * (10 - 0) + 0))) / 20;
//
//	floor.Z[0] = Model[0].num;
//	floor.Z[1] = Model[1].num;
//	floor.Z[3] = Model[2].num;
//	floor.Z[7] = Model[3].num;
//
//	floor.Z[2] = (Model[2].num - Model[1].num) / 2 + Model[1].num;
//	floor.Z[4] = (Model[3].num - Model[2].num) / 4 + Model[2].num;
//	floor.Z[5] = 2 * (Model[3].num - Model[2].num) / 4 + Model[2].num;
//	floor.Z[6] = 3 * (Model[3].num - Model[2].num) / 4 + Model[2].num;
//	var a, b, c;
//	for (var i = 0; i < floor.name.length; i++) {
//		var random = floor.Z[i];
//		if (-0.1 < random && random < 0.3) {
//			a = 0.2;
//			b = 0.2;
//			c = 0.2;
//		} else if (0.3 <= random && random < 0.5) {
//			a = 0.368627;
//			b = 0.725490;
//			c = 0.368627;
//		} else if (0.5 <= random && random < 0.8) {
//			a = 0.952941;
//			b = 0.478431;
//			c = 0.113725;
//		} else {
//			a = 0.866666;
//			b = 0.317647;
//			c = 0.298039;
//		}
//		if (pluginX().valid) {
//			var modelX = {};
//			modelX.name = floor.name[i];
////			modelX.text = floor.Z[i];
//			modelX.textX = 80;
//			modelX.textY = -30;
//			modelX.textZ = floor.textZ[i];
//			// 动态位移设置
//			if (type == "X") {
//				modelX.offsetX = random;
//				modelX.offsetY = 0;
//			} else if (type == "Y") {
//				modelX.offsetX = 0;
//				modelX.offsetY = random;
//			} else if (type == "Z") {
//				modelX.offsetX = random;
//				modelX.offsetY = random;
//			}
//			// end
//			modelX.offsetZ = 0;
//			pluginX().updatemodel(modelX);
//			if (random > 0.3) {
//				pluginX().setModelColor(floor.name[i], a, b, c, 1);
//			}else{
//				pluginX().clearModelColor(floor.name[i]);
//			}
//		} else {
////			alert("plugin is not working :(");
//		}
//	}
//}

//function addModel2()
//{
//	if(pluginX2().valid)
//	{
//		var model = {};
//		model.url = "dx714.osgb";
//		model.name = "B1"
//		model.offsetX = 52.5;
//		model.offsetY = 17;
//		model.offsetZ = -5;
//		model.text = "";
//		model.textX = 0;
//		model.textY = 0;
//		model.textZ = 0;
//		pluginX2().addmodel(model);
//		
//		model.url = "dx714.osgb";
//		model.name = "B2"
//		model.offsetX = 52.5;
//		model.offsetY = 17;
//		model.offsetZ = -10;
//		model.text = "";
//		model.textX = 0;
//		model.textY = 0;
//		model.textZ = 0;
//		pluginX2().addmodel(model);
//
//		var model1 = {};
//		model1.url = "dxright714.osgb";
//		model1.name = "B12";
//		model1.offsetX = 52.5+30;
//		model1.offsetY = 17;
//		model1.offsetZ = -10;
//		model1.text = "";
//		model1.textX = 0;
//		model1.textY = 0;
//		model1.textZ = 0;
//		pluginX2().addmodel(model1);
//		
//		var model2 = {};
//		model2.url = "1F.osgb";
//		model2.name = "L1";
//		model2.offsetX = 0;
//		model2.offsetY = 0;
//		model2.offsetZ = 0;
//		model2.text = "";
//		model2.textX = 80;
//		model2.textY = -30;
//		model2.textZ = 6;
//		pluginX2().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "2F.osgb";
//		model2.name = "L2";
//		model2.textZ = 10;
//		pluginX2().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "3F.osgb";
//		model2.name = "L3";
//		model2.textZ = 10 + 3*1;
//		pluginX2().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "4F.osgb";
//		model2.name = "L4";
//		model2.textZ = 10+ 3*2;
//		pluginX2().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "5F.osgb";
//		model2.name = "L5";
//		model2.textZ = 10 + 3*3;
//		pluginX2().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "6F.osgb";
//		model2.name = "L6";
//		model2.textZ = 10+ 3*4;
//		pluginX2().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "7F.osgb";
//		model2.name = "L7";
//		model2.textZ = 10 + 3*5;
//		pluginX2().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "8F.osgb";
//		model2.name = "L8";
//		model2.textZ = 10 + 3*6;
//		pluginX2().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//    } else {
////        alert("Plugin is not working :(");
//    }
//}
//function updateModel2()
//{
////	return;
//	var type = "";
//	var obj = document.getElementsByName("Mxyz");
//	for (var i = 0; i < obj.length; i++) {
//		if (obj[i].checked) {
//			type = obj[i].value;
//		}
//	}
//	// Model floor.Z
//	var Model = [ {
//		floor_name : "1F",
//		num : 0.05
//	}, {
//		floor_name : "2F",
//		num : 0.1
//	}, {
//		floor_name : "4F",
//		num : 0.15
//	}, {
//		floor_name : "8F",
//		num : 0.3
//	} ];
//
//	Model[3].num = (parseInt((Math.random() * (10 - 0) + 0))) / 20;
//
//	floor.Z[0] = Model[0].num;
//	floor.Z[1] = Model[1].num;
//	floor.Z[3] = Model[2].num;
//	floor.Z[7] = Model[3].num;
//
//	floor.Z[2] = (Model[2].num - Model[1].num) / 2 + Model[1].num;
//	floor.Z[4] = (Model[3].num - Model[2].num) / 4 + Model[2].num;
//	floor.Z[5] = 2 * (Model[3].num - Model[2].num) / 4 + Model[2].num;
//	floor.Z[6] = 3 * (Model[3].num - Model[2].num) / 4 + Model[2].num;
//	var a, b, c;
//	for (var i = 0; i < floor.name.length; i++) {
//		var random = floor.Z[i];
//		if (-0.1 < random && random < 0.3) {
//			a = 0.2;
//			b = 0.2;
//			c = 0.2;
//		} else if (0.3 <= random && random < 0.5) {
//			a = 0.368627;
//			b = 0.725490;
//			c = 0.368627;
//		} else if (0.5 <= random && random < 0.8) {
//			a = 0.952941;
//			b = 0.478431;
//			c = 0.113725;
//		} else {
//			a = 0.866666;
//			b = 0.317647;
//			c = 0.298039;
//		}
//		if (pluginX2().valid) {
//			var modelX = {};
//			modelX.name = floor.name[i];
////			modelX.text = floor.Z[i];
//			modelX.textX = 80;
//			modelX.textY = -30;
//			modelX.textZ = floor.textZ[i];
//			// 动态位移设置
//			if (type == "X") {
//				modelX.offsetX = random;
//				modelX.offsetY = 0;
//			} else if (type == "Y") {
//				modelX.offsetX = 0;
//				modelX.offsetY = random;
//			} else if (type == "Z") {
//				modelX.offsetX = random;
//				modelX.offsetY = random;
//			}
//			// end
//			modelX.offsetZ = 0;
//			pluginX2().updatemodel(modelX);
//			if (random > 0.3) {
//				pluginX2().setModelColor(floor.name[i], a, b, c, 1);
//			}else{
//				pluginX2().clearModelColor(floor.name[i]);
//			}
//		} else {
////			alert("plugin is not working :(");
//		}
//	}
//}
//
//function addModel3()
//{
//	if(pluginX2().valid)
//	{
//		var model = {};
//		model.url = "dx714.osgb";
//		model.name = "B1"
//		model.offsetX = 52.5;
//		model.offsetY = 17;
//		model.offsetZ = -5;
//		model.text = "";
//		model.textX = 0;
//		model.textY = 0;
//		model.textZ = 0;
//		pluginX3().addmodel(model);
//		
//		model.url = "dx714.osgb";
//		model.name = "B2"
//		model.offsetX = 52.5;
//		model.offsetY = 17;
//		model.offsetZ = -10;
//		model.text = "";
//		model.textX = 0;
//		model.textY = 0;
//		model.textZ = 0;
//		pluginX3().addmodel(model);
//
//		var model1 = {};
//		model1.url = "dxright714.osgb";
//		model1.name = "B12";
//		model1.offsetX = 52.5+30;
//		model1.offsetY = 17;
//		model1.offsetZ = -10;
//		model1.text = "";
//		model1.textX = 0;
//		model1.textY = 0;
//		model1.textZ = 0;
//		pluginX3().addmodel(model1);
//		
//		var model2 = {};
//		model2.url = "1F.osgb";
//		model2.name = "L1";
//		model2.offsetX = 0;
//		model2.offsetY = 0;
//		model2.offsetZ = 0;
//		model2.text = "";
//		model2.textX = 80;
//		model2.textY = -30;
//		model2.textZ = 6;
//		pluginX3().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "2F.osgb";
//		model2.name = "L2";
//		model2.textZ = 10;
//		pluginX3().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "3F.osgb";
//		model2.name = "L3";
//		model2.textZ = 10 + 3*1;
//		pluginX3().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "4F.osgb";
//		model2.name = "L4";
//		model2.textZ = 10+ 3*2;
//		pluginX3().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "5F.osgb";
//		model2.name = "L5";
//		model2.textZ = 10 + 3*3;
//		pluginX3().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "6F.osgb";
//		model2.name = "L6";
//		model2.textZ = 10+ 3*4;
//		pluginX3().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "7F.osgb";
//		model2.name = "L7";
//		model2.textZ = 10 + 3*5;
//		pluginX3().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//		
//		model2.url = "8F.osgb";
//		model2.name = "L8";
//		model2.textZ = 10 + 3*6;
//		pluginX3().addmodel(model2);
//		floor.name.push(model2.name);
//		floor.textZ.push(model2.textZ);
//    } else {
////        alert("Plugin is not working :(");
//    }
//}
//function updateModel2()
//{
////	return;
//	var type = "";
//	var obj = document.getElementsByName("Mxyz");
//	for (var i = 0; i < obj.length; i++) {
//		if (obj[i].checked) {
//			type = obj[i].value;
//		}
//	}
//	// Model floor.Z
//	var Model = [ {
//		floor_name : "1F",
//		num : 0.05
//	}, {
//		floor_name : "2F",
//		num : 0.1
//	}, {
//		floor_name : "4F",
//		num : 0.15
//	}, {
//		floor_name : "8F",
//		num : 0.3
//	} ];
//
//	Model[3].num = (parseInt((Math.random() * (10 - 0) + 0))) / 20;
//
//	floor.Z[0] = Model[0].num;
//	floor.Z[1] = Model[1].num;
//	floor.Z[3] = Model[2].num;
//	floor.Z[7] = Model[3].num;
//
//	floor.Z[2] = (Model[2].num - Model[1].num) / 2 + Model[1].num;
//	floor.Z[4] = (Model[3].num - Model[2].num) / 4 + Model[2].num;
//	floor.Z[5] = 2 * (Model[3].num - Model[2].num) / 4 + Model[2].num;
//	floor.Z[6] = 3 * (Model[3].num - Model[2].num) / 4 + Model[2].num;
//	var a, b, c;
//	for (var i = 0; i < floor.name.length; i++) {
//		var random = floor.Z[i];
//		if (-0.1 < random && random < 0.3) {
//			a = 0.2;
//			b = 0.2;
//			c = 0.2;
//		} else if (0.3 <= random && random < 0.5) {
//			a = 0.368627;
//			b = 0.725490;
//			c = 0.368627;
//		} else if (0.5 <= random && random < 0.8) {
//			a = 0.952941;
//			b = 0.478431;
//			c = 0.113725;
//		} else {
//			a = 0.866666;
//			b = 0.317647;
//			c = 0.298039;
//		}
//		if (pluginX3().valid) {
//			var modelX = {};
//			modelX.name = floor.name[i];
////			modelX.text = floor.Z[i];
//			modelX.textX = 80;
//			modelX.textY = -30;
//			modelX.textZ = floor.textZ[i];
//			// 动态位移设置
//			if (type == "X") {
//				modelX.offsetX = random;
//				modelX.offsetY = 0;
//			} else if (type == "Y") {
//				modelX.offsetX = 0;
//				modelX.offsetY = random;
//			} else if (type == "Z") {
//				modelX.offsetX = random;
//				modelX.offsetY = random;
//			}
//			// end
//			modelX.offsetZ = 0;
//			pluginX3().updatemodel(modelX);
//			if (random > 0.3) {
//				pluginX3().setModelColor(floor.name[i], a, b, c, 1);
//			}else{
//				pluginX3().clearModelColor(floor.name[i]);
//			}
//		} else {
////			alert("plugin is not working :(");
//		}
//	}
//}


//setInterval(function(){
//	updateModel();
//	updateModel2();
//	updateModel3();
//},10000);

//屏蔽滚轮功能
function disabledMouseWheel() {
	var threeD = document.getElementById("threeDscroll");
	 if (threeD.addEventListener) {
	    document.addEventListener('DOMMouseScroll', scrollFunc, false);
	 }//W3C
//	 window.onmousewheel = 
		 threeD.onmousewheel = scrollFunc;//IE/Opera/Chrome
}
function scrollFunc(evt) {
	 return false;
}
	window.onload=disabledMouseWheel;