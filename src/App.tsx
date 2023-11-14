import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Container from "react-bootstrap/esm/Container";
import Home from "./views/Home";
import PostsView from "./views/PostsView";
import SignUp from './views/SignUp';
import Login from './views/Login';

import UserType from './types/auth';

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<Partial<UserType>|null>(null)

    const logUserIn = (user:Partial<UserType>):void => {
        setIsLoggedIn(true);
        setLoggedInUser(user);
    }

    const logUserOut = ():void => {
        setIsLoggedIn(false);
        setLoggedInUser(null);
    }

    return (
        <BrowserRouter>
            <Container data-bs-theme="dark">
                <Header isLoggedIn={isLoggedIn} handleLogOut={logUserOut}/>
                <Routes>
                    <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
                    <Route path="/posts" element={<PostsView />} />
                    <Route path="/signup" element={<SignUp logUserIn={logUserIn} />} />
                    <Route path="/login" element={<Login logUserIn={logUserIn}/>} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}
