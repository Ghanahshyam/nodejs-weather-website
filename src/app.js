const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/weather-stack');

console.log(__dirname); // directory to filename lives within
const app = express(); // Create a express app

// Define Paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // Way to customize server as app.use going to use static files set above this is ignored

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'GK'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'GK',
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Message from node!',
        name: 'GK',
    });
})

app.get('/weather' , (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        });    
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast([latitude, longitude], (error, forecastData = {}) => {
            if (error) {
                return res.send(error);
            } 
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
            
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a seach term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorText: 'Help article not found!',
        name: 'GK'
    })
    
})

// Everything is match
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorText: 'My 404 Page',
        name: 'GK'
    })
})


// app.get('' , (req, res) => {
//     res.send('<h1>Weather</h1>');
// })

// app.get('/help' , (req, res) => {
//     res.send({
//         name: 'GK',
//         age: 30
//     });
// })

// app.get('/about' , (req, res) => {
//     res.send('<h1>About</h1>');
// })

// app.com => 
// app.com/help
// app.com/about

app.listen(3000, ()=> {
    console.log('Server is up on port 3000');
})
