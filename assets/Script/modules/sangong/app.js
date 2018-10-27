var GameLogic = require("GameLogic");
var GameEngine = require("GameEngine");
var ClientKernel = require("ClientKernel");

window.GD = {
	gameEngine: null,               //游戏场景
    mainScene: null,                //主场景
    gameLogic: new GameLogic(),     //逻辑
    selfViewID: 3                   //自己的视图位置
};


window.app = {
	plazaArgs: {}, //大厅传过来的参数
	//框架加载完JsFiles里的JS文件后， 会调用此函数， 其它都没做
	runMain: function (userID, ip, port, uuid, other /*{}*/) {
		this.plazaArgs.userID = userID;
        this.plazaArgs.ip = ip;
        this.plazaArgs.port = port;

        this.plazaArgs.uuid = uuid;     //用来验证这用户是不是被假冒
        this.plazaArgs.other = other;
        /////////////////////////////////////////////////////////////////////////////////////////////
        var URL = "wss://" + this.plazaArgs.ip + ":" + this.plazaArgs.port;
        var clientKernel = new ClientKernel();
        clientKernel.init(this.plazaArgs.userID, this.plazaArgs.uuid);

        var gameEngine = new GameEngine();
        gameEngine.init();

        clientKernel.startConnect(URL, gameEngine);

        // GD.clientKernel = clientKernel;
        // GD.gameEngine = gameEngine;

        // var self = this;

        // self.runLoadingScene();
    },

    runLoadingScene: function() {
    	console.log("runLoadingScene");
    },
    runMainScene: function () {
    	console.log("runLoadingScene");
    },
    /**
     * 大厅会调用 该函数尝试运行 房间场景 ， 如果该函数返回false, 则大厅会默认进入 第一个房间
     * 运行房间场景
     * @param moduleID
     * @param roomInfoArray
     */
    runRoomScene: function (moduleID, roomInfoArray) {
    	console.log("runRoomScene");
    	return true;
    },
    //创建一个消息框层
    buildMessageBoxLayer: function (title, message, type, sureCallback, cancelCallback, parent) {
    	console.log("buildMessageBoxLayer");
    },
    //关闭子游戏
    closeSubGame: function () {
    	console.log("closeSubGame");
    },
    //得到子游戏配置
    getConfig: function () {
    	console.log("getConfig");
    },
};


