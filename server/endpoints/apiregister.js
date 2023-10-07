const bcrypt = require('bcrypt');
const { EntityId } = require('redis-om');

module.exports.name = "/api/register";
module.exports.method = "POST";
module.exports.dbrequired = true;
module.exports.verify = function (req, res, next, clients) {
    return true;
}

module.exports.execute = async function (req, res, next, clients) {
    if (req.body.username && req.body.password && req.body.firstname && req.body.lastname && req.body.age && req.body.location) {
        if (!/^\w+$/.test(req.body.username) || req.body.username.length > 32) {
            res.status(400).json({ error: `Usernames can only contain alphanumeric characters or underscores and must be at most 33 characters` });
        }
        else if (!/^\w+$/.test(req.body.password) || req.body.password.length < 8) {
            res.status(400).json({ error: `Passwords can only contain alphanumeric characters or underscores and must be at least 8 characters` });
        }
        else if (req.body.firstname.length < 1 || req.body.firstname.length > 50) {
            res.status(400).json({ error: `First name must be between 1 and 50 characters` });
        }
        else if (req.body.lastname.length < 1 || req.body.lastname.length > 50) {
            res.status(400).json({ error: `Last name must be between 1 and 50 characters` });
        }
        else if (isNaN(parseInt(req.body.age)) || parseInt(req.body.age) <= 12 || parseInt(req.body.age) > 128) {
            res.status(400).json({ error: `Age must be a number between 13 and 128` });
        }
        else if (req.body.location.length > 128) {
            res.status(400).json({ error: `Location must below 128 characters` });
        }
        else {
            let usrsearch = await clients.repositories.user.search().where('username').equals(req.body.username).returnFirst();
            if (usrsearch) {
                res.status(409).send({ status: 409, error: 'User with that username already exists' });
            }
            else {
                bcrypt.hash(req.body.password, 10, function (err, pwdhash) {
                    if (err) {
                        res.status(500).json({ error: `Server error` });
                    }
                    else {
                        //console.log(clients.repositories.user);
                        clients.repositories.user.save({
                            username: req.body.username,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            age: parseInt(req.body.age),
                            location: req.body.location,
                            password: pwdhash,
                            registertime: Date.now()
                        }).then((user) => {
                            //console.log(user);
                            res.json({ id: user[EntityId] });
                        }).catch(() => res.status(500).json({ error: "Internal server error" }));
                    }
                });
            }
        }
    }
    else {
        res.status(400).json({ error: `Invalid form` });
    }
}