
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Swipe from "./pages/Swipe";
export default()=>(
<BrowserRouter>
<Routes>
<Route path="/" element={<Login/>}/>
<Route path="/signup" element={<Signup/>}/>
<Route path="/swipe" element={<Swipe/>}/>
</Routes>
</BrowserRouter>
);
