module.exports = app => {
    const mobil = require("../controllers/mobil.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", mobil.create);
  
    // Retrieve all Tutorials
    router.get("/", mobil.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", mobil.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", mobil.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", mobil.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", mobil.delete);
  
    // Delete all Tutorials
    router.delete("/", mobil.deleteAll);
  
    app.use('/api/mobils', router);
  };