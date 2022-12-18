var Annoy = require('annoy');

var annoyPath = './vectors';

var doc = new Annoy(300, 'euclidean');
// var doc = new Annoy(300, 'dot');

for (let i=0;i<10000;++i){

    temp = []
	for(let j=0;j<300;++j){
	    temp.push(Math.random());
	}
    doc.addItem(i, temp);

}

doc.build();
doc.save(annoyPath);

read();

function read() {

    var zeroVector = [];
    for(let i =0;i<300;++i){
	zeroVector.push(0);
    }

    var annoyIndex2 = new Annoy(300, 'euclidean');

    for(let i=0;i<10000;i++){
	if (annoyIndex2.load(annoyPath)) {
	    var v1 = annoyIndex2.getItem(0);
	    var v2 = annoyIndex2.getItem(1);
	    var v3 = annoyIndex2.getItem(2);
	    console.log('Gotten vectors:', v1, v2,v3);


	    var neighbors = annoyIndex2.getNNsByVector(zeroVector, 5, -1, false);
	    console.log('zero vector:', zeroVector);
	    console.log('Nearest neighbors to zeroVector', neighbors);

	    // always segmentation faule 
	    neighbors2 = annoyIndex2.getNNsByItem(zeroVector, 5, -1, false);
	    console.log('zero vector:', zeroVector);
	    console.log('Nearest neighbors to zeroVector', neighbors2);
	    // var neighborsAndDistances = annoyIndex2.getNNsByVector(sum, 10, -1, true);
	    // console.log('Nearest neighbors to sum with distances', neighborsAndDistances);

	}
    }
}

