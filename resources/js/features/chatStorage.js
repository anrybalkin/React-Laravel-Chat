import {createSlice} from '@reduxjs/toolkit'

/*
{
        chatID:"",
        chatName:""
      }
      model */

export const chatStorage=createSlice({
    name: 'chat',
    initialState: {
      chat:[]
    },
    reducers: {
        addChat:(state,action)=>{
          state.chat.push(action.payload);
        }
        

}}

)

export const { addChat } = chatStorage.actions

export default chatStorage.reducer;