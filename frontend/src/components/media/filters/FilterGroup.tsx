import CheckBox from "./CheckBox.tsx";


// FilterGroup Component
// ******************************************************


export default function FilterGroup({label, complete, filtered, setFiltered, visible, setVisible}: any) {

    function toggleVisible() {
        console.log("Toggling visibility");
        if (visible === label) {
            setVisible("");
        } else {
            setVisible(label);
        }
    }

    return (
        <div className={`relative flex flex-col gap-1 basis-1/3 md:w-1/3`}>
            <button
                type={`button`}
                className={`flex flex-row gap-2 items-center font-bolds text-black text-sm w-full py-2 px-3 text-left rounded transition-colors duration-300 hover:outline-teal-300 ${visible === label && "outline-teal-600"}`}
                onClick={toggleVisible}>
                {label}:
                <div className={`overflow-x-scroll flex flex-row w-full gap-2 no-scrollbar`}>
                    {
                        filtered.map((item: any, index: number) => {
                            return (
                                <span
                                    key={index}
                                    className={`whitespace-nowrap text-xs text-black border py-1 px-3 rounded-full bg-gray-100 t`}>{item}</span>
                            )
                        })
                    }
                </div>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    fill="none"
                    viewBox="0 0 24 24"
                    className={`${visible === label && "transform rotate-180"} transition-transform duration-300`}
                >
                    <path
                        fill="#212121"
                        d="M5.161 10.073C4.454 9.265 5.028 8 6.101 8h11.797c1.074 0 1.648 1.265.94 2.073l-5.521 6.31a1.75 1.75 0 0 1-2.634 0l-5.522-6.31ZM6.653 9.5l5.159 5.896a.25.25 0 0 0 .376 0l5.16-5.896H6.652Z"
                    />
                </svg>

            </button>
            <form
                className={`${visible === label ? "z-10" : "hidden"} max-h-[33vh] text-black top-10 absolute w-full transition-opacity duration-300 flex flex-col border border-gray-900 rounded-b-sm bg-white overflow-y-scroll divide-y-2 `}>
                {
                    complete.map((item: any, index: number) => {
                        return (
                            <CheckBox
                                name={item}
                                checked={filtered.includes(item)}
                                filtered={filtered}
                                setFiltered={setFiltered}
                                key={index}>{item}</CheckBox>
                        )
                    })
                }
            </form>
        </div>
    )
}