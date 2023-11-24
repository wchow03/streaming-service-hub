import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: {children: any}) {
    const user = window.localStorage.getItem("User");
    const userEmail = window.localStorage.getItem("Email");

    return (user && userEmail) ? children : <Navigate to={"/"} />;
}