function Canvas(container) {

    var width  = container.clientWidth;
    var height = container.clientHeight;

    this.model = new panejs.Model();
    this.paper = new panejs.Paper({
        model: this.model,
        container: container,
        gridSize: 5,
        width: width - 60,
        height: height - 60
    });

    this.nodeById = {};
    this.portById = {};
    this.linkById = {};

    this.setup();
}

Canvas.prototype.setup = function () {

    this.snapLines = new panejs.myData.Snaplines({
        paper: this.paper
    });

    this.paperScroll = new panejs.myData.PaperScroll({
        paper: this.paper
    });

    // handlers
    this.connectionHandler = new panejs.myData.ConnectionHandler(this.paper);
    this.selectionHandler  = new panejs.myData.SelectionHandler(this.paper);

    this.paper
        .on('cell:connecting', this.onConnecting.bind(this))
        .on('cell:connected', this.onConnected.bind(this))
        .on('cell:focus', this.onFocusChanged.bind(this))
        .on('paper:focus', this.onFocusChanged.bind(this))
        .on('cells:selectionChanged', this.onSelectionChanged.bind(this))
        .on('cells:updatePosition', this.updateNodesPosition.bind(this));

    this.paper.on('paper:scale', function (sx, sy) {
        // globalEvent.canvasScaled(sx, sy);
    });

    return this;
};


Canvas.prototype.onSelectionChanged = function (nodes) {

    this.selectedNodes = nodes;
};

Canvas.prototype.onFocusChanged = function (cell) {

    this.focusedCell = cell;

    if (cell) {
        if (cell.isNode()) {
            // 节点获取焦点
            // globalEvent.focusNode(this.experimentId, cell.data.id);
        } else {
            // 连线获取焦点
            // globalEvent.focusLink(this.experimentId, cell);
        }
    } else {
        // 画布获取焦点
        // globalEvent.focusCanvas();
    }
};

Canvas.prototype.onConnecting = function (data) {

    var sourceNode = data.sourceNode;
    var sourceView = data.sourceView;
    var sourcePort = data.sourcePort;

    if (sourceView && sourcePort) {
        sourceView.setPortConnecting(sourcePort, false, true);
    }

    if (!this.highlightedPorts) {
        this.highlightedPorts = [];

        panejs.utils.forIn(this.nodeById, function (targetNode) {

            if (sourceNode.id !== targetNode.id) {

                targetNode.eachInPort(function (targetPort) {

                    if (this.canConnect(sourcePort, targetPort)) {

                        var targetView = this.paper.getView(targetNode);
                        if (targetView) {
                            targetView.setPortHighlight(targetPort, true, true);
                        }

                        this.highlightedPorts.push({
                            nodeId: this.getNodeId(targetNode),
                            portId: targetPort.id
                        });
                    }
                }, this);
            }
        }, this);
    }

    if (data.targetNode) {
        // mouse hover
        this.adsorbPort(data, true);
    } else {
        // mouse leave
        if (this.connectingData && this.connectingData.targetView) {
            this.adsorbPort(this.connectingData, false);
        }
    }

    this.connectingData = data;
};

Canvas.prototype.onConnected = function (data) {

    var sourceNode = data.sourceNode;
    var sourceView = data.sourceView;
    var sourcePort = data.sourcePort;
    var targetNode = data.targetNode;
    var targetPort = data.targetPort;

    sourceView.setPortConnecting(sourcePort, false, false);

    this.adsorbPort(data, false);

    panejs.utils.forEach(this.highlightedPorts, function (item) {

        var node = this.getNodeById(item.nodeId);
        var view = this.paper.getView(node);
        var port = this.getPortById(item.portId);

        if (view && port) {
            view.setPortHighlight(port, true, false);
        }
    }, this);

    this.highlightedPorts = null;
    this.connectingData   = null;

    if (sourceNode && sourcePort && targetNode) {

        if (!targetPort) {
            targetPort = this.getFirstConnectablePort(sourcePort, targetNode);
        }

        if (targetPort && this.canConnect(sourcePort, targetPort)) {
            this.addLink({
                source: this.getNodeId(sourceNode),
                target: this.getNodeId(targetNode),
                outputPortId: sourcePort.id,
                inputPortId: targetPort.id
            });
        }
    }
};

