import { Model } from 'sequelize';
import { createConnection } from '../connections/db-connection';
import PermisoSchema from './permiso-schema';

const sequelize = createConnection(true);

class PermisoModel extends Model {

	getDataValues = () => [
		this.getDataValue("id"),
		this.getDataValue("codigo"),
		this.getDataValue("nombre")
	];

}

PermisoModel.init(PermisoSchema, {
  sequelize,
  modelName: 'Permiso',
  tableName: 'permiso',
  timestamps: true,
  createdAt: false,
  updatedAt: false,
  deletedAt: false
});

export default PermisoModel;
