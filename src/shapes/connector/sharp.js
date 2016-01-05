import * as utils from '../../common/utils';

function sharpConnector(sourcePoint, targetPoint, vertices) {

    let d = ['M', sourcePoint.x, sourcePoint.y];

    utils.forEach(vertices, function (vertex) {

        d.push(vertex.x, vertex.y);
    });

    d.push(targetPoint.x, targetPoint.y);

    return d.join(' ');
}


export default sharpConnector;
