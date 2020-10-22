import BaseModel from "./BaseModel";

class User extends BaseModel {
	id!: string;
	name!: string;
	username!: string;
	password!: string;
	type!: string;
	createdAt!: string;

	static get tableName() {
		return "users";
	}
}

export default User;
