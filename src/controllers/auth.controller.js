import { loginUserService } from "../services/auth.service.js";

export const login = (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Email y password son obligatorios",
    });
  }

  const token = loginUserService(email, password);

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Credenciales inválidas",
    });
  }

  res.status(200).json({ status: "success", message: "Login exitoso", token });
};
