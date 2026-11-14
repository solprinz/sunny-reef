import jwt from "jsonwebtoken";

// Devuelve el token si las credenciales son válidas, o null si no lo son
export const loginUserService = (email, password) => {
  const validUser =
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD;

  if (!validUser) return null;

  return jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
