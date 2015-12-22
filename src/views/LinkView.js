import {

} from '../common/utils';

import vector   from '../common/vector';
import Point    from '../geometry/Point';
import CellView from './CellView';


class LinkView extends CellView {

    render() {

        let that = this;
        let vel = that.vel;

        vel.empty();

        that.renderMarkup();

        return that.update();
    }

    renderMarkup() {

    }

    update() {
        return this;
    }
}


// exports
// -------

export default LinkView;
