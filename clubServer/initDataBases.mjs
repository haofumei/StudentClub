import { readFile } from "fs/promises";
import Datastore from "nedb-promises";

const eventDB = Datastore.create("./eventDB");
const userDB = Datastore.create("./userDB");
const events = JSON.parse(
    await readFile(new URL("./eventData.json", import.meta.url))
);
const usersHash = JSON.parse(
    await readFile(new URL("./clubUsers3Hash.json", import.meta.url))
);

async function cleanAndInsert() {
    // Clear and insert eventDB
    let numRemoved = await eventDB.remove({}, {multi: true});
    console.log("clearing events database, removed " + numRemoved);

    let newDocs = await eventDB.insert(events);
    console.log("Added " + newDocs.length + " events");

    // Clear and insert userDB
    numRemoved = await userDB.remove({}, {multi: true});
    console.log("clearing users database, removed " + numRemoved);

    newDocs = await userDB.insert(usersHash);
    console.log("Added " + newDocs.length + " users");
}

export default cleanAndInsert;