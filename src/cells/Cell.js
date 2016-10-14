import * as utils from '../common/utils';
import Terminal   from '../cells/Terminal';


// private
// -------

function insertChild(child, index) {

  let childCount = this.getChildCount();

  index = utils.fixIndex(index, childCount);

  if (child.parent === this && index === childCount) {
    index -= 1;
  }

  // update parent
  child.removeFromParent({ silent: true });
  child.parent = this;

  if (this.children && this.children.length) {
    this.children.splice(index, 0, child);
  } else {
    // speed up
    this.children = [];
    this.children.push(child);
  }

  return this;
}

function getModel(primary, backup) {

  let model = primary && primary.getModel();

  if (!model && backup && backup.getModel) {
    model = backup.getModel();
  }

  return model;
}

function scheduleSetParent(scheduled) {

  this.setParent.scheduled = scheduled;

  return this;
}

function isSetParentScheduled() {

  return this.setParent.scheduled === true;
}

function scheduleSetTerminal(scheduled) {

  this.setTerminal.scheduled = scheduled;

  return this;
}

function isSetTerminalScheduled() {

  return this.setTerminal.scheduled === true;
}


class Cell {

  constructor(options) {

    const metadata = utils.merge({}, this.constructor.defaults, options);

    // bind some common props
    this.data     = metadata.data;
    this.attrs    = metadata.attrs || {};
    this.visible  = metadata.visible !== false;
    this.metadata = metadata;
  }


  // static
  // ------

  static setDefaults(options) {

    // update default options
    this.defaults = utils.merge({}, this.defaults, options);
  }


  // link
  // ----

  isLink() {

    return false;
  }

  getTerminal(isSource = true) {

    return isSource ? this.source : this.target;
  }

  setTerminal(terminal, isSource = true, options = {}) {

    scheduleSetTerminal.call(this, false);

    if (!options.silent) {

      let model = getModel(this, terminal);
      if (model) {
        // fully replace the previous terminal
        model.setTerminal(this, terminal, isSource);
        scheduleSetTerminal.call(this, true);
      }
    }

    if (!isSetTerminalScheduled.call(this)) {

      terminal = terminal ? new Terminal(terminal) : null;

      if (isSource) {
        this.source = terminal;

        if (terminal) {
          this.sourceNode  = terminal.node;
          this.sourcePort  = terminal.port;
          this.sourcePoint = terminal.point;
        } else {
          this.sourceNode  = null;
          this.sourcePort  = null;
          this.sourcePoint = null;
        }

      } else {
        this.target = terminal;

        if (terminal) {
          this.targetNode  = terminal.node;
          this.targetPort  = terminal.port;
          this.targetPoint = terminal.point;
        } else {
          this.targetNode  = null;
          this.targetPort  = null;
          this.targetPoint = null;
        }
      }
    }

    return this;
  }

  getTerminalNode(isSource = true) {

    let node = isSource
      ? this.sourceNode
      : this.targetNode;

    if (!node) {

      let terminal = this.getTerminal(isSource);

      node = terminal && terminal.node || null;
    }

    return node;
  }

  setTerminalNode(node, isSource = true, options = {}) {

    scheduleSetTerminal.call(this, false);

    if (!options.silent) {
      let model = getModel(this, node);
      if (model) {
        model.setTerminalNode(this, node, isSource);
        scheduleSetTerminal.call(this, true);
      }
    }

    if (!isSetTerminalScheduled.call(this)) {

      if (isSource) {
        this.sourceNode = node;
      } else {
        this.targetNode = node;
      }

      let terminal = this.getTerminal(isSource);
      if (terminal) {
        terminal.node = node;
      }
    }

    return this;
  }

  getTerminalPort(isSource = true) {

    let port = isSource
      ? this.sourcePort
      : this.targetPort;

    if (!port) {

      let terminal = this.getTerminal(isSource);

      port = terminal && terminal.port || null;
    }

    return port;
  }

  setTerminalPort(port, isSource = true, options = {}) {

    // partial replace the terminal port

    scheduleSetTerminal.call(this, false);

    if (!options.silent) {
      let model = getModel(this);
      if (model) {
        model.setTerminalPort(this, port, isSource);
        scheduleSetTerminal.call(this, true);
      }
    }

    if (!isSetTerminalScheduled.call(this)) {

      if (isSource) {
        this.sourcePort = port;
      } else {
        this.targetPort = port;
      }

      let terminal = this.getTerminal(isSource);
      if (terminal) {
        terminal.port = port;
      }
    }

    return this;
  }

