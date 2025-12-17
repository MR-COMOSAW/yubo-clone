
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");
const auth = require("./auth");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const { rows } = await db.query(
    "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id",
    [name, email, hash]
  );
  const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET);
  res.json({ token });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const { rows } = await db.query("SELECT * FROM users WHERE email=$1", [email]);
  if (!rows[0]) return res.sendStatus(401);
  const ok = await bcrypt.compare(password, rows[0].password);
  if (!ok) return res.sendStatus(401);
  const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET);
  res.json({ token });
});

app.get("/api/me", auth, async (req, res) => {
  const { rows } = await db.query("SELECT id,name,email FROM users WHERE id=$1", [req.user.id]);
  res.json(rows[0]);
});

app.listen(process.env.PORT || 3001);
