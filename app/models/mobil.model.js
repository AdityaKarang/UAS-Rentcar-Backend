const sql = require("./db.js");

// constructor
const Mobil = function (mobil) {
  this.idmobil = mobil.idmobil;
  this.merek = mobil.merek;
  this.harga = mobil.harga;
};

Mobil.create = (newMobil, result) => {
  sql.query("INSERT INTO mobils SET ?", newMobil, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created mobil: ", { id: res.insertId, ...newMobil });
    result(null, { id: res.insertId, ...newMobil });
  });
};

Mobil.findById = (id, result) => {
  sql.query(`SELECT * FROM mobils WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found mobil: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Mobil with the id
    result({ kind: "not_found" }, null);
  });
};

Mobil.getAll = (title, result) => {
  let query = "SELECT * FROM mobils";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("mobils: ", res);
    result(null, res);
  });
};

Mobil.getAllPublished = result => {
  sql.query("SELECT * FROM mobils WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("mobils: ", res);
    result(null, res);
  });
};

Mobil.updateById = (id, mobil, result) => {
  sql.query(
    "UPDATE mobils SET idmobil = ?, merek = ?, harga = ? WHERE id = ?",
    [mobil.idmobil, mobil.merek, mobil.harga, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Mobil with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated mobil: ", { id: id, ...mobil });
      result(null, { id: id, ...mobil });
    }
  );
};

Mobil.remove = (id, result) => {
  sql.query("DELETE FROM mobils WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Mobil with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted mobil with id: ", id);
    result(null, res);
  });
};

Mobil.removeAll = result => {
  sql.query("DELETE FROM mobils", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} mobils`);
    result(null, res);
  });
};

module.exports = Mobil;