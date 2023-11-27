export function getMovies(setData: (data: any[]) => void, filter: string): string {
    let body = {};

    if (filter !== "") {
        body = {WHERE: filter};
    }

    fetch("http://localhost:8080/api/media/movies", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(response => response.json())
        .then(data => {
            setData(data);
            console.log("Successfully fetched " + data.length + " movies.");
        })
        .catch(error => {
            throw error;
        });

    return "movie";
}