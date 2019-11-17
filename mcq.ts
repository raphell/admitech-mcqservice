import db from '../database/config/database';
import { Model, DataTypes } from 'sequelize';
import { Question } from './question';

class Mcq extends Model {
  private idMcq!: number;
  public formation!: string;
  public year!: number;
  public title!: string;
  public originOfStudent!: string;
  public questions!: number[];
}

Mcq.init({
  idMcq: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  year: DataTypes.INTEGER,
  title: DataTypes.STRING,
  role: DataTypes.STRING,
  originOfStudent: DataTypes.STRING,
  questions!: DataTypes.ARRAY(DataTypes.INTEGER)
}, {
  tableName: 'MCQ',
  timestamps: false,
  freezeTableName: true,
  sequelize: db
});


export = Mcq;
