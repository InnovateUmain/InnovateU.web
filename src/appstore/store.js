import { configureStore } from "@reduxjs/toolkit";
import userData from "./userData";
const store = configureStore({
reducer:{
    userData:userData,
},
})
export default store;
