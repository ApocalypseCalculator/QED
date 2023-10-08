const auth = require('../lib/auth');

module.exports.name = "/api/profile/student/get";
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
            let sprofsearch = await clients.repositories.sprofile.fetch(querytarget);
            if(sprofsearch && sprofsearch.bio) {
                res.send(sprofsearch);
            }
            else {
                return res.status(404).send({status: 404, error: "Student profile not found"});
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