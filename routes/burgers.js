var express = require("express");

var router = express.Router();

// Importing the model (burger.js) to use its database functions.
var burgers = require("../models/burger.js");

// Routes and set up logic


router.get("/", function(req, res) {
    burgers.all(function(data){
        var hbsObject = {burgers: data};
        res.render('index', hbsObject);
    });
    res.redirect("/")
});

router.post("/build", function(req, res) {
    burgers.create([
        "burgers"
    ], [
        req.body.name
    ], function(data) {
        res.redirect("/");
    });
});

router.put("/update/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burgers.update({
        devoured: req.body.devoured
    }, condition, function(data) {
        res.redirect("/");
    });
});

// Export routes for server.js to use.
module.exports = router;
