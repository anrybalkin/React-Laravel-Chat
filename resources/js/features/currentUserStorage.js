import {createSlice} from '@reduxjs/toolkit'

export const currentUserStorage=createSlice({
    name: 'currentUser',
    initialState: {
        chatActive:"",
        userName:"",
        avatar:"",
        lastName:"",
        firstName:"",
        integration:""
    },
    reducers: {
        addCurrentUser:(state,action)=>{
          state.chatActive=action.payload.chatActive;
          state.userName=action.payload.userName;
          state.avatar=action.payload.avatar;
          state.lastName=action.payload.lastName;
          state.firstName=action.payload.firstName;
          state.firstName=action.payload.integration;
        },
        changeChat:(state,action)=>
        {
            state.chatActive=action.payload.activeChat;
        }
        

}}

)

export const { addCurrentUser,changeChat } = currentUserStorage.actions

export default currentUserStorage.reducer;