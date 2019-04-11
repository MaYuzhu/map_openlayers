/**
 * 20171026 火烧 重新画的3d图
 */
// 画布理想大小
	var primary_img = {
		w:920,
		h:500
	};

	// 大楼体积参数
	var floorxyz = {
		x:600,// 宽x
		y:530,// 高y
		z:300// 厚z
	};
	
// 当前帧
	var thisTime = null;
	
// 各层高度
	var floor_height = [
		72,
		72,
		57,
		57,
		57,
		57,
		57,
		71
	];
	
// 记录各种颜色，避免每次都new
	var map_color = {};
	if('cFF0000_trgb' in map_color == false)
		map_color.cFF0000_trgb = new THREE.Color( 0xFF0000 );
	if('cFF0000_t' in map_color == false)
		map_color.cFF0000_t = new THREE.LineBasicMaterial( { color : 0xff0000 } );
	
	if('cffff00_trgb' in map_color == false)
		map_color.cffff00_trgb = new THREE.Color( 0xffff00 );
	if('cffff00_t' in map_color == false)
		map_color.cffff00_t = new THREE.LineBasicMaterial( { color : 0xffff00 } );
	
	if('c008000_trgb' in map_color == false)
		map_color.c008000_trgb = new THREE.Color( 0x008000 );
	if('c008000_t' in map_color == false)
		map_color.c008000_t = new THREE.LineBasicMaterial( { color : 0x008000 } );
	
	if('c000000_trgb' in map_color == false)
		map_color.c000000_trgb = new THREE.Color( 0x000000 );
	if('c000000_t' in map_color == false)
		map_color.c000000_t = new THREE.LineBasicMaterial( { color : 0x000000 } );
	
// console.log(floorxyz);
	var printType = "front";

