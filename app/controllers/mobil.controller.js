const db = require("../models");
const Mobil = db.mobil;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
    exports.create = (req, res) => {
        // Validate request
        if (!req.body.idmobil) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
          return;
        }
      console.log (req.body)
        // Create a Tutorial
        const mobil = {
          idmobil: req.body.idmobil,
          merek: req.body.merek,
          harga: req.body.harga,
          published: req.body.published ? req.body.published : false
        };
      
        // Save Tutorial in the database
        Mobil.create(mobil)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Tutorial."
            });
          });
      };


// Retrieve all Tutorials from the database.
    exports.findAll = (req, res) => {
        const title = req.query.title;
        var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
      
        Mobil.findAll({ where: condition })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving tutorials."
            });
          });
      };
  


// Find a single Tutorial with an id
    exports.findOne = (req, res) => {
        const id = req.params.id;
      
        Mobil.findByPk(id)
          .then(data => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Tutorial with id=${id}.`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error retrieving Tutorial with id=" + id
            });
          });
      };


// Update a Tutorial by the id in the request
    exports.update = (req, res) => {
        const id = req.params.id;
      
        Mobil.update(req.body, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Tutorial was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Tutorial with id=" + id
            });
          });
      };      


// Delete a Tutorial with the specified id in the request
    exports.delete = (req, res) => {
        const id = req.params.id;
      
        Mobil.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Tutorial was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Tutorial with id=" + id
            });
          });
      };


// Delete all Tutorials from the database.
    exports.deleteAll = (req, res) => {
        Mobil.destroy({
          where: {},
          truncate: false
        })
          .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all tutorials."
            });
          });
      };


// Find all published Tutorials
    exports.findAllPublished = (req, res) => {
        Mobil.findAll({ where: { published: true } })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving tutorials."
            });
          });
      };
