import {useEffect, useState} from "react";
import {HomeUser} from "../HomePage";
import DynamicCreateTable from "../dynamic/DynamicCreateTable";
import {useNavigate} from "react-router-dom";

export default function WatchList() {
    const [homeUser, setHomeUser] = useState<HomeUser>();
    const [data, setData] = useState([]);
    const [watchListID, setWatchListID] = useState<number>();
    const [watchListName, setWatchListName] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        const user = window.localStorage.getItem("User")!;
        const email = window.localStorage.getItem("Email")!;
        const id = window.localStorage.getItem("UserID")!;
        setHomeUser({"username": JSON.parse(user), "email": JSON.parse(email), "id": JSON.parse(id)});
    }, []);

    useEffect(() => {
        getWatchList();
    }, [homeUser]);

    useEffect(() => {
        if (watchListID) {
            navigate(`/watchlist/${watchListName}/${watchListID}`)
        }
    }, [watchListID]);

    function getWatchList() {
        const body = {WHERE: `userID = "${homeUser?.id}"`};

        fetch("http://localhost:8080/api/watchlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function handleViewWatchList(args: any) {
        console.log(args);
        setWatchListID(args.listID);
        setWatchListName(args.listName);
    }


    return (
        <>
            <h1 className={"h1 text-white text-center"}>Watch Lists</h1>
            <DynamicCreateTable route={`Watch Lists`} data={data} className={`sm:px-6 md:px-24 lg:px-48`}
                                handleClick={handleViewWatchList}/>
        </>
    );
}