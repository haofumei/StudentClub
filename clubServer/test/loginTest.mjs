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

function extractCookies(rawString) {
    let cookies = [];
    rawString.forEach(element => {
        cookies.push(element.split(";")[0]);
    });
    return cookies.join(";");
}

describe('Login Tests', function() {
    let res = null;
    let myCookie = null;

    before(async function() {
        res = await fetch(testSite + "/info");
        myCookie = extractCookies(res.headers.raw()["set-cookie"]);
    })

    it('Cookie with appropriate name is returned', function() {
        assert.include(myCookie, 'dd2627');
    })

    describe('Login Sequence', function() {
        before(async function() {
            loginAdmin.options.headers.cookie = myCookie;
            res = await fetch(loginAdmin.url, loginAdmin.options);
        });

        it('Login Good', function() {
            assert.equal(res.status, 200);
        });

        it('User returned', async function() {
            let user = await res.json();
            assert.containsAllKeys(user, ['firstName', 'lastName', 'role']);
        });

        it('Cookie session ID changed', function() {
            let newCookie = extractCookies(res.headers.raw()["set-cookie"]);
            assert.isNotEmpty(newCookie);
            assert.notEqual(newCookie, myCookie);
        });

        it('Logout, cookie cleared', async function() {
            res = await fetch(testSite + "/logout");
            myCookie = extractCookies(res.headers.raw()["set-cookie"]);
            assert.equal(myCookie, 'dd2627=')
        });

    });

    describe('Bad Login', function() {

        let badAccount = {};
        Object.assign(badAccount, loginAdmin);

        it('Bad Email', async function() {
            badAccount.options.body = JSON.stringify({"email": "bad@outlook.com", "password": "449OqspUq"});
            res = await fetch(badAccount.url, badAccount.options);
            assert.equal(res.status, 401);
        });

        it('Bad Password', async function() {
            badAccount.options.body = JSON.stringify({"email": "tirrivees1820@outlook.com", "password": "bad"});
            res = await fetch(badAccount.url, badAccount.options);
            assert.equal(res.status, 401);
        });

    })

})
