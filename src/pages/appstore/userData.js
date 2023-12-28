import { createSlice } from "@reduxjs/toolkit";
const initialState={
    name:"",
    email:"",
    token:"",
}
export const userData= createSlice({
    name:"userData",
    initialState,
    reducers:{
        addUserData: (state,action)=>{
        state.name= action.payload.name,
        state.email=action.payload.email,
        state.token=action.payload.token
        },
        removeUserData:(state,action)=>{
        state.name="",
        state.email="",
        state.token=""

        }
    }
})
export const {addUserData,removeUserData}= userData.actions;
export default userData.reducer;