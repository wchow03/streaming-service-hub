import {Request, Response} from "express";


// /api/:table
// ******************************************************
export default function dynamicGetRoute(app, db, route: string, query: string): void {
    app.post(route, (req: Request, res: Response): void => {

        const SELECT: string = req.body.SELECT as string;
        const WHERE: string = req.body.WHERE as string;
        const FROM: string = req.body.FROM as string;

        let thisQuery: string = query;
        console.log("SELECT: " + SELECT);

        if (FROM) {
            thisQuery = thisQuery.replace(query.substring(query.indexOf("F")), `FROM ${FROM}`);
        }

        if (WHERE) {
            thisQuery += " WHERE " + WHERE;
        }

        if (SELECT) {
            thisQuery = thisQuery.replace("*", SELECT);
        }

        console.log("QUERY: " + thisQuery);

        db.query(thisQuery, (err, result) => {
            if (err) {
                console.error("ERROR: " + err);
                res.status(400).send("Error: " + err.sqlMessage);
            } else {
                res.json(result);
            }
        });
    });
}