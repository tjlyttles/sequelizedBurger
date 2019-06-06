var db = require("../models");

module.exports = function(app) {
  // Load index page
    app.get("/", function(req, res) {
        db.Burgers.findAll({}).then(function(dbBurgers) {
            res.render("index", {
                burgers: dbBurgers
            });
        })
    })

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
