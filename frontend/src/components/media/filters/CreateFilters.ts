export function createServiceFilter(services: string[], setFilter: any) {
    let tempFilter = "";
    services.map((service: any, index: number) => {
        // console.log(service);
        const logic = index + 1 < services.length ? " OR " : "";
        const newFilter = `serviceName = "${service}"`;
        tempFilter = tempFilter + newFilter + logic;
    });
    setFilter(tempFilter);
}

export function createStudioFilter(studios: string[], setFilter: any) {
    let tempFilter = "";
    studios.map((studio: any, index: number) => {
        // console.log(service);
        const logic = index + 1 < studios.length ? " OR " : "";
        const newFilter = `studioName = "${studio}"`;
        tempFilter = tempFilter + newFilter + logic;
    });
    setFilter(tempFilter);
}

export function createSearchFilter(search: string, setFilter: any) {
    setFilter(`mediaName LIKE "%${search}%"`);
}

export function combineFilters(filters: any[], setFilter: any) {
    let combinedFilter: string = "";

    filters.map((filter: string, index: number) => {
        const logic = index + 1 < filters.length ? " AND " : "";
        if (filter !== "") {
            combinedFilter = combinedFilter + "(" + filter + ")" + logic;
        }
    });

    setFilter(combinedFilter)
    // console.log(combinedFilter);
}