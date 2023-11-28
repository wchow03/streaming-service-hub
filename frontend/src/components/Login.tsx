import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {LockOutlined} from '@ant-design/icons';
import {Input} from "antd";

export interface User {
    userID: number,
    username: string,
    password: string,
    email: string
}

export default function Login() {
    window.localStorage.clear(); // clears local storage for new user

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        const body = {
            email: email,
            password: password
        }

        fetch("http://localhost:8080/api/authenticate/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then((data) => {
                window.localStorage.setItem("UserID", JSON.stringify(data.userID))
                window.localStorage.setItem("User", JSON.stringify(data.username));
                window.localStorage.setItem("Email", JSON.stringify(data.email));
                console.log(data);
            })
            .catch(() => alert("Error getting users"));
    }, []);

    function handleSubmit(e: any): void {
        e.preventDefault();

        const body = {
            email: email,
            password: password
        }

        // ...

        fetch("http://localhost:8080/api/authenticate/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                // Handle successful authentication
                console.log(data);
                window.localStorage.setItem("UserID", JSON.stringify(data.userID));
                window.localStorage.setItem("User", JSON.stringify(data.userName));
                window.localStorage.setItem("Email", JSON.stringify(data.email));
                console.log(data);
                navigate("/home");
            })
            .catch((error) => {
                console.error("Error during authentication:", error.message);
                alert("Error during authentication. Please check your credentials and try again.");
            });
    }


    return (
        <div className={"d-flex justify-content-center align-items-center min-vh-100"}>
            <h1 className={"h1 text-white text-center mr-20"}>Streaming Service</h1>
            <form onSubmit={handleSubmit} className={"loginForm"}>
                <div className={"form-floating mb-3"}>
                    <input type={"email"} required className={"form-control"} id={"floatingEmail"}
                           placeholder={"bob123@gmail.com"}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor={"floatingEmail"}>Email</label>
                </div>

                {/*<div className={"form-floating mb-3"}>*/}
                {/*    <input type={"password"} required className={"form-control"} id={"floatingPassword"} placeholder={"password"}*/}
                {/*           onChange={(e) => setPassword(e.target.value)}/>*/}
                {/*    <label htmlFor={"floatingPassword"}>Password</label>*/}
                {/*</div>*/}
                <div>
                    <Input.Password required prefix={<LockOutlined/>} placeholder="Password"
                                    className={"h-10 site-form-item-icon"} id={"floatingPassword"}
                                    onChange={(e: any) => setPassword(e.target.value)}/>
                    <label htmlFor={"floatingPassword"}>Password</label>
                </div>

                <button type={"submit"} className={"btn btn-primary w-100 mb-3"}>Log in</button>
                <Link to={"/register"} className={"btn btn-primary w-100"}>Register</Link>
            </form>
        </div>
    );
}