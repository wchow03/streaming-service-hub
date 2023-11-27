import {useState} from "react";

type SearchBarProps = {
    values: any[],
    handlers: any[]
}

export default function SearchBar({values, handlers}: SearchBarProps) {
    const [searchFocus, setSearchFocus] = useState(false);

    let search = values[0];
    let handleMediaTypeChange = handlers[0];
    let handleSearchChange = handlers[1];
    let handleSubmit = handlers[2];

    return (
        <form onSubmit={handleSubmit}
              className={`flex flex-row items-stretch text-white justify-center w-full gap-1`}>

            <select
                className={`rounded-l px-3 text-black bg-white border-r outline ${searchFocus ? "outline-blue-500" : "outline-white"}`}
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
                className={`px-2 py-2 rounded-r outline bg-blue-500 outline-blue-500`}
                type={`submit`}>
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </button>

        </form>
    )
}