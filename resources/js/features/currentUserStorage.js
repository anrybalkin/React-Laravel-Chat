import {createSlice} from '@reduxjs/toolkit'

export const currentUserStorage=createSlice({
    name: 'currentUser',
    initialState: {
        chatActive:"",
        userName:"",
        avatar:"",
        lastName:"",
        firstName:"",
        integrationName:"",
        integrationID:"",
        user_id:""
    },
    reducers: {
        addCurrentUser:(state,action)=>{
          state.chatActive=action.payload.chatActive;
          state.userName=action.payload.userName;
          state.avatar=action.payload.avatar;
          state.lastName=action.payload.lastName;
          state.firstName=action.payload.firstName;
          state.integrationName=action.payload.integrationName;
          state.integrationID=action.payload.integrationID;
          state.user_id=action.payload.user_id;
        },
        changeChat:(state,action)=>
        {
            state.chatActive=action.payload.activeChat;
        },
        setUserID:(state,action)=>
        {
            state.user_id=action.payload;
        }

}}

)

export const { addCurrentUser,changeChat,setUserID } = currentUserStorage.actions

export default currentUserStorage.reducer;