'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasOne(models.Transaction);
      Course.belongsTo(models.Proficiency);
      Course.belongsToMany(models.User, { through: models.Class });
      Course.hasMany(models.Class)
    }

    convertPrice() {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(this.price)
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration:  {
      type: DataTypes.INTEGER,
      get() {
          const rawValue = this.getDataValue('duration');
          return rawValue ? rawValue + ' hours' : null;
      }
    },
    price: DataTypes.INTEGER,
    ProficiencyId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
