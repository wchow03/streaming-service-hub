import {useEffect, useState} from "react";

type AddToWatchListProps = {
    mediaID: number
}

export default function AddToWatchList({mediaID}: AddToWatchListProps) {

    const userID = window.localStorage.getItem("UserID")!;


    // Handle Selecting Watchlist
    // ******************************************************
    const [listID, setListID] = useState(-1);
    const [listItems, setListItems] = useState([] as {
        listName: string,
        listID: number
    }[]);

    useEffect(() => {
        setListID(listItems[0]?.listID);
    }, [listItems]);

    function handleListChange(event: any) {
        setListID(event.target.value);
    }

    // Initial Fetch for Watchlist
    // ******************************************************

    useEffect(() => {
        getWatchList();
    }, []);

    function getWatchList() {
        const body =
            {
                WHERE: `userID = "${userID}"`,
                SELECT: "listName, listID"
            };

        fetch("http://localhost:8080/api/watchlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                setListItems(data);
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Handle Submitting to Watchlist
    // ******************************************************
    function handleSubmit(event: any) {
        event.preventDefault();

        const body = {
            "listID": listID,
            "mediaID": mediaID
        };

        fetch("http://localhost:8080/api/addtolist/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <form className={`flex flex-row`}
              onSubmit={handleSubmit}>

            <select
                className={`px-3 py-2 text-black bg-white rounded-l w-full`}
                onChange={handleListChange}>
                {
                    listItems.map((listItem, index) => {
                        return (
                            <option key={index} value={listItem.listID}>{listItem.listName}</option>
                        )
                    })
                }
            </select>
            <button
                disabled={listID === -1 || listID === undefined || mediaID === -1 || mediaID === undefined}
                className={` px-3 py-2 text-white font-bold bg-blue-500 rounded-r whitespace-nowrap hover:bg-blue-800 transition-colors duration-300 disabled:hover:bg-blue-500 disabled:opacity-50`}>
                Add to Watchlist
            </button>
        </form>

    )
}