import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
    const loggedUser = "brian";

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Kekambas Blog</Navbar.Brand>
                <Nav className="me-auto">
                    {loggedUser.length === 0 ? (
                        <>
                            <Nav.Link href="#home">Sign In</Nav.Link>
                            <Nav.Link href="#link">Sign Up</Nav.Link>
                        </>
                    ) : (
                        <Nav.Link href="#link">Logout</Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}
