import Rol from "../entities/rol";

export default interface IRolRepository {

	list();

	findById(id:number);

	add(row:Rol);

	modify(id:number, row:Rol);

	remove(id:number);


	bindPermisos(id:number, permisos:number[]);

	unbindPermisos(id:number, permisos:number[]);

}
