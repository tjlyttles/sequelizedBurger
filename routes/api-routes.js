// Import the model (burger.js) to use its database functions.
var db = require("../models");

module.exports = function(app) {

  // GET route for getting all of the Burgerss
  app.get("/api/burgers", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Burgers.findAll({}).then(function(dbBurgers) {
      // We have access to the Burgerss as an argument inside of the callback function
      res.json(dbBurgers);
    });
  });

  // POST route for saving a new Burgers
  app.post("/api/burgers", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Burgers.create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(dbBurgers) {
      // We have access to the new Burgers as an argument inside of the callback function
      res.json(dbBurgers);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

  // DELETE route for deleting Burgerss. We can get the id of the Burgers to be deleted from
  // req.params.id
  app.delete("/api/burgers/:id", function(req, res) {
    // We just have to specify which Burgers we want to destroy with "where"
    db.Burgers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurgers) {
      res.json(dbBurgers);
    });

  });

  // PUT route for updating Burgerss. We can get the updated Burgers data from req.body
  app.put("/api/burgers/:id", function(req, res) {
    console.log(req.body)
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Burgers.update({
      devoured: req.body.devoured
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbBurgers) {
      res.json(dbBurgers);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });
}