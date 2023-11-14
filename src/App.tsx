import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Container from "react-bootstrap/esm/Container";
import Home from "./views/Home";
import PostsView from "./views/PostsView";

export default function App() {
    return (
        <BrowserRouter>
            <Container data-bs-theme="dark">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts" element={<PostsView />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}
