import config from "./config/config";

import App from "./app/App"
import MongoDB from "./config/mongoDb";
import { delay } from "./modules/helper.module";

const app = new App(config.port)

const myDb = new MongoDB(config.mongo_uri)

async function startApp() {
    let connected = false;
    while (!connected) {
        connected = await myDb.checkDbServer();
        if (!connected) {
            console.log("Mongodb Server is Offline Or Not Working");
            await delay(1500)
            console.log("Retrying ....");
        }
    }

    await myDb.mongodbConnect()

    myDb.db.once("open", () => {
        console.log("Mongo Db Connected Successfully");
        app.startServer()
    })
}

startApp()

