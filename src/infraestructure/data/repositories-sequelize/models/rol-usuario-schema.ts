import { DataTypes } from 'sequelize';

const RolUsuarioSchema = {
    idRol: {
        field: 'id_rol',
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    },
    idUsuario: {
        field: 'id_usuario',
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    }
};

export default RolUsuarioSchema;
