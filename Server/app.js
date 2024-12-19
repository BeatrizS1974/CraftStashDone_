const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');

const app = express();
const port =5000;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/client", express.static(path.resolve(__dirname + "/../client")));

var router = require("./router.js");
router(app);


//Page listeners(router)
var services = require("./services.js");
services.services(app);


// Service Listeners(data processes)
server = app.listen(port, function(err) {
    if (err) {
      throw err;
    }
    console.log("Listening on port " + port);
});



