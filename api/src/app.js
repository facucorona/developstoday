const express = require('express');
const { json } = require("body-parser");
const { fetch } = require("cross-fetch");
const app = express();

app.get('/', async (req, res, next) => {
    try {
        let getApiInfo = await fetch(`https://date.nager.at/api/v3/AvailableCountries`)
            .then((resp) => resp.json())
            .then((array) => {
                console.log(array)
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
                .then(arr => /*res.status(200).send(arr)*/ total_info.push(arr))

            let allFlags = await fetch(`https://countriesnow.space/api/v0.1/countries/flag/images`)
                .then(i => i.json())
                // .then(arr => /*res.status(200).send(arr)*/ total_info[1]=arr.data)
                .then(arr => {
                    arr = arr.data;

                    let foundFlag = (arr, id) => {
                        return arr.find(objeto => objeto.iso2 === "mn");
                    };
                    let result_flag = foundFlag(arr, id)
                    console.log('result_flag', result_flag)
                    // arr.forEach((country) => {
                    //     if (country.iso2 === id) {
                    //         // countryFound = country;
                    //         console.log('country', country)
                    //         total_info.push(country);
                    //     }
                    // })

                })
            let population = await fetch(`https://countriesnow.space/api/v0.1/countries/population`)
                .then(i => i.json())

                .then(arr => {
                    arr = arr.data;
                    // console.log('total_info[1]', total_info[1])
                    arr.forEach((country) => {
                        if (country.iso3 === total_info[0].countryCode) {
                            console.log('country-iso3', country)
                            total_info.push(country);
                        }
                    })
                    // const countryFound = arr.find(population => population.iso3 === total_info[1].iso3);
                    // total_info[2] = countryFound;
                })

            console.log('totalInfo', total_info)

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