Canvas.prototype.adsorbPort = function (data, isAdsorbed) {

    var targetView = data.targetView;
    var targetPort = data.targetPort;

    if (!targetPort) {
        targetPort = this.getFirstConnectablePort(data.sourcePort, data.targetNode);
    }

    if (targetView && targetPort) {
        targetView.setPortAdsorbed(targetPort, true, isAdsorbed);
    }

    return this;
};

Canvas.prototype.isPortConnected = function (portId, isSourcePort) {

    for (var key in this.linkById) {
        var link      = this.linkById[key];
        var connected = link && isSourcePort
            ? link.outputPortId === portId
            : link.inputPortId === portId;

        if (connected) {
            return true;
        }
    }

    return false;
};

Canvas.prototype.setPortConnected = function (node, portId, isSourcePort, isConnected) {

    var port = node.getPortById(portId);
    var view = this.paper.getView(node);

    if (port && view) {
        port.connected = isConnected;
        view.setPortConnected(portId, !isSourcePort, isConnected);
    }

    return this;

};

Canvas.prototype.addNodes = function (nodes) {

    nodes = nodes || [];

    if (!panejs.utils.isArray(nodes)) {
        nodes = [nodes];
    }

    if (nodes.length) {
        this.model.beginUpdate();

        panejs.utils.forEach(nodes, function (node) {
            this.addNode(node);
        }, this);

        this.model.endUpdate();
    }

    return this;
};

Canvas.prototype.addNode = function (node) {

    var nodeInstance = new panejs.myData.Node({
        markup: node.markup,
        portMarkup: node.portMarkup,
        inPorts: node.inPorts,
        outPorts: node.outPorts,
        data: node,
        size: {
            width: node.size.width || 180,
            height: node.size.height || 30
        },

        position: {
            x: node.position.x || 0,
            y: node.position.y || 0
        }
    });

    this.nodeById[node.id] = nodeInstance;
    this.model.addNode(nodeInstance);

    nodeInstance.eachInPort(function (inPort) {

        inPort.parents = [];

        this.portById[inPort.id] = inPort;
    }, this);

    nodeInstance.eachOutPort(function (outPort) {

        outPort.parents = [];

        this.portById[outPort.id] = outPort;

        // 支持环检查
        nodeInstance.eachInPort(function (inPort) {
            outPort.parents.push(inPort.id);
        }, this);
    }, this);

    return this;
};

Canvas.prototype.removeNodes = function (nodes) {

    nodes = nodes || [];

    if (!panejs.utils.isArray(nodes)) {
        nodes = [nodes];
    }

    if (nodes.length) {
        this.model.beginUpdate();

        panejs.utils.forEach(nodes, function (node) {
            this.removeNode(node);
        }, this);

        this.model.endUpdate();
    }

    return this;
};

Canvas.prototype.removeNode = function (node) {

    var model        = this.model;
    var nodeId       = this.getNodeId(node);
    var nodeInstance = this.getNodeById(nodeId);

    if (nodeInstance) {

        model.beginUpdate();

        var links = nodeInstance.links;
        if (links && links.length) {
            // `removeLink` will change the `nodeInstance.links`, so
            // we should call `slice` to clone the links
            panejs.utils.forEach(links.slice(), function (link) {
                this.removeLink(link);
            }, this);
        }

        nodeInstance.eachInPort(function (inPort) {
            delete this.portById[inPort.id];
        }, this);

        nodeInstance.eachOutPort(function (outPort) {
            delete this.portById[outPort.id];
        }, this);

        nodeInstance.removeFromParent();
        delete this.nodeById[nodeId];

        model.endUpdate();
    }

    return nodeInstance;
};

