import express from 'express';
import { readFile } from 'fs/promises'; 
import bcrypt from 'bcryptjs';
import session from 'express-session';
import Ajv from 'ajv';
import addFormats from "ajv-formats"
import Datastore from 'nedb-promises';
import initDB from './initDataBases.mjs'

const app = express();
initDB();
const port = 34;
const host = '127.34.34.34';
const cookieName = "dd2627"
const eventDB = Datastore.create("./eventDB");
const usertDB = Datastore.create("./userDB");
const activitySchema = JSON.parse(await readFile(new URL("./activitySchema.json", import.meta.url)));
const applicantSchema = JSON.parse(await readFile(new URL("./applicantSchema.json", import.meta.url)));
let clubInfo = {"clubName": "Hayward Skateboard Club", "ownerName": "Haofu Mei", "ownerNetId": "dd2627"};
let ajv = new Ajv();
addFormats(ajv);
let activityValidate = ajv.compile(activitySchema);
let applicantValidate = ajv.compile(applicantSchema);

app.use(session({
    secret: 'Haofu Mei club',
    resave: false,
    saveUninitialized: false,
    name: cookieName
}));

function setUpSessionMiddleware(req, res, next) {
    //console.log(`\nsession object: ${JSON.stringify(req.session)}`);
    //console.log(`session id: ${req.session.id}`);
    if (!req.session.user) {
        req.session.user = {role: "guest"};
    }
    next();
}
app.use(setUpSessionMiddleware);

function checkMemberMiddleware(req, res, next) {
    if (req.session.user.role === 'guest') {
        res.status(401).json({error: 'You are not a member!'});
    } else {
        next();
    }
}

function checkAdminMiddleware(req, res, next) {
    if (req.session.user.role !== 'admin') {
        res.status(401).json({error: 'Not permitted!'});
    } else {
        next();
    }
}

app.get('/info', function(req, res) {
    res.json(clubInfo);
});

app.get('/activities', async function(req, res) {
    try {
        let activities = await eventDB.find({});
        res.json(activities);
    } catch(e) {
        console.log(`Getting all activities error: ${e}`);
    }
});

app.get('/clubUsers', checkAdminMiddleware, async function(req, res) {
    var names = [];
    try {
        let clubUsers = await usertDB.find({});
        clubUsers.forEach(element => {
            let name = {"firstName": element.firstName, "lastName": element.lastName};
            names.push(name);
        });
        res.json(names);
    } catch(e) {
        console.log(`Get all club users error: ${e}`);
    }
});

app.post('/activities', checkMemberMiddleware, express.json({limit: "10kb"}), async function(req, res, next) {
    let valid = activityValidate(req.body);
    if (!valid) {
        next(activityValidate.errors[0]);
    } else {
        eventDB.insert(req.body)
            .then(function(activities) {
                res.json(activities);
            })
            .catch(function(e) {
                console.log(`Writing activity error: ${e}`);
            });
    }
});

app.delete('/activities/:delActID', checkAdminMiddleware, async function(req, res) {
    try {
        let numDel = await eventDB.remove({_id: req.params.delActID});
        // console.log("number del " + numDel);
        let activities = await eventDB.find({});
        res.json(activities);
    } catch(e) {
        console.log(`Delete Activity Error ${e}`);
    }
});

app.post('/login', express.json(), async function(req, res) {
    let reqEmail = req.body.email;
    let password = req.body.password;
    // findOne return an object, while find return an array even though there is one object found
    let reqUser = await usertDB.findOne({email: reqEmail});
    if (!reqUser) {
        res.status(401).json({"error": true, "message": "User/Password error" });
        return;
    }
    let verified = bcrypt.compareSync(password, reqUser.password);
    if (verified) {
        let oldInfo = req.session.user;
        req.session.regenerate(function(err) {
            if (err) {
                console.log(err);
            }
            let newInfo = Object.assign(oldInfo, reqUser);
            delete newInfo.password;
            req.session.user = newInfo;
            //console.log(req.session);
            res.json(newInfo);
        })
    } else {
        res.status(401).json({"error": true, "message": "User/Password error" });
    }
})

app.get('/logout', function (req, res) {
    let options = req.session.cookie;
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        res.clearCookie(cookieName, options); 
        res.json({message: "Goodbye"});
    })
})


app.post('/applicants', express.json({limit: "10kb"}), function(req, res, next) {
    let valid = applicantValidate(req.body);
    if (!valid) {
        next(applicantValidate.errors[0]);
    } else {
        res.json(req.body);
    }
});

// Must write after the router
function jsonErrors(err, req, res, next) {
    // prepare and send error response here, i.e.,
    // set an error code and send JSON message
    //console.log(err.message);
    res.status(500).json({"error": true, "message": err.message});
    console.log(JSON.stringify(err));
    return;
}
app.use(jsonErrors);

app.listen(port, host, function() {
    console.log(`ClubServer listening on IPv4: ${host}:${port}`);
});

