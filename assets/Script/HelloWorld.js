var util = require("util");

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        cocos:{
            default:null,
            type:cc.Node
        },
        background:{
            default:null,
            type:cc.Node
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
        // 测试绑定点击事件
        this.addTouch();
    },
    addTouch: function () {
        var self = this;
        // this.background.bindTouchLocate();
        // this.cocos.bindTouchLocate();

        this.cocos.quickBt(function () {
            util.mlog("quickBt()")
        });

    },

    // called every frame
    update: function (dt) {
        // console.log(dt);
    },
});
