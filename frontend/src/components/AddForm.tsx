import {useState} from "react";

export default function AddForm({route, data}: { route: string, data: any }) {

    const [formData, setFormData] = useState({});

    let headers: string[] = data.map((item: any) => Object.keys(item)).flat();
    let uniqueHeaders: string[] = [...new Set(headers)];

    function handleSubmit(e: any) {
        let url: string = 'http://localhost:8080/api/' + route + '/add';
        let body: string = JSON.stringify(formData);
        const options =
            {
                method: 'POST',
                headers:
                    {
                        Accept: "application/json",
                        'Content-Type': 'application/json'
                    },
                body: body
            };

        console.log(body);
        
        e.preventDefault();

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                // Handle response from the server
                console.log(data);
            })
            .catch(error => {
                // Handle error
                console.error('ERROR:', error);
            });
    }

    function handleChange(e: any) {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <>
            <h2 className={`text-xl font-bold text-white uppercase`}> Add Item </h2>

            <form onSubmit={handleSubmit}
                  className={`flex flex-col gap-3 text-white`}>

                {
                    uniqueHeaders.map((item: any, index: number) => (
                        <div key={index} className={`flex flex-col gap-2`}>

                            <label
                                className={`uppercase`}
                                htmlFor={item}>
                                {item.replace(/([a-z])([A-Z])/g, '$1 $2')}
                            </label>

                            <input
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                type={`text`}
                                name={item}
                                onChange={handleChange}
                            />

                        </div>
                    ))

                }

                <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                    type="submit">
                    Submit
                </button>
            </form>

        </>

    )
}