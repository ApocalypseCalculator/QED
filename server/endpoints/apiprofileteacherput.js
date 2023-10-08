const auth = require('../lib/auth');

module.exports.name = "/api/profile/teacher/put";
module.exports.method = "PUT";
module.exports.dbrequired = true;
module.exports.verify = function (req, res, next, clients) {
    return true;
}

module.exports.execute = async function (req, res, next, clients) {
    auth(req).then(async (user) => {
        let tprofsearch = await clients.repositories.tprofile.fetch(user.userid);
        if (req.body.bio && req.body.bio.length < 512) {
            let filteredtopics = [];
            if (req.body.topics && Array.isArray(req.body.topics)) {
                req.body.topics.forEach(e => {
                    if (e.name && typeof e.name == "string" && e.name.length < 32 && Number.isInteger(e.skill) && e.skill > 0 && e.skill < 11) {
                        filteredtopics.push({
                            name: e.name,
                            skill: e.skill
                        });
                    }
                });
            }
            if (tprofsearch && tprofsearch.bio) {
                tprofsearch.bio = req.body.bio;
                tprofsearch.topics = filteredtopics;
            }
            clients.repositories.tprofile.save(user.userid, (tprofsearch && tprofsearch.bio) ?
                tprofsearch : {
                    bio: req.body.bio,
                    location: tprofsearch.location,
                    topics: filteredtopics
                }).then((newtprofile) => {
                    res.json({ message: "great success", data: newtprofile });
                }).catch(() => res.status(500).json({ error: "Internal server error" }));
        }
        else {
            return res.status(400).send({ status: 400, error: 'Invalid bio' });
        }
    }).catch((err) => {
        return res.status(401).send({ status: 401, error: err })
    });
}
