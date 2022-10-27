const API_KEY = require("../configs/api_key.json").API_KEY
const axios = require('axios')

const predict = async (inputStr) => {
  // user input string in search bar
  console.log(inputStr.query)

  var config = {
    method: 'get',
    url: encodeURI('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + inputStr.query + '&types=restaurant|amusement_park|tourist_attraction&key=' + API_KEY),
    headers: {}
  };
  
  let response = await axios(config)
  
  var result = []
  response.data.predictions.forEach((item) => {
      let data = {
          name: item.structured_formatting.main_text,
          address: item.structured_formatting.secondary_text,
          place_id: item.place_id
      }
      result.push(data)
  })

  // the final data we want in the predictions
  console.log('Result: ', result);
  return result


}

module.exports = {
  predict: predict
}