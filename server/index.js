process.env.NODE_ENV = "production";

const express = require("express");
const fs = require('fs');
const config = require('./config');
const path = require('path');
const redis = require('./lib/redis');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ strict: true }));
app.enable('trust proxy');
app.disable('x-powered-by');

app.use('/site/files', express.static('static'));

app.use((error, req, res, next) => {
    if (error instanceof SyntaxError)
        res.status(400).send('Syntax error');
    else 
        next();
});

var endpoints = {};
fs.readdirSync("./endpoints/").forEach(function (file) {
    let m = require("./endpoints/" + file);
    if (m.name == null || m.execute == null || m.method == null || m.dbrequired == null) {
        console.error(`\x1b[31mInvalid endpoint: ${file}\x1b[0m`);
    } else if (m.name in endpoints && endpoints[m.name] == m.method) {
        console.error(
            `\x1b[31mDuplicate endpoint: ${file} (${m.method} ${m.name})\x1b[0m`
        );
    } else {
        endpoints[m.name] = m.method;
        app[m.method.toLowerCase()](m.name, (req, res, next) => {
            if (m.dbrequired && !redis.client.isReady) {
                return res.status(500).json({ status: 500, error: 'Internal database error' });
            }
            if (m.verify(req, res, next, redis)) {
                try {
                    m.execute(req, res, next, redis);
                }
                catch {
                    res.status(500).json({ status: 500, error: 'Internal server error' });
                }
            }
            else {
                res.status(403).json({ status: 403, error: 'Access denied' });
            }
        });
        console.log(`Loaded endpoint: ${m.method} ${file} (${m.name})`);
    }
});

//add once frontend is done
//app.use(express.static('./client/dist', { extensions: ["html"] }));

app.use('/', function (req, res) {
    //res.sendFile(path.join(__dirname + `/client/dist/index.html`));
    res.status(400).json({ "ur_bad": true })
});

const server = app.listen(config.server.PORT, () => {
    console.log(`Server listening on port ${config.server.PORT}`);
});

//graceful shutdown :)
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Closed server');
    });
});
