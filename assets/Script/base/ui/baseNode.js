/****************************************************************************
 * 
 * Filename:   baseNode基础节点 
 * Summary:    主要实现控件便捷调用,控制名中包含"_"的,可以直接用调用,比如: this.btn_close
 * 
 *****************************************************************************/
cc.Class({
    extends: cc.Component,
    properties: {},
    // privete: 如果进行继承需要在子类里面调用this._super();
    onLoad () {
    	// 只有带"_"的 节点名字才会加入映射
    	var linkWidget = function(self, nodeDict) {
    		var children = self.children;
    		for (var i = 0; i < children.length; i++) {
    			var widgetName = children[i].name;
    			if (widgetName && widgetName.indexOf("_") > 0) {
    				var nodeName = widgetName;
    				if (nodeDict[nodeName]) {
                        cc.error("控件名字重复!" + children[i].name);
                    }
                    nodeDict[nodeName] = children[i];
    			}
    			if (children[i].childrenCount > 0) {
    				linkWidget(children[i], nodeDict);
    			}
    		}
    	}.bind(this);
    	linkWidget(this.node, this);
    },

});