module.exports = function(app) {
	app.get('/hi', (request, response) => {
	  response.render('home', {
	    name: 'John'
	  })
	})
}