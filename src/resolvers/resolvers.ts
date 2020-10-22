import authenticationUtility from "../utils/authenticationUtility";

import User from "../models/User";

import { AuthenticationError } from "apollo-server";

const resolvers: Resolvers.Resolvers = {
	Query: {
		user: async (parent, args: Resolvers.QueryUserArgs, context: Server.Context) => {
			const { userId } = args;

			context.logger.info("Query: user with id of" + userId);

			return await User.query()
				.where({ id: userId || context.session?.userId })
				.first();
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
	},
};

export default resolvers;
