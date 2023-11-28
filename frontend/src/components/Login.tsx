import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { LockOutlined } from '@ant-design/icons';
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
    const [users, setUsers] = useState<User[]>([]);
    // const [user, setUser] = useAtom(userData);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/api/users")
            .then(res => res.json())
            .then((data) => {
                setUsers(data)
                console.log(data);
            })
            .catch(() => alert("Error getting users"));
    }, []);

    function handleSubmit(e: any): void {
        e.preventDefault();
        const emails: string[] = users.map(user => user.email);
        if (emails.includes(email)) {
            const foundUser = users.find(user => user.email === email);
            console.log(foundUser);
            if (foundUser && foundUser.password === password) {
                window.localStorage.setItem("UserID", JSON.stringify(foundUser.userID))
                window.localStorage.setItem("User", JSON.stringify(foundUser.username));
                window.localStorage.setItem("Email", JSON.stringify(foundUser.email));

                // setUser({username: foundUser.username, email: foundUser.email, id: foundUser.userID});

                navigate("/home");
            } else {
                alert("Wrong Password");
            }
        } else {
            alert("Email not found");
        }
    }

    return (
        <div className={"d-flex justify-content-center align-items-center min-vh-100"}>
            <h1 className={"h1 text-white text-center mr-20"}>Streaming Service</h1>
            <form onSubmit={handleSubmit} className={"loginForm"}>
                <div className={"form-floating mb-3"}>
                    <input type={"email"} required className={"form-control"} id={"floatingEmail"} placeholder={"bob123@gmail.com"}
                            onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor={"floatingEmail"}>Email</label>
                </div>

                {/*<div className={"form-floating mb-3"}>*/}
                {/*    <input type={"password"} required className={"form-control"} id={"floatingPassword"} placeholder={"password"}*/}
                {/*           onChange={(e) => setPassword(e.target.value)}/>*/}
                {/*    <label htmlFor={"floatingPassword"}>Password</label>*/}
                {/*</div>*/}
                <div>
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" className={"h-10 site-form-item-icon"} id={"floatingPassword"}
                                    onChange={(e: any) => setPassword(e.target.value)}/>
                    <label htmlFor={"floatingPassword"}>Password</label>
                </div>

                <button type={"submit"} className={"btn btn-primary w-100 mb-3"}>Log in</button>
                <Link to={"/register"} className={"btn btn-primary w-100"}>Register</Link>
            </form>
        </div>
    );
}