
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";

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
         <div className="cards">
            <div className="userCard">
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Company: {user.company}</p>
                <p>Age: {user.age}</p>
                <p>Address: {user.address}</p>

                <div>
                    {user.tags?.map((tag, i) => (
                        <span key={i} style={{ marginRight: "5px" }}>
                            #{tag}
                        </span>
                    ))}
                </div>

                <div>
                    <h4>Friends</h4>
                    {user.friends?.map((f, i) => (
                        <p key={i}>{f.name}</p>
                    ))}
                </div>


                <button className="button" onClick={() => setShowMap(true)}>
                    View Location on Map
                </button>
            </div>
           </div>
            {showMap && (
                <div style={{ marginTop: "20px" }}>
                    <button onClick={() => setShowMap(false)}>Close</button>

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
        </>
    );
}
