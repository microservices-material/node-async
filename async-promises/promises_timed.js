/* requests using promises, and measuring response time for different variants */

// include libraries
const _ = require('lodash');
const request = require('request')
const Promise = require("bluebird")

var bsAsWeather = accUri(7894)
var rawsonWeather = accUri(3092)
var posadasWeather = accUri(5168)
var saltaWeather = accUri(10531)
var nonExistentWeather = accUri(105310000)


threeCallsWithPromises()


function oneCallWithPromises() {
  let startTime = new Date().getTime()
  requestAsPromise( bsAsWeather )
  .then(function(body) {
    let endTime = new Date().getTime()
    console.log('Temperatura en Buenos Aires: ' + body[0].Temperature.Metric.Value)
    console.log("tiempo: " + (endTime - startTime))
  })
}


function threeCallsWithPromises() {
	let startTime = new Date().getTime()
  let temperaturaEnBuenosAires = 0
  let temperaturaEnRawson = 0
  let temperaturaEnPosadas = 0

  requestAsPromise( bsAsWeather )
  .then(function(body) {
    temperaturaEnBuenosAires = body[0].Temperature.Metric.Value
    return requestAsPromise( rawsonWeather )
  })
  .then(function(body) {
    temperaturaEnRawson = body[0].Temperature.Metric.Value
    return requestAsPromise( posadasWeather )
  })
  .then(function(body) {
    temperaturaEnPosadas = body[0].Temperature.Metric.Value
		let endTime = new Date().getTime()
    console.log("Temperaturas")
    console.log("   Buenos Aires: " + temperaturaEnBuenosAires)
    console.log("   Rawson: " + temperaturaEnRawson)
    console.log("   Posadas: " + temperaturaEnPosadas)
    console.log("tiempo: " + (endTime - startTime))
  })
  .catch(function(someError) {
    let endTime = new Date().getTime()
    console.log(someError)
    console.log("tiempo: " + (endTime - startTime))
  })
}


function threeCallsWithPromiseAll() {
	let startTime = new Date().getTime()
  let temperaturaEnBuenosAires = 0
  let temperaturaEnRawson = 0
  let temperaturaEnPosadas = 0

  Promise.all([
    requestAsPromise( bsAsWeather ), 
    requestAsPromise( rawsonWeather ),
    requestAsPromise( nonExistentWeather ),
    requestAsPromise( posadasWeather )
  ])
  .spread(function(bodyBsAs, bodyRawson, bodyNonExistent, bodyPosadas) {
    temperaturaEnBuenosAires = bodyBsAs[0].Temperature.Metric.Value
    temperaturaEnRawson = bodyRawson[0].Temperature.Metric.Value
    temperaturaEnPosadas = bodyPosadas[0].Temperature.Metric.Value
		let endTime = new Date().getTime()
    console.log("Temperaturas")
    console.log("   Buenos Aires: " + temperaturaEnBuenosAires)
    console.log("   Rawson: " + temperaturaEnRawson)
    console.log("   Posadas: " + temperaturaEnPosadas)
    console.log("tiempo: " + (endTime - startTime))
  })
  .catch(function(someError) {
    let endTime = new Date().getTime()
    console.log(someError)
    console.log("tiempo: " + (endTime - startTime))
  })
}


function requestAsPromise(theUri) {
  return new Promise(function(fulfill,reject) {
    if (theUri == nonExistentWeather) {
      fulfill(4)
    }
  	setTimeout(function() {
	    request.get(
	      {uri: theUri, json: true}, 
	      function(theError,response,body) {
	        if (theError) {
	          reject(theError)
	        } else if (response.statusCode != 200) {
	          reject('status = ' + response.statusCode)
	        } else {
	          fulfill(body)
	        }
	      })  
		}, 1000)
  })
}


function accUri(cityNumber) {
	return 'http://apidev.accuweather.com/currentconditions/v1/' + cityNumber + '.json?language=en&apikey=hoArfRosT1215'
}