// var xl = 0;
// var yl = 0;
//    
// var cfv = 0;
//    
// var cfvx = 0;
// var cfvy = 0;
    
    
	
    var renderer;// 渲染器
    // 初始参数
    function initThree() {
		var p = 0,pw = 0;

    	if ($(".f3d").length > 0 ) { 
    		
        	console.log($(".f3d").width());

    		if($(".center_table").length > 0){
    			p = 20;
    			pw = 220;
    		}
    		
    		// console.log($(".f3d").width() - p);
    		$("#afloor").height($(".f3d").width()/primary_img.w*$(".f3d").height() - p);
        	$("#afloor").width($(".f3d").width() - pw);
        	
		}else{
			$("#afloor").height(500);
        	$("#afloor").width("50%");
		}
// $("#afloor").height($(".f3d").height());
// $("#afloor").width($(".f3d").width());
    	
//    	width = document.getElementById('afloor').clientWidth - p;
//    	height = document.getElementById('afloor').clientHeight - p;
    	
    	width = $("#afloor").width() - p;
    	height = $("#afloor").height() - p;

// console.log(floorxyz);
    	
    	floorxyz.x *= parseFloat(width/primary_img.w);
    	floorxyz.y *= parseFloat(width/primary_img.w);
    	floorxyz.z *= parseFloat(width/primary_img.w);
    	
// console.log(floorxyz);
    	
    	renderer = new THREE.WebGLRenderer({
    		antialias : true
    	});
    	renderer.setSize(width, height);
    	document.getElementById('afloor').appendChild(renderer.domElement);
    	renderer.setClearColor(0xFFFFFF, 1.0);
    }


    var camera;// 照相机
    function initCamera() {
    	// 设置透视投影的相机,默认情况下相机的上方向为Y轴，右方向为X轴，沿着Z轴朝里
    	// var camera = new THREE.PerspectiveCamera(
		// 90, //垂直从下到上的视觉角度（单位：度数）
		// 350/350, //镜头高宽比，即 高度除以宽度
		// 5, //近端的水平面裁剪
		// 5000 //远端的水平面裁剪
		// );
    	camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);

    	camera.position.x = -300;// 设置相机的位置坐标
        camera.position.y = floorxyz.y+500;// 设置相机的位置坐标
        camera.position.z = 1000;// 设置相机的位置坐标
        camera.up.x = 0;// 设置相机的上为「x」轴方向
        camera.up.y = 1;// 设置相机的上为「y」轴方向
        camera.up.z = 0;// 设置相机的上为「z」轴方向
        camera.lookAt( {x:floorxyz.x/2, y:220, z:0 } );// 设置视野的中心坐标
    }

    // 场景
    var scene;
    function initScene() {
    	scene = new THREE.Scene();
    }

    // 光
    var light;
    function initLight() {
    	light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    	light.position.set(-100, 600, 200);
    	scene.add(light);
    }


    // 网格底
    function grid(){
    	var geometry = null;
    	var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors} );
    	var hei = new THREE.Color( 0xcccccc ),
    	hui = new THREE.Color( 0xeeeeee ),
    	hong = new THREE.Color( 0xFF0000 ),
    	thisColor = new THREE.Color( 0xFF0000 );            	

        var w = 5000;
    	// 网格
    	for (var i = -w; i <=w; i+=100) {
            geometry = new THREE.Geometry();
    		geometry.vertices.push(new THREE.Vector3( -w, 0, i ));
    		geometry.vertices.push(new THREE.Vector3( w, 0, i ));
    		geometry.colors.push( i==0?hei:hui, i==0?hei:hui );
    		var line = new THREE.Line( geometry, material, THREE.LinePieces);
    		scene.add(line);

            geometry = new THREE.Geometry();
    		geometry.vertices.push(new THREE.Vector3( i, 0, -w ));
    		geometry.vertices.push(new THREE.Vector3( i, 0, w ));
    		geometry.colors.push( i==0?hei:hui, i==0?hei:hui );
    		line = new THREE.Line( geometry, material, THREE.LinePieces);
    		scene.add(line);

            if(i == 0){
                geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3( 0, -w, 0 ));
                geometry.vertices.push(new THREE.Vector3( 0, w, 0 ));
                geometry.colors.push( i==0?hei:hui, i==0?hei:hui );
                line = new THREE.Line( geometry, material, THREE.LinePieces);
                scene.add(line);
            }
    	}
    }


    // 物体
    var cube = {};
    function initObject() {

        var dian = {
            // 最接近z点的面，看正面是看不到的
            mian1:{
                lb:[0,0,0],
                rb:[floorxyz.x,0,0],
                lt:[0,floorxyz.y,0],
                rt:[floorxyz.x,floorxyz.y,0]
            },
            // 最前面的一面，就是正面
            mian2:{
                lb:[0,0,floorxyz.z],
                rb:[floorxyz.x,0,floorxyz.z],
                lt:[0,floorxyz.y,floorxyz.z],
                rt:[floorxyz.x,floorxyz.y,floorxyz.z]
            }
        };
        
    	// 拆旧飞机
        for(var a in cube){
        	if(cube[a] instanceof Array){
        		for(var b in cube[a]){
        			scene.remove(cube[a][b]);
        		}
        	}else{
                scene.remove(cube[a]);
        	}
        }
        // scene.remove(cube);
        if(printType== 'three3d'){
        	if(!thisTime)
        		return;
        	
        	three3d(dian);
        }else if(printType== 'front'){
        	if(!thisTime)
        		return;
        	
        	front(dian);
        }else if(printType== 'side'){
        	if(!thisTime)
        		return;
        	
        	side(dian);
        }
        // front(dian);
        // side(dian);
		// three3d(dian);
		// console.log(xl);
    }
// 获取当前颜色
    function front_color(fn){
    	var trgb,r;
//    	console.log(fn);
//    	console.log(floorValueColor);
    	
    	if(Math.abs(fn.angle) >= floorValueColor.red){
    		trgb = map_color.cFF0000_trgb;
    		t = map_color.cFF0000_t;
    	}else if(Math.abs(fn.angle) >= floorValueColor.yellow){
    		trgb = map_color.cffff00_trgb;
    		t = map_color.cffff00_t;	
    	}else if(Math.abs(fn.angle) >= floorValueColor.green){
    		trgb = map_color.c008000_trgb;
    		t = map_color.c008000_t;
    	}else{
//    		trgb = map_color.c000000_trgb;
//    		t = map_color.c000000_t;
    		trgb = map_color.c008000_trgb;
    		t = map_color.c008000_t;
    	}
    	
    	return {
    		trgb:trgb,
    		t:t
    	};
    }
    // 楼正面
    function front(dian){
        camera.position.x = floorxyz.x/2;// 设置相机的位置坐标
        camera.position.y = floorxyz.y/2;// 设置相机的位置坐标
        camera.position.z = 1000;// 设置相机的位置坐标
        camera.up.x = 0;// 设置相机的上为「x」轴方向
        camera.up.y = 1;// 设置相机的上为「y」轴方向
        camera.up.z = 0;// 设置相机的上为「z」轴方向
        camera.lookAt( {x:floorxyz.x/2, y:floorxyz.y/2, z:0 } );// 设置视野的中心坐标

// 各层
        var geometry = null;
        var start = null;
        var end = null;
        var geometry = null;
        
        var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors} );

        cube.zuo = [];
        cube.you = [];
        cube.shang = [];
