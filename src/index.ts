import express from "express";
import e from "express";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";

// ENV
dotenv.config();
const PORT = process.env.PORT;

const server = new ApolloServer({});

const app = express();

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
