import {useEffect} from "react";
// import {response} from "express";

export default function StreamingServices() {
    const userID = window.localStorage.getItem("UserID")!;

    useEffect(() => {
        const fetchSubscribedServices = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/home/subscribedServices/${userID}`);
                const result = await response.json();
                console.log(result);
            } catch (err) {
                console.error("Error fetching subscribed services");
            }
        };

        const fetchNonSubscribedServices = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/home/nonSubscribedServices/${userID}`);
                const result = await response.json();
                console.log(result);
            } catch (err) {
                console.error("Error fetching non subscribed services");
            }
        }

        fetchSubscribedServices();
        fetchNonSubscribedServices();
    }, []);

    const subscribedCards: any[] = [];
    // array of objects that contains title, href link,
    // iterate over array, create card and add to cards
    const cardInfos = [
        {
            name: "Netflix",
            route: "/Netflix"
        },
        {
            name: "Prime Video",
            route: "/Prime Video"
        },
        {
            name: "Disney Plus",
            route: "/Disney Plus"
        }
    ];

    cardInfos.forEach((info) => {
        subscribedCards.push(
            <div key={info.name} className={"card col-2 m-4 bg-dark border-white"}>
                <div className="card-body">
                    <h5 className="card-title text-center h5 text-white">{info.name}</h5>
                    <div className={"text-center"}>
                        <a href={info.route} className="btn btn-primary m-2">View</a>
                    </div>
                </div>
            </div>
        );
    })

    return (
        <>
            <div className={"container mt-5"}>
                <h1 className={"text-white h1"}>Subscribed</h1>
                <div className={"row p-3"}>
                    {
                        subscribedCards.map((card) => card)
                    }
                </div>
            </div>
            <div className={"container mt-5"}>
                <h1 className={"text-white h1"}>Not Subscribed</h1>
                <div className={"row p-3"}>
                    <div className={"card col-2 m-4 bg-dark border-white"}>
                        <div className="card-body">
                            <h5 className="card-title text-center h5 text-white">Crave TV</h5>
                            <div className={"text-center"}>
                                <button className={"btn btn-primary m-2"}>Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <div className={"card col-2 m-4 bg-dark border-white"}>
                        <div className="card-body">
                            <h5 className="card-title text-center h5 text-white">Max</h5>
                            <div className={"text-center"}>
                                <button className={"btn btn-primary m-2"}>Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}