import jwt from "jsonwebtoken";

const privateKey = process.env.JWT_PRIVATE_KEY;

export function genetateToken(id) {
  const token = jwt.sign({}, privateKey, { subject: id });
  return token;
}

export function verifyToken(token) {
  const decoded = jwt.verify(token, privateKey);
  return decoded;
}
