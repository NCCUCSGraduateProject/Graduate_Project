const express = require('express');
const router = express.Router();
const direction = require('../services/direction.js')

router.post('/nearbyPoints', async (req, res) => {
  console.log(req.body.originLat, req.body.originLng, req.body.destLat, req.body.destLng, req.body.limitDistance, req.body.splitRange || 1000, req.body.directionMode || 'driving')
  let result  = await direction.nearbyPoints(req.body.originLat, req.body.originLng, req.body.destLat, req.body.destLng, req.body.limitDistance, req.body.splitRange || 1000, req.body.directionMode || 'driving', req.body.queryString, req.body.queryVectors)
  res.json(result)
  
})

module.exports = router