import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Button, Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {useState} from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
    }

    return (
        <Container>
            <Row>
                <h1 className={"h1 text-white font-bold text-center"}>Streaming Service</h1>
            </Row>
            <Row>
                <Container className={"min-vh-100 d-flex justify-content-center align-items-center"}>
                    <Form className={"loginForm"} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control type="email" placeholder="name@example.com"
                                              onChange={(e) => setEmail(e.target.value)}/>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" placeholder="Password"
                                              onChange={(e) => setPassword(e.target.value)}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Button className={"justify-content-center bg-blue-500"} variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Container>
            </Row>
        </Container>
    );
}