import { DataTypes, Model } from 'sequelize';
import db from '.';
import MatchesModel from './matchesModel';

class TeamsModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'TeamsModel',
  tableName: 'teams',
  timestamps: false,
});

TeamsModel.hasMany(MatchesModel, { foreignKey: 'id', as: 'Matches' });

export default TeamsModel;
