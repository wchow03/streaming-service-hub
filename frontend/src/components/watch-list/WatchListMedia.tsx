import {useEffect, useState} from "react";
import {HomeUser} from "../home-page/HomePage.tsx";
import {useParams} from "react-router-dom";
import DynamicCreateTable from "../dynamic/DynamicCreateTable.tsx";
import DeleteMediaFromList from "./DeleteMediaFromList.tsx";

export default function WatchListMedia() {
    const [homeUser, setHomeUser] = useState<HomeUser>();
    const [data, setData] = useState([]);
    const {watchlistName, watchlistID} = useParams();

    useEffect(() => {
        const user = window.localStorage.getItem("User")!;
        const email = window.localStorage.getItem("Email")!;
        const id = window.localStorage.getItem("UserID")!;
        setHomeUser({"username": JSON.parse(user), "email": JSON.parse(email), "id": JSON.parse(id)});
    }, []);

    useEffect(() => {
        console.log("ListID: " + watchlistID);
        if (watchlistID) {
            getWatchListItems();
        }
    }, [homeUser]);

    function getWatchListItems() {

        fetch(`http://localhost:8080/api/watchlist/${watchlistID}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const [active, setActive] = useState(-1);
    const [mediaID, setMediaID] = useState(-1);

    function handleListItemClick(args: any, index: number) {
        console.log(args);
        if (active === index) {
            setActive(-1);
            setMediaID(-1);
            return;
        } else {
            setActive(index);
            setMediaID(args.mediaID);
            console.log(args.mediaID);
        }
    }


    return (
        <div className={`flex flex-col gap-5 pb-10`}>
            <h1 className={`h1 text-white text-center`}>{watchlistName}</h1>

            <DynamicCreateTable
                route={``}
                data={data}
                className={`sm:px-6 md:px-24 lg:px-48`}
                handleClick={handleListItemClick}
                active={active}
            />

            <DeleteMediaFromList
                className={`sm:px-6 md:px-24 lg:px-48`}
                update={getWatchListItems}
                mediaID={mediaID}
                listID={watchlistID}/>
        </div>
    );
}