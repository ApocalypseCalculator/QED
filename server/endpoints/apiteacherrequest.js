const auth = require('../lib/auth');

module.exports.name = "/api/teacher/request";
module.exports.method = "POST";
module.exports.dbrequired = true;
module.exports.verify = function (req, res, next, clients) {
    return true;
}

module.exports.execute = async function (req, res, next, clients) {
    auth(req).then(async (user) => {
        if (req.body.target && req.body.topic && user.userid !== req.body.target) {
            let sprofsearch = await clients.repositories.sprofile.fetch(user.userid);
            let tprofsearch = await clients.repositories.tprofile.fetch(req.body.target);
            if (tprofsearch && tprofsearch.bio) {
                if (tprofsearch.topics.filter(e => (e.name === req.body.topic)).length == 0) {
                    return res.status(403).send({ status: 403, error: "This mentor does not teach this topic" });
                }
                else if (sprofsearch && sprofsearch.bio) {
                    //if an "ongoing" object's start time is 0, then it is a request
                    let ongoingobj = {
                        target: req.body.target,
                        topic: req.body.topic,
                        location: ([0, 1, 2].includes(req.body.location)) ? 0 : req.body.location,
                        paid: !!req.body.paid,
                        starttime: 0
                    }
                    if (!sprofsearch.ongoing) {
                        sprofsearch.ongoing = [];
                    }
                    sprofsearch.ongoing.push(ongoingobj);

                    ongoingobj.target = user.userid;
                    if (!tprofsearch.ongoing) {
                        tprofsearch.ongoing = [];
                    }
                    tprofsearch.ongoing.push(ongoingobj);

                    clients.repositories.sprofile.save(sprofsearch).then((newsprofile) => {
                        clients.repositories.tprofile.save(tprofsearch).then((newtprofile) => {
                            res.json({
                                message: "great success", data: {
                                    student: newsprofile,
                                    teacher: newtprofile
                                }
                            });
                        }).catch(() => res.status(500).json({ error: "Internal server error" }));
                    }).catch(() => res.status(500).json({ error: "Internal server error" }));
                }
                else {
                    return res.status(401).send({ status: 401, error: "You do not have a learner profile set up" });
                }
            }
            else {
                return res.status(404).send({ status: 404, error: "Target does not exist or is not a mentor" });
            }
        }
        else {
            return res.status(400).send({ status: 400, error: "Missing target or topic" })
        }
    }).catch((err) => {
        return res.status(401).send({ status: 401, error: err })
    });
}
