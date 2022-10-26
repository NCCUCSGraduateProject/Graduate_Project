var axios = require('axios');
var API_KEY = require('./constant.js');

inputStr = '政大';

var config = {
  method: 'get',
  url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + inputStr + '&types=restaurant|amusement_park|tourist_attraction&key=' + API_KEY,
  headers: { }
};

axios(config).then(function (response) {
  // console.log(JSON.stringify(response.data));
  // console.log(response.data);
  for (var i in response.data.predictions) {
    console.log(response.data.predictions[i].description);
  }
}).catch(function (error) {
  console.log(error);
});
