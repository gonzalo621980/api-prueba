import { DataTypes } from 'sequelize';

const SesionSchema = {
	id: {
		field: 'id',
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	fechaInicio: {
		field: 'fecha_inicio',
		type: DataTypes.DATE,
		allowNull: false
	},
	fechaCierre: {
		field: 'fecha_cierre',
		type: DataTypes.DATE,
		allowNull: true
	},
	idUsuario: {
		field: 'id_usuario',
		type: DataTypes.BIGINT,
		allowNull: false
	},
	activa: {
		field: 'activa',
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
};

export default SesionSchema;
