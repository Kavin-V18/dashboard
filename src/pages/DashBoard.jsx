
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

export default function Dashboard() {
    const users = useSelector((state) => state.users.users);
    const total = users.length;
    const [status, setStatus] = useState("active");
    const [loading, setLoading] = useState(true);
    const active = users.filter((u) => u.isActive).length;
    const activeProgress = total > 0 ? (active / total) * 100 : 0;
    const inactive = users.filter((u) => !(u.isActive)).length;
    const inactiveProgress = total > 0 ? (inactive / total) * 100 : 0;

    const avg =
        users.length > 0
            ? (
                users.reduce((a, b) => Number(a) + Number(b.age), 0) /
                users.length
            ).toFixed(1)
            : 0;

    const eyeColorMap = {};

    users.forEach((u) => {
        const color = u.eyeColor || "Unknown";
        eyeColorMap[color] = (eyeColorMap[color] || 0) + 1;
    });

    const pieData = {
        labels: Object.keys(eyeColorMap),
        datasets: [
            {
                data: Object.values(eyeColorMap),
                backgroundColor: [
                    "#6366F1",
                    "#F59E0B",
                    "#10B981",
                    "#EF4444",
                    "#8B5CF6",
                    "#14B8A6",
                ],
            },
        ],
    };

    const ageRanges = { "18-25": 0, "26-35": 0, "36-50": 0, "50+": 0 };
    users.forEach((u) => {
        if (u.age <= 25) ageRanges["18-25"]++;
        else if (u.age <= 35) ageRanges["26-35"]++;
        else if (u.age <= 50) ageRanges["36-50"]++;
        else ageRanges["50+"]++;
    });

    const barData = {
        labels: Object.keys(ageRanges),
        datasets: [
            {
                label: "Users",
                data: Object.values(ageRanges),
                backgroundColor: "#d34f7b",
                borderRadius: 8,
            },
        ],
    };

    return (
        <>
            <Navbar />
            <section className="bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300 h-screen">
                <h2 className="text-3xl text-center font-bold text-white mb-4 bg-black p-2">
                    DashBoard
                </h2>

                <div className="flex justify-evenly  ">
                    <div className="bg-blue-200 h-30 w-30 m-2 flex justify-center items-center font-bold p-2 rounded-[20px]">
                        <p className="text-1xl text-center font-bold  mb-4  p-2">
                            Total Users {total}
                        </p>
                    </div>
                    <div className="bg-blue-200 h-30 w-40 m-2 flex justify-center items-center font-bold p-2 rounded-[20px]">
                        <p className="text-1xl text-center font-bold  mb-4  p-2">
                            Active Users <br /> {active}
                        </p>
                    </div>
                    <div className="bg-blue-200 h-30 w-35 m-2 flex justify-center items-center font-bold p-2 rounded-[20px]">
                        <p className="text-1xl text-center font-bold  mb-4  p-2">
                            Avgerage Age
                            <br /> {avg}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <div className="bg-blue-200 p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <div className="h-[300px] flex items-center justify-center flex-col">
                            <h1 className="font-bold">Pie Chart Based On Eye Color</h1>
                            <Pie data={pieData} />
                        </div>
                    </div>

                    <div className="bg-blue-200 p-6 rounded-2xl shadow hover:shadow-lg transition ">
                        <h3 className=" font-bold mb-4">
                            {" "}
                            Bar Chart Based On Users Age{" "}
                        </h3>
                        <div className="h-[300px]">
                            <Bar data={barData} />
                        </div>
                    </div>
                </div>


                <div className="max-w-md mx-auto p-6 bg-blue-200 shadow-md rounded-lg mt-10">
                    <h2 className="text-xl font-bold mb-4">
                        User Status Progress
                    </h2>
                    <div className="flex gap-4 mb-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="status"
                                value="active"
                                checked={status === "active"}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            Active
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="status"
                                value="inactive"
                                checked={status === "inactive"}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            Inactive
                        </label>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                            className={`h-4 transition-all duration-500 ${status === "active" ? "bg-blue-500" : "bg-red-500"
                                }`}
                            style={{
                                width: `${status === "active" ? activeProgress : inactiveProgress}%`,
                            }}>
                        </div>
                    </div>


                    <p className="mt-3 text-sm text-gray-600">
                        {status === "active" ? active : inactive} of {total} users are{" "}
                        {status}.
                    </p>
                </div>
                <Outlet />
            </section>
        </>
    );
}








