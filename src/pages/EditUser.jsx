import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slices/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";

export default function EditUser() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [form, setForm] = useState(null);
    useEffect(() => {
        api.getUser(id).then(setForm);
    }, [id]);
    if (!form) return <p>Loading...</p>;
    const validate = () => {
        if (form.name.length < 3) return "Name too short";
        if (!form.email.includes("@")) return "Invalid email";
        if (Number(form.age) < 18) return "Age must be 18+";
        return null;
    };
    const handleUpdate = async () => {
        const err = validate();
        if (err) return alert(err);
        await api.updateUser(id, form);
        dispatch(updateUser(form));
        nav(`/users/${id}`);
    };
    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300 h-screen">
                <h2 className="text-3xl text-center font-bold text-white  bg-black p-2">Edit User</h2>
                <div className="flex justify-center m-5">
                    <div className="bg-blue-200 h-200 w-150 p-5 rounded-[50px] flex justify-center items-center">
                        <div>
                            <div>
                                <label className="text-1xl font-bold text-gray-900 mb-4" htmlFor="">Name</label>
                            </div>
                            <input className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            <div>
                                <label className="text-1xl font-bold text-gray-900 mb-4" htmlFor="">Email</label>
                            </div>
                            <input className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            <div>
                                <label className="text-1xl font-bold text-gray-900 mb-4" htmlFor="">Age</label>
                            </div>
                            <input className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all" value={form.age} onChange={(e) => setForm({ ...form, age: (e.target.value) })} />
                            <div>
                                <label className="text-1xl font-bold text-gray-900 mb-4" htmlFor="">Company</label>
                            </div>
                            <input className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all" className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                            <div>
                                <label className="text-1xl font-bold text-gray-900 mb-4" htmlFor="">EyeColor</label>
                            </div>
                            <input className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all" value={form.eyeColor} onChange={(e) => setForm({ ...form, eyeColor: e.target.value })} />
                            <div>
                                <label className="text-1xl font-bold text-gray-900 mb-4" htmlFor="">Phone</label>
                            </div>
                            <input className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                            <div>
                                <label className="text-1xl font-bold text-gray-900 mb-4" htmlFor="">IsActive</label>
                            </div>
                            <input className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all" value={form.isActive} onChange={(e) => setForm({ ...form, isAcive: e.target.value })} />
                            <div>
                                <label className="text-1xl font-bold text-gray-900 mb-4" htmlFor="">Latitude</label>
                            </div>
                            <input className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all" value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} />
                            <div>
                                <label className="text-1xl font-bold text-gray-900 mb-4" htmlFor="">Longitude</label>
                            </div>
                            <input className="bg-rose-200 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all" value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} />
                            <button className="w-full bg-rose-400 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-xl mt-2" onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}













