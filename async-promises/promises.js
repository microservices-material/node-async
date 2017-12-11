/* requests using promises */

// include libraries
const _ = require('lodash');
const request = require('request')
const Promise = require("bluebird")

var argentinaQuery = buildUri('ARG')
var brasilQuery = buildUri('BRA')
var paraguayQuery = buildUri('PRY')
var boliviaQuery = buildUri('BOL')
var mysteriousQuery = buildUri('JPQ')
var failQuery = buildUri('FAI')


threeCallsWithPromises()


function oneCallWithPromises() {
  requestAsPromise( argentinaQuery )
  .then(function(body) {
    logCountryData(body)
  })
}

function oneCallWithPromises_explicit() {
  let promise = requestAsPromise( argentinaQuery )
  promise.then(function(body) {
    logCountryData(body)
  })
}


function threeCallsWithPromises() {
  let argentinaData = null
  let brasilData = null
  let paraguayData = null

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
    logCountryData(argentinaData)
    logCountryData(brasilData)
    logCountryData(paraguayData)
  })
  .catch(function(someError) {
    console.log(someError)
  })
}


function threeCallsWithPromiseAll() {
  let argentinaData = null
  let brasilData = null
  let paraguayData = null

  Promise.all([
    requestAsPromise( argentinaQuery ), 
    requestAsPromise( brasilQuery ),
    requestAsPromise( paraguayQuery )
  ])
  .spread(function(argentinaData, brasilData, paraguayData) {
    logCountryData(argentinaData)
    logCountryData(brasilData)
    logCountryData(paraguayData)
  })
  .catch(function(someError) {
    console.log(someError)
  })
}


function requestAsPromise(theUri) {
  return new Promise(function(fulfill,reject) {
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
  })
}


function buildUri(countryCode) {
  return 'https://restcountries.eu/rest/v2/alpha/' + countryCode
}


function logCountryData(countryData) {
  let countryName = null
  let population = null
  let currencyCode = null
  let cantidadDeLimites = null
  let prefijo = null
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

