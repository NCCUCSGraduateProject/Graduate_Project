const axios = require('axios');
const API_KEY = require('./constant.js'); 

// user input string in search bar
inputStr = '龍角';

var config = {
  method: 'get',
  url: encodeURI('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + inputStr + '&location=24.991728%2C121.573948&radius=500&types=restaurant|amusement_park|tourist_attraction&key=' + API_KEY),
  headers: { }
};

axios(config).then(function (response) {

  let result = []
  response.data.predictions.forEach((item) => {
      let data = {
          name: item.structured_formatting.main_text,
          address: item.structured_formatting.secondary_text,
          place_id: item.place_id
      }
      result.push(data)
  })

  // the final data we want in the predictions
  console.log(result) 

}).catch(function (error) {
  console.log(error);
});
