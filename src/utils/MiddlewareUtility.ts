import morgan from "morgan";
import cors from "cors";

import e from "express";

import dotenv from "dotenv";
dotenv.config();

const middlewareutility = (app: e.Application, express: any) => {
	app.use(cors());

	if (process.env.NODE_ENV === "development") {
		switch (process.env.LOG_LEVEL) {
			case "ALL":
				app.use(morgan("default"));
				break;
			case "MINIMAL":
				app.use(morgan("dev"));
				break;
			default:
				"NONE";
				break;
		}
	}
};

export default middlewareutility;
