
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddUser() {
     const dispatch = useDispatch();
     const nav = useNavigate();

     const formik = useFormik({
          initialValues: {
               name: "",
               email: "",
               age: "",
               company: "",
               gender: "",
               favoriteFruit: "",
               eyeColor: "",
               latitude: "",
               longitude: "",
               isActive: true,
          },

          validationSchema: Yup.object({
               name: Yup.string().min(3, "Min 3 chars").required("Required"),
               email: Yup.string().email("Invalid email").required("Required"),
               age: Yup.number().min(18, "18+ only").required("Required"),
               company: Yup.string().required("Required"),
               gender: Yup.string().required("Required"),
               favoriteFruit: Yup.string().required("Required"),
               eyeColor: Yup.string().required("Required"),
               latitude: Yup.number().typeError("Must be number").required("Required"),
               longitude: Yup.number().typeError("Must be number").required("Required"),
          }),

          onSubmit: async (values) => {
               try {
                    const res = await api.addUser(values);
                    dispatch(addUser(res.data));
                    nav("/users");
               } catch {
                    alert("Failed to add user");
               }
          },
     });

     return (
          <>
               <Navbar />
               <div className="bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300 h-screen ">
                    <h2 className="text-3xl text-center font-bold text-white bg-black p-2">
                         Add User
                    </h2>

                    <div className="flex justify-center m-5 ">
                         <div className="bg-blue-200 h-200 w-150 rounded-[50px] flex justify-center items-center p-10">
                              <form onSubmit={formik.handleSubmit}>

                                  
                                   <label className="text-1xl font-bold text-gray-900 mb-4">Name</label>
                                   <input
                                        type="text"
                                        name="name"
                                        className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-600"
                                        placeholder="Enter your Name"
                                        {...formik.getFieldProps("name")}
                                   />
                                   {formik.touched.name && formik.errors.name && (
                                        <p className="text-red-600 text-sm">{formik.errors.name}</p>
                                   )}

                                   <label className="text-1xl font-bold text-gray-900">Email</label>
                                   <input
                                        type="email"
                                        name="email"
                                        className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-600"
                                        placeholder="Enter your Email"
                                        {...formik.getFieldProps("email")}
                                   />
                                   {formik.touched.email && formik.errors.email && (
                                        <p className="text-red-600 text-sm">{formik.errors.email}</p>
                                   )}


                                   <label className="text-1xl font-bold text-gray-900">Age</label>
                                   <input
                                        type="number"
                                        name="age"
                                        className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl"
                                        placeholder="Enter your Age"
                                        {...formik.getFieldProps("age")}
                                   />
                                   {formik.touched.age && formik.errors.age && (
                                        <p className="text-red-600 text-sm">{formik.errors.age}</p>
                                   )}


                                   <label className="text-1xl font-bold text-gray-900">Company</label>
                                   <input
                                        type="text"
                                        name="company"
                                        className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl"
                                        placeholder="Company"
                                        {...formik.getFieldProps("company")}
                                   />
                                   {formik.touched.company && formik.errors.company && (
                                        <p className="text-red-600 text-sm">{formik.errors.company}</p>
                                   )}

                                   <label className="text-1xl font-bold text-gray-900">
                                        Select Your Gender
                                   </label> <br />
                                   <select
                                        name="gender"
                                        className="bg-rose-300 rounded-xl hover:bg-rose-600 p-1 m-1"
                                        {...formik.getFieldProps("gender")}
                                   >
                                        <option value="">Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                   </select> <br />
                                   {formik.touched.gender && formik.errors.gender && (
                                        <p className="text-red-600 text-sm">{formik.errors.gender}</p>
                                   )}


                                   <label className="text-1xl font-bold text-gray-900">
                                        Select Your Favorite Fruit
                                   </label> <br />
                                   <select
                                        name="favoriteFruit"
                                        className="bg-rose-300 rounded-xl hover:bg-rose-600 p-1 m-1"
                                        {...formik.getFieldProps("favoriteFruit")}
                                   >
                                        <option value="">Fruit</option>
                                        <option value="banana">Banana</option>
                                        <option value="strawberry">Strawberry</option>
                                        <option value="mango">Mango</option>
                                        <option value="apple">Apple</option>
                                   </select> <br />
                                   {formik.touched.favoriteFruit && formik.errors.favoriteFruit && (
                                        <p className="text-red-600 text-sm">
                                             {formik.errors.favoriteFruit}
                                        </p>
                                   )}


                                   <label className="text-1xl font-bold text-gray-900">EyeColor</label>
                                   <input
                                        type="text"
                                        name="eyeColor"
                                        className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl"
                                        {...formik.getFieldProps("eyeColor")}
                                   />
                                   {formik.touched.eyeColor && formik.errors.eyeColor && (
                                        <p className="text-red-600 text-sm">{formik.errors.eyeColor}</p>
                                   )}


                                   <label className="text-1xl font-bold text-gray-900">latitude</label>
                                   <input
                                        type="number"
                                        name="latitude"
                                        className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl"
                                        {...formik.getFieldProps("latitude")}
                                   />
                                   {formik.touched.latitude && formik.errors.latitude && (
                                        <p className="text-red-600 text-sm">{formik.errors.latitude}</p>
                                   )}


                                   <label className="text-1xl font-bold text-gray-900">longitude</label>
                                   <input
                                        type="number"
                                        name="longitude"
                                        className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl"
                                        {...formik.getFieldProps("longitude")}
                                   />
                                   {formik.touched.longitude && formik.errors.longitude && (
                                        <p className="text-red-600 text-sm">{formik.errors.longitude}</p>
                                   )}

                                   <button
                                        type="submit"
                                        className="w-full bg-rose-400 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-xl mt-2"
                                   >
                                        Add User
                                   </button>
                              </form>
                         </div>
                    </div>
               </div>
          </>
     );
}