  getTerminalPoint(isSource = true) {

    let point = isSource
      ? this.sourcePoint
      : this.targetPoint;

    if (!point) {

      let terminal = this.getTerminal(isSource);

      point = terminal && terminal.point || null;
    }

    return point;
  }

  setTerminalPoint(point, isSource = true, options = {}) {

    scheduleSetTerminal.call(this, false);

    if (!options.silent) {
      let model = getModel(this);
      if (model) {
        model.setTerminalPoint(this, point, isSource);
        scheduleSetTerminal.call(this, true);
      }
    }

    if (!isSetTerminalScheduled.call(this)) {

      if (isSource) {
        this.sourcePoint = point;
      } else {
        this.targetPoint = point;
      }

      let terminal = this.getTerminal(isSource);
      if (terminal) {
        terminal.point = point;
      }
    }

    return this;
  }

  removeFromTerminal(isSource = true, options = {}) {

    // remove link from terminal
    let terminal = this.getTerminal(isSource);
    if (terminal) {

      scheduleSetTerminal.call(this, false);

      if (!options.silent) {
        let model = getModel(this, terminal);
        if (model) {
          model.removeFromTerminal(this, isSource);
          scheduleSetTerminal.call(this, true);
        }
      }

      if (!isSetTerminalScheduled.call(this)) {
        terminal.removeLink(this, isSource, { silent: true });
      }
    }

    return this;
  }


  // node
  // ----

  isNode() {

    return false;
  }

  getLinks() {

    return this.links || [];
  }

  getLinkCount() {

    return this.getLinks().length;
  }

  indexOfLink(link) {

    return utils.indexOf(this.links, link);
  }

  getLinkAt(index) {

    return this.links ? this.links[index] : null;
  }

  eachLink(iterator, context) {

    return utils.forEach(this.links, iterator, context);
  }

  filterLink(iterator, context) {

    return utils.filter(this.links, iterator, context);
  }

  addLink(link, outgoing = true, options = {}) {

    if (!link) {
      return this;
    }

    scheduleSetTerminal.call(link, false);

    if (!options.silent) {
      let model = getModel(link, this);
      if (model) {
        // fully replace the previous terminal
        model.setTerminal(link, this, outgoing);
        scheduleSetTerminal.call(link, true);
      }
    }

    if (!isSetTerminalScheduled.call(link)) {

      link.removeFromTerminal(outgoing, { silent: true });

      // when source and target are the same node, these's
      // no need to relate link with node once more.
      if (!this.links || this.indexOfLink(link) < 0
        || link.getTerminalNode(!outgoing) !== this) {

        if (!this.links) {
          this.links = [];
        }

        // links are unordered, push it to the array directly.
        this.links.push(link);
      }

      link.setTerminal(this, outgoing, { silent: true });
    }

    return this;
  }

  removeLink(link, outgoing = true, options = {}) {

    if (!link) {
      return this;
    }

    scheduleSetTerminal.call(link, false);

    if (!options.silent) {
      let model = getModel(link, this);
      if (model) {
        // fully remove the previous terminal
        model.setTerminal(link, null, outgoing);
        scheduleSetTerminal.call(link, true);
      }
    }

    if (!isSetTerminalScheduled.call(link)) {

      // when the source and target are the same, do not remove it
      if (this.links && link.getTerminalNode(!outgoing) !== this) {

        let index = this.indexOfLink(link);
        if (index >= 0) {
          this.links.splice(index, 1);
        }
      }

      link.setTerminal(null, outgoing, { silent: true });
    }

    return this;
  }


  // children
  // --------

  getChildren() {

    return this.children || [];
  }

  getChildCount() {

    return this.getChildren().length;
  }

  indexOfChild(child) {

    return utils.indexOf(this.children, child);
  }

  getChildAt(index) {

    return this.children ? this.children[index] : null;
  }

  eachChild(iterator, context) {

    return utils.forEach(this.children, iterator, context);
  }

  filterChild(iterator, context) {

    return utils.filter(this.children, iterator, context);
  }

  insertChild(child, index, options = {}) {

    if (!child) {
      return this;
    }

    if (utils.isObject(index)) {
      options = index;
    }

    scheduleSetParent.call(child, false);

    if (!options.silent) {
      child.setParent(this, index);
    }

    if (!isSetParentScheduled.call(child)) {
      // if unscheduled, insert it directly
      insertChild.call(this, child, index);
    }

    return this;
  }

