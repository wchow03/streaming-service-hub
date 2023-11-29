import {useEffect, useRef, useState} from "react";
import FilterGroup from "./FilterGroup";

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


    // Handle Closing Filter Groups
    // ******************************************************
    const componentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (componentRef.current && !componentRef.current.contains(event.target)) {
                setVisible("");
            }
        };

        // Attach the event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Detach the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
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

    // Component Render
    // ******************************************************
    return (
        <div className={`w-full bg-white rounded p-1 `}
             ref={componentRef}>
            {/* Created sort options for each column*/}
            <form
                className={`divide-x-2 w-full flex flex-col md:flex-row justify-start justify-items-center text-white gap-2`}>

                <FilterGroup label={`Services`}
                             complete={services}
                             filtered={filteredServices}
                             setFiltered={setFilteredServices}
                             visible={visible} setVisible={setVisible}
                             className={`gap-1 basis-1/3`}
                />

                <FilterGroup label={`Studios`}
                             complete={studios}
                             filtered={filteredStudios}
                             setFiltered={setFilteredStudios}
                             visible={visible} setVisible={setVisible}
                             className={`gap-1 basis-1/3 `}/>

                <FilterGroup label={`Genres`}
                             complete={genres}
                             filtered={filteredGenres}
                             setFiltered={setFilteredGenres}
                             visible={visible} setVisible={setVisible}
                             className={`gap-1 basis-1/3`}/>

            </form>
        </div>
    )
}

