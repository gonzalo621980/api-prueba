import { InjectionMode, createContainer, asClass } from 'awilix';

import UsuarioRepositorySequelize from '../data/repositories-sequelize/usuario-repository';
import RolRepositorySequelize from '../data/repositories-sequelize/rol-repository';
import PermisoRepositorySequelize from '../data/repositories-sequelize/permiso-repository';
import SesionRepositorySequelize from '../data/repositories-sequelize/sesion-repository';

import UsuarioService from '../../domain/services/usuario-service';
import RolService from '../../domain/services/rol-service';
import PermisoService from '../../domain/services/permiso-service';
import SesionService from '../../domain/services/sesion-service';

import UsuarioController from '../../server/controllers/usuario-controller';
import RolController from '../../server/controllers/rol-controller';
import PermisoController from '../../server/controllers/permiso-controller';
import SesionController from '../../server/controllers/sesion-controller';


const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
})

container.register({

  usuarioRepository: asClass(UsuarioRepositorySequelize),
  rolRepository: asClass(RolRepositorySequelize),
  permisoRepository: asClass(PermisoRepositorySequelize),
  sesionRepository: asClass(SesionRepositorySequelize),
  
  usuarioService: asClass(UsuarioService),
  rolService: asClass(RolService),
  permisoService: asClass(PermisoService),
  sesionService: asClass(SesionService),
  
  usuarioController: asClass(UsuarioController),
  rolController: asClass(RolController),
  permisoController: asClass(PermisoController),
  sesionController: asClass(SesionController)

});

export default container;
