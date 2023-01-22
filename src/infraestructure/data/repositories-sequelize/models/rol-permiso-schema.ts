import { DataTypes } from 'sequelize';

const RolPermisoSchema = {
    idRol: {
        field: 'id_rol',
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    idPermiso: {
        field: 'id_permiso',
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    }
};

export default RolPermisoSchema; 