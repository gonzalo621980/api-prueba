import Sesion from "../entities/sesion";

export default interface ISesionRepository {

	list();

	findById(id:number);

	add(row:Sesion);

	modify(id:number, row:Sesion);

	remove(id:number);

	init(rootUser: string, rootPassword: string);

}
