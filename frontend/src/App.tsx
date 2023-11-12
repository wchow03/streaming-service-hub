import { useState, useEffect } from 'react'


function App() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/studio')
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(data => setData(data))
            .catch(err => console.log("ERROR: " + err))
    }, [])

    return (
        <div className={`px-[10%] py-10`}>
            <h1 className={`text-lg`}> Streaming Services </h1>

            <table className={`table-auto`}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Headquarters</th>
                        <th>Creation Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any, index) => (
                        <tr key={index}>
                            <td>{item.studioName}</td>
                            <td>{item.headquarter}</td>
                            <td>{item.creationDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
      )
}

export default App
