import {useEffect, useState} from "react";

type UpdateWatchListProps = {
    update: any,
    watchListID: number | undefined,
    watchListName: string | undefined
}

export default function UpdateWatchList({update, watchListID, watchListName}: UpdateWatchListProps) {

    // Initialize State
    // ******************************************************
    const [name, setName] = useState("");

    useEffect(() => {
        setName(watchListName!);
    }, [watchListName]);

    // Handle Input Change
    // ******************************************************
    function handleChange(event: any) {
        setName(event.target.value);
    }

    // Handle Form Submission
    // ******************************************************
    function handleSubmit(event: any) {
        event.preventDefault();

        if (!watchListID) {
            return;
        }

        const body = {
            "SET": {
                "listName": name,
            },
            "WHERE": {
                "listID": watchListID
            }
        };

        fetch("http://localhost:8080/api/watchlist/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                update();
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div
                className={`flex flex-row items-center w-full rounded-md focus-within:outline focus-within:outline-blue-500`}>
                <label
                    className={`bg-blue-500 text-white rounded-l-md py-1 px-3 border-r peer-focus:outline peer-focus:outline-blue-500`}>
                    Update Watchlist Name
                </label>
                <input
                    onChange={handleChange}
                    value={name}
                    placeholder={`Enter a name for your watchlist`}
                    className={`bg-white py-1 flex-grow peer px-1`}
                    type="text"/>
                <button
                    className={`bg-blue-500 text-white hover:bg-blue-800 transition-colors duration-300 px-4 py-1 rounded-r-md border-l peer-focus:outline peer-focus:outline-blue-500`}>
                    Update
                </button>
            </div>
        </form>
    )
}