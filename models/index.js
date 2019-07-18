import Sequelize from 'sequelize';
import env from '../env';
import UserModel from '../models/users';
import ExampleModel from '../models/examples';


const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const User = UserModel(sequelize, Sequelize);
const Example = ExampleModel(sequelize, Sequelize);


module.exports = {
  User,
  Example
};
