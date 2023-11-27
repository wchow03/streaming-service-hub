export default function DynamicCreateTable({setRoute}: { setRoute: any }) {

    function handleSelectChange(event: any) {
        setRoute(event.target.value);
        console.log(event.target.value);
    }

    return (
        <>
            <label className={`text-xl font-bold text-white uppercase`}> Select a Table </label>

            <select id="tables" onChange={handleSelectChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                <option value="addToList">Add To List</option>
                <option value="age">Age</option>
                <option value="Cost">Cost</option>
                <option value="genre">Genre</option>
                <option defaultValue="media">Media</option>
                <option value="movie">Movie</option>
                <option value="season">Season</option>
                <option value="streamingService">Streaming Service</option>
                <option value="streamingUser">User</option>
                <option value="studio">Studio</option>
                <option value="subscribesTo">Subscribes To</option>
                <option value="subscription">Subscription</option>
                <option value="tvShow">TV Show</option>
                <option value="watchHistory">Watch History</option>
                <option value="watchList">Watch List</option>

            </select>
        </>
    )
}