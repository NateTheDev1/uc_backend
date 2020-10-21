import fs from "fs";

export const typeDefs = fs.readFileSync("src/schema/schema.graphql").toString();
