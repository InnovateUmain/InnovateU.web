import { createSlice } from "@reduxjs/toolkit";
const initialState={
    name:"",
    email:"",
    img:"",
    linkedin:"",
    github:"",
    website:"",
    phone:"",
    bio:"",
    clg:"",
    title:"",
}
export const userData= createSlice({
    name:"userData",
    initialState,
    reducers:{
        addUserData: (state,action)=>{
        state.name= action.payload.name,
        state.email=action.payload.email,
        state.img=action.payload.img,
        state.linkedin=action.payload.linkedin,
        state.github=action.payload.github,
        state.website=action.payload.website,
        state.phone=action.payload.phone,
        state.bio=action.payload.bio,
        state.clg=action.payload.clg,
        state.title=action.payload.title
        },
        removeUserData:(state,action)=>{
        state.name="",
        state.email="",
        state.img="",
        state.linkedin="",
        state.github="",
        state.website="",
        state.phone="",
        state.bio="",
        state.clg="",
        state.title=""
        }
    }
})
export const {addUserData,removeUserData}= userData.actions;
export default userData.reducer;