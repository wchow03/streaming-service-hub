import {useEffect, useState} from "react";
import {Button, Modal} from "antd";

interface subscribed {
    serviceName: string,
    tier: string
}

export default function Subscribed() {
    const userID = window.localStorage.getItem("UserID")!;
    const [subscribed, setSubscribed] = useState<subscribed[]>([]);
    const subscribedCards: any[] = [];

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async (id: string, serviceName: string, tier: string) => {
        setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        //     setOpen(false);
        // }, 3000);
        const data = {userID: id, serviceName: serviceName, tier: tier};
        await fetch("http://localhost:8080/api/home/unsubscribe", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        setLoading(false);
        setOpen(false);
        window.location.reload();
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchSubscribedServices = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/home/subscribedServices/${userID}`);
                const result = await response.json();
                setSubscribed(result);
                console.log(result);
            } catch (err) {
                console.error("Error fetching subscribed services");
            }
        };

        fetchSubscribedServices();
    }, []);

    subscribed.forEach((service) => {
        subscribedCards.push(
            <div key={service.serviceName} className={"card col-3 m-4 bg-dark border-white"}>
                <div className="card-body">
                    <h5 className="card-title text-center h5 text-white">{service.serviceName}</h5>
                    <h6 className="card-title text-center text-white">{service.tier}</h6>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <a href={`/${service.serviceName}`} className="btn btn-primary w-100">View</a>
                        </div>
                        <div className={"col-6"}>
                            <button className={"btn btn-primary"} style={{background: "red", border: "red"}} onClick={showModal}>Unsubscribe</button>
                            <Modal
                                open={open}
                                title="Unsubscribe"
                                onOk={handleOk}
                                onCancel={handleCancel}
                                footer={[
                                    <Button key="back" onClick={handleCancel}>
                                        No
                                    </Button>,
                                    <Button key="submit" type="primary" loading={loading} onClick={() => handleOk(userID, service.serviceName, service.tier)}
                                            style={{background: "red"}}>
                                        Yes
                                    </Button>
                                ]}
                            >
                                <span className={"h6"}>Are you sure you want to unsubscribe?</span>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className={"container mt-5"}>
            <h1 className={"text-white h1"}>Subscribed</h1>
            <div className={"row p-3"}>
                {
                    subscribedCards.map((card) => card)
                }
            </div>
        </div>
    );
}
