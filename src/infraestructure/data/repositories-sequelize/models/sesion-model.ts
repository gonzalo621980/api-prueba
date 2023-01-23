import { Model } from 'sequelize';
import { createConnection } from '../connections/db-connection';
import SesionSchema from './sesion-schema';
import UsuarioModel from './usuario-model';

const sequelize = createConnection(true);

class SesionModel extends Model {

}

SesionModel.init(SesionSchema, {
  sequelize,
  modelName: 'Sesion',
  tableName: 'sesion',
  timestamps: true,
  createdAt: false,
  updatedAt: false,
  deletedAt: false
});

SesionModel.hasOne(UsuarioModel, { foreignKey: 'idUsuario' });
UsuarioModel.hasMany(SesionModel, { foreignKey: 'idUsuario' });

export default SesionModel;
