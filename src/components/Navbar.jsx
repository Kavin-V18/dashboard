

import { useDispatch,useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const dispatch = useDispatch();
    const nav = useNavigate();

      const user=useSelector((state)=>state.auth.user)
  

    return <>   
           <div className="bg-blue-200 flex justify-between p-10">
          
           <div className="bg-rose-300 p-2 rounded-[50px] hover:bg-rose-600 font-bold">
          <span>Hi {user.name}</span>
            </div>
            <div className="bg-rose-300 p-2 rounded-[50px] hover:bg-rose-600 font-bold">
          <button onClick={()=>nav("/dashboard")}>DashBoard</button>
          </div>
          <div className="bg-rose-300 p-2 rounded-[50px] hover:bg-rose-600 font-bold">
          <button onClick={()=>nav("/users")}>Users</button>
          </div>
          <div className="bg-rose-300 hover:bg-rose-600 p-2 rounded-[50px] font-bold ">
     <button onClick={() => { dispatch(logout())
     nav("/login")
    } }>Logout</button>
    </div>
    </div>   
   </>
}