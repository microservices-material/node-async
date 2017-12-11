/* requests using callbacks */

// include libraries
const _ = require('lodash');
const request = require('request')
const async = require('async')
const Promise = require("bluebird")

var argentinaQuery = buildUri('ARG')
var brasilQuery = buildUri('BRA')
var paraguayQuery = buildUri('PRY')
var boliviaQuery = buildUri('BOL')
var mysteriousQuery = buildUri('JPQ')


threeCalls_parallel()


function justOneCall() {
  request.get({ url: argentinaQuery, json: true },  
    function(theError, response, body) {
      console.log('respuesta del servidor restcountries.eu: ' + JSON.stringify(body,null,'  '))
      logCountryData(body)
    })
}

function justOneCall_assigned_callback() {
  var argentinaCallback = function(theError, response, body) {
      logCountryData(body)
  };
  request.get({ url: argentinaQuery, json: true }, argentinaCallback)    
}


function lookMessageOrder() {
	justOneCall()
  console.log("After get")
}


function threeCalls_naive() {
  var argentinaData = null
  var brasilData = null
  var paraguayData = null
  request.get({ url: argentinaQuery, json: true },  
    function(theError, response, body) {
      argentinaData = body
    })
  request.get({ url: brasilQuery, json: true },  
    function(theError, response, body) {
      brasilData = body
    })
  request.get({ url: paraguayQuery, json: true },  
    function(theError, response, body) {
      paraguayData = body
    })
  logCountryData(argentinaData)
  logCountryData(brasilData)
  logCountryData(paraguayData)
}


function threeCalls_callbacks() {
  var argentinaData = null
  var brasilData = null
  var paraguayData = null
  
  request.get({ url: argentinaQuery, json: true },  
    function(theError, response, body) {
      argentinaData = body
      request.get(
      	{ url: brasilQuery, json: true },  
        function(theError, response, body) {
          brasilData = body
          request.get(
          	{ url: paraguayQuery, json: true },  
            function(theError, response, body) {
              paraguayData = body
              logCountryData(argentinaData)
              logCountryData(brasilData)
              logCountryData(paraguayData)
            })
        })
    })
}

function threeCalls_uncontrolled() {
  var argentinaData = null
  var brasilData = null
  var paraguayData = null
  request.get({ url: argentinaQuery, json: true },  
    function(theError, response, body) {
      argentinaData = body
      logCountryData(argentinaData)
    })
  request.get({ url: brasilQuery, json: true },  
    function(theError, response, body) {
      brasilData = body
      logCountryData(brasilData)
    })
  request.get({ url: paraguayQuery, json: true },  
    function(theError, response, body) {
      paraguayData = body
      logCountryData(paraguayData)
    })
}


function threeCalls_callbacks_errors() {
  var argentinaData = null
  var brasilData = null
  var paraguayData = null
  request.get(
  	{ url: argentinaQuery, json: true },  
    function(theError, response, body) {
    	if (theError || response.statusCode != 200) {
    		console.log('Argentina we have a problem')
    	} else {
	      argentinaData = body
        request.get(
        	{ url: brasilQuery, json: true },  
	        function(theError, response, body) {
			    	if (theError || response.statusCode != 200) {
			    		console.log('Brasil we have a problem')
			    	} else {
		          brasilData = body
		          request.get(
		          	{ url: paraguayQuery, json: true },  
		            function(theError, response, body) {
						    	if (theError || response.statusCode != 200) {
						    		console.log('Paraguay we have a problem')
						    	} else {
			              paraguayData = body
                    logCountryData(argentinaData)
                    logCountryData(brasilData)
                    logCountryData(paraguayData)
			            }
		            })
		        }
	        })
      }
    })
}


function threeCalls_parallel() {
  var countryDataFunction = function(query, callback) {
    request.get({ url: query, json: true },  
      function(theError, response, body) {
        callback(theError, body)
      })
  }

  async.map(
    [argentinaQuery, brasilQuery, paraguayQuery], 
    countryDataFunction, 
    function(err, result) {
      var argentinaData = result[0]
      var brasilData = result[1];
      var paraguayData = result[2];
      logCountryData(argentinaData)
      logCountryData(brasilData)
      logCountryData(paraguayData)
    }
  )
}


function threeCalls_callbacks_with_wait() {
  var argentinaData = null
  var brasilData = null
  var paraguayData = null
  request.get(
    { url: argentinaQuery, json: true },  
    function(theError, response, body) {
      argentinaData = body
        request.get(
        	{ url: brasilQuery, json: true },  
          function(theError, response, body) {
            brasilData = body
            request.get(
            	{ url: paraguayQuery, json: true },  
              function(theError, response, body) {
                paraguayData = body
                logCountryData(paraguayData)
    			      wait(500)
              })
            logCountryData(brasilData)
    	      wait(500)
          })
      logCountryData(argentinaData)
      wait(500)
    })
}


function wait(ms) {
	var waitTill = new Date(new Date().getTime() + ms);
	while(waitTill > new Date()){}
}



function threeCalls_callbacks_external_fns() {
  var argentinaData = null
  request.get(
  	{ url: argentinaQuery, json: true },  
    function(theError, response, body) {
      argentinaData = body
      getBrasilAndParaguay(argentinaData)
    })
}


function getBrasilAndParaguay(argData) {
  request.get(
		{ url: brasilQuery, json: true },  
	  function(theError, response, body) {
	    brasilData = body
      getParaguay(argData, brasilData)
	  })
}


function getParaguay(argData, braData) {
	request.get(
		{ url: paraguayQuery, json: true },  
	  function(theError, response, body) {
	    paraguayData = body
      logCountryData(argData)
      logCountryData(braData)
      logCountryData(paraguayData)
	  })
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




