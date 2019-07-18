/* jshint indent: 2 */

export default function(sequelize, DataTypes) {
  return sequelize.define('examples', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    tableName: 'examples',
    timestamps: false
  });
};
