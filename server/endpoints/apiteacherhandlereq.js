const auth = require('../lib/auth');

module.exports.name = "/api/teacher/handlereq";
module.exports.method = "POST";
module.exports.dbrequired = true;
module.exports.verify = function (req, res, next, clients) {
    return true;
}

module.exports.execute = async function (req, res, next, clients) {
    auth(req).then(async (user) => {
        if (req.body.target) {
            let tprofsearch = await clients.repositories.tprofile.fetch(user.userid);
            let sprofsearch = await clients.repositories.sprofile.fetch(req.body.target);
            if (req.body.accept) { //accept aka change "start" to now
                sprofsearch.ongoing.map(e => {
                    if (e.starttime == 0 && e.target == user.userid) {
                        e.starttime = Date.now();
                    }
                    return e;
                });
                tprofsearch.ongoing.map(e => {
                    if (e.starttime == 0 && e.target == req.body.target) {
                        e.starttime = Date.now();
                    }
                    return e;
                });
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
            else { //decline aka delete the request
                sprofsearch.ongoing.filter(e => {
                    if (e.starttime == 0 || e.target == user.userid) {
                        return e;
                    }
                });
                tprofsearch.ongoing.filter(e => {
                    if (e.starttime == 0 || e.target == req.body.target) {
                        return e;
                    }
                });
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
        }
        else {
            return res.status(400).send({ status: 400, error: "Missing target" });
        }
    }).catch((err) => {
        return res.status(401).send({ status: 401, error: err });
    });
}
