import Usuario from "../entities/usuario";

export default interface IUsuarioRepository {

	list();

	listByFilter(row:Usuario);

	findById(id:number);

	add(row:Usuario);

	modify(id:number, row:Usuario);

	remove(id:number);


	bindRoles(id:number, roles:number[]);

	unbindRoles(id:number, roles:number[]);

}
