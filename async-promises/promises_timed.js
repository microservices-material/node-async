/* requests using promises, and measuring response time for different variants */

// include libraries
const _ = require('lodash');
const request = require('request')
const Promise = require("bluebird")

var argentinaQuery = buildUri('ARG')
var brasilQuery = buildUri('BRA')
var paraguayQuery = buildUri('PRY')
var boliviaQuery = buildUri('BOL')
var mysteriousQuery = buildUri('JPQ')


threeCallsWithPromiseAll()


function oneCallWithPromises() {
  var startTime = new Date().getTime()
  requestAsPromise( argentinaQuery )
  .then(function(body) {
    var endTime = new Date().getTime()
    logCountryData(body)
    console.log("tiempo: " + (endTime - startTime))
  })
}


function threeCallsWithPromises() {
	var startTime = new Date().getTime()
  var argentinaData = null
  var brasilData = null
  var paraguayData = null

  requestAsPromise( argentinaQuery )
  .then(function(body) {
    argentinaData = body
    return requestAsPromise( brasilQuery )
  })
  .then(function(body) {
    brasilData = body
    return requestAsPromise( paraguayQuery )
  })
  .then(function(body) {
    paraguayData = body
		var endTime = new Date().getTime()
    console.log('')
    console.log('Using sequential promises')
    console.log('-------------------------')
    logCountryData(argentinaData)
    logCountryData(brasilData)
    logCountryData(paraguayData)
    console.log("tiempo: " + (endTime - startTime))
  })
  .catch(function(someError) {
    var endTime = new Date().getTime()
    console.log(someError)
    console.log("tiempo: " + (endTime - startTime))
  })
}


function threeCallsWithPromiseAll() {
	var startTime = new Date().getTime()
  var argentinaData = null
  var brasilData = null
  var paraguayData = null

  Promise.all([
    requestAsPromise( argentinaQuery ), 
    requestAsPromise( brasilQuery ),
    requestAsPromise( mysteriousQuery ),
    requestAsPromise( paraguayQuery )
  ])
  .spread(function(argentinaData, brasilData, mysteriousData, paraguayData) {
		var endTime = new Date().getTime()
    console.log('')
    console.log('Using promise.all')
    console.log('-----------------')
    logCountryData(argentinaData)
    logCountryData(brasilData)
    logCountryData(paraguayData)
    console.log("tiempo: " + (endTime - startTime))
  })
  .catch(function(someError) {
    var endTime = new Date().getTime()
    console.log(someError)
    console.log("tiempo: " + (endTime - startTime))
  })
}


function requestAsPromise(theUri) {
  return new Promise(function(fulfill,reject) {
    if (theUri == mysteriousQuery) {
      fulfill(4)
    }
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
}


function buildUri(countryCode) {
  return 'https://restcountries.eu/rest/v2/alpha/' + countryCode
}


function logCountryData(countryData) {
  var countryName = null
  var population = null
  var currencyCode = null
  var cantidadDeLimites = null
  var prefijo = null
  if (countryData) {  
    countryName = countryData.translations.es
    population = countryData.population
    currencyCode = countryData.currencies[0].code
    cantidadDeLimites = countryData.borders.length
    prefijo = countryData.callingCodes[0]
  }
  console.log('Datos de ' + countryName)
  console.log('    Población: ' + population + 
    '  - código de la moneda: ' + currencyCode + '  - prefijo telefónico: ' + prefijo + 
    '  - limita con ' + cantidadDeLimites + ' países')
  console.log('')
}
