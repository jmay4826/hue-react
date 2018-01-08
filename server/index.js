const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const huejay = require("huejay");
const controller = require("./controller");
require("dotenv").config();

const PORT = 3001;

app.use(express.static(__dirname + "/../client/dist/"));
app.use(bodyParser.json());

// TEST

let client = new huejay.Client({
  host: process.env.BRIDGE,
  username: "Iwt-WfYwI7aVgRUBrt3lxCGsP5C7sHK16hFdSmGE"
});
// app.use((req, res, next)=> { req.app.client = client; next();});

app.set("client", client);

// const getLights = async () => {
//   return await client.lights.getAll();
// };

app.get("/api/lights", controller.getAllLights);
app.put("/api/lights/:id", controller.updateLight);
app.post("/api/lights/:id", controller.colorLoop);

// let user = new client.users.User();

// client.users
//   .create(user)
//   .then(user => console.log(user))
//   .catch(console.log);

app.listen(PORT, () => console.log(`Listing on ${PORT} at ${__dirname}`));
