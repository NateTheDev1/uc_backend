import authenticationUtility from "../utils/authenticationUtility";

import User from "../models/User";
import Config from "../models/Config";

import { AuthenticationError } from "apollo-server";
import ProductGroup from "../models/ProductGroup";
import Product from "../models/Product";

const resolvers: Resolvers.Resolvers = {
	Query: {
		user: async (parent, args: Resolvers.QueryUserArgs, context: Server.Context) => {
			const { userId } = args;

			context.logger.info("Query: user with id of" + userId);

			return await User.query()
				.where({ id: userId || context.session?.userId })
				.first();
		},
		products: async (parent, args: Resolvers.QueryProductsArgs, context: Server.Context) => {
			const { productGroupId } = args;

			context.logger.info("Query: products for product group with id of " + productGroupId);

			const products = await Product.query().where({ productGroupId });

			return products;
		},
		productGroups: async (parent, args, context: Server.Context) => {
			context.logger.info("Query: querying product groups");

			const groups = await ProductGroup.query().withGraphFetched("products");

			return groups;
		},
		adminUsers: async (parent, args, context: Server.Context) => {
			context.logger.info("Query: resolving all admin users");

			return await User.query().where({ type: "ADMIN" });
		},
		getConfig: async (parent, args, context: Server.Context) => {
			context.logger.info("Query: getting config");
			return await Config.query();
		},
	},
	ProductGroup: {
		products: async (parent, args, context: Server.Context) => {
			return await Product.query().where({ productGroupId: parent.id });
		},
	},
	Mutation: {
		createUser: async (parent, args, context: Server.Context) => {
			const { user } = args;

			context.logger.info("Trying to create user with username: " + user.username);

			const foundUser = await User.query().where({ username: user.username });

			context.logger.warn("User with name? " + foundUser[0]);

			if (foundUser[0] !== undefined) {
				context.logger.err("Username in use. did not create user");
				throw new Error("Username in use.");
			}

			const created = await User.query().insertAndFetch({ ...user, password: await authenticationUtility.hashPassword(user.password) });

			return await created;
		},
		loginUser: async (parent, args, context: Server.Context) => {
			const { credentials } = args;

			context.logger.info("Trying to login user with username of " + credentials.username);

			const foundUser = await User.query().where({ username: credentials.username });

			if (foundUser[0] === undefined) {
				throw new AuthenticationError("User does not exist");
			}

			const valid = authenticationUtility.verifyPassword(credentials.password, foundUser[0].password);

			if (!valid) {
				throw new AuthenticationError("Username or password is incorrect");
			}

			context.logger.info("Logging in user");

			if (valid && context.res) {
				const JWTSession = await authenticationUtility.createSession(foundUser[0]);

				context.res.setHeader("authorization", JWTSession);

				return { user: foundUser[0], token: JWTSession };
			} else {
				context.logger.err("Error logging in user. Credentials are invalid.");
				throw new Error("Username or password is incorrect");
			}
		},
		createProduct: async (parent, args: Resolvers.MutationCreateProductArgs, context: Server.Context) => {
			context.logger.info("Mutation: creating product with name of " + args.product.name);

			const product = await Product.query().insertAndFetch(args.product);

			return product;
		},
		createProductGroup: async (parent, args: Resolvers.MutationCreateProductGroupArgs, context: Server.Context) => {
			const { type } = args.productGroup;

			context.logger.info("Creating product group with type of " + type);

			const productGroup = await ProductGroup.query().insertAndFetch({ type });

			return productGroup;
		},
		deleteProduct: async (parent, args: Resolvers.MutationDeleteProductArgs, context: Server.Context) => {
			const { productId } = args;

			const product = Product.query().where({ id: productId }).first();
			if (!product) {
				context.logger.err("Product does not exist.");
				throw new Error("Product does not exist.");
			}

			context.logger.warn("Deleting product with id of " + productId);

			const deleted = Product.query().del().where({ id: productId });

			return deleted ? true : false;
		},
		editConfig: async (parent, args, context: Server.Context) => {
			const { id, value } = args.config;

			let config: Config;

			config = await Config.query().upsertGraphAndFetch({ id: id.toString(), value });

			if (!config) {
				throw new Error("Could not update setting, Try again.");
			}

			return config ? true : false;
		},
	},
};

export default resolvers;
