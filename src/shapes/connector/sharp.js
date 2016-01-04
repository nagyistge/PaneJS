import * as utils from '../../common/utils';

function straight(sourcePoint, targetPoint, vertices) {

    let d = ['M', sourcePoint.x, sourcePoint.y];

    utils.forEach(vertices, function (vertex) {

        d.push(vertex.x, vertex.y);
    });

    d.push(targetPoint.x, targetPoint.y);

    return d.join(' ');
}


export default straight;
