const { createClient } = require('redis');
const { Schema, Repository } = require('redis-om');
const config = require('../config');

const redisclient = createClient({
    url: config.redis
});

redisclient.connect();

redisclient.on('error', (err) => {
    console.log('uh oh: a fucky wucky has appeared');
    console.log(err);
});

let schemas = {};

schemas.user = new Schema('user', {
    username: { type: 'string' },
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    age: { type: 'number' },
    location: {type: 'string'},
    password: { type: 'string' },
    registertime: { type: 'date' }
}, {
    dataStructure: "JSON"
});

//key this by corresponding user id (student profile)
schemas.sprofile = new Schema('sprofile', {
    topics: {type: 'string[]'}
}, {
    dataStructure: "JSON"
});

//key this by corresponding user id (teacher profile)
schemas.tprofile = new Schema('tprofile', {
    topics: {type: 'string[]'},
    
}, {
    dataStructure: "JSON"
});

let repos = {};

redisclient.on('ready', () => {
    console.log('Redis initialized!');

    for(let skey in schemas) {
        repos[skey] = new Repository(schemas[skey], redisclient);
        repos[skey].createIndex();
    }

    console.log('Schema repositories loaded!');
})

module.exports = {
    client: redisclient,
    repositories: repos
}

process.on('SIGTERM', () => {
    redisclient.quit();
});
