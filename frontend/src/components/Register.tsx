import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Alert, DatePicker, DatePickerProps, Input} from "antd";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const [emailRegisteredSuccess, setEmailRegisteredSuccess] = useState(false);
    const [emailRegisteredError, setEmailRegisteredError] = useState(false);
    const navigate = useNavigate();

    const handleDateChange: DatePickerProps['onChange'] = (_date: any, dateString: any) => {
        console.log(dateString);
        setBirthday(dateString);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const body = {
            user: username,
            password: password,
            email: email,
            birthday: birthday
        };
        // await fetch("http://localhost:8080/api/authenticate/register", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(body)
        // })
        //     .then(() => navigate("/"))
        //     .catch(() => alert("Error registering account"));
        await fetch("http://localhost:8080/api/authenticate/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then((res) => {
                if (res.status === 400) {
                    setEmailRegisteredError(true);
                } else {
                    setEmailRegisteredSuccess(true);
                    setTimeout(() => navigate("/"), 2000);
                }
            })
            .catch(() => alert("Error registering account"));
    }


    return (
        <>
            {emailRegisteredSuccess &&
                <Alert banner className={"text-center"} message="Account successfully registered" type="success"/>}
            {emailRegisteredError &&
                <Alert banner closable message="Error registering account, email may already be registered"
                       type="error"/>}
            <div className={"flex-col md:flex-row flex gap-20 justify-content-center align-items-center min-vh-100"}>
                <h1 className={"h1 text-white text-center"}>Streaming Service</h1>
                <form onSubmit={handleSubmit} className={"loginForm"}>
                    <div className={"form-floating mb-3"}>
                        <input type={"text"} required className={"form-control"} id={"floatingUser"}
                               placeholder={"bob123"}
                               onChange={(e) => setUsername(e.target.value)}/>
                        <label htmlFor={"floatingUser"}>Username</label>
                    </div>

                    <div className={"form-floating mb-3"}>
                        <input type={"email"} required className={"form-control"} id={"floatingEmail"}
                               placeholder={"bob123@gmail.com"}
                               onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor={"floatingEmail"}>Email</label>
                    </div>

                    {/*<div className={"form-floating mb-3"}>*/}
                    {/*    <Input.Password type={"password"} required className={"form-control"} id={"floatingPassword"}*/}
                    {/*           placeholder={"password"}*/}
                    {/*           onChange={(e) => setPassword(e.target.value)}/>*/}
                    {/*    <label htmlFor={"floatingPassword"}>Password</label>*/}
                    {/*</div>*/}

                    <div className={"form-floating mb-3"}>
                        <Input.Password required placeholder="Password"
                                        className={"h-10"} id={"floatingPassword"}
                                        onChange={(e: any) => setPassword(e.target.value)}/>
                    </div>

                    {/*<div className={"form-floating mb-3"}>*/}
                    {/*    <input type={"date"} required className={"form-control"} id={"floatingBirthday"}*/}
                    {/*           placeholder={"birthday"}*/}
                    {/*           onChange={(e) => setBirthday(e.target.value)}/>*/}
                    {/*    <label htmlFor={"floatingBirthday"}>Birthday</label>*/}
                    {/*</div>*/}

                    <div className={"form-floating mb-3 w-full"}>
                        <DatePicker className={`w-full py-2`} onChange={handleDateChange} placeholder={"Birthday"}/>
                    </div>

                    <button type={"submit"} className={"btn btn-primary w-100 mb-3"}>Register</button>
                    <Link to={"/"} className={"btn btn-secondary w-100"}>Back to Log in</Link>
                </form>
            </div>
        </>
    );
}