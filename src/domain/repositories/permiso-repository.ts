import Permiso from "../entities/permiso";

export default interface IPermisoRepository {

	list();

	findById(id:number);

}
