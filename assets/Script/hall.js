var util = require("util");

cc.Class({
    extends: cc.Component,

    properties: {
        btn_ative: { default:null, type:cc.Node },
        btn_task: { default:null, type:cc.Node },
        btn_mail: { default:null, type:cc.Node },
        btn_exchange: { default:null, type:cc.Node },
        btn_hongbao: { default:null, type:cc.Node },
        btn_shop: { default:null, type:cc.Node },
        lb_myname: { default:null, type:cc.Label },
        btn_my_info: { default:null, type:cc.Node },

        img_head: { default:null, type:cc.Node },
    },

    // use this for initialization
    onLoad: function () {
        // 修改ui
        this.lb_myname.string = "我的名字YCW"
        // 绑定点击事件
        this.addEvents();
    },
    addEvents: function () {
        var self = this;
        this.btn_ative.quickBt(function () {
            util.mlog("活动")
        });
        this.btn_task.quickBt(function () {
            util.mlog("任务")
        });
        this.btn_mail.quickBt(function () {
            util.mlog("邮箱")
        });
        this.btn_exchange.quickBt(function () {
            util.mlog("兑换")
        });
        this.btn_hongbao.quickBt(function () {
            util.mlog("红包")
        });
        this.btn_shop.quickBt(function () {
            util.mlog("商城")
        });
        this.head_id = 1;
        this.btn_my_info.quickBt(function () {
            if (self.head_id < 7) {
                self.head_id = self.head_id + 1;
            } else {
                self.head_id = 1;
            }
            console.log("self.head_id", self.head_id);
            var mStr = "img2/userhead/touxiang00"+self.head_id
            self.img_head.display("img2/userhead/touxiang00"+self.head_id);
        });

    },

    // called every frame
    update: function (dt) {
        // console.log(dt);
    },
});