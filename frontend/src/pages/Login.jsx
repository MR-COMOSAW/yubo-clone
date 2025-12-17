
import axios from "axios";
export default()=>(
<div className="card">
<h2>Login</h2>
<button onClick={async()=>{
const r=await axios.post(import.meta.env.VITE_API+"/api/auth/login",{email:"test@test.se",password:"123"});
localStorage.token=r.data.token;
location.href="/swipe";
}}>Login</button>
</div>
);
