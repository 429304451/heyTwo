/****************************************************************************
 * 
 * Filename:   uiHall 大厅
 * Summary:    游戏大厅
 * 
 *****************************************************************************/

var baseDlg = require("baseDlg");

cc.Class({
    extends: baseDlg,

    start () {
    	this.addEvents();
    },

    addEvents () {
        var self = this;
        this.btn_hello.quickBt(function () {
        	util.mlog("点击hello")
        });
    },

});