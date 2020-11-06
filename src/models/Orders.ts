import BaseModel from "./BaseModel";

class Orders extends BaseModel {
	id!: string;
	user_id!: string;
	orderTitle!: string;
	orderedAt!: string;

	static get tableName() {
		return "orders";
	}
}

export default Orders;
