/* requests using callbacks */

// include libraries
const _ = require('lodash');
const request = require('request')
const Promise = require("bluebird")

var bsAsWeather = accUri(7894)
var rawsonWeather = accUri(3092)
var posadasWeather = accUri(5168)
var saltaWeather = accUri(10531)


lookMessageOrder()


function justOneCall() {
  request.get({ url: bsAsWeather, json: true },  
    function(theError, response, body) {
      console.log('Temperatura en Buenos Aires: ' + body[0].Temperature.Metric.Value)
    })
}


function lookMessageOrder() {
	justOneCall()
  console.log("After get")
}


function threeCalls_naive() {
  let temperaturaEnBuenosAires = 0
  let temperaturaEnRawson = 0
  let temperaturaEnPosadas = 0
  request.get({ url: bsAsWeather, json: true },  
    function(theError, response, body) {
      temperaturaEnBuenosAires = body[0].Temperature.Metric.Value
    })
  request.get({ url: rawsonWeather, json: true },  
    function(theError, response, body) {
      temperaturaEnRawson = body[0].Temperature.Metric.Value
    })
  request.get({ url: posadasWeather, json: true },  
    function(theError, response, body) {
      temperaturaEnPosadas = body[0].Temperature.Metric.Value
    })
  console.log("Temperaturas")
  console.log("   Buenos Aires: " + temperaturaEnBuenosAires)
  console.log("   Rawson: " + temperaturaEnRawson)
  console.log("   Posadas: " + temperaturaEnPosadas)
}


function threeCalls_callbacks() {
  let temperaturaEnBuenosAires = 0
  let temperaturaEnRawson = 0
  let temperaturaEnPosadas = 0
  request.get(
  	{ url: bsAsWeather, json: true },  
    function(theError, response, body) {
      temperaturaEnBuenosAires = body[0].Temperature.Metric.Value
      request.get(
      	{ url: rawsonWeather, json: true },  
        function(theError, response, body) {
          temperaturaEnRawson = body[0].Temperature.Metric.Value
          request.get(
          	{ url: posadasWeather, json: true },  
            function(theError, response, body) {
              temperaturaEnPosadas = body[0].Temperature.Metric.Value
              console.log("Temperaturas")
              console.log("   Buenos Aires: " + temperaturaEnBuenosAires)
              console.log("   Rawson: " + temperaturaEnRawson)
              console.log("   Posadas: " + temperaturaEnPosadas)
            })
        })
    })
}


function threeCalls_callbacks_errors() {
  let temperaturaEnBuenosAires = 0
  let temperaturaEnRawson = 0
  let temperaturaEnPosadas = 0
    request.get(
    	{ url: bsAsWeather, json: true },  
	    function(theError, response, body) {
	    	if (theError || response.statusCode != 200) {
	    		console.log('Buenos Aires we have a problem')
	    	} else {
		      temperaturaEnBuenosAires = body[0].Temperature.Metric.Value
	        request.get(
	        	{ url: rawsonWeather, json: true },  
		        function(theError, response, body) {
				    	if (theError || response.statusCode != 200) {
				    		console.log('Rawson we have a problem')
				    	} else {
			          temperaturaEnRawson = body[0].Temperature.Metric.Value
			          request.get(
			          	{ url: posadasWeather, json: true },  
			            function(theError, response, body) {
							    	if (theError || response.statusCode != 200) {
							    		console.log('Posadas we have a problem')
							    	} else {
				              temperaturaEnPosadas = body[0].Temperature.Metric.Value
				              console.log("Temperaturas")
				              console.log("   Buenos Aires: " + temperaturaEnBuenosAires)
				              console.log("   Rawson: " + temperaturaEnRawson)
				              console.log("   Posadas: " + temperaturaEnPosadas)
				            }
			            })
			        }
		        })
	      }
	    })
}


function threeCalls_callbacks_2() {
  let temperaturaEnBuenosAires = 0
  let temperaturaEnRawson = 0
  let temperaturaEnPosadas = 0
    request.get(
    	{ url: bsAsWeather, json: true },  
    function(theError, response, body) {
      temperaturaEnBuenosAires = body[0].Temperature.Metric.Value
        request.get(
        	{ url: rawsonWeather, json: true },  
        function(theError, response, body) {
          temperaturaEnRawson = body[0].Temperature.Metric.Value
          request.get(
          	{ url: posadasWeather, json: true },  
            function(theError, response, body) {
              temperaturaEnPosadas = body[0].Temperature.Metric.Value
              console.log("Temperatura en Posadas: " + temperaturaEnPosadas)
				      wait(500)
            })
          console.log("Temperatura en Rawson: " + temperaturaEnRawson)
		      wait(500)
        })
      console.log("Temperatura en Buenos Aires: " + temperaturaEnBuenosAires)
      wait(500)
    })
}


function wait(ms) {
	let waitTill = new Date(new Date().getTime() + ms);
	while(waitTill > new Date()){}
}

function accUri(cityNumber) {
	return 'http://apidev.accuweather.com/currentconditions/v1/' + cityNumber + '.json?language=en&apikey=hoArfRosT1215'
}





function threeCalls_callbacks_external_fns() {
  let temperaturaEnBuenosAires = 0
  let temperaturaEnRawson = 0
  let temperaturaEnPosadas = 0
  request.get(
  	{ url: bsAsWeather, json: true },  
    function(theError, response, body) {
      temperaturaEnBuenosAires = body[0].Temperature.Metric.Value
      getRawsonAndPosadas(temperaturaEnBuenosAires)
    })
}


function getRawsonAndPosadas(tempBsAs) {
  request.get(
		{ url: rawsonWeather, json: true },  
	  function(theError, response, body) {
	    temperaturaEnRawson = body[0].Temperature.Metric.Value
	    getPosadas(tempBsAs, temperaturaEnRawson) 
	  })
}


function getPosadas(tempBsAs, tempRawson) {
	request.get(
		{ url: posadasWeather, json: true },  
	  function(theError, response, body) {
	    temperaturaEnPosadas = body[0].Temperature.Metric.Value
	    console.log("Temperaturas")
	    console.log("   Buenos Aires: " + tempBsAs)
	    console.log("   Rawson: " + tempRawson)
	    console.log("   Posadas: " + temperaturaEnPosadas)
	  })
} 






