

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import filterReducer from "./slices/filterSlice";
             

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        filters: filterReducer,
    },
}); 



// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; 
// import authReducer from './slices/authSlice';
// import filterReducer from "./slices/filterSlice";
// import userReducer from "./slices/userSlice";

// const persistConfig = {
//   key: 'root',
//   storage,
// //   whitelist: ['auth'], 
// };

// const rootReducer = combineReducers({
//   auth: authReducer,
//    users: userReducer,
//    filters: filterReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {

//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);
