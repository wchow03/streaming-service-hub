export function dynamicGetMedia(type: string, setData: (data: any[]) => void, filter: string, genre: string[]): string {
    let body = {};

    if (filter !== "") {
        body = {WHERE: filter, GENRE: genre};
    }

    fetch(`http://localhost:8080/api/media/${type}`, {
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

    return type;
}