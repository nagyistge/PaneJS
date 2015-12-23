import * as utils from '../../common/utils'

export default function normalConnector(sourcePoint, targetPoint, vertices) {

    var d = ['M', sourcePoint.x, sourcePoint.y];

    utils.forEach(vertices, function (vertex) {

        d.push(vertex.x, vertex.y);
    });

    d.push(targetPoint.x, targetPoint.y);

    return d.join(' ');
};
