import { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const verifyToken = (token) => {
	const decodedToken = decode(token);
	if (decodedToken) {
		return new Date().getTime() >= decodedToken.exp * 1000 ? false : true;
	} else {
		return false;
	}
};
export default verifyToken;
