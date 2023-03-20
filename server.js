
// var environment = process.env.NODE_ENV;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs')
// where our views will be coming form
app.set('views', __dirname + '/views')
// hookup express layouts so we don't have to duplicate header/footer info
app.set('layout', 'layouts/layout')
// tell our app we wan tto use expressLayouts
app.use(expressLayouts)
// where our styles, images, etc will go
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

// the server will tell us what port it is listening to/on.  3000 is for development
app.listen(process.env.PORT || 3000)