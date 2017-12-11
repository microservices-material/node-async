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
  let jsonBody = jsonBody_get_sync(uri)
  console.log('respuesta del servidor restcountries.eu: ' + JSON.stringify(jsonBody,null,'  '))
  logCountryData(jsonBody)
}

function threeCalls() {
  let argentinaData = jsonBody_get_sync(argentinaQuery)
  let brasilData = jsonBody_get_sync(brasilQuery)
  let paraguayData = jsonBody_get_sync(paraguayQuery)
  logCountryData(argentinaData)
  logCountryData(brasilData)
  logCountryData(paraguayData)
}

function buildUri(countryCode) {
  return 'https://restcountries.eu/rest/v2/alpha/' + countryCode
}

function logCountryData(countryData) {
  let countryName = countryData.translations.es
  let population = countryData.population
  let currencyCode = countryData.currencies[0].code
  let limites = countryData.borders
  let prefijo = countryData.callingCodes[0]
  console.log('Datos de ' + countryName)
  console.log('    Población: ' + population + 
    '  - código de la moneda: ' + currencyCode + '  - prefijo telefónico: ' + prefijo + 
    '  - limita con ' + limites.length + ' países')
  console.log('')
}

