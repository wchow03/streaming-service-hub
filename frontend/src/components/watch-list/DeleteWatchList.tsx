type DeleteWatchListProps = {
    update: any,
    watchListID: number | undefined
}

export default function DeleteWatchList({update, watchListID}: DeleteWatchListProps) {

    function handleSubmit(event: any) {
        event.preventDefault();

        if (!watchListID) {
            return;
        }

        const body = {
            "listID": watchListID
        };

        fetch("http://localhost:8080/api/watchlist/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                update();
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={``}>
            <button
                disabled={!watchListID}
                className={`py-1 px-3 rounded text-white font-bold bg-red-600 hover:bg-red-800 transition-colors duration-300 w-full disabled:opacity-50 disabled:hover:bg-red-600`}>
                Delete Watchlist
            </button>
        </form>
    )
}