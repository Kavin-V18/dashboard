

import { Link } from "react-router-dom";
import image from "../images/SpaceAstronaut.jpg"

export default function UserCard({ user, onDelete }) {
    return (
        <>
            <div className="bg-blue-200 m-3 w-80  rounded-xl ">
                <div>
                     <img src={image} alt="" className="h-full w-full rounded-xl "/> 
                 </div>   
                 <div className="text-center">
                    <h3 className="font-bold">{user.name}</h3>
                    <p>{user.email}</p>
                    <p>{user.company}</p>
                    <p>{user.age}</p>
                    <button className="bg-rose-300 p-2 rounded-xl hover:bg-rose-600 font-medium m-1" > <Link to={`/users/${user.id}`}>View</Link> </button>
                    <button className="bg-rose-300 p-2 rounded-xl hover:bg-rose-600 font-medium m-1"> <Link to={`/edit-user/${user.id}`}> Edit</Link > </button>
                    <button className="bg-rose-300 p-2 rounded-xl hover:bg-rose-600 font-medium m-1" onClick={() => onDelete(user.id)}>Delete</button>
                </div>  
            </div>
        </>
    );
}