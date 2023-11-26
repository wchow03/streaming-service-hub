import {useEffect, useState} from "react";

interface nonSubscribed {
    serviceName: string,
    tier: string,
    monthlyCost: number
}

export default function NotSubscribed() {
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

    for (let i = 0; i < nonSubscribed.length; i+=2) {
        nonSubscribedCards.push(
            <div key={nonSubscribed[i].serviceName} className={"card col-3 m-4 bg-dark border-white"}>
                <div className="card-body">
                    <h5 className="card-title text-center h5 text-white">{nonSubscribed[i].serviceName}</h5>
                    <div className={"text-center"}>
                        <div className={"row text-white"}>
                            <div className={"col-6"}>
                                <h5>{nonSubscribed[i].tier}</h5>
                                <h5>${nonSubscribed[i].monthlyCost}/month</h5>
                                <button onClick={() => handleSubmit(userID, nonSubscribed[i].serviceName, nonSubscribed[i].tier)} className={"btn btn-primary mt-2"}>Subscribe</button>
                            </div>
                            <div className={"col-6"}>
                                <h5>{nonSubscribed[i+1].tier}</h5>
                                <h5>${nonSubscribed[i+1].monthlyCost}/month</h5>
                                <button onClick={() => handleSubmit(userID, nonSubscribed[i+1].serviceName, nonSubscribed[i+1].tier)} className={"btn btn-primary mt-2"}>Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={"container mt-5"}>
            <h1 className={"text-white h1"}>Not Subscribed</h1>
            <div className={"row p-3"}>
                {
                    nonSubscribedCards.map((card) => card)
                }
            </div>
        </div>
    );
}

async function handleSubmit(id: string, serviceName: string, tier: string) {
    const data = {userID: id, serviceName: serviceName, tier: tier}

    await fetch(`http://localhost:8080/api/home/subscribe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    window.location.reload();
}