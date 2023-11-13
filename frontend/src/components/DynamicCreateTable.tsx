
export default function DynamicCreateTable({route, data} : {route: string, data: any}) {

    let headers: string[] = data.map((item: any) => Object.keys(item)).flat();
    let uniqueHeaders: string[] = [...new Set(headers)];

    let reformattedUniqueHeaders = uniqueHeaders.map((item: string) => item.replace(/([a-z])([A-Z])/g, '$1 $2'));

    return (
        <div className={`pt-10`}>
            <h2 className={`text-xl font-bold text-white pb-10 uppercase`}> {route.replace(/([a-z])([A-Z])/g, '$1 $2')} </h2>

            <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}>
                <thead className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}>

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
                    <tr key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-700`}>
                        {
                            uniqueHeaders.map((header: any, j: number) => (
                                <td className={`px-6 py-4`} key={j}>{item[header]}</td>
                            ))
                        }
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}