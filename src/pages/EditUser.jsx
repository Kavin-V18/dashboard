import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slices/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";

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
        if (form.age < 18) return "Age must be 18+";
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
        <div>
            <h2 className="header">Edit User</h2>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/> <br />
            <input className="input"value={form.email}onChange={(e) => setForm({ ...form, email: e.target.value })}/> <br />
            <input className="input" value={form.age}onChange={(e) =>setForm({ ...form, age: Number(e.target.value) })}/> <br />
            <input className="input" value={form.company}onChange={(e) =>setForm({ ...form, company:e.target.value })}/> <br />
            <button className="button" onClick={handleUpdate}>Update</button>
        </div>
    );
}













