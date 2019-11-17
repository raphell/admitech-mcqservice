import db from '../database/config/database';
import { Model, DataTypes } from 'sequelize';


class Response extends Model {
  public id!: number;
  public label!: string;
  public correct!: boolean;
  public question_id!: number;
}

Response.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  label: DataTypes.STRING,
  correct: DataTypes.BOOLEAN,
  question_id: DataTypes.INTEGER,
}, {
  tableName: 'Responses',
  timestamps: false,
  freezeTableName: true,
  sequelize: db
});

export = Response;
