

var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var axios = require('axios')

var server = express()

server.use(logger('dev')) // log all the request to our terminal
server.use(bodyParser.json()) //  attaches all user input to request.body.
server.use(bodyParser.urlencoded({extended:false}))

server.set('view engine',  'ejs')
server.use(express.static('views'))
server.set('views', __dirname + '/views')

server.get('/', function(request, response){
    //response.send('<h1>My App</h1>')
    response.render('home.ejs')
})
server.get('/about-app', function(request, response){
    response.render('about.ejs')
})
server.get('/music', function(request, response) {
    response.render('music.ejs')
    var app_key = "92073f0cc88154497ba3cc8834bb4115"
    var searchTerm = 'music'
    var url = 'http://api.musixmatch.com/ws/1.1/artist.search?apikey='+app_key+'&q_artist='+searchTerm
    axios.get(url)
    .then( res => res.data )
    .then( data => {
        console.log(data)
        response.render('music.ejs', {data: data})
    })
})
server.post('/artist', function(request, response) {
    var app_key = "92073f0cc88154497ba3cc8834bb4115"
    var searchTerm = request.body.searchTerm
    var url = 'http://api.musixmatch.com/ws/1.1/artist.search?apikey='+app_key+'&q_artist='+searchTerm
    axios.get(url)
    .then( res => res.data )
    .then( data => {
        console.log(data.message.body)
        response.render('artist.ejs', {data: data.message.body})
    })
    .catch( error => console.log(error) )
})
    
    



    // response.render('result.ejs', {data: ''})



var port = process.env.PORT

server.listen(port, () => {
    console.log('Server running on port: ' + port)
})