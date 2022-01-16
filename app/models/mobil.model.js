module.exports = (sequelize, Sequelize) => {
    const Mobil = sequelize.define("mobils", {
      idmobil: {
        type: Sequelize.STRING
      },
      merek: {
        type: Sequelize.STRING
      },
      harga: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Mobil;
  };