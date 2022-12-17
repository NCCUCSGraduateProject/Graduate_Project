var Annoy = require('annoy');
var annoyIndex1 = new Annoy(10, 'euclidean');

var annoyPath = './vectors'

annoyIndex1.addItem(0, [0, -4.5, -3.2, -2.8, -2.1, -1.5, -0.34, 0, 3.7, 6]);
annoyIndex1.addItem(1, [5.0, 4.5, 3.2, 2.8, 2.1, 1.5, 0.34, 0, -3.7, -6]);
annoyIndex1.addItem(2, [0, 0, 0, 0, 0, -1, -1, -0.2, 0.1, 0.8]);
annoyIndex1.addItem(3, [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]);
annoyIndex1.build();
annoyIndex1.save(annoyPath);

read();

function read() {

  var zeroVector = [0,0,0,0,0,0,0,0,0,0];
  var annoyIndex2 = new Annoy(10, 'euclidean');

  if (annoyIndex2.load(annoyPath)) {
    var v1 = annoyIndex2.getItem(0);
    var v2 = annoyIndex2.getItem(1);
    var v3 = annoyIndex2.getItem(2);
    console.log('Gotten vectors:', v1, v2,v3);


      var neighbors = annoyIndex2.getNNsByVector(zeroVector, 5, -1, false);
      console.log('zero vector:', zeroVector);
      console.log('Nearest neighbors to zeroVector', neighbors);

      neighbors2 = annoyIndex2.getNNsByItem(zeroVector, 5, -1, false);
      console.log('zero vector:', zeroVector);
      console.log('Nearest neighbors to zeroVector', neighbors2);
      // var neighborsAndDistances = annoyIndex2.getNNsByVector(sum, 10, -1, true);
      // console.log('Nearest neighbors to sum with distances', neighborsAndDistances);

  }
}






