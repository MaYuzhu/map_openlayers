// 获取设备和建筑
function getBuildingImplements() {
	$.ajax({
		async : false,
		url : './Building/getbuild',
		type : 'GET',
		data : {
			"buildcode" : "3205A0001"
		},
		dataType : 'json',
		success : function(data) {
			if (data != null) {
				var sbBH = [];
				for (var i = 0; i < data.length; i++) {
					lnglats.push(data[i]);
					var da = {};
					da.data = data[i];
					var dev = data[i].devnumber;
					var num = dev.split(";");
					da.bd = num[0];
					da.cj = num[1];
					da.lf = num[4];
					da.qx = num[2];
					da.sp = num[7];
					HouseInformation.push(da);// 获得project = 33010012的所有数据
				}
			}
		},
	});
}