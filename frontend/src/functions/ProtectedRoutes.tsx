import {Navigate, Outlet, useLocation} from "react-router-dom";

export default function ProtectedRoutes() {
    const user = window.localStorage.getItem("User");
    const email = window.localStorage.getItem("Email");
    const location = useLocation();

    return (user && email) ? <Outlet /> : <Navigate to={"/"} state={{from: location}} replace />;
}