import {Outlet} from "react-router-dom";
import Login from "../components/Login.tsx";

export default function ProtectedRoutes() {
    const user = window.localStorage.getItem("User");
    const email = window.localStorage.getItem("Email");

    return (user && email) ? <Outlet /> : <Login />;
}