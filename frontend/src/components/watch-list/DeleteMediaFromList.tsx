import Alert, {AlertType} from "../Alert.tsx";
import {useState} from "react";

type DeleteMediaFromListProps = {
    update: any,
    mediaID: number | undefined,
    listID: string | number | undefined,
    className?: string
}

export default function DeleteMediaFromList({update, mediaID, listID, className}: DeleteMediaFromListProps) {

    const [visible, setVisible] = useState(false);

    // Alert State
    // ******************************************************
    const [alertVisible, setAlertVisible] = useState(false);
    const [type, setType] = useState(AlertType.Success);
    const [message, setMessage] = useState("");

    function handleClose() {
        setVisible(false);
    }


    function handleSubmit(event: any) {
        event.preventDefault();

        if (!mediaID) {
            console.log(mediaID);
            return;
        }

        if (!listID) {
            console.log(listID);
            return;
        }

        function callback(result: any) {
            console.log(result);

            if (result.error) {
                setType(AlertType.Error);
                setMessage("Error deleting media form watchlist");
            } else {
                setType(AlertType.Success);
                setMessage("Successfully deleted media from watchlist");
            }
            setAlertVisible(true);
            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);

        }

        deleteMediaFromList(mediaID.toString(), listID.toString(), update, callback);
    }

    return (

        <>

            <Alert type={type} visible={alertVisible}>
                {message}
            </Alert>

            <button
                disabled={!mediaID}
                onClick={() => setVisible(true)}
                className={`${className} shadow-2xl p-3 font-bold text-white bg-red-500 rounded-full disabled:opacity-50 disabled:bg-red-500 hover:bg-red-800 transition-colors duration-300`}>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    viewBox="0 -0.5 21 21"
                >
                    <title>{"delete [#1487]"}</title>
                    <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M7.35 16h2.1V8h-2.1v8Zm4.2 0h2.1V8h-2.1v8Zm-6.3 2h10.5V6H5.25v12Zm2.1-14h6.3V2h-6.3v2Zm8.4 0V0H5.25v4H0v2h3.15v14h14.7V6H21V4h-5.25Z"
                    />
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
                            Delete Watchlist
                        </label>
                        <div className={`flex flex-row gap-2`}>
                            <button
                                disabled={!mediaID}
                                className={`bg-red-500 text-white rounded w-full hover:bg-red-800 transition-colors duration-300 px-4 py-1`}>
                                Delete
                            </button>
                            <button
                                type={`button`}
                                onClick={() => handleClose()}
                                className={`bg-blue-500 text-white rounded w-full hover:bg-blue-800 transition-colors duration-300 px-4 py-1`}>
                                Cancel
                            </button>
                        </div>

                    </div>
                </form>
            </div>


        </>
        // <form
        //     onSubmit={handleSubmit}
        //     className={className}>
        //     <button
        //         disabled={mediaID === -1}
        //         className={`py-1 px-3 rounded text-white font-bold bg-red-600 hover:bg-red-800 transition-colors duration-300 w-full disabled:opacity-50 disabled:hover:bg-red-600`}>
        //         Delete Item
        //     </button>
        // </form>
    )
}

export function deleteMediaFromList(mediaID: string, listID: string, update?: any, callback?: any) {
    const body = {
        "mediaID": mediaID,
        "listID": listID
    };

    let result = {};

    fetch("http://localhost:8080/api/AddToList/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            result = {result: data};
            if (update) {
                update();
            }
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