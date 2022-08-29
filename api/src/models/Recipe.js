const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     id:{
       type: DataTypes.UUID,
       defaultValue:DataTypes.UUIDV4,
       primaryKey: true,
       allowNull: false,
     },
    resumen_plato:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    health_score:{
      type: DataTypes.INTEGER,

    },
    imagen:{
      type: DataTypes.STRING,
    },
    steps:{
      type: DataTypes.TEXT,
    },
    createInDb:{
      type: DataTypes.BOOLEAN,
      defaultValue:true,
      allowNull:false
    }

  });
};
