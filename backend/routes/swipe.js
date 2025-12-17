
const router=require("express").Router();
const auth=require("../authMiddleware");
const db=require("../db");

router.post("/",auth,async(req,res)=>{
  const {target,liked}=req.body;
  await db.query(
    "INSERT INTO swipes(swiper,target,liked) VALUES($1,$2,$3) ON CONFLICT DO NOTHING",
    [req.user.id,target,liked]
  );
  const match=await db.query(
    "SELECT 1 FROM swipes WHERE swiper=$1 AND target=$2 AND liked=true",
    [target,req.user.id]
  );
  if(match.rowCount){
    await db.query("INSERT INTO matches(user1,user2) VALUES($1,$2)",[req.user.id,target]);
    return res.json({match:true});
  }
  res.json({match:false});
});

module.exports=router;
