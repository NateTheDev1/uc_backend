import BaseModel from "./BaseModel";

class Product extends BaseModel {
	id!: string;
	name!: string;
	price!: number;
	image!: string;
	productGroupId!: number;
	description!: string;
	enabled!: string;

	static get tableName() {
		return "products";
	}
}

export default Product;
