import db from '../database/config/database';
import { Model, DataTypes } from 'sequelize';
import Question from './question';


class CandidateResponse extends Model {
  private id!: number;
  public label!: string;
  public candidate_id!: number;
  public question_id!: number;
}

CandidateResponse.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  label: DataTypes.STRING,
  candidate_id: DataTypes.INTEGER,
  question_id: DataTypes.INTEGER,
}, {
  tableName: 'CandidateResponses',
  timestamps: false,
  freezeTableName: true,
  sequelize: db
});

//CandidateResponse.belongsTo(Question, { as: 'question_id' });

export = CandidateResponse;
