
module.exports = app => {
    const pelanggan = require("../controllers/pelanggan.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", pelanggan.create);
  
    // Retrieve all Tutorials
    router.get("/", pelanggan.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", pelanggan.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", pelanggan.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", pelanggan.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", pelanggan.delete);
  
    // Delete all Tutorials
    router.delete("/", pelanggan.deleteAll);
  
    app.use('/api/pelanggans', router);
  };