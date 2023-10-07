const secret = require('./secret');

module.exports = {
    server: {
        PORT: 8080
    },
    redis: secret.redis,
    jwt: secret.jwt
}