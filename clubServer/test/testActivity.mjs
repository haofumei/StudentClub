import {assert} from 'chai';
import fetch from 'node-fetch';

let testSite = "http://127.34.34.34:34";

let loginAdmin = {
    url: testSite + '/login',
    options: {
        method: 'post',
        body: JSON.stringify({"email": "tirrivees1820@outlook.com", "password": "449OqspUq"}),
        headers: {"Content-Type": "application/json"}
    }
}

let loginMember = {
    url: testSite + '/login',
    options: {
        method: 'post',
        body: JSON.stringify({"email": "chihuahua1899@gmail.com", "password": "9E3423Gj3iJ"}),
        headers: {"Content-Type": "application/json"}
    }
}

let addActivity = {
    url: testSite + '/activities',
    options: {
        method: 'post',
        body: JSON.stringify(
            {
            "name": "new added",
            "dates": ["September 18", "September 19", "September 26", "September 27", "etc...every weekend"],
            "description": "new new new new."
        }),
        headers: {"Content-Type": "application/json"}
    }
}

let delActivity = {
    url: testSite + '/activities/',
    options: {
        method: 'delete',
        headers: {}
    }
}

function extractCookies(rawString) {
    let cookies = [];
    rawString.forEach(element => {
        cookies.push(element.split(";")[0]);
    });
    return cookies.join(";");
}

async function getDelActID() {
    let res = await fetch(testSite + "/activities");
    let activities = await res.json();
    return activities[0]._id;
}

describe('Activity Tests', function() {
    let res = null;
    let myCookie = null;

    describe('Get Activity Tests', function() {
    
        it('An array of activities is returned', async function() {
            res = await fetch(testSite + "/activities");
            let activities = await res.json();
            assert.isArray(activities);
        });
    });

    describe('Add Activity Tests', function() {
    
        it('Fail without logging in', async function() {
            res = await fetch(addActivity.url, addActivity.options);
            assert.equal(res.status, 401);
        });

        describe('Login and Add Activity', function() {
            it('Add good activity', async function() {
                res = await fetch(loginMember.url, loginMember.options);
                myCookie = extractCookies(res.headers.raw()['set-cookie']);
                addActivity.options.headers.cookie = myCookie;
                res = await fetch(addActivity.url, addActivity.options);
                assert.equal(res.status, 200);
            });

            it('Add too big activity', async function() {
                res = await fetch(loginMember.url, loginMember.options);
                myCookie = extractCookies(res.headers.raw()['set-cookie']);
                addActivity.options.headers.cookie = myCookie;
                // Initiate long string
                var longString = '1234567890';
                for (var i = 0; i < 13; i++) {
                    longString += longString + longString;
                }
                addActivity.options.body = JSON.stringify(
                    {"name": longString,
                    "dates": ["September 18", "September 19", "September 26", "September 27", "etc...every weekend"],
                    "description": longString
                });
                res = await fetch(addActivity.url, addActivity.options);
                assert.equal(res.status, 500);
            });

            it('Add missing stuff activity', async function() {
                res = await fetch(loginMember.url, loginMember.options);
                myCookie = extractCookies(res.headers.raw()['set-cookie']);
                addActivity.options.headers.cookie = myCookie;
                addActivity.options.body = JSON.stringify(
                    {"dates": ["September 18", "September 19", "September 26", "September 27", "etc...every weekend"],
                    "description": "new new new new."
                });
                res = await fetch(addActivity.url, addActivity.options);
                assert.equal(res.status, 500);
            });
        })  
    });

    describe('Delete Activity Tests', function() {
    
        it('Fail without logging in', async function() {          
            let delID = await getDelActID();
            delActivity.url = testSite + '/activities/' + delID;
            //console.log(delID);
            res = await fetch(delActivity.url, delActivity.options);
            assert.equal(res.status, 401);
        });

        it('Fail when log as a member', async function() {
            let delID = await getDelActID();
            // Get cookie
            res = await fetch(loginMember.url, loginMember.options);
            myCookie = extractCookies(res.headers.raw()['set-cookie']);
            delActivity.options.headers.cookie = myCookie;
            delActivity.url = testSite + '/activities/' + delID;
            res = await fetch(delActivity.url, delActivity.options);
            assert.equal(res.status, 401);
        });

        it('Success when log as a admin', async function() {
            // Get deleted activity id
            let delID = await getDelActID();
            // Get cookie
            res = await fetch(loginAdmin.url, loginAdmin.options);
            myCookie = extractCookies(res.headers.raw()['set-cookie']);
            delActivity.options.headers.cookie = myCookie;
            delActivity.url = testSite + '/activities/' + delID;
            res = await fetch(delActivity.url, delActivity.options);
            assert.equal(res.status, 200);
        });
    });
})

