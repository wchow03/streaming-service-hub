import {useEffect, useState} from "react";

type FiltersProps = {
    headers: string[],
    filteredServices: string[],
    setFilteredServices: (filteredServices: string[]) => void
}

export default function Filters(
    {
        headers,
        filteredServices,
        setFilteredServices
    }: FiltersProps) {

    const [services, setServices] = useState([] as string[]);


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
                                    <CheckBox name={service} checked={filteredServices.includes(service)}
                                              key={index}>{service}</CheckBox>
                                )
                            })
                        }
                    </div>
                </div>


            </form>
        </div>
    )

    function CheckBox({name, checked}: any) {

        function onChange() {
            if (filteredServices.includes(name)) {
                setFilteredServices(filteredServices.filter((service: any) => service !== name));
            } else {
                setFilteredServices([...filteredServices, name]);
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

