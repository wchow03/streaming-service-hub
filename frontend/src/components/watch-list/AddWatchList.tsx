import {useState} from "react";
import Alert, {AlertType} from "../Alert.tsx";

type AddWatchListProps = {
    update: () => void;
    className?: string;
}

export default function AddWatchList({update}: AddWatchListProps) {

    const userID = window.localStorage.getItem("UserID")!;

    const [listName, setListName] = useState("");

    const [visible, setVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    const [type, setType] = useState(AlertType.Success);
    const [message, setMessage] = useState("");

    function handleListNameChange(event: any) {
        setListName(event.target.value);
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        createList(listName, userID, undefined, update, (result: any) => {
            if (result.error) {
                setType(AlertType.Error);
                setMessage("Error creating watchlist");
            } else {
                setType(AlertType.Success);
                setMessage("Successfully created watchlist");
            }
            setAlertVisible(true);
            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);
        });

        handleClose();
    }

    function handleClose() {
        setVisible(false);
        setListName("");
    }

    return (

        <>

            <Alert type={type} visible={alertVisible}>
                {message}
            </Alert>

            <button
                type={`button`}
                onClick={() => setVisible(true)}
                className={`shadow-2xl p-3 font-bold text-white bg-blue-500 rounded-full disabled:opacity-50 disabled:bg-blue-500 hover:bg-blue-800 transition-colors duration-300`}>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    viewBox="0 0 24 24"
                >
                    <title/>
                    <g
                        fill="none"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        data-name="add"
                    >
                        <path d="M12 19V5M5 12h14"/>
                    </g>
                </svg>
            </button>

            <div
                className={`${visible ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-screen w-screen backdrop-blur flex items-center justify-center " : "hidden"}`}>
                <form onSubmit={handleSubmit}
                      className={`p-10 rounded bg-white border-blue-500 focus-within:border-4`}>
                    <div
                        className={`flex flex-col gap-4 w-full rounded-md`}>
                        <label
                            className={`text-left text-black font-bold`}>
                            Create Watchlist
                        </label>
                        <input
                            value={listName}
                            placeholder={`Enter a name`}
                            required={true}
                            onChange={handleListNameChange}
                            className={`bg-white text-black py-1 flex-grow peer px-1 border rounded`}
                            type="text"/>
                        <div className={`flex flex-row gap-2`}>
                            <button
                                type={`submit`}
                                className={`bg-blue-500 text-white rounded w-full hover:bg-blue-800 transition-colors duration-300 px-4 py-1 peer-focus:outline peer-focus:outline-blue-500`}>
                                Add
                            </button>
                            <button
                                type={`button`}
                                onClick={() => handleClose()}
                                className={`bg-red-500 text-white rounded w-full hover:bg-red-800 transition-colors duration-300 px-4 py-1 peer-focus:outline peer-focus:outline-red-500`}>
                                Cancel
                            </button>
                        </div>

                    </div>
                </form>
            </div>

        </>


    )
}

export function createList(listName: string, userID: string, listID?: string, update?: any, callback?: any) {

    let result = {};

    type Body = {
        listName: string,
        userID: string,
        listID?: string
    }

    const body: Body = {
        "listName": listName,
        "userID": userID.replace(/"/g, "")
    };

    if (listID !== undefined) {
        body["listID"] = `${listID}`;
    }


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
            if (update !== undefined) {
                update();
            }
            result = {result: data};
        })
        .catch(error => {
            console.log(error);
            result = {error: error};
        })
        .finally(() => {
            if (callback) {
                callback(result);
            }
        });

}
