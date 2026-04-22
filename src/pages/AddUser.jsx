
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function AddUser() {
     const dispatch = useDispatch();
     const nav = useNavigate();
     const [form, setForm] = useState({
          name: "",
          email: "",
          age: "",
          company: "",
          gender: "",
          favoriteFruit: "",
          isActive: true,
     });
     const validate = () => {
          if (form.name.length < 3) return "Name must be at least 3 chars";
          if (!form.email.includes("@")) return "Invalid email";
          if (form.age < 18) return "Age must be 18+";
          return null;
     };
     const handleSubmit = async () => {
          const err = validate();
          if (err) return alert(err);
          const res = await api.addUser(form);
          const newUser = { ...form, id: Date.now() };
          dispatch(addUser(newUser));
          nav("/users");
     };
     return (
          <div>
               <h2 className="header">Add User</h2>
               <input  className="input" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })}/> <br />
               <input  className="input" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} /> <br />
               <input className="input" placeholder="Age" onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}/> <br />
               <input className="input" placeholder="Company" onChange={(e) => setForm({ ...form, company: e.target.value })}/> <br />
               <select  className="button"  onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
               </select> <br />
               <select className="button"  onChange={(e) =>  setForm({ ...form, favoriteFruit: e.target.value })}>
                    <option value="">Fruit</option>
                    <option value="banana">Banana</option>
                    <option value="strawberry">Strawberry</option>
               </select> <br />
               <button  className="button" onClick={handleSubmit}>Add User</button>
          </div>
     );
}