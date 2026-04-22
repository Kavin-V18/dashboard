import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../services/api";

import {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    deleteUser,
} from "../redux/slices/userSlice";
import {
    setSearch,
    setSort,
    setFilter,
    resetFilters,
} from "../redux/slices/filterSlice";
import useDebounce from "../useDebounce";
import UserCard from "../components/UserCard";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Users() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);
    const filters = useSelector((state) => {
        console.log(state.filters)
        return state.filters
    });
    const [currentPage, setCurrentPage] = useState(1);
    const nav = useNavigate();
    const itemsPerPage = 6;

    useEffect(() => {
        const loadUsers = async () => {
            try {
                dispatch(fetchUsersStart());
                const data = await api.getUsers();
                dispatch(fetchUsersSuccess(data));
            } catch (err) {
                dispatch(fetchUsersFailure(err.message));
            }
        };
        loadUsers();
    }, [dispatch]);

    const debouncedSearch = useDebounce(filters.search, 500);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, filters]);

    const companies = [...new Set(users.map((u) => u.company))];
    const fruits = [...new Set(users.map((u) => u.favoriteFruit))];

    const filteredUsers = useMemo(() => {
        let result = [...users];

        result = result.filter(
            (u) =>
                u.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                u.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                u.company.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

        result = result.filter((u) => {
            const genderMatch = filters.gender === "all" || u.gender?.toLowerCase() === filters.gender;
            const companyMatch = filters.company === "all" || u.company === filters.company;
            const fruitMatch = filters.fruit === "all" || u.favoriteFruit === filters.fruit;
            const statusMatch = filters.status === "all" || (filters.status === "active" ? u.isActive : !u.isActive);
            const ageMatch = (() => {
                if (filters.ageRange === "all") return true;
                if (filters.ageRange === "18-25")
                    return u.age >= 18 && u.age <= 25;
                if (filters.ageRange === "26-35")
                    return u.age >= 26 && u.age <= 35;
                if (filters.ageRange === "36-50")
                    return u.age >= 36 && u.age <= 50;
                if (filters.ageRange === "50+") return u.age > 50;
                return true;
            })();
            return (
                genderMatch &&
                companyMatch &&
                fruitMatch &&
                statusMatch &&
                ageMatch
            );
        });

        if (filters.sortBy === "age") {
            result.sort((a, b) => a.age - b.age);
        } else if (filters.sortBy === "name") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filters.sortBy === "company") {
            result.sort((a, b) => a.company.localeCompare(b.company));
        }
        return result;
    }, [users, debouncedSearch, filters]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await api.deleteUser(id);
            dispatch(deleteUser(id));
        }
    };

    const handleClick = () => {
        nav("/add-user")
    }

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;
    return (<>
        <Navbar />
        <div className="bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300">
          
                <h2 className="text-3xl text-center font-bold text-white mb-4 bg-black p-2" >User Management</h2>

                 <div className="flex justify-center gap-3">
                <input className="bg-blue-200 w-200  border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-transparent"  placeholder="Search users..." value={filters.search} onChange={(e) => dispatch(setSearch(e.target.value))} />

                <select  className="bg-blue-200 p-2 rounded-[50px] hover:bg-blue-300 font-medium"
                    value={filters.sortBy} onChange={(e) => dispatch(setSort(e.target.value))}>
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="age">Age</option>
                    <option value="company">Company</option>
                </select>

                <button className="bg-blue-200 p-2 rounded-[50px] hover:bg-blue-400 font-medium" onClick={handleClick}>Add User</button>

            </div>
             <div className="flex justify-center m-2 ">
            <div className="bg-blue-200 h-30 w-200 mt-2 rounded-xl p-3">
                <div className="text-3xl text-center font-bold text-gray-900 mb-4">Filters</div>

                <div className="flex justify-around">
                <select className="bg-rose-300  rounded-xl hover:bg-rose-600 p-2"
                    value={filters.gender}
                    onChange={(e) =>
                        dispatch(setFilter({ gender: e.target.value }))
                    }>
                    <option value="all">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <select className="bg-rose-300  rounded-xl hover:bg-rose-600"
                    value={filters.company}
                    onChange={(e) =>
                        dispatch(setFilter({ company: e.target.value }))
                    }>
                    <option value="all">Company</option>
                    {companies.map((c, i) => (
                        <option key={i} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
                <select className="bg-rose-300  rounded-xl hover:bg-rose-600"
                    value={filters.fruit}
                    onChange={(e) =>
                        dispatch(setFilter({ fruit: e.target.value }))
                    }>
                    <option value="all">Fruit</option>
                    {fruits.map((f, i) => (
                        <option key={i} value={f}>
                            {f}
                        </option>
                    ))}
                </select>
                <select className="bg-rose-300  rounded-xl hover:bg-rose-600"
                    value={filters.ageRange}
                    onChange={(e) =>
                        dispatch(setFilter({ ageRange: e.target.value }))
                    }>
                    <option value="all">Age</option>
                    <option value="18-25">18-25</option>
                    <option value="26-35">26-35</option>
                    <option value="36-50">36-50</option>
                    <option value="50+">50+</option>
                </select>
                <select className="bg-rose-300  rounded-xl hover:bg-rose-600"
                    value={filters.status}
                    onChange={(e) =>
                        dispatch(setFilter({ status: e.target.value }))
                    }>
                    <option value="all">Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <button className="bg-rose-300  rounded-xl hover:bg-rose-600" onClick={() => dispatch(resetFilters())}>
                    Reset Filters
                </button>
                </div>
            </div>
            </div>
                    <div className="grid grid-cols-3 place-items-center gap-4">
            {paginatedUsers.map((user) =>(
                 
                <UserCard key={user.id} user={user} onDelete={handleDelete} />
              
            ))}   </div>
           
            <Pagination
                total={filteredUsers.length}
                page={currentPage}
                setPage={setCurrentPage}
            />
        </div>
    </>
    );
}