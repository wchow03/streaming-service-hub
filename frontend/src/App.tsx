import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';


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
            <h1 className={`text-3xl font-bold text-white pb-10`}> Streaming Services </h1>

            <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}>
                <thead className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}>
                    <tr>
                        <th scope={`col`} className={`px-6 py-3`}>Name</th>
                        <th scope={`col`} className={`px-6 py-3`}>Headquarters</th>
                        <th scope={`col`} className={`px-6 py-3`}>Creation Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any, index) => (
                        <tr key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700`}>
                            <td scope={`row`} className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`}>{item.studioName}</td>
                            <td className={`px-6 py-4`}>{item.headquarter}</td>
                            <td className={`px-6 py-4`}>{item.creationDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
      )
}

export default App
