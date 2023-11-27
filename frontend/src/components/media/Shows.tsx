export function getShows(setData: (data: any[]) => void, filter: string): string {
    let body = {};
    console.log("Filter: " + filter)
    if (filter !== "") {
        body = {WHERE: filter};
    }

    fetch("http://localhost:8080/api/media/shows", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(response => response.json())
        .then(data => {
            setData(data);
            console.log("Successfully fetched " + data.length + " shows.");
        })
        .catch(error => {
            throw error;
        });

    return "show";
}