import express from "express";
import e from "express";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/typeDefs";
import resolvers from "./resolvers/resolvers";
import middlewareutility from "./utils/MiddlewareUtility";
import { contextUtility } from "./utils/ContextUtility";

// ENV
dotenv.config();
const PORT = process.env.PORT;

const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers as any,
	context: async ({ req, res }: { req: e.Request; res: e.Response }) => {
		return await contextUtility(req, res);
	},
});

const app = express();

middlewareutility(app, express);

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
