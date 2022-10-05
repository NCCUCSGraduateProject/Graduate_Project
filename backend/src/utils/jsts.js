// import GeoJSONReader from 'jsts/org/locationtech/jts/io/GeoJSONReader.js'
// import GeoJSONWriter from 'jsts/org/locationtech/jts/io/GeoJSONWriter.js'
// import Geometry from 'jsts/org/locationtech/jts/geom/Geometry.js'
// import {BufferOp} from 'jsts/org/locationtech/jts/operation/buffer.js'

async function import_jsts() {
  const { GeoJSONReader } = await import('jsts/org/locationtech/jts/io/GeoJSONReader.js')
  const {  GeoJSONWriter } = await import('jsts/org/locationtech/jts/io/GeoJSONWriter.js')
  const {  BufferOp } = await import('jsts/org/locationtech/jts/operation/buffer.js')
  return {
    GeoJSONReader: GeoJSONReader,
    GeoJSONWriter: GeoJSONWriter,
    BufferOp: BufferOp,
  }
}
 
module.exports = import_jsts