Canvas.prototype.updateNode = function (nodeId, newData) {

    var node = this.getNodeById(nodeId);
    var view = node && this.paper.getView(node);

    if (node && view) {

        // var data = node.data;

        // delete newData.id;
        // delete newData.inPorts;
        // delete newData.outPorts;
        //
        // if (newData.execStatus) {
        //     delete data.execStatus;
        // }
        //
        // var oldStatusIcon = data.statusIcon;
        //
        // panejs.utils.merge(data, newData);
        //
        // var newStatusIcon = globalClassNames.getComponentAdditionalIcon(data);
        //
        // if (oldStatusIcon !== newStatusIcon) {
        //
        //     var $root   = $(view.elem);
        //     var $node   = $root.find('.pane-node-content');
        //     var $status = $root.find('.status');
        //
        //     if (oldStatusIcon && !newStatusIcon) {
        //         $node.removeClass('has-status');
        //     } else if (!oldStatusIcon && newStatusIcon) {
        //         $node.addClass('has-status');
        //     }
        //
        //     if (oldStatusIcon) {
        //         $status.removeClass(oldStatusIcon);
        //     }
        //
        //     if (newStatusIcon) {
        //         $status.addClass(newStatusIcon);
        //     }
        //
        //     data.statusIcon = newStatusIcon;
        // }

        if (newData.name) {
            view.setNodeName(newData.name);
        }
    }

    return this;
};

Canvas.prototype.updateNodeStatus = function (params) {

    panejs.utils.forEach(params, function (param) {
        this.updateNode(param.id, param);
    }, this);

    this.updateLinkStream();

    return this;
};

Canvas.prototype.updateNodesPosition = function (nodes) {

    // 调用接口更新节点位置

    // nodes = nodes || [];
    //
    // if (!zero.isArray(nodes)) {
    //     nodes = [nodes];
    // }
    //
    // if (nodes.length) {
    //     var pos = zero.map(nodes, function (node) {
    //         var p = node.getPosition();
    //         return {
    //             nodeInstanceId: this.getNodeId(node),
    //             posX: p.x,
    //             posY: p.y
    //         };
    //     }, this);
    //
    //     this.paperScroll.adjustPaper();
    //     experimentCGI.updateNodesPosition(this.experimentId, pos);
    // }
    //
    return this;
};

Canvas.prototype.updateLinkStream = function () {

    if (this.nodeById) {
        panejs.utils.forIn(this.nodeById, function (node) {
            this.updateLinkStreamByNode(node);
        }, this);
    }

    return this;
};

Canvas.prototype.updateLinkStreamByNode = function (node) {

    if (node) {
        var paper   = this.paper;
        var status  = this.getNodeStatus(node);
        var running = status === 'running';
        var inLinks = this.getLinksByNode(node, true);

        panejs.utils.forEach(inLinks, function (link) {
            var linkView = paper.getView(link);
            if (linkView) {
                linkView.vel.toggleClass('pane-link-flow', running);
            }
        });
    }

    return this;
};

Canvas.prototype.addLinks = function (links) {

    links = links || [];

    if (!panejs.utils.isArray(links)) {
        links = [links];
    }

    if (links.length) {
        this.model.beginUpdate();

        panejs.utils.forEach(links, function (link) {
            this.addLink(link);
        }, this);

        this.model.endUpdate();
    }

    return this;
};

Canvas.prototype.addLink = function (link) {

    var sourceNode = this.getNodeById(link.source);
    var targetNode = this.getNodeById(link.target);
    var sourcePort = this.getPortById(link.outputPortId);
    var targetPort = this.getPortById(link.inputPortId);

    if (sourceNode && targetNode && sourcePort && targetPort) {

        this.setPortConnected(sourceNode, sourcePort.id, true, true);
        this.setPortConnected(targetNode, targetPort.id, false, true);

        var linkInstance = new panejs.Link({
            attrs: null,
            data: link,
            view: panejs.myData.LinkView,
            connector: panejs.myData.quadratic
        });

        this.model.addLink(linkInstance, {
            node: sourceNode,
            port: sourcePort
        }, {
            node: targetNode,
            port: targetPort
        });

        linkInstance.canvas = this;

        targetPort.parents.push(sourcePort.id);
        this.linkById[this.getLinkId(linkInstance)] = linkInstance;
    }

    return this;
};

Canvas.prototype.removeLinks = function (links) {

    links = links || [];

    if (!panejs.utils.isArray(links)) {
        links = [links];
    }

    if (links.length) {
        this.model.beginUpdate();

        panejs.utils.forEach(links, function (link) {
            this.removeLink(link);
        }, this);

        this.model.endUpdate();
    }

    return this;
};

