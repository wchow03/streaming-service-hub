// import {useEffect, useState} from "react";
import Subscribed from "./Subscribed.tsx";
import NotSubscribed from "./NotSubscribed.tsx";
import {useState} from "react";

export interface HomeUser {
    username: string,
    email: string
    id?: number
}

export default function HomePage() {

    const [subscribedSeed, setSubscribedSeed] = useState<number>(0);
    const [notSubscribedSeed, setNotSubscribedSeed] = useState<number>(1);

    function reset() {
        setSubscribedSeed(subscribedSeed + 1);
        setNotSubscribedSeed(notSubscribedSeed + 1);
    }


    return (
        <div className={`flex flex-col gap-4 pb-10`}>
            <Subscribed key={subscribedSeed} reset={reset}/>
            <NotSubscribed key={notSubscribedSeed} reset={reset}/>
        </div>
    );
}