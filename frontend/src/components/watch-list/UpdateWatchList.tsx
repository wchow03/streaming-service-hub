import {useEffect, useState} from "react";
import Alert, {AlertType} from "../Alert.tsx";

type UpdateWatchListProps = {
    update: any,
    watchListID: number | undefined,
    watchListName: string | undefined
}

export default function UpdateWatchList({update, watchListID, watchListName}: UpdateWatchListProps) {

    // Alert State
    // ******************************************************
    const [alertVisible, setAlertVisible] = useState(false);
    const [type, setType] = useState(AlertType.Success);
    const [message, setMessage] = useState("");

    // Initialize State
    // ******************************************************
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setName(watchListName!);
    }, [watchListName]);

    // Handle Input Change
    // ******************************************************
    function handleChange(event: any) {
        setName(event.target.value);
    }

    function handleClose() {
        setVisible(false);
        setName("");
    }

    // Handle Form Submission
    // ******************************************************
    function handleSubmit(event: any) {
        event.preventDefault();

        if (!watchListID) {
            return;
        }

        updateWatchlist(name, watchListID.toString(), update, (result: any) => {
            if (result.error) {
                setType(AlertType.Error);
                setMessage("Error updating watchlist");
            } else {
                setType(AlertType.Success);
                setMessage("Successfully updated watchlist");
            }
            setAlertVisible(true);
            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);
        });

        handleClose();
    }

    return (

        <>

            <Alert type={type} visible={alertVisible}>
                {message}
            </Alert>

            <button
                onClick={() => setVisible(true)}
                disabled={watchListID === -1 || watchListID === undefined}
                className={`shadow-2xl p-3 font-bold text-white bg-blue-500 rounded-full disabled:opacity-50 disabled:bg-blue-500 hover:bg-blue-800 transition-colors duration-300`}>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="m21.28 6.4-9.54 9.54c-.95.95-3.77 1.39-4.4.76-.63-.63-.2-3.45.75-4.4l9.55-9.55a2.58 2.58 0 1 1 3.64 3.65v0Z"
                    />
                    <path
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M11 4H6a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h11c2.21 0 3-1.8 3-4v-5"
                    />
                </svg>
            </button>

            <div
                className={`${visible ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-screen w-screen backdrop-blur flex items-center justify-center " : "hidden"}`}>
                <form
                    className={`p-10 rounded bg-white border-blue-500 focus-within:border-4`}
                    onSubmit={handleSubmit}>
                    <div
                        className={`flex flex-col gap-3 w-full md:rounded-md`}>
                        <label
                            className={`text-left text-black font-bold`}>
                            Update Watchlist Name
                        </label>
                        <input
                            required={true}
                            disabled={watchListID === -1 || watchListID === undefined}
                            onChange={handleChange}
                            value={watchListName ? name : ""}
                            placeholder={`Enter a new name`}
                            className={`bg-white text-black py-1 flex-grow peer px-1 border rounded`}
                            type="text"/>

                        <div className={`flex flex-row gap-2`}>
                            <button
                                disabled={watchListID === -1 || watchListID === undefined}
                                className={`bg-blue-500 text-white rounded w-full hover:bg-blue-800 transition-colors duration-300 px-4 py-1`}>
                                Update
                            </button>
                            <button
                                type={`button`}
                                onClick={() => handleClose()}
                                className={`bg-red-500 text-white rounded w-full hover:bg-red-800 transition-colors duration-300 px-4 py-1`}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </>

    )
}

export function updateWatchlist(name: string, watchListID: string, update?: any, callback?: any) {
    const body = {
        "SET": {
            "listName": name,
        },
        "WHERE": {
            "listID": watchListID
        }
    };

    let result = {};

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
            result = data;
            update();
        })
        .catch(error => {
            console.log(error);
            result = error;
        })
        .finally(() => {
            callback(result);
        });
}