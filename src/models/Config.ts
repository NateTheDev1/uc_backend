import BaseModel from "./BaseModel";

class Config extends BaseModel {
	id!: string;
	type!: string;
	value!: string;

	static get tableName() {
		return "config";
	}
}

export default Config;
