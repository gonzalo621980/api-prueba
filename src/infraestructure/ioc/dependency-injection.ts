import { InjectionMode, createContainer, asClass } from 'awilix';

import UsuarioRepositorySequelize from '../data/repositories-sequelize/usuario-repository';
import RolRepositorySequelize from '../data/repositories-sequelize/rol-repository';
import PermisoRepositorySequelize from '../data/repositories-sequelize/permiso-repository';

import UsuarioService from '../../domain/services/usuario-service';
import RolService from '../../domain/services/rol-service';
import PermisoService from '../../domain/services/permiso-service';

import UsuarioController from '../../server/controllers/usuario-controller';
import RolController from '../../server/controllers/rol-controller';
import PermisoController from '../../server/controllers/permiso-controller';


const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
})

container.register({

  usuarioRepository: asClass(UsuarioRepositorySequelize),
  rolRepository: asClass(RolRepositorySequelize),
  permisoRepository: asClass(PermisoRepositorySequelize),
  
  usuarioService: asClass(UsuarioService),
  rolService: asClass(RolService),
  permisoService: asClass(PermisoService),
  
  usuarioController: asClass(UsuarioController),
  rolController: asClass(RolController),
  permisoController: asClass(PermisoController)

});

export default container;
