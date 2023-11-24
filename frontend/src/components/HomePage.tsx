import {useEffect, useState} from "react";

export interface HomeUser {
    username: string,
    email: string
}

export default function HomePage() {
    const [homeUser, setHomeUser] = useState<HomeUser>();

    useEffect(() => {
        const user = window.localStorage.getItem("User")!;
        const email = window.localStorage.getItem("Email")!;
        setHomeUser({"username": JSON.parse(user), "email": JSON.parse(email)});
    }, []);

    return (
      <h1 className={"text-white h1"}>HOME, hello {homeUser?.username}</h1>
    );
}