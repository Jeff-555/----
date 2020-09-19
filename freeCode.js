window.onload = init;
// 初始化地图
var map = new AMap.Map("container", {
	zoom: 11,
	center: [116.379391, 39.861536],
});

//控制地图范围
var flag = true;

var bounds = new AMap.Bounds([116.567542, 39.997639], [116.22422, 39.913285]);
map.setBounds(bounds);

var sBound = map.getBounds();
map.setLimitBounds(sBound);

//加载完成
map.on("complete", function () {
	bindORclearLimit.innerHTML = "解除范围限制";
	map.setDefaultCursor("alias");
	getCity();
});

// 触发搜索城市事件
scBtn.onclick = function () {
	clearLimitBound();
	map.setCity(scText.value);
};

// 触发设置级别事件
szBtn.onclick = function () {
	// 3~18
	map.setZoom(szText.value);
};

//触发/解除 地图范围限制
bindORclearLimit.onclick = function () {
	if (flag) {
		clearLimitBound();
	} else {
		addLimitBound();
	}
};

// 触发点击事件，更改center值
map.on("click", function (e) {
	map.setCenter([e.lnglat.lng, e.lnglat.lat]);
	console.log(map.getCenter());
});

// 触发鼠标事件
map.on("moveend", function () {
	getCity();
});

function init() {
	scText.value = "";
	szText.value = "";
	console.log("init success");
}

function getCity() {
	map.getCity(function (info) {
		currentCity.innerHTML =
			"当前所在省/直辖市," + info.province + ": " + info.city;
	});
}

function clearLimitBound() {
	map.clearLimitBounds();
	bindORclearLimit.innerHTML = "已解除范围限制";
	flag = false;
}

function addLimitBound() {
	map.panTo([116.379391, 39.861536]);
	console.log(map.getBounds());
	map.setLimitBounds(sBound);
	bindORclearLimit.innerHTML = "解除范围限制";
	flag = true;
}
