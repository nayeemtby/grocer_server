const express = require('express');
const fs = require('fs').promises;
const server = express();
server.use('/images', express.static('images'));
server.get('/cat/bev', async (request, response) => {
    response.status(200).send(await fs.readFile('bev.json', 'utf8'));
    console.log('sent bevs');
});


server.listen(8080, () => { console.log('Listening on port 8080'); });