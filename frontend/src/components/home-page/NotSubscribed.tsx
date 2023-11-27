import {useEffect, useState} from "react";

interface nonSubscribed {
    serviceName: string,
    tier: string,
    monthlyCost: number
}

export default function NotSubscribed({reset}: { reset: any }) {
    const userID = window.localStorage.getItem("UserID")!;
    const [nonSubscribed, setNonSubscribed] = useState<nonSubscribed[]>([]);
    const nonSubscribedCards: any[] = [];

    useEffect(() => {
        const fetchNonSubscribedServices = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/home/nonSubscribedServices/${userID}`);
                const result = await response.json();
                setNonSubscribed(result);
                console.log(result);
            } catch (err) {
                console.error("Error fetching non subscribed services");
            }
        }

        fetchNonSubscribedServices();
    }, []);

    for (let i = 0; i < nonSubscribed.length; i += 2) {
        nonSubscribedCards.push(
            <div key={nonSubscribed[i].serviceName}
                 className={"flex sm:flex-row md:flex-col gap-4 outline outline-1 outline-white p-3 rounded w-full md:w-1/3"}>
                <h5 className="text-center h5 text-white">{nonSubscribed[i].serviceName}</h5>
                <div className={"text-center w-full"}>
                    <div className={"flex flex-col gap-3 text-white w-full"}>
                        <div className={"flex flex-col gap-2 w-full flex-grow"}>
                            <div className={`flex flex-row gap-2 content-center`}>
                                <h5>{nonSubscribed[i].tier}</h5>
                                <h5 className={`font-thin`}>| ${nonSubscribed[i].monthlyCost}/month</h5>
                            </div>
                            <button
                                onClick={() => handleSubmit(userID, nonSubscribed[i].serviceName, nonSubscribed[i].tier, reset)}
                                className={"text-center w-full py-2 rounded text-white bg-blue-600 hover:bg-blue-900 transition-colors duration-300"}>
                                Subscribe
                            </button>
                        </div>
                        <div className={"flex flex-col gap-2 w-full flex-grow"}>
                            <div className={`flex xs:flex-col md:flex-row gap-2 content-center`}>
                                <h5>{nonSubscribed[i + 1].tier}</h5>
                                <h5 className={`font-thin`}>| ${nonSubscribed[i + 1].monthlyCost}/month</h5>
                            </div>
                            <button
                                onClick={() => handleSubmit(userID, nonSubscribed[i + 1].serviceName, nonSubscribed[i + 1].tier, reset)}
                                className={"text-center w-full py-2 rounded text-white bg-blue-600 hover:bg-blue-900 transition-colors duration-300"}>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={"px-6 md:px-24 lg:px-48"}>
            {
                nonSubscribed.length !== 0 &&
                <h1 className={"text-white h1"}>Available Services</h1>

            }
            <div className={"row p-3"}>
                {
                    nonSubscribedCards.map((card) => card)
                }
            </div>
        </div>
    );
}

async function handleSubmit(id: string, serviceName: string, tier: string, reset: any) {
    const data = {userID: id, serviceName: serviceName, tier: tier}

    await fetch(`http://localhost:8080/api/home/subscribe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    reset();
}