// 当前楼层下面坐标
        var floor_bottom = 0;
        for(var f in floor_height){
// 当前楼层上面坐标
        	var floor_top = floor_bottom + floor_height[f];
        	
        	var thisColor = front_color(thisTime[f]);
        	
// console.log(thisColor);
// console.log(map_color);

        	if(f == 0){
                // 地面 lb - rb
                geometry = new THREE.Geometry();
                start = new THREE.Vector3(dian.mian1.lt[0],floor_bottom,0);
                end = new THREE.Vector3(dian.mian1.rt[0],floor_bottom,0);
                geometry.vertices.push(start);
                geometry.vertices.push(end);
                geometry.colors.push(map_color.c000000_trgb,map_color.c000000_trgb);
                cube.dimian = new THREE.Line( geometry, map_color.c000000_t);
                scene.add(cube.dimian);
                
        	}
          
			// 左
        	geometry = new THREE.Geometry();
            start = new THREE.Vector3(dian.mian1.lt[0]+(f==0?0:thisTime[f-1].x),floor_bottom,0);
            end = new THREE.Vector3(dian.mian1.lt[0]+thisTime[f].x,floor_top,0);
        	geometry.vertices.push(start);
        	geometry.vertices.push(end);
        	geometry.colors.push(thisColor.trgb,thisColor.trgb);
        	cube.zuo[f] = new THREE.Line( geometry, thisColor.t);
        	scene.add(cube.zuo[f]);

  
        	// 右
            geometry = new THREE.Geometry();
            start = new THREE.Vector3(dian.mian1.rt[0]+(f==0?0:thisTime[f-1].x),floor_bottom,0);
            end = new THREE.Vector3(dian.mian1.rt[0]+thisTime[f].x,floor_top,0);
        	geometry.vertices.push(start);
        	geometry.vertices.push(end);
        	geometry.colors.push(thisColor.trgb,thisColor.trgb);
        	cube.you[f] = new THREE.Line( geometry, thisColor.t);
        	scene.add(cube.you[f]);

        	// 上
            geometry = new THREE.Geometry();
            start = new THREE.Vector3(dian.mian1.lt[0]+thisTime[f].x,floor_top,0);
            end = new THREE.Vector3(dian.mian1.rt[0]+thisTime[f].x,floor_top,0);
        	geometry.vertices.push(start);
        	geometry.vertices.push(end);
        	geometry.colors.push(thisColor.trgb,thisColor.trgb);
        	cube.shang[f] = new THREE.Line( geometry, thisColor.t);
        	scene.add(cube.shang[f]);

        	
        	floor_bottom += floor_height[f];
        }
        

        geometry = null;
        stact = null;
        end = null;
        geometry = null;
        
        material = null;

    }

    // 楼侧面
    function side(dian){
        camera.position.x = floorxyz.x/2;// 设置相机的位置坐标
        camera.position.y = floorxyz.y/2;// 设置相机的位置坐标
        camera.position.z = 1000;// 设置相机的位置坐标
        camera.up.x = 0;// 设置相机的上为「x」轴方向
        camera.up.y = 1;// 设置相机的上为「y」轴方向
        camera.up.z = 0;// 设置相机的上为「z」轴方向
        camera.lookAt( {x:floorxyz.x/2, y:floorxyz.y/2, z:0 } );// 设置视野的中心坐标

        
     // 各层
        var geometry = null;
        var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors} );

        cube.zuo = [];
        cube.you = [];
        cube.shang = [];
