import {useEffect, useState} from "react";
import DynamicCreateTable from "../dynamic/DynamicCreateTable.tsx";
import {getMovies} from "./Movies.tsx";
import {getShows} from "./Shows.tsx";
import SearchBar from "./SearchBar.tsx";
import Filters from "./Filters.tsx";


export default function Media() {

    const userID = window.localStorage.getItem("UserID")!;

    const [data, setData] = useState([] as string[]);
    const [search, setSearch] = useState("");
    const [submit, setSubmit] = useState(false);
    const [mediaType, setMediaType] = useState("movie");
    const [seed, setSeed] = useState(0);

    // Filters
    // ******************************************************
    const [filter, setFilter] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [serviceFilter, setServiceFilter] = useState("");
    const [studioFilter, setStudioFilter] = useState("");

    // Filtered Columns
    // ******************************************************
    const [headers, setHeaders] = useState([] as string[]);
    const [subscribed, setSubscribed] = useState([] as string[]);
    const [filteredStudios, setFilteredStudios] = useState([] as string[]);

    useEffect(() => {
        createServiceFilter(subscribed);
        createStudioFilter(filteredStudios);
    }, [subscribed, filteredStudios, searchFilter]);

    useEffect(() => {
        combineFilters();
    }, [serviceFilter, studioFilter, searchFilter]);

    useEffect(() => {
        getMedia(setData, filter);
    }, [filter]);

    function combineFilters() {
        let combinedFilter: string = "";

        const filters = [serviceFilter, studioFilter, searchFilter];

        filters.map((filter: string, index: number) => {
            const logic = index + 1 < filters.length ? " AND " : "";
            if (filter !== "") {
                combinedFilter = combinedFilter + filter + " AND ";
            }
        });

        setFilter(combinedFilter)
    }

    // Seed for DynamicCreateTable
    // ******************************************************
    useEffect(() => {
        setSeed(seed + 1);
    }, [data]);

    // Initial fetch
    // ******************************************************
    useEffect(() => {
        getMedia(setData, serviceFilter);
        getHeaders();
    }, [serviceFilter]);

    // Create service filter
    // ******************************************************
    useEffect(() => {
        fetch(`http://localhost:8080/api/home/subscribedServices/${userID}`)
            .then(response => response.json())
            .then(result => {
                const subscribedServices = result.map((service: any) => service.serviceName);
                console.log("Services: " + subscribedServices);
                setSubscribed(subscribedServices);
                return subscribedServices;
            })
            .then((result) => {
                createServiceFilter(result);
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
        console.log(tempFilter);
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
        console.log(tempFilter);
    }

    function createSearchFilter(search: string) {
        if (search !== "") {
            setSearchFilter(`mediaName LIKE "%${search}%"`);
        } else {
            setSearchFilter("");
        }
    }

    // Fetch on filter change
    // ******************************************************
    useEffect(() => {
        if (search !== "") {
            setFilter(`mediaName LIKE "%${search}%" AND (` + serviceFilter + `)`);
        } else {
            setFilter(serviceFilter);
        }

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

    function getHeaders(): string[] {
        let headers: string[] = data.map((item: any) => Object.keys(item)).flat();
        let noIDHeaders = headers.filter((item: string) => !item.toLowerCase().includes("id"));
        let uniqueHeaders: string[] = [...new Set(noIDHeaders)];
        setHeaders(uniqueHeaders);
        return uniqueHeaders;
    }

    return (
        <div className={`pb-10 sm:px-6 md:px-24 lg:px-48 flex flex-col gap-3`}>
            <h1 className={`h1 text-white text-center`}>Media</h1>


            <SearchBar values={[search]} handlers={[handleMediaTypeChange, handleSearchChange, handleSubmit]}/>

            <Filters
                headers={headers}
                setFilteredServices={setSubscribed}
                filteredServices={subscribed}
                setFilteredStudios={setFilteredStudios}
                filteredStudios={filteredStudios}
            />

            <DynamicCreateTable key={seed} route={mediaType} data={data}/>

        </div>
    )
}