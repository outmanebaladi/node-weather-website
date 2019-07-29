const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Outmane Baladi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Outmane Baladi'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Outmane Baladi'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    
    if(!address){
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecast) => {
            if(error) {
                return res.send({error});
            }

            res.send({
                forecast,
                location,
                address 
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 error',
        name: 'Outmane Baladi',
        errorMessage: 'Help article not found.'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 error',
        name: 'Outmane Baladi',
        errorMessage: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});
