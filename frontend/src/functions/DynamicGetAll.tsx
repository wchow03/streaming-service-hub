import { useState, useEffect } from 'react';

export default function DynamicGetAll(route: string) {

    const [data, setData] = useState([]);

    const url: string = 'http://localhost:8080/api/' + route;

    useEffect(() => {
        fetch(url)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(data => setData(data))
            .catch(err => console.log("ERROR: " + err))
    }, [route]);

    return data;

}