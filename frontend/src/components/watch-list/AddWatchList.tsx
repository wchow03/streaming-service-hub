import {useState} from "react";

type AddWatchListProps = {
    update: () => void;
}

export default function AddWatchList({update}: AddWatchListProps) {

    const userID = window.localStorage.getItem("UserID")!;

    const [listName, setListName] = useState("");

    function handleListNameChange(event: any) {
        setListName(event.target.value);
    }

    function handleSubmit(event: any) {
        event.preventDefault();

        const body = {
            "listName": listName,
            "userID": userID
        };

        fetch("http://localhost:8080/api/watchlist/add", {
            method: "POST",
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
                    Create Watchlist
                </label>
                <input
                    value={listName}
                    placeholder={`Enter a name for your watchlist`}
                    onChange={handleListNameChange}
                    className={`bg-white py-1 flex-grow peer px-1`}
                    type="text"/>
                <button
                    className={`bg-blue-500 text-white hover:bg-blue-800 transition-colors duration-300 px-4 py-1 rounded-r-md border-l peer-focus:outline peer-focus:outline-blue-500`}>
                    Add
                </button>
            </div>
        </form>

    )
}