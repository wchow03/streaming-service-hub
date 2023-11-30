import {useEffect, useState} from "react";
import {HomeUser} from "../home-page/HomePage.tsx";
import {useParams} from "react-router-dom";
import DynamicCreateTable from "../dynamic/DynamicCreateTable.tsx";
import DeleteMediaFromList from "./DeleteMediaFromList.tsx";
import FilterGroup from "../media/filters/FilterGroup.tsx";

export default function WatchListMedia() {
    const [homeUser, setHomeUser] = useState<HomeUser>();
    const [data, setData] = useState([]);
    const {watchlistName, watchlistID} = useParams();
    const [headers, setHeaders] = useState([] as string[]);
    const [filteredHeaders, setFilteredHeaders] = useState([] as string[]);
    const [visible, setVisible] = useState("");

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

        const apiUrl = `http://localhost:8080/api/watchlist/${watchlistID}`;

        const params = {
            columns: filteredHeaders.join(",")
        }

        // Build the URL with query parameters
        const urlWithParams = new URL(apiUrl);
        Object.keys(params).forEach(key => urlWithParams.searchParams.append(key, params[key as keyof typeof params]));

        // console.log(urlWithParams);

        fetch(urlWithParams)
            .then(response => response.json())
            .then(data => {
                setData(data.result);
                getHeaders(data.info);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function getHeaders(info: any[]): string[] {
        let headers: string[] = [];

        info.forEach((item: any) => {
            let header = item.COLUMN_NAME;
            if (!header.includes("ID")) {
                headers.push(header);
            }
        });
        setHeaders(headers);
        return headers;
    }

    useEffect(() => {
        getWatchListItems();
    }, [filteredHeaders]);

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
        <div className={`flex flex-col gap-5 pb-10 sm:px-6 md:px-24 lg:px-48`}>
            <h1 className={`h1 text-white text-center`}>{watchlistName}</h1>

            <FilterGroup
                label={`Select Columns`}
                complete={headers}
                filtered={filteredHeaders}
                setFiltered={setFilteredHeaders}
                visible={visible}
                setVisible={setVisible}
                className={`text-black text-center w-full whitespace-nowrap bg-white bg-opacity-80 rounded p-1`}
            />

            <DynamicCreateTable
                route={``}
                data={data}
                handleClick={handleListItemClick}
                active={active}
            />

            <DeleteMediaFromList
                update={getWatchListItems}
                mediaID={mediaID}
                listID={watchlistID}
                className={`fixed bottom-6 right-6 grid text-white justify-items-end`}
            />
        </div>
    );
}