const auth = require('../lib/auth');

module.exports.name = "/api/profile/student/put";
module.exports.method = "PUT";
module.exports.dbrequired = true;
module.exports.verify = function (req, res, next, clients) {
    return true;
}

module.exports.execute = async function (req, res, next, clients) {
    auth(req).then(async (user) => {
        let sprofsearch = await clients.repositories.sprofile.fetch(user.userid);
        if (req.body.bio && req.body.bio.length < 512) {
            let filteredtopics = [];
            if (req.body.topics && Array.isArray(req.body.topics)) {
                req.body.topics.forEach(e => {
                    if (e.name && e.name.length < 32) {
                        filteredtopics.push(e.name);
                    }
                });
            }
            if (sprofsearch && sprofsearch.bio) {
                sprofsearch.bio = req.body.bio;
                sprofsearch.topics = filteredtopics;
            }
            clients.repositories.tprofile.save(user.userid, (sprofsearch && sprofsearch.bio) ?
                sprofsearch : {
                    bio: req.body.bio,
                    topics: filteredtopics
                }).then((newsprofile) => {
                    res.json({ message: "great success", data: newsprofile });
                }).catch(() => res.status(500).json({ error: "Internal server error" }));
        }
        else {
            return res.status(400).send({ status: 400, error: 'Invalid bio' });
        }
    }).catch((err) => {
        return res.status(401).send({ status: 401, error: err })
    });
}
