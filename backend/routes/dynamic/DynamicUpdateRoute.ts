import {Connection} from "mysql2";
import {Request, Response} from "express";

/**
 *```
 *  req.body =
 *      {
 *          "SET": {
 *              [columnID]: [newValue],
 *              ...
 *          },
 *          "WHERE": {
 *              [primaryKeyID]: [ID],
 *              ...
 *          }
 *      }
 * ```
 **/
export default function dynamicUpdateRoute(app: any, db: Connection, route: string, table: string): void {
    app.put(route, (req: Request, res: Response): void => {
        let query: string = createUpdateQuery(table, req.body);
        console.log("QUERY: " + query);
        db.query(query, (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
            } else {
                res.status(200).json(result);
            }
        });
    });
}

function createUpdateQuery(table: string, params: any): string {
    let query: string = "UPDATE " + table + " SET ";

    let SET: object = params["SET"];
    let WHERE: object = params["WHERE"];

    let i: number = 0;
    for (let key in SET) {
        if (SET.hasOwnProperty(key)) {
            if (i === 0) {
                query += key + " = '" + SET[key] + "'";
            } else {
                query += ", " + key + " = '" + SET[key] + "'";
            }
            i++;
        }
    }
    query += " WHERE ";
    let j: number = 0;
    for (let key in WHERE) {
        if (WHERE.hasOwnProperty(key)) {
            if (j === 0) {
                query += key + " = '" + WHERE[key] + "'";
            } else {
                query += " AND " + key + " = '" + WHERE[key] + "'";
            }
            j++;
        }
    }
    return query;
}