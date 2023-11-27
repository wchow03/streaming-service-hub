import {Button, Input, Modal} from "antd";
import {useState} from "react";
import {setHomeUser} from "./MainNavbar.tsx";

export default function AccountSettings() {
    const [newUsername, setUsername] = useState();
    const [newPassword, setPassword] = useState();
    const [newEmail, setEmail] = useState();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const userID = window.localStorage.getItem("UserID");
    const email = window.localStorage.getItem("Email");

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setLoading(true);
        console.log("HandledOK")
        setLoading(false);
        setOpen(false);
        window.location.reload();
        // reset();
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleUsernameSubmit = async () => {
        setLoading(true);
        const data = {userID: userID, userName: newUsername};
        await fetch("http://localhost:8080/api/account/updateUsername", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        setLoading(false);
        setOpen(false);
        window.localStorage.setItem("User", JSON.stringify(newUsername));
    };

    const handlePasswordSubmit = () => {
        console.log(newPassword);
        // window.localStorage.setItem("Email", JSON.stringify("admin@gmail.com"));
    };

    const handleEmailSubmit = () => {
        console.log(newEmail);
        // window.localStorage.setItem("Email", JSON.stringify("admin@gmail.com"));
    };

    return (
        <>
            <h1 className={"h1 text-white text-center"}>Account Settings</h1>
            <div className="container text-center text-white">
                <div className="flex flex-col gap-2">

                    <div className={"row justify-content-center m-2"}>
                        <Input required className={"col-2 mr-2"} placeholder="Enter new username" onChange={(e) => setUsername(e.target.value)}/>
                        <button onClick={handleUsernameSubmit} className={"btn btn-primary col-2"}>Save changes</button>
                    </div>

                    <div className={"row justify-content-center m-2"}>
                        <Input className={"col-2 mr-2"} placeholder="Enter new password" onChange={(e) => setPassword(e.target.value)}/>
                        <button onClick={handlePasswordSubmit} className={"btn btn-primary col-2"}>Save changes</button>
                    </div>

                    <div className={"row justify-content-center m-2"}>
                        <Input className={"col-2 mr-2"} placeholder="Enter new email" onChange={(e) => setEmail(e.target.value)}/>
                        <button onClick={handleEmailSubmit} className={"btn btn-primary col-2"}>Save changes</button>
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