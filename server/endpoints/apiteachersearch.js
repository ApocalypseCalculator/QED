const auth = require('../lib/auth');

module.exports.name = "/api/teacher/search";
module.exports.method = "GET";
module.exports.dbrequired = true;
module.exports.verify = function (req, res, next, clients) {
    return true;
}

//note: this search function is kinda bad, do not use if you have a large database TwT
module.exports.execute = async function (req, res, next, clients) {
    auth(req).then(async (user) => {
        let sprofsearch = await clients.repositories.sprofile.fetch(user.userid);
        //console.log(sprofsearch);
        if (sprofsearch && sprofsearch.bio) {
            //console.log(sprofsearch.topics.length);
            if (sprofsearch.topics.length != 0) {
                // this is inefficient but there isn't much time to implement something more efficient /shrug
                let resultlist = await clients.repositories.tprofile.search().return.all(); //.where('topicname').containsOneOf(sprofsearch.topics) throws error
                //console.log(resultlist);
                res.json(sortresult(resultlist, sprofsearch.topics, user));
            }
            else {
                return res.status(401).send({ status: 401, error: "You do not have any topics you've expressed interest in!" });
            }
        }
        else {
            return res.status(401).send({ status: 401, error: "You do not have a learner profile set up" });
        }
    }).catch((err) => {
        //console.log(err);
        return res.status(401).send({ status: 401, error: err })
    });
}

function sortresult(list, topics, user) {
    for (let i = 0; i < list.length; i++) {
        list[i].score = buildscore(list[i], topics, user);
    }
    list.sort((a, b) => a.score - b.score);
    return list.filter(e => (e.score != 0));
}

function buildscore(tprofile, topics, user) {
    let initscore = 30;
    if (tprofile.location === user.location) {
        initscore * 1.05;
    }
    let matchedlist = [];
    //first passthrough
    for (let i = 0; i < topics; i++) {
        let tmplist = tprofile.topics.filter(e => (e.name === topics[i]));
        if (tmplist[0] && tmplist[0].skill) {
            matchedlist.push(tmplist[0]);
        }
    }
    //second passthrough
    matchedlist.sort((a, b) => a - b);
    if (matchedlist.length == 0) {
        initscore = 0; //this should not happen
    }
    else {
        for (let i = matchedlist - 1; i >= 0; i--) {
            if (i < matchedlist - 2 && matchedlist[i] < 5) {
                break; //ignore all possible skills if 3 considered and this skill level is below 5
            }
            initscore *= (1 + (((matchedlist[i] - 7) / 10) * Math.pow(0.5, i)));
        }
    }
    return parseInt(initscore);
}