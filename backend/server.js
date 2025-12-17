
require("dotenv").config();
const express=require("express");
const cors=require("cors");
const http=require("http");
const {Server}=require("socket.io");

const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",require("./routes/auth"));
app.use("/api/swipe",require("./routes/swipe"));

const server=http.createServer(app);
const io=new Server(server,{cors:{origin:"*"}});

io.on("connection",s=>{
  s.on("join",room=>s.join(room));
  s.on("msg",d=>io.to(d.room).emit("msg",d));
});

server.listen(process.env.PORT||3001);
