import {useEffect, useState} from "react";
import {HomeUser} from "../home-page/HomePage";
import DynamicCreateTable from "../dynamic/DynamicCreateTable";
import AddWatchList from "./AddWatchList.tsx";
import DeleteWatchList from "./DeleteWatchList.tsx";
import ViewWatchList from "./ViewWatchList.tsx";
import UpdateWatchList from "./UpdateWatchList.tsx";

export default function WatchList() {
    const [homeUser, setHomeUser] = useState<HomeUser>();
    const [data, setData] = useState([]);
    const [watchListID, setWatchListID] = useState<number>();
    const [watchListName, setWatchListName] = useState<string>();

    const [active, setActive] = useState<number>(-1);

    useEffect(() => {
        const user = window.localStorage.getItem("User")!;
        const email = window.localStorage.getItem("Email")!;
        const id = window.localStorage.getItem("UserID")!;
        setHomeUser({"username": JSON.parse(user), "email": JSON.parse(email), "id": JSON.parse(id)});
    }, []);

    useEffect(() => {
        getWatchList();
    }, [homeUser]);


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

    function handleListItemClick(args: any, index: number) {
        console.log(args);
        if (active === index) {
            setActive(-1);
            setWatchListID(undefined);
            setWatchListName(undefined);
            return;
        } else {
            setActive(index);
            setWatchListID(args.listID);
            setWatchListName(args.listName);
            console.log(index);
        }
    }


    return (
        <div className={`px-3 sm:px-6 md:px-24 lg:px-48 flex flex-col justify-between `}>
            <div className={`flex flex-col gap-3`}>
                <h1 className={"h1 text-white text-center"}>Watch Lists</h1>
                <AddWatchList update={getWatchList}/>
                <DynamicCreateTable route={``} data={data} active={active}
                                    handleClick={handleListItemClick}/>
            </div>

            <div className={`flex flex-col gap-3 fixed bottom-0 left-0 w-full p-4 text-white`}>
                <DeleteWatchList update={getWatchList} watchListID={watchListID}/>
                <ViewWatchList watchListID={watchListID} watchListName={watchListName}/>
                <UpdateWatchList update={getWatchList} watchListID={watchListID} watchListName={watchListName}/>
            </div>

        </div>
    );
}