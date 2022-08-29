const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('typediet',{
        diet:{
            type: DataTypes.STRING,


        }
    })
};