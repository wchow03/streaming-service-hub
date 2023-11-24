import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        }
        fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(() => navigate("/"))
            .catch(() => alert("Error registering account"));
    }

    return (
        <div className={"d-flex justify-content-center align-items-center min-vh-100"}>
            <h1 className={"h1 text-white text-center mr-20"}>Streaming Service</h1>
            <form onSubmit={handleSubmit} className={"loginForm"}>
                <div className={"form-floating mb-3"}>
                    <input type={"text"} required className={"form-control"} id={"floatingUser"} placeholder={"bob123"}
                           onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor={"floatingUser"}>Username</label>
                </div>

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

                <div className={"form-floating mb-3"}>
                    <input type={"date"} required className={"form-control"} id={"floatingBirthday"} placeholder={"birthday"}
                           onChange={(e) => setBirthday(e.target.value)}/>
                    <label htmlFor={"floatingBirthday"}>Birthday</label>
                </div>

                <button type={"submit"} className={"btn btn-primary w-100 mb-3"}>Register</button>
            </form>
        </div>
    );
}