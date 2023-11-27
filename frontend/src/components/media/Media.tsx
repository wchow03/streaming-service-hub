import {useEffect, useState} from "react";
import DynamicCreateTable from "../dynamic/DynamicCreateTable.tsx";
import {getMovies} from "./Movies.tsx";
import {getShows} from "./Shows.tsx";

export default function Media() {

    const [data, setData] = useState([] as string[]);
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");
    const [submit, setSubmit] = useState(false);
    const [mediaType, setMediaType] = useState("movie");
    const [searchFocus, setSearchFocus] = useState(false);
    const [seed, setSeed] = useState(0);

    // Seed for DynamicCreateTable
    // ******************************************************
    useEffect(() => {
        setSeed(seed + 1);
    }, [data]);

    // Initial fetch
    // ******************************************************
    useEffect(() => {
        getMedia(setData, filter);
    }, []);

    // Fetch on filter change
    // ******************************************************
    useEffect(() => {
        if (search !== "") {
            setFilter(`mediaName LIKE "%${search}%"`);
        } else {
            setFilter("");
        }

        if (submit) {
            getMedia(setData, filter);
            setSubmit(false);
        }
    }, [submit]);

    // Search Functionality
    // ******************************************************
    function handleSearchChange(e: any) {
        setSearch(e.target.value);
        // getMedia(setData, filter);
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        if (search !== "") {
            setFilter(`mediaName LIKE "%${search}%"`);
        } else {
            setFilter("");
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
        getMedia(setData, filter);
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

    return (
        <div className={`pb-10`}>
            <h1 className={`h1 text-white text-center`}>Media</h1>

            <form onSubmit={handleSubmit}
                  className={`flex flex-row items-stretch text-white px-5 justify-center w-full gap-1`}>

                <select
                    className={`rounded-l px-3 text-black outline ${searchFocus ? "outline-blue-500" : "outline-white"}`}
                    onChange={handleMediaTypeChange}
                    name="mediaType">
                    <option value="movie">Movies</option>
                    <option value="show">Shows</option>
                </select>

                <input
                    value={search}
                    className={`pl-3 text-black flex-grow outline focus:outline-blue-500 outline-white`}
                    type={`text`}
                    placeholder={`Search`}
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setSearchFocus(false)}
                    onChange={handleSearchChange}
                />

                <button
                    className={`px-2 py-2 rounded-r outline ${searchFocus ? "outline-blue-500" : "outline-white"}`}
                    type={`submit`}>
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </button>

            </form>


            <DynamicCreateTable key={seed} route={mediaType} data={data} className={`sm:px-6 md:px-24 lg:px-48`}/>

        </div>
    )
}