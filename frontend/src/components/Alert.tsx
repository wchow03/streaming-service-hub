export enum AlertType {
    Success = "success",
    Error = "error",
    Warning = "warning",
    Info = "info",
}

type AlertProps = {
    type: AlertType,
    visible: boolean,
    children?: any
}


export default function Alert({type, visible, children}: AlertProps) {


    return (

        <div className={`${!visible && "hidden"} fixed w-full top-10 left-0 px-5`}>

            {
                getAlert(type, children)
            }

        </div>
    )


}

export function getAlert(type: AlertType, children: any) {

    switch (type) {
        case AlertType.Success:
            return (
                <div
                    className={`flex flex-row bg-slate-600 w-full rounded py-2 px-3 border-1 border-green-500 items-center`}>
                    <svg className={`flex-shrink-0 inline w-5 h-5 me-3 fill-green-300`}
                         aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <p className={`text-green-400 font-bold`}>{children}</p>
                </div>
            );
        case AlertType.Error:
            return (
                <div
                    className={`flex flex-row bg-slate-600 w-full rounded py-2 px-3 border-1 border-red-500 items-center`}>
                    <svg className={`flex-shrink-0 inline w-5 h-5 me-3 fill-red-300`}
                         aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <p className={`text-red-400 font-bold`}>{children}</p>
                </div>
            );
        case AlertType.Warning:
            return (
                <div
                    className={`flex flex-row bg-slate-600 w-full rounded py-2 px-3 border-1 border-yellow-500 items-center`}>
                    <svg className={`flex-shrink-0 inline w-5 h-5 me-3 fill-yellow-300`}
                         aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <p className={`text-yellow-400 font-bold`}>{children}</p>
                </div>
            );
        case AlertType.Info:
            return (
                <div
                    className={`flex flex-row bg-slate-600 w-full rounded py-2 px-3 border-1 border-blue-500 items-center`}>
                    <svg className={`flex-shrink-0 inline w-5 h-5 me-3 fill-blue-300`}
                         aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <p className={`text-blue-400 font-bold`}>{children}</p>
                </div>
            );
        default:
            console.error("Invalid Alert type");
            return (<p>ERROR DISPLAYING ALERT</p>);
    }
}