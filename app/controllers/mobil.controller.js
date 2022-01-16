const Mobil = require("../models/mobil.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.idmobil) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Mobil
  const mobil = new Mobil({
    idmobil: req.body.idmobil,
    merek: req.body.merek,
    harga: req.body.harga,
  });

  // Save Mobil in the database
  Mobil.create(mobil, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Mobil."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const name = req.query.name;

  Mobil.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mobils."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Mobil.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Mobil with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Mobil with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body.idmobil) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Mobil.updateById(
    req.params.id,
    new Mobil(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Mobil with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Mobil with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Mobil.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Mobil with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Mobil with id " + req.params.id
        });
      }
    } else res.send({ message: `Mobil was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Mobil.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Mobils were deleted successfully!` });
  });
};