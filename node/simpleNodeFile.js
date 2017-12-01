// include libraries
const _ = require('lodash');

var rainRecords = [
  { city: 'BsAs',  year: 1901, rain: 984 },
  { city: 'BsAs',  year: 1902, rain: 846 },
  { city: 'Mendoza',  year: 1901, rain: 238 }	
];
 
function applyToInc(fn, n) { return fn(n+1) }
let triple = function(n) { return n * 3 }

console.log('function application result: ' + applyToInc(triple, 4))

console.log("Buenos Aires 1901 record " + 
  JSON.stringify(_.find(rainRecords, { city: 'BsAs', year: 1901 }))
);


console.log(
	'sum of BsAs rain records: ' 
	+ 
	_.sumBy(_.filter(rainRecords, { city: 'BsAs' }), 'rain')
);
