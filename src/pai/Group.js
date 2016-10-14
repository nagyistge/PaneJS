import * as utils from '../common/utils';
import Rect       from '../geometry/Rect';
import Node       from '../cells/Node';
import GroupView  from './GroupView';


class Group extends Node {

  isGroup() {

    return true;
  }

  getBBox() {

    const size     = this.getSize();
    const position = this.getPosition();

    return new Rect(position.x, position.y, size.width, size.height);
  }

  getCollapsedSize() {

    return {
      width: 180,
      height: 30
    };
  }

  getFullBBox() {

    let bounds = null;

    utils.forEach(this.getNodes(), (node) => {
      let rect = node.getBBox();
      if (rect) {
        bounds = bounds ? bounds.union(rect) : rect;
      }
    });

    return bounds;
  }

  getSize() {

    return this.metadata.size;
  }

  getPosition() {

    return this.metadata.position;
  }

  getBBoxByStatus(collapsed) {

    let bounds  = this.getFullBBox();
    let minSize = this.getCollapsedSize();

    if (bounds) {

      if (collapsed) {

        bounds.x += bounds.width + 20 - 180;
        bounds.y -= 35;

        bounds.width  = minSize.width;
        bounds.height = minSize.height;

      } else {

        bounds.x -= 35;
        bounds.y -= 35;
        bounds.width += 70;
        bounds.height += 55;
      }
    } else {
      bounds = {
        x: 0,
        y: 0,
        width: minSize.width,
        height: minSize.height
      };
    }

    return bounds;
  }

  updateGeometry(silent) {

    const bounds = this.getBBoxByStatus(this.isCollapsed());

    this.setGeometry({
      size: {
        width: bounds.width,
        height: bounds.height
      },
      position: {
        x: bounds.x,
        y: bounds.y
      }
    }, {
      silent
    });

    return this;
  }

  getNodes() {

    return this.children || [];
  }

  addNodes(nodes = []) {

    if (!utils.isArray(nodes)) {
      nodes = [nodes];
    }

    if (nodes.length) {

      let collapsed = this.isCollapsed();

      utils.forEach(nodes, function (node) {

        if (node && node.isNode()) {
          this.insertChild(node);
        }

        if (collapsed) {
          node.setVisible(false);
        }

      }, this);


      if (collapsed) {

        let changedLinks = this.getChangedLink(nodes);

        this.updateLinks(changedLinks, collapsed);

        if (this.changedLinks) {
          this.changedLinks.concat(changedLinks);
        } else {
          this.changedLinks = changedLinks;
        }
      }

      this.updateGeometry(true);
    }

    return this;
  }

  removeNodes(nodes = [], parentNode) {

    if (!utils.isArray(nodes)) {
      nodes = [nodes];
    }

    if (nodes.length) {

      let linkItems = [];
      let collapsed = this.isCollapsed();

      let index = 0;

      utils.some(parentNode.getChildren(), (node, idx) => {

        if (node.isGroup && node.isGroup()) {
          index = idx;
        } else if (node.isNode()) {
          index += 1;
          return true;
        }

        return false;
      });

      utils.forEach(nodes.slice(0), (node) => {

        if (this.isInGroup(node)) {

          utils.forEach(this.changedLinks, (item) => {
            if (item.terminal.node === node) {
              linkItems.push(item);
            }
          });

          if (parentNode) {

            if (collapsed) {
              node.setVisible(true);
            }

            parentNode.insertChild(node, index);
          }
        }
      });

      this.updateLinks(linkItems, false);
      this.updateGeometry(true);
    }

    return this;
  }

  getRenderData() {

    const data = super.getRenderData();

    return utils.merge({}, data, {
      size: this.metadata.size,
      position: this.metadata.position,
      collapsed: this.isCollapsed()
    });
  }

  isInGroup(node) {

    return utils.some(this.getNodes(), item => node === item);
  }

  getChangedLink(nodes = []) {

    let changedLinks = [];

    utils.forEach(nodes, function (node) {

      node.eachLink(function (link) {

        let sourceNode = link.getTerminalNode(true);
        let targetNode = link.getTerminalNode(false);
        let otherNode  = sourceNode === node ? targetNode : sourceNode;
        let isSource   = otherNode === targetNode;

        if (!this.isInGroup(otherNode)) {
          changedLinks.push({
            link,
            terminal: link.getTerminal(isSource),
            isSource
          });
        }

      }, this);
    }, this);


    return changedLinks;
  }

  updateLinks(links, collapsed) {

    utils.forEach(links, function (item) {

      item.link.setTerminalNode(collapsed ? this : item.terminal, item.isSource);

      if (!item.isSource) {
        item.link.metadata.targetMarker = collapsed ? 'block' : null;
      }
    }, this);
  }

  _setCollapsed(collapsed) {

    super._setCollapsed(collapsed);

    this.updateGeometry(true);

    utils.forEach(this.getNodes(), (node) => {
      node.setVisible(!collapsed);
    });

    if (collapsed) {
      this.changedLinks = this.getChangedLink(this.getNodes());
    }

    this.updateLinks(this.changedLinks, this.isCollapsed());

    return this;
  }
}

Group.setDefaults({
  tagName: 'g',
  pane: 'backgroundPane',
  classNames: 'pane-group',
  view: GroupView,
});


// exports
// -------

export default Group;
