import 'tailwindcss/tailwind.css';
// import DynamicCreateTable from "./components/DynamicCreateTable.tsx";
// import SelectTable from "./components/SelectTable.tsx";
//
// import DynamicGetAll from "./functions/DynamicGetAll.tsx";
//
// import {useState} from 'react';
// import AddForm from "./components/AddForm.tsx";
import Login from "./components/Login.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Routes} from "react-router-dom";
import Register from "./components/Register.tsx";
import HomePage from "./components/HomePage.tsx";
import ProtectedRoutes from "./functions/ProtectedRoutes.tsx";
import WatchList from "./components/WatchList.tsx";
import WatchHistory from "./components/WatchHistory.tsx";
import Netflix from "./components/StreamingServices/Netflix.tsx";
import DisneyPlus from "./components/StreamingServices/DisneyPlus.tsx";
import PrimeVideo from "./components/StreamingServices/PrimeVideo.tsx";
import Max from "./components/StreamingServices/Max.tsx";
import CraveTV from "./components/StreamingServices/CraveTV.tsx";


function App() {
    // const [route, setRoute] = useState("media");
    // const [data, setData] = useState([]);
    //
    // DynamicGetAll(route, setData);

    // return (
    //     <div className={`px-[10%] py-10 flex flex-col gap-5`}>
    //         <h1 className={`text-3xl font-bold text-white pb-10 uppercase`}> Database </h1>
    //         <SelectTable setRoute={setRoute} />
    //         <DynamicCreateTable route={route} data={data}/>
    //         <AddForm route={route} data={data}/>
    //     </div>
    // )
    // return (
    //   <div>
    //       <Login />
    //   </div>
    // );

    return (
        <Routes>
            {/*Below are the public routes*/}
            <Route path={'/'} element={<Login/>}></Route>
            <Route path={'/register'} element={<Register/>}></Route>

            {/*Below are the protected routes only accessible after logging in*/}
            <Route element={<ProtectedRoutes/>}>

                <Route path={'/home'} element={<HomePage/>}></Route>
                <Route path={'/watchList'} element={<WatchList/>}></Route>
                <Route path={'/watchHistory'} element={<WatchHistory/>}></Route>
                <Route path={'/Netflix'} element={<Netflix/>}></Route>
                <Route path={'/Disney Plus'} element={<DisneyPlus/>}></Route>
                <Route path={'/Max'} element={<Max/>}></Route>
                <Route path={'/Prime Video'} element={<PrimeVideo/>}></Route>
                <Route path={'/Crave TV'} element={<CraveTV/>}></Route>
            </Route>
        </Routes>
    );
}

export default App
