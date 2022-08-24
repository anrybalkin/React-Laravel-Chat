import {createSlice} from '@reduxjs/toolkit'
//{id:"",username:"",text:"",chatID:"",date:""} model

export const messageStore=createSlice({
    name: 'messageStore',
    initialState: {
        message:[]
    },
    reducers: {
        addMessage:(state,action)=>{
          state.message.push(action.payload);
        }
        

}}

)

export const { addMessage } = messageStore.actions

export default messageStore.reducer;