"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const filesystem = require('fs').promises;
const server = express();
server.use('/images', express.static('images'));
server.get('/cat/bev*', async (request, response) => {
    response.status(200).send(await filesystem.readFile('bev.json', 'utf8'));
    console.log('sent bevs');
    console.log(request.params.toString());
});
server.get('/search/*', async (request, response) => {
    let query = decodeURIComponent(request.url.substring(8));
    let result = {};
    let data = JSON.parse(await filesystem.readFile('bev.json', 'utf8'));
    for (const key in data) {
        let item = data[key.toString()];
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
            result[key.toString()] = data[key.toString()];
        }
    }
    response.status(200).send(JSON.stringify(result));
});
server.get('*', async (request, response) => {
    console.log(request.url);
    response.status(200).send("<h1>404 not Found</h1>");
});
server.listen(8080, () => { console.log('Listening on port 8080'); });
