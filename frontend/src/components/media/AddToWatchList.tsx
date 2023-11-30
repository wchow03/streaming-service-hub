import {useEffect, useState} from "react";
import {createList} from "../watch-list/AddWatchList.tsx";
import Alert, {AlertType} from "../Alert.tsx";

type AddToWatchListProps = {
    mediaID: number
}

export default function AddToWatchList({mediaID}: AddToWatchListProps) {

    const userID = window.localStorage.getItem("UserID")!;

    // Alert State
    // ******************************************************
    const [alertVisible, setAlertVisible] = useState(false);
    const [type, setType] = useState(AlertType.Success);
    const [message, setMessage] = useState("");

    // Handle Selecting Watchlist
    // ******************************************************
    const [listID, setListID] = useState("");
    const [listItems, setListItems] = useState([] as {
        listName: string,
        listID: string
    }[]);
    const [newListName, setNewListName] = useState("");

    useEffect(() => {
        setListID(listItems[0]?.listID);
    }, [listItems]);

    function handleListChange(event: any) {
        setListID(event.target.value);
    }

    function handleNewListChange(event: any) {
        setNewListName(event.target.value);
    }

    // Initial Fetch for Watchlist
    // ******************************************************

    useEffect(() => {
        getWatchList();
    }, []);

    function getWatchList() {
        const body =
            {
                WHERE: `userID = ${userID}`,
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
                setListItems([...data, {listName: "Create List", listID: "CREATE_LIST"}]);
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

        let ID: string = "";
        if (listID === "CREATE_LIST") {
            ID = crypto.randomUUID();
            createList(newListName, userID, ID, getWatchList, undefined);
            setListID(ID);
            console.log(ID);
        }


        addMediaToWatchlist(mediaID.toString(), listID, ID, (result: any) => {
            if (result.error) {
                setType(AlertType.Warning);
                setMessage("Media is already in watchlist!");
                setAlertVisible(true);
            } else {
                setType(AlertType.Success);
                setMessage("Successfully added to watchlist!");
                setAlertVisible(true);
            }
            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);
        });

    }


    return (
        <>
            <Alert type={type} visible={alertVisible}>
                {message}
            </Alert>

            <form className={`flex flex-row divide-x-2`}
                  onSubmit={handleSubmit}>

                <label
                    className={`${listID !== "CREATE_LIST" && "hidden"} flex flex-row justify-between items-center gap-2 whitespace-nowrap text-center bg-blue-500 rounded-l text-white font-bold`}>
                    <p className={`px-2`}>Create new list </p>
                    <input className={`h-full text-black px-2`} value={newListName} onChange={handleNewListChange}/>
                </label>

                <select
                    className={`${listID !== "CREATE_LIST" && "rounded-l"} px-3 py-2 text-black bg-white w-full`}
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
                    disabled={listID === "" || listID === undefined || mediaID === -1 || mediaID === undefined}
                    className={`px-3 py-2 text-white font-bold bg-blue-500 rounded-r whitespace-nowrap hover:bg-blue-800 transition-colors duration-300 disabled:hover:bg-blue-500 disabled:opacity-50`}>
                    Add to Watchlist
                </button>
            </form>
        </>


    )
}

export function addMediaToWatchlist(mediaID: string, listID: string | undefined, ID?: string, callback?: any) {

    let result = {};

    if (listID === undefined || listID === "") {
        return;
    }

    if (mediaID === undefined || mediaID === "") {
        return;
    }

    const body = {
        "listID": listID,
        "mediaID": mediaID,
    };

    if (ID !== undefined && ID !== "") {
        body["listID"] = ID;
    }

    fetch("http://localhost:8080/api/addtolist/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                result = {error: data.error};
                console.error(data.error);
                return;
            }
            result = {result: data};
        })
        .catch(error => {
            result = {error: error};
        })
        .finally(() => {
            if (callback) {
                callback(result);
            }
        });
}