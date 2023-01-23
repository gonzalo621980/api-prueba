import { Model } from 'sequelize';
import { createConnection } from '../connections/db-connection';
import RolUsuarioSchema from './rol-usuario-schema';
import RolModel from './rol-model';
import UsuarioModel from './usuario-model';

const sequelize = createConnection(true);

class RolUsuarioModel extends Model {

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

RolModel.belongsToMany(UsuarioModel, { through: RolUsuarioModel, as: "Usuarios", foreignKey: "idRol" });
UsuarioModel.belongsToMany(RolModel, { through: RolUsuarioModel, as: "Roles", foreignKey: "idUsuario" });

RolUsuarioModel.hasOne(RolModel, { foreignKey: 'id' });
RolUsuarioModel.hasOne(UsuarioModel, { foreignKey: 'id' });

RolModel.hasMany(RolUsuarioModel, { foreignKey: 'idRol' });
UsuarioModel.hasMany(RolUsuarioModel, { foreignKey: 'idUsuario' });

export default RolUsuarioModel;
