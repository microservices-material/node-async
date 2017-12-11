/* simple request */

// include libraries
const _ = require('lodash');
const request = require('sync-request')

var argentinaQuery = buildUri('ARG')
var brasilQuery = buildUri('BRA')
var paraguayQuery = buildUri('PRY')

// rawCall()
oneCall()
// threeCalls()


function rawCall() {
  const uri = 'https://restcountries.eu/rest/v2/alpha/ARG'
  const response = request('GET', uri)
  console.log(response.body.toString())
}

function jsonBody_get_sync(uri) {
  const response = request('GET', uri)
  return JSON.parse(response.body.toString())
}

function oneCall() {
	const uri = 'https://restcountries.eu/rest/v2/alpha/ARG'
  var jsonBody = jsonBody_get_sync(uri)
  console.log('respuesta del servidor restcountries.eu: ' + JSON.stringify(jsonBody,null,'  '))
  logCountryData(jsonBody)
}

function threeCalls() {
  var argentinaData = jsonBody_get_sync(argentinaQuery)
  var brasilData = jsonBody_get_sync(brasilQuery)
  var paraguayData = jsonBody_get_sync(paraguayQuery)
  logCountryData(argentinaData)
  logCountryData(brasilData)
  logCountryData(paraguayData)
}

function buildUri(countryCode) {
  return 'https://restcountries.eu/rest/v2/alpha/' + countryCode
}

function logCountryData(countryData) {
  var countryName = countryData.translations.es
  var population = countryData.population
  var currencyCode = countryData.currencies[0].code
  var limites = countryData.borders
  var prefijo = countryData.callingCodes[0]
  console.log('Datos de ' + countryName)
  console.log('    Población: ' + population + 
    '  - código de la moneda: ' + currencyCode + '  - prefijo telefónico: ' + prefijo + 
    '  - limita con ' + limites.length + ' países')
  console.log('')
}

