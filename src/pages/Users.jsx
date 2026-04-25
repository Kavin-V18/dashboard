
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../services/api";
import { Link } from "react-router-dom";
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
    const hasActiveFilters =
        filters.search.trim() !== "" ||
        filters.gender !== "all" ||
        filters.company !== "all" ||
        filters.fruit !== "all" ||
        filters.ageRange !== "all" ||
        filters.status !== "all" ||
        filters.sortBy !== "";
    const [currentPage, setCurrentPage] = useState(1);
    const [isCardView, setIsCardView] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
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
                if (filters.ageRange === "18-25") return u.age >= 18 && u.age <= 25;
                if (filters.ageRange === "26-35") return u.age >= 26 && u.age <= 35;
                if (filters.ageRange === "36-50") return u.age >= 36 && u.age <= 50;
                if (filters.ageRange === "50+") return u.age > 50;
                return true;
            })();
            return genderMatch && companyMatch && fruitMatch && statusMatch && ageMatch;
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
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);
    const handleDelete = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };
    const confirmDelete = async () => {
        try {
            await api.deleteUser(deleteId);
            dispatch(deleteUser(deleteId));
        } catch (err) {
            console.error(err);
        } finally {
            setShowModal(false);
            setDeleteId(null);
        }
    };
    const handleClick = () => {
        nav("/add-user")
    };
    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300 min-h-220">
                <h2 className="text-3xl text-center font-bold text-white mb-4 bg-black p-2" >User Management</h2>
                <div className="flex justify-center gap-3">
                    <input className="bg-blue-200 w-200  border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-transparent" placeholder="Search users..." value={filters.search} onChange={(e) => dispatch(setSearch(e.target.value))} />
                    <select
                        className="appearance-none bg-blue-200 rounded-[50px] hover:bg-blue-400 font-medium px-6 py-2 pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[right_1.5rem_center]"
                        value={filters.sortBy} onChange={(e) => dispatch(setSort(e.target.value))}>
                        <option value="">Sort By</option>
                        <option value="name">Name</option>
                        <option value="age">Age</option>
                        <option value="company">Company</option>
                    </select>
                    <button className="bg-blue-200 p-2 px-4 rounded-[50px] hover:bg-blue-400 font-medium" onClick={handleClick}>Add User</button>
                </div>
                <div className="flex justify-center m-2 ">
                    <div className="bg-blue-200 h-30 w-200 mt-2 rounded-xl p-3">
                        <div className="text-3xl text-center font-bold text-gray-900 mb-4">Filters</div>
                        <div className="flex justify-around">
                            <select className="appearance-none bg-rose-300 rounded-[50px] hover:bg-rose-600 font-medium px-6 py-2 pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[right_1.5rem_center]"
                                value={filters.gender}
                                onChange={(e) =>
                                    dispatch(setFilter({ gender: e.target.value }))}>
                                <option value="all">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <select className="appearance-none bg-rose-300 rounded-[50px] hover:bg-rose-600 font-medium px-6 py-2 pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[right_1.5rem_center]"
                                value={filters.company}
                                onChange={(e) =>
                                    dispatch(setFilter({ company: e.target.value }))}>
                                <option value="all">Company</option>
                                {companies.map((c, i) => (
                                    <option key={i} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                            <select className="appearance-none bg-rose-300 rounded-[50px] hover:bg-rose-600 font-medium px-6 py-2 pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[right_1.5rem_center]"
                                value={filters.fruit}
                                onChange={(e) =>
                                    dispatch(setFilter({ fruit: e.target.value }))}>
                                <option value="all">Fruit</option>
                                {fruits.map((f, i) => (
                                    <option key={i} value={f}>
                                        {f}
                                    </option>
                                ))}
                            </select>
                            <select className="appearance-none bg-rose-300 rounded-[50px] hover:bg-rose-600 font-medium px-6 py-2 pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[right_1.5rem_center]"
                                value={filters.ageRange}
                                onChange={(e) =>
                                    dispatch(setFilter({ ageRange: e.target.value })) }>
                                <option value="all">Age</option>
                                <option value="18-25">18-25</option>
                                <option value="26-35">26-35</option>
                                <option value="36-50">36-50</option>
                                <option value="50+">50+</option>
                            </select>
                            <select className="appearance-none bg-rose-300 rounded-[50px] hover:bg-rose-600 font-medium px-6 py-2 pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[right_1.5rem_center]"
                                value={filters.status}
                                onChange={(e) =>
                                    dispatch(setFilter({ status: e.target.value }))}>
                                <option value="all">Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <button
                                disabled={!hasActiveFilters}
                                className="bg-rose-300 rounded-[50px] hover:bg-rose-600 p-2  font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => dispatch(resetFilters())}>Reset Filters</button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="bg-black text-white p-2 rounded-xl m-1 hover:text-rose-600" onClick={() => setIsCardView(!isCardView)}>
                        Switch to {isCardView ? 'Table' : 'Card'} View
                    </button>
                </div>
                {isCardView ?
                    <div className="grid grid-cols-3 place-items-center gap-4">
                        {paginatedUsers.map((user) => (
                            <UserCard key={user.id} user={user} onDelete={handleDelete} />
                        ))}
                    </div> : <table className="w-full  bg-rose-200 text-center text-bold text-gray-500  ">
                        <thead className="bg-blue-200">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-900 hover:bg-blue-300 ">ID</th>
                                <th className="px-6 py-4 font-bold text-gray-900 hover:bg-blue-300 ">Name</th>
                                <th className="px-6 py-4 font-bold text-gray-900 hover:bg-blue-300 ">Age</th>
                                <th className="px-6 py-4 font-bold text-gray-900 hover:bg-blue-300 ">Email</th>
                                <th className="px-6 py-4 font-bold text-gray-900 hover:bg-blue-300 ">Company</th>
                                <th className="px-6 py-4 font-bold text-gray-900 hover:bg-blue-300 ">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.map(item => <tr key={item._id}>
                                <td className="px-6 py-4 font-medium text-gray-900 hover:bg-rose-300">{item._id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 hover:bg-rose-300">{item.name}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 hover:bg-rose-300">{item.age}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 hover:bg-rose-300">{item.email}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 hover:bg-rose-300">{item.company}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 hover:bg-rose-300">
                                    <button className="bg-blue-200 p-1 m-1 rounded-xl hover:bg-blue-400"> <Link to={`/users/${item.id}`}>View</Link> </button>
                                    <button className="bg-blue-200 p-1 m-1 rounded-xl hover:bg-blue-400"> <Link to={`/edit-user/${item.id}`}> Edit</Link > </button>
                                    <button className="bg-blue-200 p-1 m-1 rounded-xl hover:bg-blue-400" onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>}

                <Pagination total={filteredUsers.length} page={currentPage} setPage={setCurrentPage} />
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl text-center">
                        <p className="mb-4 text-lg font-semibold">
                            Are you sure you want to delete this user?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-blue-200 p-2 rounded-xl hover:bg-blue-400"
                                onClick={confirmDelete}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-rose-300 p-2 rounded-xl hover:bg-rose-600"
                                onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}