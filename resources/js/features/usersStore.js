import {createSlice} from '@reduxjs/toolkit'

export const usersStore = createSlice({
    name: 'users',
    initialState: {
        user: []
    },
    reducers: {
        addUser: (state, action) => {
            state
                .user
                .push(action.payload);
        },
        changeConfig: (state, action) => {
            state
                .user
                .filter(element => {
                  if(element.username === action.payload.username)
                  {return element}
              })
                .config = action.payload;
        },
        logIn: (state, action) => {
            state
                .user
                .filter(element => {
                  if(element.username === action.payload)
                  {return element}
                })
                .status = "online";
        },
        logOut: (state, action) => {
            state
                .user
                .filter(element => {
                  if(element.username === action.payload)
                  {return element}
                })
                .status = "offline";
        }

    }
})

export const {
    addUser,
    changeConfig,
    logIn,
    logOut
} = usersStore.actions

export default usersStore.reducer;