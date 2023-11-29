import {Request, Response} from "express";
import console from "console";

export default function dynamicAddRoute(app, db, route: string, table: string): void {
    app.post(route, (req: Request, res: Response): void => {
        let query: string = createAddQuery(table, req.body);
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

function createAddQuery(table: string, params: any): string {
    let query: string = "INSERT INTO " + table + "(";

    let j: number = 0;
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            if (j === 0) {
                query += key;
            } else {
                query += ", " + key;
            }
        }
        j++;
    }

    query += ") VALUES ("
    let i: number = 0;
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            if (i === 0) {
                query += "'" + params[key] + "'";
            } else {
                query += ", " + params[key] + "";
            }
            i++;
        }
    }
    query += ")";
    return query;
}