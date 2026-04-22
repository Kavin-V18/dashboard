 import { createSlice } from "@reduxjs/toolkit";


const slice2 = createSlice(
    {
    name: "users",
     initialState: {
     users: [], loading: false, error: null }, 
     reducers: {
         fetchUsersStart: (s) => { 
            s.loading = true; 
        }, 
     fetchUsersSuccess: (s, a) => {
         s.loading = false; s.users = a.payload;
         },
      fetchUsersFailure: (s, a) => {
         s.loading = false;
          s.error = a.payload;
         },
       addUser: (s, a) => { 
        s.users.push(a.payload); 
    },
        updateUser: (s, a) => { 
            const i = s.users.findIndex(u => u.id === a.payload.id);
             if (i !== -1) s.users[i] = a.payload;
             },
         deleteUser: (s, a) => { 
            s.users = s.users.filter(u => u.id !== a.payload);
          },
         },
         });


export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure, addUser, updateUser, deleteUser } = slice2.actions; 
export default slice2.reducer;