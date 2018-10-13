require("define")
//工具类
var util = {};

util.isChangweiTest = false
// 屏幕打印   一般调试的时候用
util.PrintPosDiff = 15;

util.mlog = function () {
    var mstr = "";
    for (var i in arguments) {
        if (i == 0) {
            mstr += arguments[i];
        } else {
            mstr += " ; " + arguments[i];
        }
    }
    if (util.PrintPosDiff > 1) {
        util.PrintPosDiff -= 1; 
    } else {
        util.PrintPosDiff = 15;
    }
    var scene = cc.director.getScene();
    var uTime = 6.5;

    var node = new cc.Node("loadText");
    var label = node.addComponent(cc.Label);
    node.color = new cc.Color(80, 19, 0);
    node.position = cc.v2(cc.winSize.width / 2, util.PrintPosDiff * 30);
    label.fontSize = 30;
    label.Font = "黑体"
    label.string = mstr;
    scene.addChild(node);
    // node.to(scene);
    node.zIndex = 9999;
    
    var action = cc.sequence(
        cc.spawn(
            cc.fadeOut(uTime),
            cc.moveBy(uTime, cc.v2(0, 400))
        ),
        cc.removeSelf()
    );
    node.runAction(action);
};

util.loadSp = function (parent, path, childName, func) {
	cc.loader.loadRes(path, cc.SpriteFrame, function(err, spriteFrame){ 
		var node = new cc.Node("loadSp");
		//调用新建的node的addComponent函数，会返回一个sprite的对象 
		const sprite = node.addComponent(cc.Sprite);
		//给sprite的spriteFrame属性 赋值  
		sprite.spriteFrame = spriteFrame;
		parent.addChild(node);
		if (childName != null )
			parent[childName] = node;
		if (func != null )
			func();
	})
};

// 找到两个不同节点的相对相差位置 
util.moveToOtherWordPoint = function(mNode, toNode) {
	// var oPos = cc.v2(toNode:getPositionX(), toNode:getPositionY())
	var oPos = toNode.getPosition();
    oPos = toNode.getParent().convertToWorldSpace(oPos);
    // ### 两者相差
    var sPos = mNode.getParent().convertToNodeSpace(oPos);
    return sPos;
};

util.SoundClick = function () {
	if (GM.soundClickUrl == null){
        cc.loader.loadRes("audio/Common_Panel_Dialog_Pop_Sound", cc.AudioClip, function (err, clip) {
            cc.audioEngine.playEffect(clip, false);
            GM.soundClickUrl = clip
        });
    } else {
        cc.audioEngine.playEffect(GM.soundClickUrl, false);
    }
}

module.exports = util;