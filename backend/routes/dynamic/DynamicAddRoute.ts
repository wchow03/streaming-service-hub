import {Request, Response} from "express";
import console from "console";

export default function dynamicAddRoute(app, db, route: string, table: string): void {
    app.post(route, (req: Request, res: Response): void => {
        let query: string = createAddQuery(table, req.body);
        console.log("QUERY: " + query);
        db.query(query, (err, result) => {
            if (err) {
                res.status(400).json({error: err.sqlMessage});
                return;
            }

            res.status(200).json(result);
        });
    });
}


function createAddQuery(table: string, params: any): string {

    // Original structure
    let query: string = `INSERT INTO ${table} (`;

    const columns = Object.keys(params);
    query += columns.join(", ") + ") VALUES (";

    const formattedValues = columns.map((column) => {
        return typeof params[column] === "string" ? `'${params[column]}'` : params[column];
    });

    query += formattedValues.join(", ") + ")";

    return query;
}