  removeChild(child, options = {}) {

    return this.removeChildAt(this.indexOfChild(child), options);
  }

  removeChildAt(index, options = {}) {

    let child = this.getChildAt(index);
    if (child) {

      scheduleSetParent.call(child, false);

      if (!options.silent) {
        child.setParent(null);
      }

      if (!isSetParentScheduled.call(child)) {
        this.children.splice(index, 1);
        child.parent = null;
      }
    }

    // return the removed child
    return child;
  }


  // parent
  // ------

  getParent() {

    return this.parent;
  }

  setParent(parent, index, options = {}) {

    scheduleSetParent.call(this, false);

    // try to schedule a change
    if (!options.silent) {

      // this cell maybe not in a model, try get parent's model
      let model = getModel(this, parent);
      // schedule a change
      if (model) {
        model.setParent(this, parent, index);
        scheduleSetParent.call(this, true);
      }
    }

    if (!isSetParentScheduled.call(this)) {
      if (parent) {
        insertChild.call(parent, this, index);
      } else {
        this.removeFromParent({ silent: true });
      }
    }

    return this;
  }

  removeFromParent(options = {}) {

    if (this.parent) {

      let scheduled = false;

      // try to schedule a change
      if (!options.silent) {
        let model = getModel(this, this.parent);
        if (model) {
          model.removeCell(this);
          scheduled = true;
        }
      }

      if (!scheduled) {
        this.parent.removeChild(this, { silent: true });
      }
    }

    return this;
  }

  isOrphan() {

    return utils.isNil(this.parent);
  }

  isAncestor(descendant) {

    if (!descendant) {
      return false;
    }

    while (descendant && descendant !== this) {
      descendant = descendant.parent;
    }

    return descendant === this;
  }

  contains(descendant) {

    return this.isAncestor(this, descendant);
  }

  getAncestors() {

    let result = [];
    let parent = this.parent;

    while (parent) {
      result.push(parent);
      parent = parent.parent;
    }

    return result;
  }

  getDescendants() {

    let result = [];

    this.eachChild((child) => {
      result.push(child);
      result = result.concat(this.getDescendants(child));
    });

    return result;
  }


  // geometry
  // --------

  getSize(raw) {

    return raw ? this.metadata.size : this.size;
  }

  _setSize(size) {

    this.metadata.size = size;
  }

  setSize(size, options = {}) {

    let scheduled = false;

    size = {
      width: size.width,
      height: size.height,
      relative: size.relative === true
    };

    if (!options.silent) {
      let model = this.getModel();
      if (model) {
        model.setSize(this, size);
        scheduled = true;
      }
    }

    if (!scheduled) {
      this._setSize(size);
    }

    return this;
  }

  resize(width, height, options = {}) {

    return this.setSize({ width, height }, options);
  }

  getPosition(raw) {

    return raw ? this.metadata.position : this.position;
  }

  _setPosition(position) {

    this.metadata.position = position;
  }

  setPosition(position, options = {}) {

    let scheduled = false;

    position = {
      x: position.x,
      y: position.y,
      relative: position.relative === true
    };

    if (!options.silent) {
      let model = this.getModel();
      if (model) {
        model.setPosition(this, position);
        scheduled = true;
      }
    }

    if (!scheduled) {
      this._setPosition(position);
    }

    return this;
  }

  translate(x, y, options = {}) {

    return this.setPosition({ x, y }, options);
  }

  getRotation(raw) {

    return raw ? this.metadata.rotation : this.rotation;
  }

  _setRotation(rotation) {

    this.metadata.rotation = rotation;
  }

  setRotation(rotation, options = {}) {

    let scheduled = false;

    rotation = {
      angle: rotation.angle,
      relative: rotation.relative === true
    };

    if (!options.silent) {
      let model = this.getModel();
      if (model) {
        model.setRotation(this, rotation);
        scheduled = true;
      }
    }

    if (!scheduled) {
      this._setRotation(rotation);
    }

    return this;
  }

  rotate(angle, options = {}) {

    return this.setRotation({ angle }, options);
  }

  getGeometry(raw) {

    return {
      size: this.getSize(raw),
      position: this.getPosition(raw),
      rotation: this.getRotation(raw)
    };
  }

