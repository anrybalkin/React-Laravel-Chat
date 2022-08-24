import {configureStore, combineReducers} from '@reduxjs/toolkit'
import chatStorage from './chatStorage';
import messageStore from './messageStore';
import usersStorage from './usersStore';
import currentUserStorage from "./currentUserStorage"
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'chatState',
    storage
}
export const comreducer = combineReducers({chats: chatStorage, userData: usersStorage, messages: messageStore,currentUserStorage})
const persistedReducer = persistReducer(persistConfig, comreducer)

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});


export default store;

export const persistor = persistStore(store)