import dotenv from "dotenv";

dotenv.config();

const config = {
	development: {
		client: "mysql",
		useNullAsDefault: true,
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
		},
	},
};

export default config;
