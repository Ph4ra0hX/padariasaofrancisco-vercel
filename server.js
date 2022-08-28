var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index.html");
});
//.listen(process.env.PORT);
app.listen(3000);
