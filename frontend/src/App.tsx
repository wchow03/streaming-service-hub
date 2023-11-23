import 'tailwindcss/tailwind.css';
import DynamicCreateTable from "./components/DynamicCreateTable.tsx";
import SelectTable from "./components/SelectTable.tsx";

import DynamicGetAll from "./functions/DynamicGetAll.tsx";

import {useState} from 'react';
import AddForm from "./components/AddForm.tsx";

import Login from "./components/Login.tsx";
import "bootstrap/dist/css/bootstrap.min.css";


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
        <>
            <Login />
        </>
    );
}

export default App
