import {useEffect, useState} from "react";
import DynamicCreateTable from "../dynamic/DynamicCreateTable.tsx";
import {dynamicGetMedia} from "./GetItems.tsx";
import SearchBar from "./filters/SearchBar.tsx";
import Filters from "./filters/Filters.tsx";
import AddToWatchList from "./AddToWatchList.tsx";
import {combineFilters, createSearchFilter, createServiceFilter, createStudioFilter} from "./filters/CreateFilters.ts";


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

    // SQL Filter Declarations
    // ******************************************************
    const [filter, setFilter] = useState("(mediaName LIKE \"%%\")");
    const [searchFilter, setSearchFilter] = useState("");
    const [serviceFilter, setServiceFilter] = useState("");
    const [studioFilter, setStudioFilter] = useState("");

    // Filtered Columns
    // ******************************************************
    const [filteredSearch, setFilteredSearch] = useState("");
    const [filteredServices, setFilteredServices] = useState([] as string[]);
    const [filteredStudios, setFilteredStudios] = useState([] as string[]);
    const [filteredGenres, setFilteredGenres] = useState([] as string[]);


    // Update Filters on change
    // ******************************************************
    useEffect(() => {
        createServiceFilter(filteredServices, setServiceFilter);
        createStudioFilter(filteredStudios, setStudioFilter);
        createSearchFilter(filteredSearch, setSearchFilter);
    }, [filteredServices, filteredStudios, filteredGenres, filteredSearch]);

    useEffect(() => {
        combineFilters([serviceFilter, studioFilter, searchFilter], setFilter);
    }, [serviceFilter, studioFilter, searchFilter]);

    useEffect(() => {
        console.log("Filter: " + filter);
        console.log("Genres: " + filteredGenres);
        getMedia(setData, filter, filteredGenres);
    }, [filter, filteredGenres, mediaType]);

    // Seed for DynamicCreateTable
    // ******************************************************
    useEffect(() => {
        setSeed(seed + 1);
    }, [data]);


    // Initial Fetch of Subscribed Services
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
                createServiceFilter(result, setServiceFilter);
            })
            .then(() => {
                getMedia(setData, filter, filteredGenres);
            });

    }, []);

    // Search Functionality
    // ******************************************************
    function handleSearchChange(e: any) {
        setFilteredSearch(e.target.value);
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        if (submit) {
            getMedia(setData, filter, filteredGenres);
            setSubmit(false);
        }
        setSubmit(true);
    }

    // Media Helpers
    // ******************************************************

    function handleMediaTypeChange(e: any) {
        setMediaType(e.target.value);
    }

    function getMedia(setData: (data: any[]) => void, filter: string, genres: string[] = []) {
        let result: string = "";
        if (mediaType === "movie") {
            result = dynamicGetMedia("Movie", setData, filter, genres);
        } else if (mediaType === "show") {
            result = dynamicGetMedia("TVShow", setData, filter, genres);
        }
        console.log(result);
    }

    return (
        <div className={`flex flex-col gap-3`}>
            <h1 className={``}>Media</h1>

            <div
                className={`lg:sticky top-0 flex flex-col gap-2 bg-slate-200 bg-opacity-50 py-4`}>

                <div className={`flex flex-col gap-2 px-3 sm:px-6 md:px-24 lg:px-48`}>
                    <SearchBar values={[filteredSearch]}
                               handlers={[handleMediaTypeChange, handleSearchChange, handleSubmit]}/>

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