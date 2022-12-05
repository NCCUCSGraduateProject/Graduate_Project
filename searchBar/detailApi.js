var axios = require('axios');
var API_KEY = require('./constant.js');

// let place_id = 'ChIJIf-h52uNbzQRAE_GNHfuJFY';
// let place_id = 'ChIJtyj1aXuqQjQRjma-YABJXek';
// let place_id = 'ChIJzXfooxuNbzQRAO73DxrNJbc'; // no reviews
let place_id = 'ChIJDeAG7pyNbzQR5tKRgp3KDn8';


const getDetails = async (place_id) => {

  var config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&fields=address_component%2Cadr_address%2Cbusiness_status%2Cformatted_address%2Cgeometry%2Cicon%2Cicon_mask_base_uri%2Cicon_background_color%2Cname%2Cphoto%2Cplace_id%2Cplus_code%2Ctype%2Curl%2Cutc_offset%2Cvicinity%2Cuser_ratings_total%2Crating%2Ceditorial_summary%2Cprice_level%2Creviews&language=zh-TW&key=' + API_KEY,
    headers: { }
  };
  /*
  axios(config).then(function (response) {
    // console.log(JSON.stringify(response.data));
    console.log(response.data);
    console.log(response.data.result.reviews);
    console.log(response.data.result.editorial_summary);
  
  }).catch(function (error) {
    console.log(error);
  });
*/
  
  let response = await axios(config);
  console.log(response)
  return response.data.result;

}
getDetails(place_id).then((result) => {
  // console.log(result);
  // console.log(result.reviews);
});
