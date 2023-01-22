import { Model } from 'sequelize';
import { createConnection } from '../connections/db-connection';
import RolPermisoSchema from './rol-permiso-schema';
import RolModel from './rol-model';
import PermisoModel from './permiso-model';

const sequelize = createConnection(true);

class RolPermisoModel extends Model {

    getDataValues = () => [
        this.getDataValue("idPermiso"),
        this.getDataValue("idRol")
    ];
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

PermisoModel.hasMany(RolPermisoModel, { as: 'rolPermiso', foreignKey: 'idPermiso' });
RolModel.hasMany(RolPermisoModel, { as: 'rolPermiso', foreignKey: 'idRol' });


export default RolPermisoModel;