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

module.exports = app;
