export default function StreamingServices() {
    return (
        <>
            <div className={"container"}>
                <h1 className={"text-white h1"}>Subscribed</h1>
                <div className={"row border p-3"}>
                    <div className="card col-2 m-5">
                        <img className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title h5">Netflix</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/netflix" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                    <div className="card col-2 m-5">
                        <img className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title h5">Prime Video</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/primeVideo" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                    <div className="card col-2 m-5">
                        <img className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title h5">Disney Plus</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/disneyPlus" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"container"}>
                <h1 className={"text-white h1"}>Not Subscribed</h1>
                <div className={"row border p-3"}>
                    <div className="card col-2 m-5">
                        <img className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title h5">CraveTV</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <button className={"btn btn-secondary"}>Subscribe</button>
                        </div>
                    </div>
                    <div className="card col-2 m-5">
                        <img className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title h5">Max</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <button className={"btn btn-secondary"}>Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}