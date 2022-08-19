import {assert} from 'chai';
import fetch from 'node-fetch';

let testSite = "http://127.34.34.34:34";

let addApplicant = {
    url: testSite + "/applicants",
    options: {
        method: "post",
        body: "",
        headers: {"Content-Type": "application/json"}
    } 
}

describe("Applicant Test", function() {

    describe("Add applicant Test", function() {

        it("Add good applicant", async function() {
            addApplicant.options.body = JSON.stringify(
                {"firstName": "Ligia", "lastName": "Hudson", "email": "umbrate1989@yahoo.com"});
            let res = await fetch(addApplicant.url, addApplicant.options);
            assert.equal(res.status, 200);
        });

        it("Too long JSON applicant", async function() {
            var longString = '1234567890';
            for (var i = 0; i < 13; i++) {
                longString += longString + longString;
            }
            addApplicant.options.body = JSON.stringify(
                {"firstName": longString, "lastName": longString, "email": "umbrate1989@yahoo.com"}
            )
            let res = await fetch(addApplicant.url, addApplicant.options);
            assert.equal(res.status, 500);
        })

        it("Missing info applicant", async function() {
            addApplicant.options.body = JSON.stringify(
                {"lastName": "Hudson", "email": "umbrate1989@yahoo.com"});
            let res = await fetch(addApplicant.url, addApplicant.options);
            assert.equal(res.status, 500);
        })

        it("Bad email applicant", async function() {
            addApplicant.options.body = JSON.stringify(
                {"firstName": "Ligia", "lastName": "Hudson", "email": "asdasdasd"});
            let res = await fetch(addApplicant.url, addApplicant.options);
            assert.equal(res.status, 500);
        })
    })
})