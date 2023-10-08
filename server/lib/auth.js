const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = function (req) {
    return new Promise((resolve, reject) => {
        if (req.headers.authorization && req.headers.authorization.split(' ').length == 2) {
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, config.jwt, (err, user) => {
                if (err) {
                    reject('Invalid token');
                }
                else {
                    resolve(user);
                }
            })
        }
        else {
            reject('Missing or invalid authorization header');
        }
    })
}