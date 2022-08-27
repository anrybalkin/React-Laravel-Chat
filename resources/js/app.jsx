import _ from 'lodash';
window._ = _;
import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
<<<<<<< Updated upstream
 import React from 'react';
 import ReactDOM from 'react-dom';
 import App from './Application';
 import store,{persistor} from './features/reduxstore'
 import { PersistGate } from 'redux-persist/integration/react';
 import {Provider} from 'react-redux'
 import { initMsg, initUsers } from './features/initstore';
 import { addUser } from './features/usersStore';

=======
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Application';
import store, {persistor} from './features/reduxstore'
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux'

    
>>>>>>> Stashed changes

 
 if(localStorage.getItem("init")==null)
 {
     localStorage.setItem("init","true");
     store.dispatch(addUser({
         avatar: "",
         firstName: "",
         lastName: "",
         status: "online",
         username: "admin",
         password: window.btoa("admin"),
         config: {
            activeChat: "",
            integration:""
        }
     }))
     let data=initUsers("admin");
     initMsg(data,"admin");
 }
 

 ReactDOM.render(
     <React.StrictMode>
         <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
             <App/>
             </PersistGate>
         </Provider>
     </React.StrictMode>
 ,document.getElementById('app'));

 