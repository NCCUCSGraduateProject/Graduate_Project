var express = require('express');
var app = express();
app.use(express.json())

// cors setting
var cors = require('cors')
app.use(cors({
  origin: '*'
}))

const direction = require('./src/routes/direction.js')
const autoComplete = require('./src/routes/autoComplete.js')

app.use('/direction', direction)
app.use('/autoComplete', autoComplete)

const PORT = process.argv[2];
app.listen(PORT, function() {
  console.log(`Http Express Server run in ${PORT}`);
});