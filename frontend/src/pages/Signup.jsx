
import axios from "axios";
export default function(){
  const signup=async()=>{
    await axios.post(import.meta.env.VITE_API+"/api/auth/signup",{name:"Test",email:"test@test.se",password:"123"});
  };
  return <div className="box"><h2>Signup</h2><button onClick={signup}>Signup</button></div>;
}
