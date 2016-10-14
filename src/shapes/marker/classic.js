import Point from '../../geometry/Point';


export default function classicMarker(vMarker, options) {

  if (vMarker) {

    // let markerStrokeWidth = options.markerStrokeWidth;

    let size    = options.size || 7;
    let pathArr = [];

    let connectionX = size * 0.75;
    let connectionY = size / 2;

    pathArr.push('M', 0, size / 2);
    pathArr.push('L', size, 0);
    pathArr.push('L', connectionX, connectionY);
    pathArr.push('L', size, size);
    pathArr.push('Z');

    vMarker.attr('d', pathArr.join(' '));

    //
    let connectorStrokeWidth = options.connectorStrokeWidth;

    if (connectorStrokeWidth > 1) {
      connectionX += (connectorStrokeWidth / 2) * (size - connectionX) / connectionY;
    }

    // return the connection point on the marker
    return {
      rad: Math.atan2(size / 2, size),
      point: new Point(connectionX, connectionY)
    };
  }

  return null;
}
