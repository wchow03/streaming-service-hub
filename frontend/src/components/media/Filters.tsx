import {useEffect, useState} from "react";

type FiltersProps = {
    headers?: string[],
    filteredServices: string[],
    setFilteredServices: (filteredServices: string[]) => void,
    filteredStudios: string[],
    setFilteredStudios: (filteredStudios: string[]) => void
}

export default function Filters(
    {
        filteredServices,
        setFilteredServices,
        filteredStudios,
        setFilteredStudios
    }: FiltersProps) {


    const [services, setServices] = useState([] as string[]);
    const [studios, setStudios] = useState([] as string[]);

    useEffect(() => {
        setFilteredStudios(studios);
    }, []);

    // Fetch all services
    // ******************************************************
    useEffect(() => {
        const select = "serviceName";
        const body = {SELECT: select};

        fetch(`http://localhost:8080/api/streamingservice`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),

            })
            .then(response => response.json())
            .then(result => {
                const tempServices = result.map((service: any) => service.serviceName);
                console.log("All Services: " + tempServices);
                setServices(tempServices);
            })
            .catch(error => {
                console.log("ERRRORRRR: " + error);
            });
    }, []);

    // Fetch all studios
    // ******************************************************
    useEffect(() => {
        const select = "studioName";
        const body = {SELECT: select};

        fetch(`http://localhost:8080/api/studio`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),

            })
            .then(response => response.json())
            .then(result => {
                const tempStudios = result.map((studio: any) => studio.studioName);
                console.log("All Services: " + tempStudios);
                setStudios(tempStudios);
            })
            .catch(error => {
                console.log("ERRRORRRR: " + error);
            });
    }, []);

    const [visible, setVisible] = useState("");


    return (
        <div className={`w-full bg-white rounded p-1 `}>
            {/* Created sort options for each column*/}
            <form className={`w-full flex flex-col md:flex-row justify-start justify-items-center text-white gap-2`}>

                <FilterGroup label={`Services`}
                             complete={services}
                             filtered={filteredServices}
                             setFiltered={setFilteredServices}
                             visible={visible} setVisible={setVisible}/>

                <FilterGroup label={`Studios`}
                             complete={studios}
                             filtered={filteredStudios}
                             setFiltered={setFilteredStudios}
                             visible={visible} setVisible={setVisible}/>

            </form>
        </div>
    )

    function CheckBox({name, checked, filtered, setFiltered}: any) {

        function onChange() {
            if (filtered.includes(name)) {
                setFiltered(filtered.filter((service: any) => service !== name));
            } else {
                setFiltered([...filtered, name]);
            }
        }


        return (
            <div
                onClick={onChange}
                className="flex flex-row items-center p-2 border-b border-gray-500 hover:opacity-70 hover:cursor-pointer">
                <input type="checkbox" className="border-blue-500" checked={checked} onChange={onChange}/>
                <label className="ml-2 text-black text-sm pr-10 whitespace-nowrap hover:cursor-pointer">{name}</label>
            </div>
        )
    }

    function FilterGroup({label, complete, filtered, setFiltered, visible, setVisible}: any) {

        function toggleVisible() {
            console.log("Toggling visibility");
            if (visible === label) {
                setVisible("");
            } else {
                setVisible(label);
            }
        }

        return (
            <div className={`relative flex flex-col gap-1 basis-1/2 md:w-1/2`}>
                <button
                    type={`button`}
                    className={`flex flex-row gap-2 items-center font-bolds text-black text-sm w-full py-2 px-3 text-left outline outline-2 outline-teal-600 rounded transition-colors duration-300 hover:outline-teal-300 ${visible === label && "outline-teal-600"}`}
                    onClick={toggleVisible}>
                    {label}:
                    <div className={`overflow-x-scroll flex flex-row w-full gap-2 no-scrollbar`}>
                        {
                            filtered.map((item: any, index: number) => {
                                return (
                                    <span
                                        key={index}
                                        className={`whitespace-nowrap text-xs text-black border py-1 px-3 rounded-full bg-gray-100 t`}>{item}</span>
                                )
                            })
                        }
                    </div>

                </button>
                <form
                    className={`${visible === label ? "" : "opacity-0 -z-10"} text-black top-10 absolute w-full transition-opacity duration-300 flex flex-col border border-gray-900 rounded-b-sm bg-white overflow-y-scroll `}>
                    {
                        complete.map((item: any, index: number) => {
                            return (
                                <CheckBox
                                    name={item}
                                    checked={filtered.includes(item)}
                                    filtered={filtered}
                                    setFiltered={setFiltered}
                                    key={index}>{item}</CheckBox>
                            )
                        })
                    }
                </form>
            </div>
        )
    }
}

