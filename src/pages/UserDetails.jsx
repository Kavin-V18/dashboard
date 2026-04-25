
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";

export default function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [showMap, setShowMap] = useState(false);
    useEffect(() => {
        api.getUser(id).then(setUser);
    }, [id]);
    if (!user) return <p>Loading...</p>;
    return (
        <>
            <Navbar />

            <div className="bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300 h-screen">
                <h2 className="text-3xl text-center font-bold text-white  bg-black p-2" >User Details</h2>
                <div className="flex justify-center m-2">
                    <div className="bg-blue-200 h-100 m-1 w-150 rounded-[50px] text-center p-10">
                        <div className="">
                            <h3 className="font-bold">{user.name}</h3>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                            <p>Company: {user.company}</p>
                            <p>Age: {user.age}</p>
                            <p>Address: {user.address}</p>

                            <div>
                                <h4 className="font-bold">Tags</h4>
                                {user.tags?.map((tag, i) => (
                                    <span key={i} style={{ marginRight: "5px" }}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div>
                                <h4 className="font-bold">Friends</h4>
                                {user.friends?.map((f, i) => (
                                    <p key={i}>{f.name}</p>
                                ))}
                            </div>


                            <button className="bg-rose-300 p-2 rounded-[50px] hover:bg-rose-600 font-medium m-1" onClick={() => setShowMap(true)}>
                                View Location on Map
                            </button>
                        </div>
                    </div>
                </div>
                {showMap && (
                    <div style={{ marginTop: "20px" }}>
                        <button className="bg-blue-200 p-2 rounded-[50px] hover:bg-blue-400 font-medium m-1" onClick={() => setShowMap(false)}>Close</button>

                        <iframe
                            title="map"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            loading="lazy"
                            src={`https://www.google.com/maps?q=${user.latitude},${user.longitude}&output=embed`}
                        ></iframe>
                    </div>
                )}
            </div>
        </>
    );
}
