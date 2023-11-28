import {useNavigate} from "react-router-dom";

type ViewWatchListProps = {
    watchListID: number | undefined,
    watchListName: string | undefined
}

export default function ViewWatchList({watchListID, watchListName}: ViewWatchListProps) {

    const navigate = useNavigate();

    function handleSubmit(event: any) {
        event.preventDefault();

        if (!watchListID) {
            return;
        }

        navigate(`/watchlist/${watchListName}/${watchListID}`)
    }


    return (
        <button
            disabled={!watchListID}
            onClick={handleSubmit}
            className={`py-1 px-3 font-bold text-white bg-blue-500 w-full rounded disabled:opacity-50 disabled:bg-blue-500 hover:bg-blue-800 transition-colors duration-300`}>
            View Watchlist
        </button>
    )
}