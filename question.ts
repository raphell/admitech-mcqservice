import db from '../database/config/database';
import { Model, DataTypes } from 'sequelize';

class Question extends Model {
  private idQuestion!: number;
  public question!: string;
  public validResponse!: string;
  public responses!: string[];
}

Question.init({
  idQuestion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  question: DataTypes.STRING,
  validResponse: DataTypes.STRING,
  responses: DataTypes.ARRAY(DataTypes.STRING)
}, {
  tableName: 'Question',
  timestamps: false,
  freezeTableName: true,
  sequelize: db
});

export = Question;
