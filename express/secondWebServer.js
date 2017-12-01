// include libraries
const express = require('express')  

// library initialization
const app = express()

app.get('/sayHi',function(request,response) {
	response.status(200)  // ok
	response.json({message: 'Hi pal'})
})
app.get('/sayHiTo/:who',function(request,response) {
	if (request.params.who == 'No-one') {
		response.status(400)  // bad request
		response.json({error: 'This person is not welcomed'})
	} else {
		response.status(200)  // ok
		response.json({message: 'Hi ' + request.params.who})
	}
})

app.listen(8081, null, null, () => console.log('server up and running'))

