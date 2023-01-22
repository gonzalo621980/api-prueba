import { Model } from 'sequelize';
import { createConnection } from '../connections/db-connection';
import RolUsuarioSchema from './rol-usuario-schema';
import RolModel from './rol-model';
import UsuarioModel from './usuario-model';

const sequelize = createConnection(true);

class RolUsuarioModel extends Model {

    getDataValues = () => [
      this.getDataValue("idRol"),
      this.getDataValue("idUsuario")
    ];

}


RolUsuarioModel.init(RolUsuarioSchema, {
  sequelize,
  modelName: 'RolUsuario',
  tableName: 'rol_usuario',
  timestamps: true,
  createdAt: false,
  updatedAt: false,
  deletedAt: false
});

RolModel.hasMany(RolUsuarioModel, { as: 'rolUsuario', foreignKey: 'idRol' });
UsuarioModel.hasMany(RolUsuarioModel, { as: 'rolUsuario', foreignKey: 'idUsuario' });

export default RolUsuarioModel;
