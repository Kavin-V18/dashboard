
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import image from "../images/SpaceAstronaut.jpg"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (isAuth) nav("/dashboard");
  }, [isAuth]);

  const handleLogin = async () => {
    const users = await api.getUsers();
    // console.log(users) 

    const user = users.find(
      (u) => u.email === email && u.favoriteFruit === password);
      console.log(user)
    if (user) {
      dispatch(loginSuccess(user));
      nav("/dashboard");
    }
    else {
      alert("Invalid credentials");
    }
  };
  return (
    <>
      <div className="p-10   bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300  h-screen w-screen " >
        <div className=" h-full w-full bg-white  rounded-[40px] flex flex-col sm:flex-row ">
          <div className="basis-1/2  " >
            <img src={image} alt="" className="h-full w-full  rounded-[40px]  " />

          </div>
          <div className="bg-white basis-1/2 rounded-[40px] flex justify-center items-center" >
            <div className="bg-blue-200 h-80 w-100 p-10 rounded-[50px] ">
              <div className="text-3xl text-center font-bold text-gray-900 mb-4">Login</div>
              <div>
                <label className="text-1xl font-bold text-gray-900 mb-4" htmlFor="">Email</label>
              </div>
              <input placeholder="Email" className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all" onChange={(e) => setEmail(e.target.value)} />
              <div>
                <label className="text-1xl font-bold text-gray-900 mb-4" htmlFor="">Password</label><br />
              </div>
              <input placeholder="Password" className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all" onChange={(e) => setPassword(e.target.value)} /> <br />
              <button className="w-full bg-rose-400 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-xl mt-2" onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}