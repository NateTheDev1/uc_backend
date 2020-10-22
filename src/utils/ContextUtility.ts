import { logger } from "./logger";
import jwt from "jsonwebtoken";
import Express from "express";

import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SESSION_SECRET || "itsasecret";

async function validateAndDecodeJWT(token: string): Promise<Authentication.DecodedResult | null> {
	const decoded: any = jwt.decode(token);

	try {
		return {
			userId: decoded.userId,
			role: decoded.role,
		};
	} catch (e) {
		throw new Error("JWT ERROR: Decoded Not Returned");
	}
}

export async function signJWT(session: Server.Session) {
	const JWTOptions: jwt.SignOptions = {
		expiresIn: "30d",
	};

	const signed: any = await jwt.sign(session, secret, JWTOptions);

	logger.info("SignJWT: ", signed);

	return signed;
}

export const contextUtility = async (req: Express.Request, res: Express.Response): Promise<Server.Context> => {
	let session: Server.Session | undefined;

	if (req.headers.authorization && req.headers.authorization.length > 0) {
		const decoded = await validateAndDecodeJWT(req.headers.authorization);

		if (decoded) {
			logger.info(`DecodedJWT: ${decoded}`);

			session = {
				userId: decoded.userId,
				role: decoded.role,
			};
		} else {
			logger.err("Authorization contains invalid token");
		}
	}

	const context = {
		logger,
		role: session ? session.role : "CUSTOMER",
		session,
		req,
		res,
		authenticated: session !== undefined ? true : false,
	};

	return context;
};
