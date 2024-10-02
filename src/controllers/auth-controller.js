const usersModel = require("../models/users-model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Verifica se a chave JWT foi carregada corretamente
if (!process.env.JWT_KEY) {
  console.error("JWT_KEY is not defined in .env");
  process.exit(1); // Não inicie o servidor sem a chave JWT
}

module.exports = {
  // POST /auth/register
  register: (req, res) => {
    const { name, email, password } = req.body;

    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "All fields must be mandatory" });
    }

    const existingUser = usersModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    const newUser = usersModel.createUser(name, email, password);
    res.status(201).json({ ...newUser, password: undefined }); 
  },

  // POST /auth/login
  login: (req, res) => {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "All fields must be mandatory" });
    }

    const user = usersModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Incorrect credentials!" });
    }

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1d" });
    res.json({ token });
  },
};
