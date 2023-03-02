import { DataTypes, Model } from 'sequelize';
import db from '.';

class MatchesModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamsGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeamId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'MatchesModel',
  tableName: 'matches',
  timestamps: false,
});

// MatchesModel.belongsTo(TeamsModel, { foreignKey: 'homeTeamId', as: 'id' });
// MatchesModel.belongsTo(TeamsModel, { foreignKey: 'awayTeamId', as: 'id' });

// TeamsModel.hasMany(MatchesModel, { foreignKey: 'hometeamId', as: 'id' });
// TeamsModel.hasMany(MatchesModel, { foreignKey: 'awayTeamId', as: 'id' });

export default MatchesModel;
