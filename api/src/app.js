const express = require('express');
const { json } = require("body-parser");
const { fetch } = require("cross-fetch");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

app.name = 'API';

// app.use(json.urlencoded({ extended: true, limit: '50mb' }));
// app.use(json.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



// Error catching cd ap .
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

// module.exports = server;

app.get('/', async (req, res, next) => {
    try {
        let getApiInfo = await fetch(`https://date.nager.at/api/v3/AvailableCountries`)
            .then((resp) => resp.json())
            .then((array) => {
                // console.log(array)
                res.status(200).send(array)
            })


    } catch (error) {

    }
});

app.get("/:id", async (req, res, next) => {
    try {
        let id = req.params.id;
        let total_info = [];

        // console.log(id)
        if (id.length < 3) {
            let info = await fetch(`https://date.nager.at/api/v3/CountryInfo/${id}`)
                .then(i => i.json())
                .then(arr => {
                    // console.log('arr1', arr)
                    /*res.status(200).send(arr)*/ total_info.push(arr)
                })

            let allFlags = await fetch(`https://countriesnow.space/api/v0.1/countries/flag/images`)
                .then(i => i.json())
                .then(arr => {
                    arr = arr.data;
                    arr.forEach((country) => {
                        if (country.name === total_info[0].commonName) {
                            console.log('true!', country)
                            total_info.push(country);
                        }
                    })
                })

            let population = await fetch(`https://countriesnow.space/api/v0.1/countries/population`)
                .then(i => i.json())
                .then(arr => {
                    arr = arr.data;
                    arr.forEach((country) => {
                        if (country.country === total_info[0].commonName) {
                            total_info.push(country);
                        }
                    })
                })



            res.status(200).send(total_info)


        } else {
            res.status(404).send("Id not found")
        }
    } catch (err) {
        next(err);
    }
});

module.exports = app;

/*This endpoint should provide the following data:
a. List of Border Countries: A list of countries that share a border with the selected country https://date.nager.at/api/v3/CountryInfo/UA
b. Population Data: Historical population data for the country, suitable for plotting on a chart https://countriesnow.space/api/v0.1/countries/population
c. Flag URL: A URL to the country’s flag image https://countriesnow.space/api/v0.1/countries/flag/images


### API Documentation

- **Country List API**: [Nager.Date API Documentation](https://date.nager.at/swagger/index.html)
- **Country Info API**: [Postman Country Info API Documentation](https://documenter.getpostman.com/view/1134062/T1LJjU52)


*/

