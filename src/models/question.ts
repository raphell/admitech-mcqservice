import db from '../database/config/database';
import { Model, DataTypes } from 'sequelize';
import Response from './response';


class Question extends Model {
  public id!: number;
  public title!: string;
  public mcq_id!: number;
}

Question.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataTypes.STRING,
  mcq_id: DataTypes.INTEGER,
}, {
  tableName: 'Questions',
  timestamps: false,
  freezeTableName: true,
  sequelize: db
});

//Question.hasMany(Response, { as: 'responses' });

export = Question;
