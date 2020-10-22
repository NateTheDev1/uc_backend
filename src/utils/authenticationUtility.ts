import bcrypt from "bcryptjs";
import { signJWT } from "./ContextUtility";

class authenticationUtility {
	async hashPassword(password: string) {
		const salt = bcrypt.genSaltSync(10);

		return await bcrypt.hashSync(password, salt);
	}

	async verifyPassword(password: string, hashed: string) {
		return await bcrypt.compareSync(password, hashed);
	}

	async createSession(user: Schema.User) {
		const session: Authentication.DecodedResult = {
			userId: parseInt(user.id),
			role: user.type,
		};

		return await signJWT(session);
	}
}

export default new authenticationUtility();
