import {Request, Response} from "express";
import console from "console";

export default function dynamicDeleteRoute(app, db, route: string, table: string): void {
    app.delete(route, (req: Request, res: Response): void => {
        let query: string = createDeleteQuery(table, req.body);
        console.log("QUERY: " + query);
        db.query(query, (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
            } else {
                res.json(result);
            }
        });
    });
}

function createDeleteQuery(table: string, params: any): string {
    let query: string = "DELETE FROM " + table + " WHERE ";

    let i: number = 0;
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            if (i === 0) {
                query += key + " = '" + params[key] + "'";
            } else {
                query += " AND " + key + " = '" + params[key] + "'";
            }
            i++;
        }
    }
    return query;
}