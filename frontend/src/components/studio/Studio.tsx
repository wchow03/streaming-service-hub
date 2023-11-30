import {useEffect, useState} from "react";
import DynamicCreateTable from "../dynamic/DynamicCreateTable.tsx";

export default function Studio() {

    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({} as any);
    const userID = window.localStorage.getItem("UserID")!;

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

    function handleSubmit(event: any) {
        event.preventDefault();

        getAverageRatingOfStudiosAboveNRows(formData["numRows"], (result: any) => {
            if (result.result) {
                setData(result.result);
            } else {
                console.log("ERROR: " + result.error);
            }
        });
    }


    return (
        <div className={`text-white xs:px-3 sm:px-6 md:px-24 lg:px-48`}>

            <form onSubmit={handleSubmit}
                  className={`flex flex-col gap-2 bg-white p-2 rounded outline-blue-500 focus-within:outline`}>
                <label
                    className={`uppercase tracking-wide text-white text-xs font-bold bg-slate-600 p-2 rounded text-center`}
                    htmlFor="studioName">Search for the Average Rating of Media Produced by each studio with at least
                    the following amount of media</label>
                <input
                    required={true}

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

            <DynamicCreateTable data={data}/>

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