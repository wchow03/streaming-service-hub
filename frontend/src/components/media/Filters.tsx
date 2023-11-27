import {useEffect, useState} from "react";

type FiltersProps = {
    headers: string[],
    filteredServices: string[],
    setFilteredServices: (filteredServices: string[]) => void,
    filteredStudios: string[],
    setFilteredStudios: (filteredStudios: string[]) => void
}

export default function Filters(
    {
        headers,
        filteredServices,
        setFilteredServices,
        filteredStudios,
        setFilteredStudios
    }: FiltersProps) {

    typeof headers

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


    return (
        <div>
            <h1 className={`text-white h1 text-center`}>Filters</h1>

            {/* Created sort options for each column*/}
            <form className={`w-full flex flex-row justify-evenly text-white`}>
                <div className={`flex flex-col gap-2`}>
                    <p className={`text-lg`}>Services</p>
                    <div className={`flex flex-col border border-gray-900 rounded bg-gray-600`}>
                        {
                            services.map((service: any, index: number) => {
                                return (
                                    <CheckBox
                                        name={service}
                                        checked={filteredServices.includes(service)}
                                        filtered={filteredServices}
                                        setFiltered={setFilteredServices}
                                        key={index}>{service}</CheckBox>
                                )
                            })
                        }
                    </div>
                </div>

                <div className={`flex flex-col gap-2`}>
                    <p className={`text-lg`}>Studios</p>
                    <div className={`flex flex-col border border-gray-900 rounded bg-gray-600`}>
                        {
                            studios.map((studio: any, index: number) => {
                                return (
                                    <CheckBox
                                        name={studio}
                                        checked={filteredStudios.includes(studio)}
                                        filtered={filteredStudios}
                                        setFiltered={setFilteredStudios}
                                        key={index}>{studio}</CheckBox>
                                )
                            })
                        }
                    </div>
                </div>


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
                className="flex flex-row items-center p-2 border-b border-gray-500">
                <input type="checkbox" className="border-blue-500" checked={checked} onChange={onChange}/>
                <label className="ml-2 text-white text-sm pr-10">{name}</label>
            </div>
        )
    }
}

