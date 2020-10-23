import BaseModel from "./BaseModel";
import Product from "./Product";

class ProductGroup extends BaseModel {
	id!: string;
	type!: string;
	products!: Product[];

	static get tableName() {
		return "product_groups";
	}

	static relationMappings() {
		return {
			products: {
				relation: BaseModel.HasManyRelation,
				modelClass: Product,
				join: {
					from: "product_groups.id",
					to: "products.productGroupId",
				},
			},
		};
	}
}

export default ProductGroup;
