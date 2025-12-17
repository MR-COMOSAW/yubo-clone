
import axios from "axios";
export default()=>(
<div className="card">
<h2>Signup</h2>
<button onClick={async()=>{
await axios.post(import.meta.env.VITE_API+"/api/auth/signup",{name:"Test",email:"test@test.se",password:"123"});
location.href="/";
}}>Signup</button>
</div>
);
