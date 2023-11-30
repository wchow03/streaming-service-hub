import {useNavigate} from "react-router-dom";

type ViewWatchListProps = {
    watchListID: number | undefined,
    watchListName: string | undefined,
    className?: string
}

export default function ViewWatchList({watchListID, watchListName, className}: ViewWatchListProps) {

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
            className={`${className} p-3 font-bold text-white bg-blue-500 rounded-full disabled:opacity-50 disabled:bg-blue-500 hover:bg-blue-800 transition-colors duration-300`}>
            <svg
                className={`scale-100`}
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M9 6a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V6ZM7 6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V6ZM9 16a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-2Zm-2 0a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2Z"
                    clipRule="evenodd"
                />
                <path
                    fill="#fff"
                    d="M11 7a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1ZM11 17a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1Z"
                />
            </svg>
        </button>
    )
}