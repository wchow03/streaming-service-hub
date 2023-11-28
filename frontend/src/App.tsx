import 'tailwindcss/tailwind.css';
import Login from "./components/Login.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Routes} from "react-router-dom";
import Register from "./components/Register.tsx";
import HomePage from "./components/home-page/HomePage.tsx";
import ProtectedRoutes from "./functions/ProtectedRoutes.tsx";
import WatchList from "./components/watch-list/WatchList.tsx";
import WatchHistory from "./components/WatchHistory.tsx";
import {useEffect, useState} from "react";
import DynamicStreamingService from "./components/dynamic/DynamicStreamingService.tsx";
import WatchListMedia from "./components/watch-list/WatchListMedia.tsx";
import Media from "./components/media/Media.tsx";
import AccountSettings from "./components/AccountSettings.tsx";

function App() {

    const [streamingServices, setStreamingServices] = useState([] as string[]);

    useEffect(() => {
        fetchStreamingServices();
    }, []);

    function addStreamingService(streamingService: string) {
        setStreamingServices([...streamingServices, streamingService]);
    }

    function fetchStreamingServices() {
        fetch("http://localhost:8080/api/streamingService", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                data.forEach((streamingService: any) => {
                    addStreamingService(streamingService.name);
                });
            });
    }

    return (
        <Routes>
            {/*Below are the public routes*/}
            <Route path={'/'} element={<Login/>}></Route>
            <Route path={'/register'} element={<Register/>}></Route>

            {/*Below are the protected routes only accessible after logging in*/}
            <Route element={<ProtectedRoutes/>}>

                <Route path={'/home'} element={<HomePage/>}></Route>
                <Route path={'/watchlist'} element={<WatchList/>}></Route>
                <Route path={'/watchhistory'} element={<WatchHistory/>}></Route>
                <Route path={'/accountSettings'} element={<AccountSettings />} /><Route />
                <Route path={'/media'} element={<Media/>}></Route>

                <Route path={`/service/:serviceName`} element={<DynamicStreamingService/>}></Route>

                <Route path={'/watchlist/:watchlistName/:watchlistID'} element={<WatchListMedia/>}></Route>


                {/*<Route path={'/Netflix'} element={<DynamicStreamingService serviceName={`Netflix`}/>}></Route>*/}
                {/*<Route path={'/Disney Plus'} element={<DynamicStreamingService serviceName={`Disney Plus`}/>}></Route>*/}
                {/*<Route path={'/Max'} element={<Max/>}></Route>*/}
                {/*<Route path={'/Prime Video'} element={<PrimeVideo/>}></Route>*/}
                {/*<Route path={'/Crave TV'} element={<CraveTV/>}></Route>*/}
            </Route>
        </Routes>
    );
}

export default App
