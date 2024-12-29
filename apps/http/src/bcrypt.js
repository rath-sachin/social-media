import bcrypt from "bcrypt";

export async function hash(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function comparePassword(password, storedHash) {
  const result = await bcrypt.compare(password, storedHash);
  return result;
}
