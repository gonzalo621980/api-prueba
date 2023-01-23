import { Model } from 'sequelize';
import { createConnection } from '../connections/db-connection';
import RolSchema from './rol-schema';

const sequelize = createConnection(true);

class RolModel extends Model {

}

RolModel.init(RolSchema, {
  sequelize,
  modelName: 'Rol',
  tableName: 'rol',
  timestamps: true,
  createdAt: false,
  updatedAt: false,
  deletedAt: false
});

export default RolModel;
