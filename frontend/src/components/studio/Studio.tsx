import {useEffect, useState} from "react";
import DynamicCreateTable from "../dynamic/DynamicCreateTable.tsx";
import {useNavigate} from "react-router-dom";
import Alert, {AlertType} from "../Alert.tsx";

export default function Studio() {

    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({} as any);
    const userID = window.localStorage.getItem("UserID")!;

    const navigate = useNavigate();

    // Alert State
    // ******************************************************
    const [alertVisible, setAlertVisible] = useState(false);
    const [type, setType] = useState(AlertType.Success);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setFormData({
            "userID": userID
        })
        getStudiosHelper();

    }, []);

    function getStudiosHelper() {
        getStudios(undefined, (result: any) => {
            if (result.result) {
                setData(result.result);
            } else {
                console.log(result.error);
            }
        });
    }

    function handleNumRowsChange(event: any) {
        setFormData({...formData, "numRows": event?.target.value});
    }

    function handleMinRatingChange(event: any) {
        setFormData({...formData, "minRating": event?.target.value});
    }

    function handleSubmitNumRows(event: any) {
        event.preventDefault();

        getAverageRatingOfStudiosAboveNRows(formData["numRows"], (result: any) => {
            if (result.result) {
                setData(result.result);
                setType(AlertType.Success);
                setMessage(`Successfully retrieved studios with at least ${formData["numRows"]} media`);
            } else {
                console.log("ERROR: " + result.error);
                setType(AlertType.Error);
                setMessage(`Error retrieving studios with at least ${formData["numRows"]} media: ${result["error"]}`);
            }

            setAlertVisible(true);
            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);
        });
    }

    function handleSubmitMinRating(event: any) {
        event.preventDefault();

        getMinRatingOfStudiosAboveNRating(formData["minRating"], (result: any) => {
            if (result.result) {
                setData(result.result);
                setType(AlertType.Success);
                setMessage(`Successfully retrieved studios with a minimum average rating of ${formData["minRating"]}`);
            } else {
                console.log("ERROR: " + result.error);
                setType(AlertType.Error);
                setMessage(`Error retrieving studios with a minimum average rating of ${formData["minRating"]}: ${result["error"]}`);
            }

            setAlertVisible(true);
            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);

        });
    }

    function handleStudioClick(args: any, index: number) {
        console.log(index);
        navigate(`/studio/${args.studioName}`);
    }


    return (
        <div className={`text-white xs:px-3 sm:px-6 md:px-24 lg:px-48`}>

            <Alert type={type} visible={alertVisible}> {message}  </Alert>

            <div className={`flex flex-col md:flex-row gap-3`}>
                <form onSubmit={handleSubmitNumRows}
                      className={`flex flex-col gap-2 bg-white p-2 rounded outline-blue-500 focus-within:outline`}>
                    <label
                        className={`uppercase tracking-wide text-white text-xs font-bold bg-slate-600 p-2 rounded text-center`}
                        htmlFor="studioName">Search for the Average Rating of Media Produced by each studio with at
                        least
                        the following amount of media</label>
                    <input
                        required={true}
                        placeholder={`Minimum Number of Media Produced`}
                        className={`text-black px-2 py-1 rounded border border-black`}
                        value={formData["numRows"]}
                        onChange={handleNumRowsChange}
                        type="number"
                        id="studioName"
                        name="studioName"/>
                    <input
                        className={`bg-blue-500 hover:bg-blue-800 transition-colors duration-300 text-white font-bold py-2 px-4 rounded`}
                        type="submit" value="Submit"/>
                    <button
                        className={`bg-red-500 hover:bg-red-800 transition-colors duration-300 text-white font-bold py-2 px-4 rounded`}
                        type={`button`}
                        onClick={getStudiosHelper}>
                        Clear
                    </button>

                </form>

                <form onSubmit={handleSubmitMinRating}
                      className={`flex flex-col gap-2 bg-white p-2 rounded outline-blue-500 focus-within:outline`}>
                    <label
                        className={`uppercase tracking-wide text-white text-xs font-bold bg-slate-600 p-2 rounded text-center`}
                        htmlFor="studioName">Search for the minimum rating of a media produced by each studio with at
                        least
                        the following minimum rating</label>
                    <input
                        required={true}

                        className={`text-black px-2 py-1 rounded border border-black`}
                        value={formData["minRating"]}
                        placeholder={`Minimum Rating`}
                        onChange={handleMinRatingChange}
                        type="number"
                        id="studioName"
                        name="studioName"/>
                    <input
                        className={`bg-blue-500 hover:bg-blue-800 transition-colors duration-300 text-white font-bold py-2 px-4 rounded`}
                        type="submit" value="Submit"/>
                    <button
                        className={`bg-red-500 hover:bg-red-800 transition-colors duration-300 text-white font-bold py-2 px-4 rounded`}
                        type={`button`}
                        onClick={getStudiosHelper}>
                        Clear
                    </button>

                </form>
            </div>


            <DynamicCreateTable data={data} handleClick={handleStudioClick}/>

        </div>
    )
}

function getStudios(update?: any, callback?: any) {

    let result: object = {};

    fetch(`http://localhost:8080/api/studio`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            result = {result: data};

            if (data.error) {
                result = {error: data.error};
                return;
            }

            if (update) {
                update();
            }
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

function getAverageRatingOfStudiosAboveNRows(n: number, callback?: any) {

    let result: object = {};

    fetch(`http://localhost:8080/api/media/nestedAggregateGroupBy/${n}`)
        .then(response => response.json())
        .then(data => {
            result = {result: data};

            if (data.error) {
                result = {error: data.error};
                return;
            }
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

function getMinRatingOfStudiosAboveNRating(n: number, callback?: any) {

    console.log(n);
    let result: object = {};

    fetch(`http://localhost:8080/api/media/aggregationWithHaving/${n}`)
        .then(response => response.json())
        .then(data => {
            result = {result: data};

            if (data.error) {
                result = {error: data.error};
                return;
            }
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