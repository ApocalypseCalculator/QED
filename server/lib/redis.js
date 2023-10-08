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
    registertime: { type: 'number' }
}, {
    dataStructure: "JSON"
});

//key this by corresponding user id (student profile)
schemas.sprofile = new Schema('sprofile', {
    bio: {type: 'string'},
    topics: {type: 'string[]'},
    ongoingtargets: {type: 'string[]', path: '$.ongoing[*].target'},
    ongoingtopic: {type: 'string[]', path: '$.ongoing[*].topic'},
    ongoinglocation: {type: 'number[]', path: '$.ongoing[*].location'}, // 0 is online, 1 is hybrid, 2 is in person
    ongoingpaid: {type: 'number[]', path: '$.ongoing[*].paid'}, //true or false
    ongoingstart: {type: 'number[]', path: '$.ongoing[*].starttime'},
}, {
    dataStructure: "JSON"
});

//key this by corresponding user id (teacher profile)
schemas.tprofile = new Schema('tprofile', {
    bio: {type: 'string'},
    topicname: {type: 'string[]', path: '$.topics[*].name'},
    proficiency: {type: 'number[]', path: '$.topics[*].skill'}, //this should be on a scale of 1 to 10
    ongoingtargets: {type: 'string[]', path: '$.ongoing[*].target'},
    ongoingtopic: {type: 'string[]', path: '$.ongoing[*].topic'},
    ongoinglocation: {type: 'number[]', path: '$.ongoing[*].location'}, // 0 is online, 1 is hybrid, 2 is in person
    ongoingpaid: {type: 'number[]', path: '$.ongoing[*].paid'}, //true or false
    ongoingstart: {type: 'number[]', path: '$.ongoing[*].starttime'},
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