// 当前楼层下面坐标
        var floor_bottom = 0;
        for(var f in floor_height){
// 当前楼层上面坐标
        	var floor_top = floor_bottom + floor_height[f];
        	
        	var thisColor = front_color(thisTime[f]);
        	
// console.log(thisColor);
// console.log(map_color);

        	if(f == 0){
                // 地面 lb - rb
                geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3(dian.mian1.lb[2],floor_bottom,0));
                geometry.vertices.push(new THREE.Vector3(dian.mian2.lb[2],floor_bottom,0));
                geometry.colors.push(map_color.c000000_trgb,map_color.c000000_trgb);
                cube.dimian = new THREE.Line( geometry, map_color.c000000_t);
                scene.add(cube.dimian);
        	}
          
			// 左
        	geometry = new THREE.Geometry();
        	geometry.vertices.push(new THREE.Vector3(dian.mian1.lt[2]+(f==0?0:thisTime[f-1].y),floor_bottom,0));
        	geometry.vertices.push(new THREE.Vector3(dian.mian1.lt[2]+thisTime[f].y,floor_top,0));
        	geometry.colors.push(thisColor.trgb,thisColor.trgb);
        	cube.zuo[f] = new THREE.Line( geometry, thisColor.t);
        	scene.add(cube.zuo[f]);
        	
  
        	// 右
        	geometry = new THREE.Geometry();
        	geometry.vertices.push(new THREE.Vector3(dian.mian2.lt[2]+(f==0?0:thisTime[f-1].y),floor_bottom,0));
        	geometry.vertices.push(new THREE.Vector3(dian.mian2.lt[2]+thisTime[f].y,floor_top,0));
        	geometry.colors.push(thisColor.trgb,thisColor.trgb);
        	cube.you[f] = new THREE.Line( geometry, thisColor.t);
        	scene.add(cube.you[f]);
        	
  
        	// 上
        	geometry = new THREE.Geometry();
        	geometry.vertices.push(new THREE.Vector3(dian.mian1.lb[2]+thisTime[f].y,floor_top,0));
        	geometry.vertices.push(new THREE.Vector3(dian.mian2.lb[2]+thisTime[f].y,floor_top,0));
        	geometry.colors.push(thisColor.trgb,thisColor.trgb);
        	cube.shang[f] = new THREE.Line( geometry, thisColor.t);
        	scene.add(cube.shang[f]);
        	
        	
        	floor_bottom += floor_height[f];
        }
        
        
    }

    // 3d楼
    function three3d(dian){
        camera.position.x = -300;// 设置相机的位置坐标
        camera.position.y = floorxyz.y+500;// 设置相机的位置坐标
        camera.position.z = 800;// 设置相机的位置坐标
        camera.up.x = 0;// 设置相机的上为「x」轴方向
        camera.up.y = 1;// 设置相机的上为「y」轴方向
        camera.up.z = 0;// 设置相机的上为「z」轴方向
        camera.lookAt( {x:floorxyz.x/2, y:220, z:0 } );// 设置视野的中心坐标

        
        
        // 各层
        var geometry = null;
        var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors} );
        
        cube.louceng = [];
        cube.qiangbian0 = [];
        cube.qiangbian1 = [];
        cube.qiangbian2 = [];
        cube.qiangbian3 = [];
        

        
// 当前楼层下面坐标
        var floor_bottom = 0;
        for(var f in floor_height){
// 当前楼层上面坐标
        	var floor_top = floor_bottom + floor_height[f];
        	
        	var thisColor = front_color(thisTime[f]);
        	
// console.log(thisColor);
// console.log(map_color);

        	if(f == 0){
                geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3(dian.mian1.lb[0],dian.mian1.lb[1],dian.mian1.lb[2]));
                geometry.vertices.push(new THREE.Vector3(dian.mian1.rb[0],dian.mian1.rb[1],dian.mian1.rb[2]));
                geometry.vertices.push(new THREE.Vector3(dian.mian2.rb[0],dian.mian2.rb[1],dian.mian2.rb[2]));
                geometry.vertices.push(new THREE.Vector3(dian.mian2.lb[0],dian.mian2.lb[1],dian.mian2.lb[2]));
                geometry.vertices.push(new THREE.Vector3(dian.mian1.lb[0],dian.mian1.lb[1],dian.mian1.lb[2]));
//                geometry.colors.push(map_color.c000000_trgb,map_color.c000000_trgb,map_color.c000000_trgb,map_color.c000000_trgb,map_color.c000000_trgb);
                cube.dimian = new THREE.Line( geometry, map_color.c000000_t);
                scene.add(cube.dimian);
        	}

