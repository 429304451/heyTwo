var baseDlg = require("baseDlg");


require("app")

cc.Class({
    extends: baseDlg,

    start () {
    	this.addEvents();

        this.startConnect();
    },

    startConnect () {
        var arg = {};
        arg["userid"] = 123;
        // arg["ip"] = "subgame.game036.com";
        arg["ip"] = "127.0.0.1";
        arg["port"] = "1236";
        arg["uuid"] = "xxx";

        app.runMain(arg.userid, arg.ip, arg.port, arg.uuid);
    },

    addEvents () {
        var self = this;
        this.btn_hello.quickBt(function () {
        	util.mlog("sangong")
        });
    },

});