const auth = require('../lib/auth');
const { EntityId } = require('redis-om');

module.exports.name = "/api/profile/teacher/get";
module.exports.method = "GET";
module.exports.dbrequired = true;
module.exports.verify = function (req, res, next, clients) {
    return true;
}

module.exports.execute = async function (req, res, next, clients) {
    if(req.query.userid || req.query.self) {
        let querytarget = "";
        if(req.query.userid) {
            querytarget = req.query.userid;
        }
        else {
            let user = await auth(req).catch((err) => {
                return res.status(401).send({status: 401, error: err})
            });
            querytarget = user.userid
        }
        if(querytarget) {
            let tprofsearch = await clients.repositories.tprofile.fetch(querytarget);
            if(tprofsearch && tprofsearch.bio) {
                if(req.query.self && tprofsearch.ongoing) {
                    for(let i = 0; i < tprofsearch.ongoing.length; i++) {
                        let usrsearch = await clients.repositories.user.fetch(tprofsearch.ongoing[i].target);
                        tprofsearch.ongoing[i].target = {
                            username: usrsearch.username,
                            firstname: usrsearch.firstname,
                            lastname: usrsearch.lastname,
                            age: usrsearch.age,
                            location: usrsearch.location,
                            registertime: usrsearch.registertime,
                            userid: usrsearch[EntityId]
                        }
                    }
                }
                res.send(tprofsearch);
            }
            else {
                return res.status(404).send({status: 404, error: "Teacher profile not found"});
            }
        }
        else {
            return res.status(404).send({status: 404, error: "User not found"});
        }
    }
    else {
        return res.status(400).send({status: 400, error: "Missing userid or self query param"});
    }
}