const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
const app = express()
	
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

var index = require('./routes/index');
app.use('/', index);