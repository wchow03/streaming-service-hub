import {useEffect, useState} from "react";

type FiltersProps = {
    headers?: string[],
    filteredServices: string[],
    setFilteredServices: (filteredServices: string[]) => void,
    filteredStudios: string[],
    setFilteredStudios: (filteredStudios: string[]) => void,
    filteredGenres: string[],
    setFilteredGenres: (filteredGenres: string[]) => void,
}

export default function Filters(
    {
        filteredServices,
        setFilteredServices,
        filteredStudios,
        setFilteredStudios,
        filteredGenres,
        setFilteredGenres,
    }: FiltersProps) {


    const [services, setServices] = useState([] as string[]);
    const [studios, setStudios] = useState([] as string[]);
    const [genres, setGenres] = useState([] as string[]);

    const [visible, setVisible] = useState("");


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

    // Fetch all Genres
    // ******************************************************
    useEffect(() => {
        const select = "genreName";
        const body = {SELECT: select};

        fetch(`http://localhost:8080/api/genre`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),

            })
            .then(response => response.json())
            .then(result => {
                const tempGenres = result.map((genre: any) => genre.genreName);
                console.log("All Genres: " + tempGenres);
                setGenres(Array.from(new Set(tempGenres)));
            })
            .catch(error => {
                console.log("ERRRORRRR: " + error);
            });
    }, []);


    return (
        <div className={`w-full bg-white rounded p-1 `}>
            {/* Created sort options for each column*/}
            <form
                className={`divide-x-2 w-full flex flex-col md:flex-row justify-start justify-items-center text-white gap-2`}>

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

                <FilterGroup label={`Genres`}
                             complete={genres}
                             filtered={filteredGenres}
                             setFiltered={setFilteredGenres}
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
                className="flex flex-row items-center p-2 hover:opacity-70 hover:cursor-pointer">
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
            <div className={`relative flex flex-col gap-1 basis-1/3 md:w-1/3`}>
                <button
                    type={`button`}
                    className={`flex flex-row gap-2 items-center font-bolds text-black text-sm w-full py-2 px-3 text-left rounded transition-colors duration-300 hover:outline-teal-300 ${visible === label && "outline-teal-600"}`}
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

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={30}
                        height={30}
                        fill="none"
                        viewBox="0 0 24 24"
                        className={`${visible === label && "transform rotate-180"} transition-transform duration-300`}
                    >
                        <path
                            fill="#212121"
                            d="M5.161 10.073C4.454 9.265 5.028 8 6.101 8h11.797c1.074 0 1.648 1.265.94 2.073l-5.521 6.31a1.75 1.75 0 0 1-2.634 0l-5.522-6.31ZM6.653 9.5l5.159 5.896a.25.25 0 0 0 .376 0l5.16-5.896H6.652Z"
                        />
                    </svg>

                </button>
                <form
                    className={`${visible === label ? "" : "hidden"} text-black top-10 absolute w-full transition-opacity duration-300 flex flex-col border border-gray-900 rounded-b-sm bg-white overflow-y-scroll divide-y-2 `}>
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

