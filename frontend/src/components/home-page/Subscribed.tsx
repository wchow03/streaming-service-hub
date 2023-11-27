import {useEffect, useState} from "react";
import {Button, Modal} from "antd";
import {Link} from "react-router-dom";

interface subscribed {
    serviceName: string,
    tier: string
}

export default function Subscribed({reset}: { reset: any }) {
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
        reset();
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
            <div
                key={service.serviceName}
                className={"flex sm:flex-row md:flex-col gap-4 outline outline-1 outline-white p-3 rounded w-full md:w-1/4"}>

                <div className={`flex flex-col gap-2 basis-1/2`}>
                    <h5 className="text-center h5 text-white whitespace-nowrap">{service.serviceName}</h5>
                    <h6 className="text-center text-gray-300 font-thin">{service.tier}</h6>
                </div>

                <div className={"flex flex-col gap-3 flex-grow w-full"}>
                    <Link
                        to={`/service/${service.serviceName}`}
                        className={"text-center w-full py-2 rounded text-white bg-blue-600 hover:bg-blue-900 transition-colors duration-300"}>
                        View
                    </Link>
                    <div className={"w-full flex-grow"}>
                        <button
                            className={"w-full py-2 rounded text-white bg-red-600 hover:bg-red-900 transition-colors duration-300"}
                            onClick={showModal}>Unsubscribe
                        </button>
                        <Modal
                            open={open}
                            title="Unsubscribe"
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="back" onClick={handleCancel}>
                                    No
                                </Button>,
                                <Button key="submit" type="primary" loading={loading}
                                        onClick={() => handleOk(userID, service.serviceName, service.tier)}
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
        );
    });

    return (
        <div className={`px-6 md:px-24 lg:px-48`}>
            {
                subscribed.length !== 0 &&
                <h1 className={"text-white h1 pb-3"}>My Services</h1>
            }
            <div className={"flex flex-col md:flex-row gap-5 flex-wrap"}>
                {
                    subscribedCards.map((card) => card)
                }
            </div>
        </div>
    );
}
