import Base from '../handlers/Handler';


class Handler extends Base {

    isGroup(cell) {

        return cell && cell.isGroup && cell.isGroup();
    }

    isRemark(cell) {

        return cell && cell.isRemark && cell.isRemark();
    }

    isNode(cell) {

        return cell && cell.isNode();
    }

    isLink(cell) {

        return cell && cell.isLink();
    }
}


// exports
// -------

export default Handler;
