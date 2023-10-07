const config = require('../config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { EntityId } = require('redis-om');

module.exports.name = "/api/login";
module.exports.method = "POST";
module.exports.dbrequired = true;
module.exports.verify = function (req, res, next, clients) {
    return true;
}

module.exports.execute = async function (req, res, next, clients) {
    if (req.body.username && req.body.password) {
        let usrsearch = await clients.repositories.user.search().where('username').equals(req.body.username).returnFirst();
        if (usrsearch) {
            bcrypt.compare(req.body.password, usrsearch.password, function (err, result) {
                if (err) {
                    res.status(500).json({ error: `Server error` })
                }
                else {
                    if (!result) {
                        res.status(401).json({ error: "Incorrect password or username" });
                    }
                    else {
                        let token = jwt.sign({
                            username: usrsearch.username,
                            firstname: usrsearch.firstname,
                            lastname: usrsearch.lastname,
                            age: usrsearch.age,
                            location: usrsearch.location,
                            registertime: usrsearch.registertime,
                            id: usrsearch[EntityId]
                        }, config.jwt);
                        res.json({ token: token });
                    }
                }
            });
        }
        else {
            res.status(401).send({ status: 401, error: 'Incorrect password or username' });
        }
    }
    else {
        res.status(400).json({ error: `Invalid form` });
    }
}