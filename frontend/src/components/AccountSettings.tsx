import {Alert, Button, Input, Modal} from "antd";
import {useState} from "react";

export default function AccountSettings() {
    const [newUsername, setUsername] = useState();
    const [newPassword, setPassword] = useState();
    const [newEmail, setEmail] = useState();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const userID = window.localStorage.getItem("UserID");
    const email = window.localStorage.getItem("Email");

    const [usernameSuccess, setUsernameSuccess] = useState(false);
    const [passwrodSuccess, setPasswordSuccess] = useState(false);
    const [emailSuccess, setEmailSuccess] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setLoading(true);
        console.log("HandledOK")
        setLoading(false);
        setOpen(false);
        // reset();
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleUsernameSubmit = () => {
        const data = {userID: userID, userName: newUsername};
        fetch("http://localhost:8080/api/account/updateUsername", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.status === 400) {
                    setUsernameError(true);
                } else {
                    window.localStorage.setItem("User", JSON.stringify(newUsername));
                    setUsernameSuccess(true);
                }
                setTimeout(() => window.location.reload(), 1500);
            })
            .catch(() => setUsernameError(true));
    };

    const handlePasswordSubmit = () => {
        const data = {userID: userID, password: newPassword};
        fetch("http://localhost:8080/api/account/updatePassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.status === 400) {
                    setPasswordError(true);
                } else {
                    setPasswordSuccess(true);
                }
                setTimeout(() => window.location.reload(), 1500);
            })
            .catch(() => setPasswordError(true));
    };

    const handleEmailSubmit = () => {
        const data = {userID: userID, email: newEmail};
        fetch("http://localhost:8080/api/account/updateEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.status === 400) {
                    setEmailError(true);
                } else {
                    setEmailSuccess(true);
                }
                setTimeout(() => window.location.reload(), 1500);
            })
            .catch(() => setEmailError(true));
    };

    return (
        <>
            <h1 className={"h1 text-white text-center"}>Account Settings</h1>
            <div className="container text-center text-white">
                <div className="flex flex-col gap-2">

                    <div className={"row justify-content-center m-2"}>
                        <Input required className={"col-2 mr-2"} placeholder="Enter new username" onChange={(e) => setUsername(e.target.value)}/>
                        <button onClick={handleUsernameSubmit} className={"btn btn-primary col-2 mr-2"}>Save changes</button>
                        {usernameSuccess && <Alert className={"col-2"} message="Username successfully changed" type="success" />}
                        {usernameError && <Alert className={"col-2"} message="Error changing username" type="error" />}
                    </div>

                    <div className={"row justify-content-center m-2"}>
                        <Input.Password className={"col-2 mr-2"} placeholder="Enter new password" onChange={(e) => setPassword(e.target.value)}/>
                        <button onClick={handlePasswordSubmit} className={"btn btn-primary col-2 mr-2"}>Save changes</button>
                        {passwrodSuccess && <Alert className={"col-2"} message="Password successfully changed" type="success" />}
                        {passwordError && <Alert className={"col-2"} message="Error changing password" type="error" />}
                    </div>

                    <div className={"row justify-content-center m-2"}>
                        <Input className={"col-2 mr-2"} placeholder="Enter new email" onChange={(e) => setEmail(e.target.value)}/>
                        <button onClick={handleEmailSubmit} className={"btn btn-primary col-2 mr-2"}>Save changes</button>
                        {emailSuccess && <Alert className={"col-2"} message="Email successfully changed" type="success" />}
                        {emailError && <Alert className={"col-2"} message="Email already registered" type="error" />}
                    </div>

                    <div className={"justify-content-center m-2"}>
                        <button
                            className={"col-3 py-2 rounded text-white bg-red-600 hover:bg-red-900 transition-colors duration-300"}
                            onClick={showModal}>Delete Account
                        </button>
                        <Modal
                            open={open}
                            title="Delete Account"
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="back" onClick={handleCancel}>
                                    No
                                </Button>,
                                <Button key="submit" type="primary" loading={loading}
                                        onClick={() => handleOk()}
                                        style={{background: "red"}}>
                                    Yes
                                </Button>
                            ]}
                        >
                            <span className={"h6"}>Are you sure you want to delete your account?</span>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
}