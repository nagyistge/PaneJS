import * as utils from '../../common/utils';

export default function sharpConnector(sourcePoint, targetPoint, vertices) {

  let d = ['M', sourcePoint.x, sourcePoint.y];

  utils.forEach(vertices, (vertex) => {
    d.push(vertex.x, vertex.y);
  });

  d.push(targetPoint.x, targetPoint.y);

  return d.join(' ');
}
