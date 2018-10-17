

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

        bombDown: { default:null, type:cc.Prefab },
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

            // if (self.head_id < 4) {
            //     self.head_id = self.head_id + 1;
            // } else {
            //     self.head_id = 1;
            // }
            // var url = "http://127.0.0.1:8888/mImg?name="+self.head_id+".jpg"
            // util.loadUrlImg(self.img_head, url);

            // var cocos = cc.find("Canvas/cocos");
            // util.exto(cocos, self.img_head)
            // self.btn_my_info.unbindTouch();
        });

    },


    // called every frame
    update: function (dt) {
        // console.log(dt);
    },
});
