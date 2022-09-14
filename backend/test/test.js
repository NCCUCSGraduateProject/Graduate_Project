const axios = require('axios');

axios.get("http://localhost:8080/direction/nearbyPoints", {
    params: {
        originLat: 24.9885267,
        originLng: 121.5739302,
        destLat: 25.0342531,
        destLng: 121.5270531,
        limitDistance: 1000
    }
}).then(function(response){
    console.log(response.data)
})