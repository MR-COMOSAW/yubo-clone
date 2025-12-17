
import axios from "axios";
export default function(){
  const login=async()=>{
    const r=await axios.post(import.meta.env.VITE_API+"/api/auth/login",{email:"test@test.se",password:"123"});
    localStorage.token=r.data.token;
  };
  return <div className="box"><h2>Login</h2><button onClick={login}>Login</button></div>;
}
