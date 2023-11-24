import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
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

                <div className={"form-floating mb-3"}>
                    <input type={"password"} required className={"form-control"} id={"floatingPassword"} placeholder={"password"}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor={"floatingPassword"}>Password</label>
                </div>

                <button type={"submit"} className={"btn btn-primary w-100 mb-3"}>Log in</button>
                <Link to={"/register"} className={"btn btn-primary w-100"}>Register</Link>
            </form>
        </div>
    );
}