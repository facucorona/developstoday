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
        console.log(id)
        if (id.length < 3) {
            let info = await fetch(`https://date.nager.at/api/v3/CountryInfo/${id}`)
                .then(i => i.json())
                .then(arr => res.status(200).send(arr))



        } else {
            res.status(404).send("Id not found")
        }
    } catch (err) {
        next(err);
    }
});

module.exports = app;
