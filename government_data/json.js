const fs = require('fs')
var rawData = fs.readFileSync('restaurant_C_f.json')
var data = JSON.parse(rawData)
console.log(data.XML_Head.Infos.Info.length)