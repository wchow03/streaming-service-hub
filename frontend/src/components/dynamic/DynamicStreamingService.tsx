import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DynamicCreateTable from "./DynamicCreateTable";

export default function DynamicStreamingService() {

    const {serviceName} = useParams();


    const [data, setData] = useState([] as any[]);

    useEffect(() => {
        getStreamingServiceData();
    }, []);

    function getStreamingServiceData() {
        const body = {WHERE: `serviceName = "${serviceName}"`};

        fetch(`http://localhost:8080/api/media`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            {
                serviceName && data.length > 0 ?
                    <>
                        <h1 className={"h1 text-white text-center py-10"}>{serviceName}</h1>
                        <DynamicCreateTable
                            route={serviceName as string}
                            data={data}
                            className={`sm:px-6 md:px-24 lg:px-48`}/>
                    </>
                    :
                    <div
                        className={`w-full h-screen overflow-y-hidden flex flex-col justify-center items-center gap-5`}>
                        <h1 className={"h1 uppercase text-slate-200 text-center"}>Page Not Found</h1>
                        <Link to={'/home'}
                              className={"text-md text-white text-center py-2 outline outline-slate-600 w-1/3 rounded hover:opacity-70"}>Go
                            Home</Link>
                    </div>
            }
        </>

    );
}