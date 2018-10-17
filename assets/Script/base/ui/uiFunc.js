// 实现窗口显示隐藏创建销毁

window.uiFunc = {
	uiList: [],
	cacheUIList: [],
};

/**
 * 打开界面
 * 
 * @param {String} uiPath ui预制体的相对路径如:"hall/uiHall",注:路径必需在resource/ui目录下
 * @param {Function} callBack 加载成功回调 
 */
uiFunc.openUI = function(uiPath, callBack) {
	// 缓存
	for (var i = 0; i < uiFunc.cacheUIList.length; i++) {
		var temp = uiFunc.cacheUIList[i];
		if (temp && temp.pathName === uiPath) {
			temp.active = true;
			temp.parent = cc.Canvas.instance.node;
			uiFunc.uiList.push(temp)
			uiFunc.cacheUIList.splice(i, 1);

			var panel = temp.getComponent("baseNode");

			if (callBack) {
				callBack(panal);
			}
			return;
		}
	}
	// 非缓存
	cc.loader.loadRes("ui/" + uiPath, function(err, prefab) {
		if (err) {
			cc.error(err.message || err);
			return;
		}

		var temp = cc.instantiate(prefab);
		temp.pathName = uiPath;
		temp.parent = cc.Canvas.instance.node;
		uiFunc.uiList.push(temp);
		var panel = temp.getComponent("baseNode");

		if (callBack) {
			callBack(panel);
		}
	});
};

/**
 * 关闭界面
 * 
 * @param {String,object} uiPath ui预制体的相对路径,也可以传入窗口句柄,如:uiFunc.closeUI(this);
 * @param {Function} callBack 成功回调 
 */
uiFunc.closeUI = function(uiPath, callBack) {
	for (var i = uiFunc.uiList.length - 1; i >= 0; i--) {
		var temp = uiFunc.uiList[i];
		if (temp && (temp.pathName === uiPath || (typeof (uiPath) == "object" && temp === uiPath.node))) {
			temp.active = false;
			temp.removeFromParent(true);
			uiFunc.cacheUIList.push(temp);
			uiFunc.uiList.splice(i, 1);

			if (callBack) {
				callBack();
			}
			return;
		}
	}
};

/**
 * 查找界面
 * 
 * @param {String,Object} uiPath ui预制体的相对路径
 * @returns {Object}  窗口句柄
 */
uiFunc.findUI = function(uiPath) {
	for (var i = uiFunc.uiList.length - 1; i >= 0; i--) {
		var temp = uiFunc.uiList[i];
		if (temp && temp.name === uiPath) {
			return temp;
		}
	}
}
