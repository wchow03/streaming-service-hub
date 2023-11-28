import {useState} from "react";

type DynamicCreateTableProps = {
    route?: string,
    data: any,
    className?: string
    handleClick?: any,
    active?: number,
    sortColumn?: string,
    sortDirection?: string
    setSortColumn?: (arg: string) => void,
    setSortDirection?: (arg: string) => void,
}

export default function DynamicCreateTable({route, data, className, handleClick, active}: DynamicCreateTableProps) {

    let headers: string[] = data.map((item: any) => Object.keys(item)).flat();
    let noIDHeaders = headers.filter((item: string) => !item.toLowerCase().includes("id"));
    let uniqueHeaders: string[] = [...new Set(noIDHeaders)];

    let reformattedUniqueHeaders = uniqueHeaders.map((item: string) => item.replace(/([a-z])([A-Z])/g, '$1 $2'));

    // console.log("Printing table data for " + route);
    typeof route;

    // Sorting Behaviour
    // ******************************************************
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("ASC");

    function handleSortChange(arg: string) {
        if (sortColumn === arg) {
            if (sortDirection === "ASC") {
                setSortDirection("DESC");
            } else {
                setSortDirection("ASC");
            }
        }

        setSortColumn(arg);
        console.log(arg);
        console.log(sortDirection);
    }

    return (
        <div className={`pt-10 w-full overflow-x-scroll ` + className}>
            {/*<h2 className={`text-xl font-bold text-white pb-10 uppercase`}> {route.replace(/([a-z])([A-Z])/g, '$1 $2')} </h2>*/}

            <table
                className={`text-sm text-left rtl:text-right text-gray-400 w-full`}>
                <thead className={`text-xs uppercase bg-gray-700 text-gray-400`}>

                <tr>
                    {
                        reformattedUniqueHeaders.map((item: any, index: number) => (
                            <th
                                scope={`col`}
                                onClick={() => handleSortChange(uniqueHeaders[index])}
                                className={`px-6 py-3`}
                                key={index}>
                                <div className={`flex flex-row items-center`}>
                                    {item}
                                    {/*<svg*/}
                                    {/*    xmlns="http://www.w3.org/2000/svg"*/}
                                    {/*    width={30}*/}
                                    {/*    height={30}*/}
                                    {/*    fill="none"*/}
                                    {/*    viewBox="0 0 24 24"*/}
                                    {/*    className={`${sortDirection === "ASC" && "transform rotate-180"} ${sortColumn !== uniqueHeaders[index] && "hidden"} transition-transform duration-300 fill-white stroke-white`}*/}
                                    {/*>*/}
                                    {/*    <path*/}
                                    {/*        fill="#fff"*/}
                                    {/*        d="M5.161 10.073C4.454 9.265 5.028 8 6.101 8h11.797c1.074 0 1.648 1.265.94 2.073l-5.521 6.31a1.75 1.75 0 0 1-2.634 0l-5.522-6.31ZM6.653 9.5l5.159 5.896a.25.25 0 0 0 .376 0l5.16-5.896H6.652Z"*/}
                                    {/*    />*/}
                                    {/*</svg>*/}
                                </div>

                            </th>
                        ))
                    }
                </tr>

                </thead>
                <tbody>
                {data.map((item: any, index: number) => (
                    <tr key={index}
                        onClick={() => handleClick(item, index)}
                        className={`border-b bg-gray-800 border-gray-700 hover:bg-slate-700 ${handleClick && "hover:cursor-pointer"}
                        ${active === index && "dark:bg-teal-200 text-black hover:text-white hover:bg-teal-700 "}`}>
                        {
                            uniqueHeaders.map((header: string, j: number) => {
                                return <td className={`px-6 py-4`} key={j}>{item[header]}</td>
                            })
                        }
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}