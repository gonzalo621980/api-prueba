import { Model } from 'sequelize';
import { createConnection } from '../connections/db-connection';
import UsuarioSchema from './usuario-schema';

const sequelize = createConnection(true);

class UsuarioModel extends Model {

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
