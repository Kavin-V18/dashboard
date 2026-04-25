

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import image from "../images/SpaceAstronaut.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");

  useEffect(() => {
    if (isAuth) nav("/dashboard");
  }, [isAuth, nav]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(4, "Minimum 4 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const users = await api.getUsers();

        const user = users.find(
          (u) =>
            u.email === values.email &&
            u.favoriteFruit === values.password
        );
        if (user) {
          dispatch(loginSuccess(user));
          nav("/dashboard");
        } else {
          setPopupMsg("Invalid credentials");
          setShowPopup(true);
        }
      } catch (err) {
        setPopupMsg("Something went wrong");
        setShowPopup(true);
      }
    },
  });
  return (
    <>
      <div className="p-10 bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300 h-screen w-screen">
        <div className="h-full w-full bg-white rounded-[40px] flex flex-col sm:flex-row">
          <div className="basis-1/2">
            <img src={image} alt="" className="h-full w-full rounded-[40px]" />
          </div>
          <div className="bg-white basis-1/2 rounded-[40px] flex justify-center items-center">
            <div className="bg-blue-200 h-80 w-100 p-10 rounded-[50px]">
              <div className="text-3xl text-center font-bold text-gray-900 mb-4">
                Login
              </div>
              <form onSubmit={formik.handleSubmit}>
                <label className="text-1xl font-bold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-600"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.email}
                  </div>
                )}
                <label className="text-1xl font-bold text-gray-900 mt-3 block">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-600"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.password}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-rose-400 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-xl mt-4"
                >
                  Login
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">{popupMsg}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-rose-400 hover:bg-rose-600 text-white px-4 py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

