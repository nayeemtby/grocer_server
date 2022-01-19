"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { initializeApp } from "firebase/app";
// const myConfig = require('./firebaseoptions');
const express = require('express');
const filesystem = require('fs').promises;
// const firebaseApp = initializeApp(myConfig.firebaseConfig);
const server = express();
server.use('/images', express.static('images'));
server.get('/cat/*', async (request, response) => {
    let cat = request.url.substring(5);
    console.log('sent ' + cat);
    let products = JSON.parse(await filesystem.readFile('products.json', 'utf8'));
    let catStore = JSON.parse(await filesystem.readFile('cats.json', 'utf8'))[cat];
    let ret = {};
    catStore.forEach(element => {
        ret[element.toString()] = products[element.toString()];
    });
    response.status(200).send(JSON.stringify(ret));
    console.log('sent ' + cat);
});
server.get('/favourites', async (request, response) => {
    let products = JSON.parse(await filesystem.readFile('products.json', 'utf8'));
    let favs = JSON.parse(await filesystem.readFile('tmp.json', 'utf8'))['favs'];
    let ret = {};
    favs.forEach(element => {
        ret[element.toString()] = products[element.toString()];
    });
    response.status(200).send(JSON.stringify(ret));
    console.log('sent favs');
});
server.get('/bestselling', async (request, response) => {
    let products = JSON.parse(await filesystem.readFile('products.json', 'utf8'));
    let bestselling = JSON.parse(await filesystem.readFile('current.json', 'utf8'))['bestselling'];
    let ret = {};
    bestselling.forEach(element => {
        ret[element.toString()] = products[element.toString()];
    });
    response.status(200).send(JSON.stringify(ret));
    console.log('sent bestsellings');
});
server.get('/offers', async (request, response) => {
    let products = JSON.parse(await filesystem.readFile('products.json', 'utf8'));
    let offers = JSON.parse(await filesystem.readFile('current.json', 'utf8'))['offers'];
    let ret = {};
    for (const key in offers) {
        ret[key.toString()] = products[key.toString()];
        ret[key.toString()]['discountPrice'] = offers[key.toString()];
    }
    response.status(200).send(JSON.stringify(ret));
    console.log('sent offers');
});
server.get('/search/*', async (request, response) => {
    let query = decodeURIComponent(request.url.substring(8));
    let result = {};
    let products = JSON.parse(await filesystem.readFile('products.json', 'utf8'));
    for (const key in products) {
        let item = products[key.toString()];
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
            result[key.toString()] = products[key.toString()];
        }
    }
    response.status(200).send(JSON.stringify(result));
});
server.get('*', async (request, response) => {
    console.log(request.url);
    response.status(200).send("<h1>404 not Found</h1>");
});
server.listen(8080, () => { console.log('Listening on port 8080'); });
