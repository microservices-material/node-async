// include libraries
const _ = require('lodash');
const request = require('request')
const Promise = require("bluebird")

// urls
const webServerURL = "https://node-async-clombardi.c9users.io"
const c9port = 8081


var fullUrl = webServerURL + ":" + c9port.toString() + '/sayHiTo/Pepe'
requestAsPromise(fullUrl)
.then(function(body) {
	console.log(body.message)
})
.catch(function(error) {
	console.log('Error')
	console.log(error)
})

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
