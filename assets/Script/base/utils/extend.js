// Create By ChangWei on 2018/10/11
// 定义一个全局变量 作为我开发游戏的常用管理
window.GM = {}
GM.hasLoadImg = {};
GM.hasLoadSound = {};

cc.Node.prototype.to = function(father, zorder, tag) {
    zorder = zorder || 0;
    if (tag != null) {
        father.addChild(this, zorder, tag);
    } else {
        father.addChild(this, zorder);
    }
    return this;
};
// 快捷设置位置
cc.Node.prototype.p = function(xOrCcp, py) {
    var x = xOrCcp;
    if (y == null) {
        y = xOrCcp.y;
        x = xOrCcp.x;
    };
    this.setPosition(x, y);
    return this;
};
//快速设置在父亲结点的百分比位置, 如果没有父亲则使用设计分辨率
cc.Node.prototype.pp = function(pxOrCcp, py) {
    var px = pxOrCcp;
    if (px == null) {
        px = 0.5;
        py = 0.5;
    } else if (py == null) {
        py = pxOrCcp.y;
        px = pxOrCcp.x;
    }
    var winSize = cc.director.getWinSize();
    var pw = winSize.width, ph = winSize.height;
    if (this.getParent() != null) {
        var size = this.getParent().getContentSize();
        pw = size.width;
        ph = size.height;
    }

    this.setPosition(pw*px, ph*py);
    return this;
};
// 取消点击绑定
cc.Node.prototype.unbindTouch = function() {
    this.off(cc.Node.EventType.TOUCH_START);
    this.off(cc.Node.EventType.TOUCH_MOVE);
    this.off(cc.Node.EventType.TOUCH_END);
    this.off(cc.Node.EventType.TOUCH_CANCEL);

    this.off(cc.Node.EventType.MOUSE_ENTER);
    this.off(cc.Node.EventType.MOUSE_LEAVE);
    return this;
};

GM.pAdd = function (v1, v2) {
    return cc.v2(v1.x + v2.x, v1.y + v2.y);
};

GM.pSub = function (v1, v2) {
    return cc.v2(v1.x - v2.x, v1.y - v2.y);
};

cc.Node.prototype.bindTouchLocate = function(pxOrCcp, py) {
    this.on(cc.Node.EventType.TOUCH_START, function(event) {
        this.lBeganPos_ = this.getPosition();
        this.lBeganPoint_ = cc.v2(event.touch._point.x, event.touch._point.y); //  event.touch._point;
    }, this);

    this.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
        this.setPosition(GM.pAdd(this.lBeganPos_, GM.pSub(event.touch._point, this.lBeganPoint_)));
    }, this);

    this.on(cc.Node.EventType.TOUCH_END, function(event) {
        var pw = cc.winSize.width, ph = cc.winSize.height;
        if (this.getParent() != null) {
            var size = this.getParent().getContentSize();
            pw = size.width;
            ph = size.height;
        }
        console.log("Node Location: ", this.x, this.y, "Percentage:", this.x/pw, this.y/ph);
    }, this);

    // this._touchListener.swallowTouches = false;
    return this;
};

// 快速绑定点击函数 touchSilence-是否静默点击 Shield-是否有点击cdTime
cc.Node.prototype.quickBt = function(fn, touchSilence, Shield) {
    this.lastClickTime = 0; // 上次点击时间
    this.clickCdTime = 300  // 毫秒

    this.on(cc.Node.EventType.TOUCH_START, function(event) {
        // console.log("TOUCH_START");
        this.BeganScale_ = this.getScale();
        this.BeganOpacity_ = this.opacity;
        if (!touchSilence) {
            this.setScale(this.BeganScale_*0.9);
            this.opacity = this.BeganOpacity_*0.9;
        };
    }, this);

    this.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
        if (!touchSilence) {
            this.setScale(this.BeganScale_);
            this.opacity = this.BeganOpacity_;
        };
    }, this);

    this.on(cc.Node.EventType.TOUCH_END, function(event) {
        if (!touchSilence) {
            this.setScale(this.BeganScale_);
            this.opacity = this.BeganOpacity_;

            var fullPath = "audio/common/Common_Panel_Dialog_Pop_Sound";
            if (GM.hasLoadSound[fullPath] == null) {
                cc.loader.loadRes(fullPath, cc.AudioClip, function (err, clip) {
                    cc.audioEngine.playEffect(clip, false);
                    GM.hasLoadSound[fullPath] = clip;
                });
            } else {
                cc.audioEngine.playEffect(GM.hasLoadSound[fullPath], false);
            }
        
        };
        if (!Shield) {
            var now = (new Date()).getTime();
            if (now - this.lastClickTime < this.clickCdTime) {
                console.log("---屏蔽过快点击---");
                return;
            };
            this.lastClickTime = now;
        };
        fn && fn(event);
        // console.log("TOUCH_END");
    }, this);

    return this;
};

cc.Node.prototype.onClick = function(func,target){
    if(this.getComponent(cc.Button)==null){
        let button=this.addComponent(cc.Button);
        button.transition = cc.Button.Transition.SCALE;
    }
    const CD_TIME = 300;
    let LAST_CLICK_TIME = 0;
    let closure = function(){
        let now = new Date().getTime();
        if(now - LAST_CLICK_TIME < CD_TIME )
        {
            console.log("---屏蔽过快点击---");
            return;
        }
        LAST_CLICK_TIME = now;
        func();
    }
    this.on("click",closure,target);
};

cc.Node.prototype.delayCall = function(func, delayTime, bRepeat) {
    var action = cc.sequence(
        cc.delayTime(delayTime),
        cc.callFunc(func)
    );
    if (bRepeat) {
        if (typeof bRepeat === "number") {
            action = action.repeat(bRepeat);
        } else {
            action = action.repeatForever();
        }
    };
    this.runAction(action);
};