import GeoJSONReader from 'jsts/org/locationtech/jts/io/GeoJSONReader.js'
import GeoJSONWriter from 'jsts/org/locationtech/jts/io/GeoJSONWriter.js'
import Geometry from 'jsts/org/locationtech/jts/geom/Geometry.js'
import {BufferOp} from 'jsts/org/locationtech/jts/operation/buffer.js'


var geoInput = {
    type: "LineString",
    coordinates: [
        [121.471,22.67],
        [121.574,22.76],
        [121.601,22.8]
    ]
};

var geoReader = new GeoJSONReader()
var geoWriter = new GeoJSONWriter();
var geometry = geoReader.read(geoInput)
var buffer = BufferOp.bufferOp(geometry, 0.1);
var polygon = geoWriter.write(buffer);
console.log("Input line:")
for (var i in geoInput.coordinates) {
    console.log(geoInput.coordinates[i]);
}
console.log("Result:")

console.log(polygon.coordinates)

