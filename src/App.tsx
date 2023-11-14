import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Container from "react-bootstrap/esm/Container";
import Home from "./views/Home";
import PostsView from "./views/PostsView";
import SignUp from './views/SignUp';
import Login from './views/Login';

export default function App() {
    return (
        <BrowserRouter>
            <Container data-bs-theme="dark">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts" element={<PostsView />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}
