import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ChatApp from "./pages/ChatApp";
import Login from "./pages/Login";
import {isAuth} from './features/auth';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={isAuth() === true
                    ? <Navigate to="/chat"/>
                    : <Navigate to="/login"/>}/>
                <Route exact path="/login" element={< Login />}/>
                <Route
                    exact
                    path="/chat"
                    element={isAuth() === true
                    ? < ChatApp />
                    : <Navigate to="/login"/>}/></Routes>
        </BrowserRouter>
    );
}

export default App;
