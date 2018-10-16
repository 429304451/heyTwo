// Create By ChangWei on 2018/10/11
// 设一个全局变量 作为我开发游戏的系统
window.GM = {}
GM.hasLoadImg = {};

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

cc.Node.prototype.unbindTouch = function(args) {
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

            if (GM.soundClickUrl == null){
                cc.loader.loadRes("audio/Common_Panel_Dialog_Pop_Sound", cc.AudioClip, function (err, clip) {
                    cc.audioEngine.playEffect(clip, false);
                    GM.soundClickUrl = clip
                });
            } else {
                cc.audioEngine.playEffect(GM.soundClickUrl, false);
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