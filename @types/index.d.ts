import e from "express";

declare global {
	namespace Utilities {
		type Logger = {
			info: any;
			warn: any;
			err: any;
		};
	}

	namespace Authentication {
		interface DecodedResult {
			userId: number;
			role: string;
		}
	}

	namespace Server {
		interface Context {
			logger: Utilities.Logger;
			role: string;
			req?: e.Request;
			res?: e.Response;
			session: Server.Session | undefined;
			authenticated: boolean;
		}

		interface Session {
			userId: number;
			role: string;
		}
	}
}

export {};
