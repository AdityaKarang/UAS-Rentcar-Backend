module.exports = (sequelize, Sequelize) => {
    const Pelanggan = sequelize.define("pelanggans", {
      idpelanggan: {
        type: Sequelize.STRING
      },
      nama: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      telepon: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Pelanggan;
  };