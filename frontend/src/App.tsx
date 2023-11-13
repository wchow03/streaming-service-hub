import 'tailwindcss/tailwind.css';
import DynamicCreateTable from "./components/DynamicCreateTable.tsx";
import SelectTable from "./components/SelectTable.tsx";
import {useState} from 'react';


function App() {
    const [route, setRoute] = useState("subscription");

    return (
        <div className={`px-[10%] py-10 flex flex-col gap-5`}>
            <h1 className={`text-3xl font-bold text-white pb-10 uppercase`}> Database </h1>
            <SelectTable setRoute={setRoute} />
            <DynamicCreateTable route={route} />
        </div>
    )
}

export default App
