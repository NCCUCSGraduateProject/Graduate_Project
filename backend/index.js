var express = require('express');
var app = express();
app.use(express.json())

// cors setting
var cors = require('cors')
app.use(cors({
  origin: '*'
}))

const direction = require('./src/routes/direction.js')

app.use('/direction', direction)


app.listen(8080, function() {
  console.log(' Http Express Server run in 8080');
});