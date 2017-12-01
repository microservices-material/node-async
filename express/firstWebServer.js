// include libraries
const express = require('express')  

// library initialization
const app = express()

app.get('/sayHi',function(request,response) {
	response.status(200)  // ok
	response.json({message: 'Hi pal'})
})
app.get('/sayGoodbye',function(request,response) {
	response.status(200)  // ok
	response.json({message: 'Hasta la vista'})
})
app.get('/sayHiNicely',function(request,response) {
	response.status(200)  // ok
	response.send('<html><body><h1>Hi pal</h1>I am a cool Node-Express server</body></html>')
})

app.listen(8081, null, null, () => console.log('server up and running'))

