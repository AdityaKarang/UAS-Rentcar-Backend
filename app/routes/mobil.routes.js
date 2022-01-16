module.exports = app => {
  const mobils = require("../controllers/mobil.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", mobils.create);

  // Retrieve all Tutorials
  router.get("/", mobils.findAll);

  // Retrieve all published Tutorials
  // router.get("/published", mobils.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", mobils.findOne);

  // Update a Tutorial with id
  router.put("/:id", mobils.update);

  // Delete a Tutorial with id
  router.delete("/:id", mobils.delete);

  // Delete all Tutorials
  router.delete("/", mobils.deleteAll);

  app.use('/api/mobils', router);
};