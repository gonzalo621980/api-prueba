import { Model } from 'sequelize';
import { createConnection } from '../connections/db-connection';
import RolPermisoSchema from './rol-permiso-schema';
import RolModel from './rol-model';
import PermisoModel from './permiso-model';

const sequelize = createConnection(true);

class RolPermisoModel extends Model {

}

RolPermisoModel.init(RolPermisoSchema, {
  sequelize,
  modelName: 'RolPermiso',
  tableName: 'rol_permiso',
  timestamps: true,
  createdAt: false,
  updatedAt: false,
  deletedAt: false
});

RolModel.belongsToMany(PermisoModel, { through: RolPermisoModel, as: "Permisos", foreignKey: "idRol" });
PermisoModel.belongsToMany(RolModel, { through: RolPermisoModel, as: "Roles", foreignKey: "idPermiso" });

RolPermisoModel.hasOne(RolModel, { foreignKey: 'id' });
RolPermisoModel.hasOne(PermisoModel, { foreignKey: 'id' });

RolModel.hasMany(RolPermisoModel, { foreignKey: 'idRol' });
PermisoModel.hasMany(RolPermisoModel, { foreignKey: 'idPermiso' });

export default RolPermisoModel;