export default function CheckBox({name, checked, filtered, setFiltered}: any) {

    function onChange() {
        if (filtered.includes(name)) {
            setFiltered(filtered.filter((service: any) => service !== name));
        } else {
            setFiltered([...filtered, name]);
        }
    }

    return (
        <div
            onClick={onChange}
            className="flex flex-row items-center p-2 hover:opacity-70 hover:cursor-pointer">
            <input type="checkbox" className="border-blue-500" checked={checked} onChange={onChange}/>
            <label className="ml-2 text-black text-sm pr-10 whitespace-nowrap hover:cursor-pointer">{name}</label>
        </div>
    )
}