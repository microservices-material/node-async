/* simple request */

// include libraries
const _ = require('lodash');
const request = require('sync-request')

// rawCall()
oneCall()
// threeCalls()


function rawCall() {
	const uri = 'http://apidev.accuweather.com/currentconditions/v1/7894.json?language=en&apikey=hoArfRosT1215'
  const response = request('GET', uri)
  console.log(response.body.toString())
}

function jsonBody_get_sync(uri) {
  const response = request('GET', uri)
  return JSON.parse(response.body.toString())
}

function oneCall() {
  const uri = 'http://apidev.accuweather.com/currentconditions/v1/7894.json?language=en&apikey=hoArfRosT1215'
  let jsonBody = jsonBody_get_sync(uri)
  console.log('respuesta del servidor accuweather: ' + JSON.stringify(jsonBody,null,'  '))
  console.log('Temperatura en Buenos Aires: ' + jsonBody[0].Temperature.Metric.Value)
}

function threeCalls() {
  const uriBsAs = 'http://apidev.accuweather.com/currentconditions/v1/7894.json?language=en&apikey=hoArfRosT1215'
  let bsAsData = jsonBody_get_sync(uriBsAs)
  const uriRosario = 'http://apidev.accuweather.com/currentconditions/v1/11222.json?language=en&apikey=hoArfRosT1215'
  let rosarioData = jsonBody_get_sync(uriRosario)
  const uriSalta = 'http://apidev.accuweather.com/currentconditions/v1/10531.json?language=en&apikey=hoArfRosT1215'
  let saltaData = jsonBody_get_sync(uriSalta)
  console.log('Temperatura en Buenos Aires: ' + bsAsData[0].Temperature.Metric.Value)
  console.log('Temperatura en Rosario: ' + rosarioData[0].Temperature.Metric.Value)
  console.log('Temperatura en Salta: ' + saltaData[0].Temperature.Metric.Value)
}