  _setGeometry(geom) {

    utils.forEach(['size', 'position', 'rotation'], (key) => {

      let val = geom[key];
      if (val) {
        this[`_set${utils.ucFirst(key)}`](val);
      }

    });
  }

  setGeometry(geom, options = {}) {

    let scheduled = false;

    if (!options.silent) {

      let model = this.getModel();
      if (model) {
        model.setGeometry(this, geom);
        scheduled = true;
      }
    }

    if (!scheduled) {
      this._setGeometry(geom);
    }

    return this;
  }


  // collapse
  // --------

  isCollapsed() {

    return this.metadata.collapsed === true;
  }

  _setCollapsed(collapsed) {

    this.metadata.collapsed = collapsed;
  }

  setCollapsed(collapsed, options = {}) {

    let scheduled = false;

    if (!options.silent) {

      let model = getModel(this);
      if (model) {
        model.setCollapsed(this, collapsed);
        scheduled = true;
      }
    }

    if (!scheduled) {
      this._setCollapsed(collapsed);
    }

    return this;
  }

  collapse(options = {}) {

    return this.setCollapsed(true, options);
  }

  expand(options = {}) {

    return this.setCollapsed(false, options);
  }

  toggleCollapse(options = {}) {

    return this.isCollapsed()
      ? this.expand(options)
      : this.collapse(options);
  }


  // visible
  // -------

  isVisible() {

    return this.visible !== false;
  }

  _setVisible(visible) {

    this.visible
      = this.metadata.visible
      = !!visible;
  }

  setVisible(visible, options = {}) {

    let scheduled = false;

    if (!options.silent) {

      let model = getModel(this);
      if (model) {
        model.setVisible(this, visible);
        scheduled = true;
      }
    }

    if (!scheduled) {
      this._setVisible(visible);
    }

    return this;
  }

  show(options = {}) {

    return this.setVisible(true, options);
  }

  hide(options = {}) {

    return this.setVisible(false, options);
  }

  toggleVisible(options = {}) {

    return this.isVisible()
      ? this.hide(options)
      : this.show(options);
  }


  // attribute
  // ---------

  getAttribute() {

    return this.metadata.attrs;
  }

  _setAttribute(attrs) {

    this.metadata.attrs = utils.merge({}, this.getAttribute(), attrs);
  }

  setAttribute(attrs, options = {}) {

    let scheduled = false;

    if (!options.silent) {

      let model = this.getModel();
      if (model) {
        model.setAttribute(this, attrs);
        scheduled = true;
      }
    }

    if (!scheduled && this.metadata) {
      this._setAttribute(attrs);
    }

    return this;
  }


  // access
  // ------

  getId() {

    return this.id;
  }

  setId(id) {

    this.id = id;
  }

  getModel() {

    return this.model;
  }

  setModel(model) {

    this.model = model || null;

    return this;
  }

  addTo(parent, index, model = this.getModel()) {

    if (model) {
      model.addCell(this, parent, index);
    }

    return this;
  }

  getView(paper) {

    return paper.getView(this);
  }

  getClassName() {

    let classNames = this.metadata.classNames;

    return utils.isArray(classNames)
      ? classNames.join(' ')
      : classNames || '';
  }

  getTagName() {

    return this.metadata.tagName || 'g';
  }

  getMarkup() {

    return this.metadata.markup;
  }

  getRenderData() {

    // get the data for render markup
    return this.data;
  }


  // lang
  // ----

  valueOf() {

    return this.data;
  }

  toString() {

    return this.getId() || Object.toString.call(this);
  }

  cloneData() {

    let data = this.data;
    if (data) {

      if (data.clone && utils.isFunction(data.clone)) {
        return data.clone();
      }

      if (utils.isNode(data)) {
        return data.cloneNode(true);
      }

      if (utils.isObject(data)) {
        return utils.merge({}, data);
      }
    }

    return data;
  }

  clone(options, withData) {

    let metadata = utils.merge({}, this.metadata, options);

    metadata.data    = withData === true ? this.cloneData() : this.data;
    metadata.visible = this.visible;

    return new this.constructor(metadata);
  }

  destroy() {

    this.eachChild(child => child.destroy());
    this.eachLink(link => link.destroy());

    this.removeFromTerminal(true)
      .removeFromTerminal(false)
      .removeFromParent();

    utils.destroy(this);
  }
}


// exports
// -------

export default Cell;
