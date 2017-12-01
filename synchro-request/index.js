/* simple request */

// include libraries
const _ = require('lodash');
const request = require('sync-request')

const buenosAiresId = '7894'
const rosarioId = '11222'
const saltaId = '10531'

// rawCall()
// oneCall()
threeCalls()


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
	const uri = 'http://apidev.accuweather.com/currentconditions/v1/' + buenosAiresId + '.json?language=en&apikey=hoArfRosT1215'
  let jsonBody = jsonBody_get_sync(uri)
  console.log('respuesta del servidor accuweather: ' + JSON.stringify(jsonBody,null,'  '))
  console.log('Temperatura en Buenos Aires: ' + jsonBody[0].Temperature.Metric.Value)
}

function threeCalls() {
  let bsAsData = jsonBody_get_sync(buildUri(buenosAiresId))
  let rosarioData = jsonBody_get_sync(buildUri(rosarioId))
  let saltaData = jsonBody_get_sync(buildUri(saltaId))
  console.log('Temperatura en Buenos Aires: ' + bsAsData[0].Temperature.Metric.Value)
  console.log('Temperatura en Rosario: ' + rosarioData[0].Temperature.Metric.Value)
  console.log('Temperatura en Salta: ' + saltaData[0].Temperature.Metric.Value)
}

function buildUri(cityId) {
  return 'http://apidev.accuweather.com/currentconditions/v1/' + cityId + '.json?language=en&apikey=hoArfRosT1215'
}

