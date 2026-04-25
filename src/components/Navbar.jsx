
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    setShowPopup(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    nav("/login");
  };

  return (
    <>
      <div className="bg-blue-200 flex justify-between p-10">

        <div className="bg-rose-300 p-2 rounded-[50px] hover:bg-rose-600 font-bold">
          <span>Hi {user?.name}</span>
        </div>
        <div
          className="bg-rose-300 p-2 rounded-[50px] hover:bg-rose-600 font-bold"
          onClick={() => nav("/dashboard")}
        >
          <button>DashBoard</button>
        </div>
        <div
          className="bg-rose-300 p-2 rounded-[50px] hover:bg-rose-600 font-bold"
          onClick={() => nav("/users")}
        >
          <button>Users</button>
        </div>

        <div
          className="bg-rose-300 hover:bg-rose-600 p-2 rounded-[50px] font-bold"
          onClick={handleLogout}
        >
          <button>Logout</button>
        </div>
      </div>


      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to logout? 
            </h2>

            <div className="flex gap-4 justify-center">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}