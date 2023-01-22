import { Model } from 'sequelize';
import { createConnection } from '../connections/db-connection';
import UsuarioSchema from './usuario-schema';

const sequelize = createConnection(true);

class UsuarioModel extends Model {

	getDataValues = () => [
		this.getDataValue("id"),
		this.getDataValue("nombreCompleto"),
		this.getDataValue("contrasena"),
		this.getDataValue("correoElectronico"),
		this.getDataValue("edad"),
		this.getDataValue("fechaNacimiento"),
		this.getDataValue("sexo"),
		this.getDataValue("dni"),
		this.getDataValue("direccion"),
		this.getDataValue("pais"),
		this.getDataValue("telefono")
	];

}

UsuarioModel.init(UsuarioSchema, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuario',
  timestamps: true,
  createdAt: false,
  updatedAt: false,
  deletedAt: false
});

export default UsuarioModel;
