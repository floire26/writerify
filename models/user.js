'use strict';
const bcrypt = require('bcrypt');


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Proficiency);
      User.hasOne(models.Transaction);
      User.belongsToMany(models.Course, { through: models.Class });
      User.hasMany(models.Class)
    }

    static login(email, pass) {
      if (!email || !pass) {
        throw new Error("Email / password doesn't exist.");
      }

      User.findOne({
        where:
        {
          email
        }
      })
      .then(foundUser => {
        if (!bcrypt.compareSync(pass, foundUser.password)) {
          throw new Error("Wrong e-mail/password.");
        } else {
          //masuk req.session -> redirect
        }
      })
    }
  }

  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    ProficiencyId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    user.password =bcrypt.hashSync(el.password, 10);
  })
  return User;
};