// 各层
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(dian.mian1.lb[0]+thisTime[f].x,dian.mian1.lb[1]+floor_top,dian.mian1.lb[2]+thisTime[f].y));
            geometry.vertices.push(new THREE.Vector3(dian.mian1.rb[0]+thisTime[f].x,dian.mian1.rb[1]+floor_top,dian.mian1.rb[2]+thisTime[f].y));
            geometry.vertices.push(new THREE.Vector3(dian.mian2.rb[0]+thisTime[f].x,dian.mian2.rb[1]+floor_top,dian.mian2.rb[2]+thisTime[f].y));
            geometry.vertices.push(new THREE.Vector3(dian.mian2.lb[0]+thisTime[f].x,dian.mian2.lb[1]+floor_top,dian.mian2.lb[2]+thisTime[f].y));
            geometry.vertices.push(new THREE.Vector3(dian.mian1.lb[0]+thisTime[f].x,dian.mian1.lb[1]+floor_top,dian.mian1.lb[2]+thisTime[f].y));
            cube.louceng[f] = new THREE.Line( geometry, thisColor.t);
            scene.add(cube.louceng[f]);
        	

//            每层4根线
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(dian.mian1.lb[0]+(f==0?0:thisTime[f-1].x),dian.mian1.lb[1]+(f==0?0:floor_bottom),dian.mian1.lb[2]+(f==0?0:thisTime[f-1].y)));
            geometry.vertices.push(new THREE.Vector3(dian.mian1.lb[0]+thisTime[f].x,dian.mian1.lb[1]+floor_top,dian.mian1.lb[2]+thisTime[f].y));
            cube.qiangbian0[f] = new THREE.Line( geometry, thisColor.t);
            scene.add(cube.qiangbian0[f]);
            
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(dian.mian1.rb[0]+(f==0?0:thisTime[f-1].x),dian.mian1.rb[1]+(f==0?0:floor_bottom),dian.mian1.rb[2]+(f==0?0:thisTime[f-1].y)));
            geometry.vertices.push(new THREE.Vector3(dian.mian1.rb[0]+thisTime[f].x,dian.mian1.rb[1]+floor_top,dian.mian1.rb[2]+thisTime[f].y));
            
            geometry.colors.push(new THREE.Color( 0x000000 ),new THREE.Color( 0xFF0000 ));

//            cube.qiangbian1[f] = new THREE.Line( geometry, new THREE.LineBasicMaterial( { vertexColors: true } ) , THREE.LinePieces);
            cube.qiangbian1[f] = new THREE.Line( geometry, thisColor.t);

            scene.add(cube.qiangbian1[f]); 
            
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(dian.mian2.rb[0]+(f==0?0:thisTime[f-1].x),dian.mian2.rb[1]+(f==0?0:floor_bottom),dian.mian2.rb[2]+(f==0?0:thisTime[f-1].y)));
            geometry.vertices.push(new THREE.Vector3(dian.mian2.rb[0]+thisTime[f].x,dian.mian2.rb[1]+floor_top,dian.mian2.rb[2]+thisTime[f].y));
            cube.qiangbian2[f] = new THREE.Line( geometry, thisColor.t);
            scene.add(cube.qiangbian2[f]);
            
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(dian.mian2.lb[0]+(f==0?0:thisTime[f-1].x),dian.mian2.lb[1]+(f==0?0:floor_bottom),dian.mian2.lb[2]+(f==0?0:thisTime[f-1].y)));
            geometry.vertices.push(new THREE.Vector3(dian.mian2.lb[0]+thisTime[f].x,dian.mian2.lb[1]+floor_top,dian.mian2.lb[2]+thisTime[f].y));
            cube.qiangbian3[f] = new THREE.Line( geometry, thisColor.t);
            scene.add(cube.qiangbian3[f]);
            
        	
        	floor_bottom += floor_height[f];
        }

        

