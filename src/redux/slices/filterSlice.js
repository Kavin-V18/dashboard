
import { createSlice } from "@reduxjs/toolkit";

const slice3 = createSlice({
    name: "filters",
    initialState: {
        search: "",
        sortBy: "",
        gender: "all",
        company: "all",
        fruit: "all",
        ageRange: "all",
        status: "all",
    },
    reducers: {
        setSearch: (s, a) => { s.search = a.payload; },
        setSort: (s, a) => { s.sortBy = a.payload; },
        setFilter: (s, a) => ({ ...s, ...a.payload }),
        resetFilters: () => ({
            search: "",
            sortBy: "",
            gender: "all",
            company: "all",
            fruit: "all",
            ageRange: "all",
            status: "all",
        }),
    },
});

export const { setSearch, setSort, setFilter, resetFilters } = slice3.actions;
  console.log(slice3)
export default slice3.reducer;