Canvas.prototype.removeLink = function (link) {

    var linkId       = this.getLinkId(link);
    var linkInstance = this.getLinkById(linkId);
    if (linkInstance) {
        linkInstance.removeFromParent();
        link = linkInstance.data;
    }

    if (link) {

        // update port status
        if (!this.isPortConnected(link.inputPortId)) {
            var node = this.getNodeById(link.target);
            if (node) {
                this.setPortConnected(node, link.inputPortId, false, false);
            }
        }

        var targetPort = this.getPortById(link.inputPortId);
        var parents    = targetPort && targetPort.parents;
        if (parents && parents.length) {
            for (var i = parents.length - 1; i >= 0; i--) {
                if (parents[i] === link.outputPortId) {
                    parents.splice(i, 1);
                }
            }
        }

        delete this.linkById[linkId];
    }

    return linkInstance;
};

Canvas.prototype.getNodeId = function (node) {

    var raw = panejs.utils.isFunction(node.isNode) && node.isNode() ? node.data : node;

    return raw.id;
};

Canvas.prototype.getNodeById = function (nodeId) {

    return this.nodeById[nodeId];
};

Canvas.prototype.getNodeStatus = function (node) {

    var status;

    if (node && node.data) {
        status = node.data.nodeInstanceStatus || node.data.status
    }

    return status || 'ready';
};

Canvas.prototype.getSelectedNodes = function () {

    return this.selectedNodes || [];
};

Canvas.prototype.hasSelectedNodes = function () {

    return this.selectedNodes && this.selectedNodes.length > 0;
};

Canvas.prototype.isSameLink = function (link1, link2) {

    return link1.source === link2.source
        && link1.target === link2.target
        && link1.outputPortId === link2.outputPortId
        && link1.inputPortId === link2.inputPortId;
};

Canvas.prototype.getLinkId = function (link) {

    var raw = panejs.utils.isFunction(link.isLink) && link.isLink() ? link.data : link;

    return raw.source + '-' + raw.outputPortId + '-' + raw.target + '-' + raw.inputPortId;
};

Canvas.prototype.getLinkById = function (linkId) {

    return this.linkById[linkId];
};

Canvas.prototype.getLinksByNode = function (node, isSource) {

    var result = [];

    if (node) {

        var ports = isSource ? node.inPorts : node.outPorts;
        panejs.utils.forEach(ports, function (port) {

            var portId = port.id;

            panejs.utils.forEach(this.linkById, function (link) {
                var raw = link.data;
                if ((isSource && raw.inputPortId === portId) ||
                    (!isSource && raw.outputPortId === portId)) {
                    result.push(link);
                }
            });
        }, this);
    }

    return result;
};

Canvas.prototype.getPortById = function (portId) {

    return this.portById[portId];
};

Canvas.prototype.isAncestor = function (sourcePort, targetPort) {

    var parents = sourcePort.parents;

    if (parents.length === 0) {
        return false;
    }

    if (panejs.utils.indexOf(parents, targetPort.id) >= 0) {
        return true;
    }

    return panejs.utils.some(parents, function (id) {
        return this.isAncestor(this.getPortById(id), targetPort);
    }, this);
};

Canvas.prototype.canConnect = function (sourcePort, targetPort) {

    return true;

    // return sourcePort.type === targetPort.type
    //     && !(!targetPort.isMultiIn && targetPort.parents.length)
    //     && !this.isAncestor(sourcePort, targetPort);
};

Canvas.prototype.getFirstConnectablePort = function (sourcePort, targetNode) {

    var targetPort = null;

    if (sourcePort && targetNode) {
        panejs.utils.some(targetNode.getInPorts(), function (port) {
            if (this.canConnect(sourcePort, port)) {
                targetPort = port;
                return true;
            }
        }, this);
    }

    return targetPort;
};

Canvas.prototype.toLocalPoint = function (point) {

    if (this.paper) {
        return this.paper.toLocalPoint(point);
    }
};

Canvas.prototype.destroy = function () {

    this.model.destroy();
    this.paper.destroy();

    this.selectionHandler.destroy();
    this.connectionHandler.destroy();

    this.paperScroll.destroy();
    this.snapLines.destroy();

    panejs.utils.destroy(this);
    this.destroyed = true;
};

