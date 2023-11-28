type DeleteMediaFromListProps = {
    update: any,
    mediaID: number | undefined,
    listID: string | number | undefined,
    className?: string
}

export default function DeleteMediaFromList({update, mediaID, listID, className}: DeleteMediaFromListProps) {

    function handleSubmit(event: any) {
        event.preventDefault();

        if (!mediaID) {
            console.log(mediaID);
            return;
        }

        const body = {
            "mediaID": mediaID,
            "listID": listID
        };

        fetch("http://localhost:8080/api/AddToList/delete", {
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
            className={className}>
            <button
                disabled={mediaID === -1}
                className={`py-1 px-3 rounded text-white font-bold bg-red-600 hover:bg-red-800 transition-colors duration-300 w-full disabled:opacity-50 disabled:hover:bg-red-600`}>
                Delete Item
            </button>
        </form>
    )
}