import { DataTypes } from 'sequelize';

const UsuarioSchema = {
	id: {
		field: 'id',
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	nombreCompleto: {
		field: 'nombre_completo',
		type: DataTypes.STRING(250),
		allowNull: false
	},
	contrasena: {
		field: 'contrasena',
		type: DataTypes.STRING(250),
		allowNull: false
	},
	correoElectronico: {
		field: 'correo_electronico',
		type: DataTypes.STRING(50),
		allowNull: false
	},
	edad: {
		field: 'edad',
		type: DataTypes.INTEGER,
		allowNull: false
	},
	fechaNacimiento: {
		field: 'fecha_nacimiento',
		type: DataTypes.DATE,
		allowNull: false
	},
	sexo: {
		field: 'sexo',
		type: DataTypes.STRING(20),
		allowNull: false
	},
	dni: {
		field: 'dni',
		type: DataTypes.STRING(20),
		allowNull: false
	},
	direccion: {
		field: 'direccion',
		type: DataTypes.STRING(250),
		allowNull: false
	},
	pais: {
		field: 'pais',
		type: DataTypes.STRING(20),
		allowNull: false
	},
	telefono: {
		field: 'telefono',
		type: DataTypes.STRING(20),
		allowNull: false
	}
};

export default UsuarioSchema;