// // 颜色
// // var hongrgb = new THREE.Color( 0xFF0000 );
// // var hong = new THREE.LineBasicMaterial( { color : 0xff0000 } );
// var heirgb = new THREE.Color( 0x000000 );
// var hei = new THREE.LineBasicMaterial( { color : 0x000000 } );
//
// var material = new THREE.LineBasicMaterial( { vertexColors:
// THREE.VertexColors} );
//
// var geometry = null;
//
// // 地面 lb - rb
// geometry = new THREE.Geometry();
// geometry.vertices.push(new
// THREE.Vector3(dian.mian1.lb[0],dian.mian1.lb[1],dian.mian1.lb[2]));
// geometry.vertices.push(new
// THREE.Vector3(dian.mian1.rb[0],dian.mian1.rb[1],dian.mian1.lb[2]));
// geometry.colors.push(heirgb,heirgb);
// cube.dimian1 = new THREE.Line( geometry, material, THREE.LinePieces);
// scene.add(cube.dimian1);
//
// geometry = new THREE.Geometry();
// geometry.vertices.push(new
// THREE.Vector3(dian.mian2.lb[0],dian.mian2.lb[1],dian.mian2.lb[2]));
// geometry.vertices.push(new
// THREE.Vector3(dian.mian2.rb[0],dian.mian2.rb[1],dian.mian2.lb[2]));
// geometry.colors.push(thisColor.trgb,thisColor.trgb);
// cube.dimian2 = new THREE.Line( geometry, thisColor.t);
// scene.add(cube.dimian2);
//
// // 左
// var curve = new THREE.CubicBezierCurve3(
// new THREE.Vector3(dian.mian1.lb[0],dian.mian1.lb[1],dian.mian1.lb[2]),
// new THREE.Vector3(dian.mian1.lb[0],dian.mian1.lt[1]*0.3,dian.mian1.lb[2]),
// new THREE.Vector3(dian.mian1.lb[0],dian.mian1.lt[1]*0.7,dian.mian1.lb[2]),
// new THREE.Vector3(dian.mian1.lt[0]+xl,dian.mian1.lt[1],dian.mian1.lt[2]+yl)
// );
// geometry = new THREE.Geometry();
// geometry.vertices = curve.getPoints( 100 );
// cube.zuo1 = new THREE.Line( geometry, thisColor.t );
// scene.add(cube.zuo1);
//
// var curve = new THREE.CubicBezierCurve3(
// new THREE.Vector3(dian.mian2.lb[0],dian.mian1.lb[1],dian.mian2.lb[2]),
// new THREE.Vector3(dian.mian2.lb[0],dian.mian1.lt[1]*0.3,dian.mian2.lb[2]),
// new THREE.Vector3(dian.mian2.lb[0],dian.mian1.lt[1]*0.7,dian.mian2.lb[2]),
// new THREE.Vector3(dian.mian2.lt[0]+xl,dian.mian1.lt[1],dian.mian2.lt[2]+yl)
// );
// geometry = new THREE.Geometry();
// geometry.vertices = curve.getPoints( 100 );
// cube.zuo2 = new THREE.Line( geometry, thisColor.t );
// scene.add(cube.zuo2);
//
// // 右
// var curve = new THREE.CubicBezierCurve3(
// new THREE.Vector3(dian.mian1.rb[0],dian.mian1.rb[1],dian.mian1.lb[2]),
// new THREE.Vector3(dian.mian1.rb[0],dian.mian1.rt[1]*0.3,dian.mian1.lb[2]),
// new THREE.Vector3(dian.mian1.rb[0],dian.mian1.rt[1]*0.7,dian.mian1.lb[2]),
// new THREE.Vector3(dian.mian1.rt[0]+xl,dian.mian1.rt[1],dian.mian1.rt[2]+yl)
// );
// geometry = new THREE.Geometry();
// geometry.vertices = curve.getPoints( 100 );
// cube.you1 = new THREE.Line( geometry, hei );
// scene.add(cube.you1);
//
// var curve = new THREE.CubicBezierCurve3(
// new THREE.Vector3(dian.mian2.rb[0],dian.mian2.rb[1],dian.mian2.lb[2]),
// new THREE.Vector3(dian.mian2.rb[0],dian.mian2.rt[1]*0.3,dian.mian2.lb[2]),
// new THREE.Vector3(dian.mian2.rb[0],dian.mian2.rt[1]*0.7,dian.mian2.lb[2]),
// new THREE.Vector3(dian.mian2.rt[0]+xl,dian.mian2.rt[1],dian.mian2.rt[2]+yl)
// );
// geometry = new THREE.Geometry();
// geometry.vertices = curve.getPoints( 100 );
// cube.you2 = new THREE.Line( geometry, thisColor.t );
// scene.add(cube.you2);
//
// // 上
// geometry = new THREE.Geometry();
// geometry.vertices.push(new
// THREE.Vector3(dian.mian1.lt[0]+xl,dian.mian1.lt[1],dian.mian1.lt[2]+yl));
// geometry.vertices.push(new
// THREE.Vector3(dian.mian1.rt[0]+xl,dian.mian1.rt[1],dian.mian1.rt[2]+yl));
// geometry.colors.push(thisColor.trgb,thisColor.trgb);
// cube.shang1 = new THREE.Line( geometry, thisColor.t);
// scene.add(cube.shang1);
//
// geometry = new THREE.Geometry();
// geometry.vertices.push(new
// THREE.Vector3(dian.mian2.lt[0]+xl,dian.mian2.lt[1],dian.mian2.lt[2]+yl));
// geometry.vertices.push(new
// THREE.Vector3(dian.mian2.rt[0]+xl,dian.mian2.rt[1],dian.mian2.rt[2]+yl));
// geometry.colors.push(thisColor.trgb,thisColor.trgb);
// cube.shang2 = new THREE.Line( geometry, thisColor.t);
// scene.add(cube.shang2);
//
// // 左上
// geometry = new THREE.Geometry();
// geometry.vertices.push(new
// THREE.Vector3(dian.mian1.lt[0]+xl,dian.mian1.lt[1],dian.mian1.lt[2]+yl));
// geometry.vertices.push(new
// THREE.Vector3(dian.mian2.lt[0]+xl,dian.mian2.lt[1],dian.mian2.lt[2]+yl));
// geometry.colors.push(thisColor.trgb,thisColor.trgb);
// cube.zuoshang1 = new THREE.Line( geometry, thisColor.t);
// scene.add(cube.zuoshang1);
// // 右上
// geometry = new THREE.Geometry();
// geometry.vertices.push(new
// THREE.Vector3(dian.mian1.rt[0]+xl,dian.mian1.rt[1],dian.mian1.rt[2]+yl));
// geometry.vertices.push(new
// THREE.Vector3(dian.mian2.rt[0]+xl,dian.mian2.rt[1],dian.mian2.rt[2]+yl));
// geometry.colors.push(thisColor.trgb,thisColor.trgb);
// cube.youshang1 = new THREE.Line( geometry, thisColor.t);
// scene.add(cube.youshang1);
// // 左下
// geometry = new THREE.Geometry();
// geometry.vertices.push(new
// THREE.Vector3(dian.mian1.lb[0],dian.mian1.lb[1],dian.mian1.lb[2]));
// geometry.vertices.push(new
// THREE.Vector3(dian.mian2.lb[0],dian.mian2.lb[1],dian.mian2.lb[2]));
// geometry.colors.push(thisColor.trgb,thisColor.trgb);
// cube.zuoxia1 = new THREE.Line( geometry, thisColor.t);
// scene.add(cube.zuoxia1);
// // 右下
// geometry = new THREE.Geometry();
// geometry.vertices.push(new
// THREE.Vector3(dian.mian1.rb[0],dian.mian1.rb[1],dian.mian1.rb[2]));
// geometry.vertices.push(new
// THREE.Vector3(dian.mian2.rb[0],dian.mian2.rb[1],dian.mian2.rb[2]));
// geometry.colors.push(heirgb,heirgb);
// cube.youxia1 = new THREE.Line( geometry, material, THREE.LinePieces);
// scene.add(cube.youxia1);

    }
    function render(floorData,offset){
// console.log(a3d);
// console.log(floorData);
// console.log(offset);
    	
    	thisTime = floorData;

// 摇动方向
    	if(offset == "X"){
    		printType = 'front';
    	}else if(offset == "Y"){
    		printType = 'side';
    	}else if(offset == "Z"){
    		printType = 'three3d';
    	}
    	
// mmp8层
    	
    	
        
        initObject();
        renderer.render(scene, camera);
// THREE.Cache.clear();
// requestAnimationFrame(render);//循环画图
        return;
    }

    // 开始
    function threeStart() {
    	initThree();
    	initCamera();
    	initScene();
    	initLight();

    	grid();
// initObject();
    	render(0,0);
    }
