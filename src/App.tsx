import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Container from "react-bootstrap/esm/Container";
import Home from "./views/Home";
import PostsView from "./views/PostsView";
import SignUp from './views/SignUp';
import Login from './views/Login';
import AlertMessage from './components/AlertMessage';

import CategoryType from './types/category';
import UserType from './types/auth';

import { getMe } from './lib/apiWrapper'

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
    const [loggedInUser, setLoggedInUser] = useState<Partial<UserType>|null>(null)
    const [message, setMessage] = useState<string|null>(null);
    const [category, setCategory] = useState<CategoryType|null>(null);

    useEffect( () => {
        async function getLoggedInUser(){
            if (isLoggedIn){
                const token = localStorage.getItem('token') as string
                const response = await getMe(token);
                if (response.data){
                    setLoggedInUser(response.data)
                } else {
                    console.error(response.error)
                }
            }
        }

        getLoggedInUser();
    }, [isLoggedIn])

    const logUserIn = (user:Partial<UserType>):void => {
        setIsLoggedIn(true);
        setLoggedInUser(user);
        flashMessage(`${user.username} has been logged in`, 'success');
    }

    const logUserOut = ():void => {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        localStorage.removeItem('token');
        flashMessage('You have logged out', 'info');
    }

    const flashMessage = (newMessage:string|null, newCategory:CategoryType|null): void => {
        setMessage(newMessage);
        setCategory(newCategory);
    }

    return (
        <BrowserRouter>
            <Container data-bs-theme="dark">
                <Header isLoggedIn={isLoggedIn} handleLogOut={logUserOut}/>
                {message && category && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
                <Routes>
                    <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
                    <Route path="/posts" element={<PostsView isLoggedIn={isLoggedIn} flashMessage={flashMessage} />} />
                    <Route path="/signup" element={<SignUp logUserIn={logUserIn} flashMessage={flashMessage} />} />
                    <Route path="/login" element={<Login logUserIn={logUserIn} isLoggedIn={isLoggedIn} flashMessage={flashMessage} />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}
