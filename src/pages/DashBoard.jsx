

import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {

    
    const users = useSelector((state) => state.users.users);
    const total = users.length;
  
    const active = users.filter((u) => u.isActive).length;
    const avg =
        users.length > 0? (users.reduce((a, b) => Number(a) + Number(b.age), 0) / users.length).toFixed(1) : 0;
    return (
        <>  
            <Navbar />
           <section className="bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300 h-screen">
  
             <h2  className="text-3xl text-center font-bold text-white mb-4 bg-black p-2" >DashBoard</h2>
      
            <div className="flex justify-evenly  ">
             <div className="bg-blue-200 h-30 w-30 m-2 flex justify-center items-center font-bold p-2 rounded-[20px]">
            <p className="text-1xl text-center font-bold  mb-4  p-2" >Total Users {total}</p>
            </div>
            <div className="bg-blue-200 h-30 w-40 m-2 flex justify-center items-center font-bold p-2 rounded-[20px]">
            <p className="text-1xl text-center font-bold  mb-4  p-2">Active Users <br /> {active}</p>
            </div>
            <div className="bg-blue-200 h-30 w-35 m-2 flex justify-center items-center font-bold p-2 rounded-[20px]">
            <p className="text-1xl text-center font-bold  mb-4  p-2">Avgerage Age<br /> {avg}</p>
             </div>
            </div>

            <Outlet />
             </section>
        
        </>
    );
}

