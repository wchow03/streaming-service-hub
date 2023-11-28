type DynamicCreateTableProps = {
    route?: string,
    data: any,
    className?: string
    handleClick?: any,
    active?: number
}

export default function DynamicCreateTable({route, data, className, handleClick, active}: DynamicCreateTableProps) {

    let headers: string[] = data.map((item: any) => Object.keys(item)).flat();
    let noIDHeaders = headers.filter((item: string) => !item.toLowerCase().includes("id"));
    let uniqueHeaders: string[] = [...new Set(noIDHeaders)];

    let reformattedUniqueHeaders = uniqueHeaders.map((item: string) => item.replace(/([a-z])([A-Z])/g, '$1 $2'));

    // console.log("Printing table data for " + route);
    typeof route;

    return (
        <div className={`pt-10 w-full overflow-x-scroll ` + className}>
            {/*<h2 className={`text-xl font-bold text-white pb-10 uppercase`}> {route.replace(/([a-z])([A-Z])/g, '$1 $2')} </h2>*/}

            <table
                className={`text-sm text-left rtl:text-right text-gray-400 w-full`}>
                <thead className={`text-xs uppercase bg-gray-700 text-gray-400`}>

                <tr>
                    {
                        reformattedUniqueHeaders.map((item: any, index: number) => (
                            <th scope={`col`} className={`px-6 py-3`} key={index}>{item}</th>
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