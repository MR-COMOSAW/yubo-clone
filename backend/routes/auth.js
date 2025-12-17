
const router=require("express").Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const db=require("../db");

router.post("/signup",async(req,res)=>{
  const {name,email,password}=req.body;
  const hash=await bcrypt.hash(password,10);
  const r=await db.query(
    "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id",
    [name,email,hash]
  );
  const token=jwt.sign({id:r.rows[0].id},process.env.JWT_SECRET,{expiresIn:"7d"});
  res.json({token});
});

router.post("/login",async(req,res)=>{
  const {email,password}=req.body;
  const r=await db.query("SELECT * FROM users WHERE email=$1",[email]);
  if(!r.rows[0]) return res.sendStatus(401);
  const ok=await bcrypt.compare(password,r.rows[0].password);
  if(!ok) return res.sendStatus(401);
  const token=jwt.sign({id:r.rows[0].id},process.env.JWT_SECRET,{expiresIn:"7d"});
  res.json({token});
});

module.exports=router;
