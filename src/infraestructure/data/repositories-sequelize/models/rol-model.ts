import { Model } from 'sequelize';
import { createConnection } from '../connections/db-connection';
import RolSchema from './rol-schema';

const sequelize = createConnection(true);

class RolModel extends Model {

	getDataValues = () => [
		this.getDataValue("id"),
		this.getDataValue("codigo"),
		this.getDataValue("nombre")
	];

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
