var util = require("util");

cc.Class({
    extends: cc.Component,

    properties: {
        bombUpPre: { default:null, type:cc.Prefab },
        bombDownPre: { default:null, type:cc.Prefab },
    },

    // use this for initialization
    onLoad: function () {
        // ### 修改ui
        var bombUp = cc.instantiate(this.bombUpPre);
        this.node.addChild(bombUp, 1);
        bombUp.setPosition(0, cc.winSize.height/2)
        this.bombUp = bombUp;
        // 底部信息
        var bombDown = cc.instantiate(this.bombDownPre);
        this.node.addChild(bombDown, 3);
        bombDown.setPosition(0, -cc.winSize.height/2)
        this.bombDown = bombDown;
        // ### 绑定点击事件
        this.addEvents();

        // this.node.setScale(1.2);
    },
    addEvents: function () {

    },

    // called every frame
    update: function (dt) {
        // console.log(dt);
    },
});
