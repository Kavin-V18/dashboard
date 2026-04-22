

import { createSlice } from "@reduxjs/toolkit";
const saved = JSON.parse(localStorage.getItem("auth"));
const slice = createSlice({
    name: "auth",
   initialState: (saved && typeof saved === 'object') ? saved : { isAuthenticated: false, user: null },
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;

             console.log(state.user)
          
            localStorage.setItem("auth", JSON.stringify(state));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
             localStorage.removeItem("auth");
        },
    },
});

export const { loginSuccess, logout } = slice.actions;
export default slice.reducer;