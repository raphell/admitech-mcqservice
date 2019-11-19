import db from '../database/config/database';
import { Model, DataTypes } from 'sequelize';
//import Question from './question';

class Mcq extends Model {
  public id!: number;
  public title!: string;
  public formation!: string;
  public origin!: string;
  public favorite!: boolean;
}

Mcq.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataTypes.STRING,
  formation: DataTypes.STRING,
  origin: DataTypes.STRING,
  favorite: DataTypes.BOOLEAN,
}, {
  tableName: 'Mcqs',
  timestamps: false,
  freezeTableName: true,
  sequelize: db
});

//Mcq.hasMany(Question, { as: 'questions' });

export = Mcq;
