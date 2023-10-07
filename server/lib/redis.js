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

const userSchema = new Schema('user', {
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

let repos = {};

redisclient.on('ready', () => {
    console.log('Redis initialized!');
    repos.user = new Repository(userSchema, redisclient);
    repos.user.createIndex();
    console.log('Schema repositories loaded!');
})

module.exports = {
    client: redisclient,
    repositories: repos
}

process.on('SIGTERM', () => {
    redisclient.quit();
});
