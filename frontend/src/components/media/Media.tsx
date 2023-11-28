import {useEffect, useState} from "react";
import DynamicCreateTable from "../dynamic/DynamicCreateTable.tsx";
import {getMovies} from "./Movies.tsx";
import {getShows} from "./Shows.tsx";
import SearchBar from "./SearchBar.tsx";
import Filters from "./Filters.tsx";
import AddToWatchList from "./AddToWatchList.tsx";


export default function Media() {

    const userID = window.localStorage.getItem("UserID")!;

    const [data, setData] = useState([] as string[]);
    const [submit, setSubmit] = useState(false);
    const [mediaType, setMediaType] = useState("movie");
    const [seed, setSeed] = useState(0);

    // Table Helpers
    // ******************************************************
    const [active, setActive] = useState<number>(-1);
    const [mediaID, setMediaID] = useState<number>(-1);

    function handleListItemClick(args: any, index: number) {
        console.log(args);
        if (active === index) {
            setActive(-1);
            setMediaID(-1);
            return;
        } else {
            setActive(index);
            setMediaID(args.mediaID);
        }
    }

    // Filters
    // ******************************************************
    const [filter, setFilter] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [serviceFilter, setServiceFilter] = useState("");
    const [studioFilter, setStudioFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("");

    // Filtered Columns
    // ******************************************************
    // const [headers, setHeaders] = useState([] as string[]);
    const [search, setSearch] = useState("");
    const [filteredServices, setFilteredServices] = useState([] as string[]);
    const [filteredStudios, setFilteredStudios] = useState([] as string[]);
    const [filteredGenres, setFilteredGenres] = useState([] as string[]);


    // Update Filters on change
    // ******************************************************
    useEffect(() => {
        createServiceFilter(filteredServices);
        createStudioFilter(filteredStudios);
        createGenreFilter(filteredGenres);
        createSearchFilter(search);
    }, [filteredServices, filteredStudios, filteredGenres, search]);

    useEffect(() => {
        combineFilters();
    }, [serviceFilter, studioFilter, searchFilter, genreFilter]);

    useEffect(() => {
        console.log("Filter: " + filter);
        getMedia(setData, filter);
    }, [filter]);

    function combineFilters() {
        let combinedFilter: string = "";

        const filters = [serviceFilter, studioFilter, genreFilter, searchFilter];

        filters.map((filter: string, index: number) => {
            const logic = index + 1 < filters.length ? " AND " : "";
            if (filter !== "") {
                combinedFilter = combinedFilter + "(" + filter + ")" + logic;
            }
        });

        setFilter(combinedFilter)
        console.log(combinedFilter);
    }

    // Seed for DynamicCreateTable
    // ******************************************************
    useEffect(() => {
        setSeed(seed + 1);
    }, [data]);


    // Create SQL WHERE filters
    // ******************************************************
    useEffect(() => {
        fetch(`http://localhost:8080/api/home/subscribedServices/${userID}`)
            .then(response => response.json())
            .then(result => {
                const subscribedServices = result.map((service: any) => service.serviceName);
                console.log("Services: " + subscribedServices);
                setFilteredServices(subscribedServices);
                return subscribedServices;
            })
            .then((result) => {
                createServiceFilter(result);
            })
            .then(() => {
                getMedia(setData, filter);
            });

    }, []);

    function createServiceFilter(services: string[]) {
        // console.log(services)
        let tempFilter = "";
        services.map((service: any, index: number) => {
            // console.log(service);
            const logic = index + 1 < services.length ? " OR " : "";
            const newFilter = `serviceName = "${service}"`;
            tempFilter = tempFilter + newFilter + logic;
        });
        setServiceFilter(tempFilter);
        // console.log(tempFilter);
    }

    function createStudioFilter(studios: string[]) {
        // console.log(services)
        let tempFilter = "";
        studios.map((studio: any, index: number) => {
            // console.log(service);
            const logic = index + 1 < studios.length ? " OR " : "";
            const newFilter = `studioName = "${studio}"`;
            tempFilter = tempFilter + newFilter + logic;
        });
        setStudioFilter(tempFilter);
        // console.log(tempFilter);
    }

    function createGenreFilter(genres: string[]) {
        // console.log(services)
        let tempFilter = "";
        genres.map((genre: any, index: number) => {
            // console.log(service);
            const logic = index + 1 < genres.length ? " OR " : "";
            const newFilter = `genreName = "${genre}"`;
            tempFilter = tempFilter + newFilter + logic;
        });
        setGenreFilter(tempFilter);
        console.log("Genre Filter: " + tempFilter);
    }

    function createSearchFilter(search: string) {
        setSearchFilter(`mediaName LIKE "%${search}%"`);
    }

    // Fetch on filter change
    // ******************************************************
    useEffect(() => {
        combineFilters();

        if (submit) {
            getMedia(setData, filter);
            setSubmit(false);
        }
        console.log(filter);
    }, [submit]);

    // Search Functionality
    // ******************************************************
    function handleSearchChange(e: any) {
        setSearch(e.target.value);
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        if (search !== "") {
            setFilter(`mediaName LIKE "%${search}%" AND (` + serviceFilter + `)`);
        } else {
            setFilter(serviceFilter);
        }

        if (submit) {
            getMedia(setData, filter);
            setSubmit(false);
        }
        setSubmit(true);
    }

    // Media Helpers
    // ******************************************************
    useEffect(() => {
        getMedia(setData, serviceFilter);
    }, [mediaType]);

    function handleMediaTypeChange(e: any) {
        setMediaType(e.target.value);
    }

    function getMedia(setData: (data: any[]) => void, filter: string) {
        let result: string = "";
        if (mediaType === "movie") {
            result = getMovies(setData, filter);
        } else if (mediaType === "show") {
            result = getShows(setData, filter);
        }
        console.log(result);
    }

    // function getHeaders(): string[] {
    //     let headers: string[] = data.map((item: any) => Object.keys(item)).flat();
    //     let noIDHeaders = headers.filter((item: string) => !item.toLowerCase().includes("id"));
    //     let uniqueHeaders: string[] = [...new Set(noIDHeaders)];
    //     setHeaders(uniqueHeaders);
    //     return uniqueHeaders;
    // }

    return (
        <div className={` flex flex-col gap-3`}>
            <h1 className={`h1 text-white text-center`}>Media</h1>

            <div
                className={`sticky top-7 flex flex-col gap-2 bg-slate-200 bg-opacity-50 py-4`}>

                <div className={`flex flex-col gap-2 sm:px-6 md:px-24 lg:px-48`}>
                    <SearchBar values={[search]} handlers={[handleMediaTypeChange, handleSearchChange, handleSubmit]}/>

                    <Filters
                        setFilteredServices={setFilteredServices}
                        filteredServices={filteredServices}
                        setFilteredStudios={setFilteredStudios}
                        filteredStudios={filteredStudios}
                        setFilteredGenres={setFilteredGenres}
                        filteredGenres={filteredGenres}
                    />

                    <AddToWatchList mediaID={mediaID}/>
                </div>

            </div>


            <DynamicCreateTable className={`pb-10 sm:px-6 md:px-24 lg:px-48`} handleClick={handleListItemClick}
                                key={seed} route={mediaType} data={data}
                                active={active}/>

        </div>
    )
}