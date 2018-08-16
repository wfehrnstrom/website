/**
 * LocationDataNode constructor
 * @param       {Location} locationData - the location to be represented by this node
 * @param       {ImageData} imgData - any image data associated with this location, in array format
 * @constructor
 * TODO: modify the calls to this constructor so that they take an array of image data
 */
function LocationDataNode(locationData, imgData){
  this.node = locationData
  this.imgData = imgData
}

export default LocationDataNode
