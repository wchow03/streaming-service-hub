import {Alert, Button, Form, Input, Modal} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function AccountSettings() {
    const navigate = useNavigate();
    const [newUsername, setUsername] = useState();
    const [newPassword, setPassword] = useState();
    const [newEmail, setEmail] = useState();

    const [oldPassword, setOldPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const userID = window.localStorage.getItem("UserID");

    const [usernameSuccess, setUsernameSuccess] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [emailSuccess, setEmailSuccess] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [deleteAccountSuccess, setDeleteAccountSuccess] = useState(false);
    const [deleteAccountError, setDeleteAccountError] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setLoading(true);
        fetch("http://localhost:8080/api/account/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userID: userID})
        })
            .then((res) => {
                if (res.status === 400) {
                    setDeleteAccountError(true);
                } else {
                    setLoading(false);
                    setOpen(false);
                    setDeleteAccountSuccess(true);
                    setTimeout(() => navigate("/"), 2000);
                }
            })
            .catch(() => setDeleteAccountError(true));
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
        const data = {userID: userID, password: newPassword, oldPassword: oldPassword};
        fetch("http://localhost:8080/api/authenticate/updatePassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.status === 400) {
                    setPasswordError(true);
                } else if (res.status === 200) {
                    console.log("Password successfully changed");
                    setPasswordSuccess(true);
                } else {
                    setPasswordError(true);
                }
                setTimeout(() => window.location.reload(), 500);
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
            <div className={"container justify-content-center align-items-center text-center sm:mr-5"}>
                {usernameSuccess && <Alert message="Username successfully changed" type="success"/>}
                {usernameError && <Alert message="Error changing username" type="error"/>}
                {passwordSuccess && <Alert message="Password successfully changed" type="success"/>}
                {passwordError && <Alert message="Error changing password" type="error"/>}
                {emailSuccess && <Alert message="Email successfully changed" type="success"/>}
                {emailError && <Alert message="Email already registered" type="error"/>}
                {deleteAccountSuccess &&
                    <Alert message="Account successfully deleted, sad to see you go :(" type="success"/>}
                {deleteAccountError && <Alert message="Error deleting account" type="error"/>}
            </div>
            <h1 className={"h1 text-white text-center pb-10"}>Account Settings</h1>
            <div className="container text-center text-white flex flex-col justify-between gap-10">
                <div className="flex flex-col gap-5 justify-content-center h-full">
                    <Form onFinish={handleUsernameSubmit} className={"flex flex-col md:flex-row justify-between gap-3"}>
                        <Form.Item name={"Update username"}
                                   label={<label className={"text-white"}>Update username</label>}
                                   rules={[{required: true, message: 'Please input a username'}]}
                                   className={"col-3 md:mr-2 flex-grow max-md:w-full"}>
                            <Input onChange={(e: any) => setUsername(e.target.value)}
                                   placeholder={"Enter a new username"}/>
                        </Form.Item>
                        <button type={"submit"}
                                className={"whitespace-nowrap basis-1/4 btn btn-primary col-2 h-10 max-md:w-full"}>Submit
                            changes
                        </button>
                    </Form>

                    <Form onFinish={handlePasswordSubmit}
                          className={"flex flex-col md:flex-row justify-between gap-3 "}>

                        <div className={`flex flex-row w-full`}>
                            <Form.Item name={"Old password"}
                                       label={<label className={"text-white"}>Old
                                           password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>}
                                       rules={[{required: true, message: 'Please input a password'}]}
                                       className={"col-3 mr-2 flex-grow max-md:flex-grow"}>
                                <Input.Password onChange={(e: any) => setOldPassword(e.target.value)}
                                                placeholder={"Enter old password"}/>
                            </Form.Item>

                            <Form.Item name={"Update password"}
                                       label={<label className={"text-white"}>Update password</label>}
                                       rules={[{required: true, message: 'Please input a password'}]}
                                       className={"col-3 md:mr-2 flex-grow max-md:flex-grow"}>

                                <Input.Password onChange={(e: any) => setPassword(e.target.value)}
                                                placeholder={"Enter a new password"}/>
                            </Form.Item>
                        </div>

                        <button type={"submit"}
                                className={"whitespace-nowrap basis-1/4 btn btn-primary col-2 h-10 max-md:w-full"}>Submit
                            changes
                        </button>
                    </Form>

                    <Form onFinish={handleEmailSubmit}
                          className={"flex flex-col md:flex-row justify-between gap-3"}>
                        <Form.Item name={"Update email"}
                                   label={<label className={"text-white"}>Update
                                       email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>}
                                   rules={[{required: true, type: 'email', message: 'Please input a email'}]}
                                   className={"col-3 md:mr-2 flex-grow max-md:w-full"}>
                            <Input onChange={(e: any) => setEmail(e.target.value)} placeholder={"Enter new email"}/>
                        </Form.Item>
                        <button type={"submit"}
                                className={"whitespace-nowrap basis-1/4 btn btn-primary col-2 h-10 max-md:w-full"}>Submit
                            changes
                        </button>
                    </Form>
                </div>
                <div className={"justify-content-center w-full pb-10"}>
                    <button
                        className={"col-3 py-2 w-full rounded text-white bg-red-600 hover:bg-red-900 transition-colors duration-300"}
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
        </>
    );
}