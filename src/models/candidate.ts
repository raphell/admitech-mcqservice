import db from '../database/config/database';
import { Model, DataTypes } from 'sequelize';
import CandidateResponse from './candidateresponse';

class Candidate extends Model {
  public id!: number;
  public idCandidature!: number;
  public mark!: number;
}

Candidate.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idCandidature: DataTypes.INTEGER,
  mark: DataTypes.INTEGER,
}, {
  tableName: 'Candidates',
  timestamps: false,
  freezeTableName: true,
  sequelize: db
});

//Candidate.hasMany(CandidateResponse, { as: 'responses' });

export = Candidate;
