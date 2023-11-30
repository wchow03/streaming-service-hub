import * as express from "express";
import {Express, Request, Response} from "express";
import * as path from "path";
import * as mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import * as console from "console";

import dotenv from 'dotenv';

import authenticateRegister from "./routes/authentication/AuthenticateRegister";
import authenticateLogin from "./routes/authentication/AuthenticateLogin";
import authenticateUpdatePassword from "./routes/authentication/AuthenticateUpdatePassword";

import dynamicGetRoute from "./routes/dynamic/DynamicGetRoute";
import dynamicDeleteRoute from "./routes/dynamic/DynamicDeleteRoute";
import dynamicAddRoute from "./routes/dynamic/DynamicAddRoute";
import dynamicUpdateRoute from "./routes/dynamic/DynamicUpdateRoute";

import dynamicGetMedia from "./routes/dynamic/DynamicGetMedia";

export class Server {

    private app: Express;
    private db: mysql.Connection;
    private tables: string[] = [];

    constructor(app: Express) {
        dotenv.config();  // Load environment variables from .env file
        this.app = app;
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.initDB();
        this.tables =
            [
                "AddToList", "Age", "Cost", "Genre", "Media", "Movie",
                "Season", "StreamingService", "Studio",
                "SubscribesTo", "Subscription", "TVShow", "WatchHistory", "Watchlist"
            ];

        this.app.use(express.static(path.resolve("./") + "/build/frontend"));

        this.apiRoute();

        // Dynamic routes for each table
        this.tables.map((table: string) => {
            let query: string = "SELECT * FROM " + table;
            let route: string = "/api/" + table.toLowerCase();
            let addRoute: string = "/api/" + table.toLowerCase() + "/add";
            let deleteRoute: string = "/api/" + table.toLowerCase() + "/delete";
            let updateRoute: string = "/api/" + table.toLowerCase() + "/update";

            // DynamicGetRoute uses POST method (for Body Parsing)
            dynamicGetRoute(this.app, this.db, route, query);

            // DynamicAddRoute uses POST method
            dynamicAddRoute(this.app, this.db, addRoute, table);

            // DynamicDeleteRoute uses DELETE method
            dynamicDeleteRoute(this.app, this.db, deleteRoute, table);

            // DynamicUpdateRoute uses PUT method
            dynamicUpdateRoute(this.app, this.db, updateRoute, table);

        });

        this.subscribedRoute();
        this.nonSubscribedRoute();
        this.subscribeRoute();
        this.unsubscribeRoute();
        this.getWatchlistRoute();

        dynamicGetMedia(this.app, this.db);
        this.getNestedAggregateGroupBy();
        this.getAggregationWithHaving();

        // Update Account routes
        this.updateUsername();
        this.updateEmail();
        this.deleteAccount();

        // Authentication routes
        authenticateRegister(this.app, this.db);
        authenticateLogin(this.app, this.db);
        authenticateUpdatePassword(this.app, this.db);
    }


    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }

    // Connect to DB
    // ******************************************************
    private initDB(): void {
        const host: string = process.env.DB_HOST as string;
        const user: string = process.env.DB_USER as string;
        const password: string = process.env.DB_PASSWORD as string;

        this.db = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: "streamingservice"
        });

        this.db.connect((err) => {
            if (err) {
                console.error("ERROR: " + err.stack);
                return;
            }
            console.log("Connected to DB as id " + this.db.threadId);
        });
    }

    // /api
    // ******************************************************
    private apiRoute(): void {
        this.app.get("/api", (req: Request, res: Response): void => {
            res.send("You have reached the API!");
        });
    }


    private subscribedRoute(): void {
        this.app.get("/api/home/subscribedServices/:userID", (req: Request, res: Response): void => {
            // const userID = req.params.userID;
            this.db.query(`SELECT serviceName, tier
                           FROM SubscribesTo
                           WHERE userID = ${req.params.userID}
                           ORDER BY serviceName`, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(result);
                }
            })
        });
    }

    private nonSubscribedRoute(): void {
        this.app.get("/api/home/nonSubscribedServices/:userID", (req: Request, res: Response): void => {
            this.db.query(`SELECT s.serviceName, s.tier, c.monthlyCost
                           FROM Subscription s
                                    CROSS JOIN Cost c ON s.duration = c.duration AND s.totalCost = c.totalCost
                           WHERE NOT EXISTS (SELECT *
                                             FROM SubscribesTo s1
                                             WHERE s1.userID = ${req.params.userID}
                                               AND s.serviceName = s1.serviceName)
                           ORDER BY s.serviceName, monthlyCost`, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(result);
                }
            });
        });
    }

    private subscribeRoute(): void {

        this.app.post("/api/home/subscribe", (req: Request, res: Response): void => {
            let userID = req.body.userID;
            let serviceName = req.body.serviceName;
            let tier = req.body.tier;


            this.db.query(`INSERT INTO SubscribesTo(userID, serviceName, tier)
                           VALUES (${userID}, '${serviceName}', '${tier}')`, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(result);
                }
            });
        });
    }

    private unsubscribeRoute(): void {
        this.app.delete("/api/home/unsubscribe", (req: Request, res: Response): void => {
            this.db.query(`DELETE
                           FROM SubscribesTo
                           WHERE userID = ${req.body.userID}
                             AND serviceName = '${req.body.serviceName}'
                             AND tier = '${req.body.tier}'`, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(result);
                }
            });
        });
    }

    private getWatchlistRoute(): void {
        this.app.get("/api/watchlist/:listID/", (req: Request, res: Response): void => {

            let columns: string = req.query.columns as string
            console.log("COLUMNS: " + columns);

            if (columns === "") {
                columns = "mediaName,rating,studioName,serviceName";
                // console.log("SUCCESS");
            }

            let filteredColumns: string[] = columns.split(",");
            filteredColumns = filteredColumns.map((column: string) => {
                return `m.${column}`;
            });

            // console.log("FILTERED: " + filteredColumns);


            this.db.query(`SELECT l.listID,
                                  m.mediaID,
                                  ${filteredColumns}
                           FROM AddToList l
                                    JOIN Media m
                                         ON l.mediaID = m.mediaID
                           WHERE l.listID = '${req.params.listID}'
            `, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    // res.json(result);
                    // return;
                    const query: string = `SELECT COLUMN_NAME
                                           FROM INFORMATION_SCHEMA.COLUMNS
                                           WHERE TABLE_NAME = 'AddToList'
                                              OR TABLE_NAME = 'Media'`;
                    this.db.query(query, (err, info) => {
                        if (err) {
                            console.log(err);
                        } else {
                            // console.log("RESULT:" + info);
                            res.json({result: result, info: info});
                        }
                    });
                }
            });
        });
    }

    private updateUsername(): void {
        this.app.post("/api/account/updateUsername", (req: Request, res: Response): void => {
            const id = req.body.userID;
            const newUsername = req.body.userName;
            this.db.query(`UPDATE Streaminguser
                           SET userName = '${newUsername}'
                           WHERE userID = ${id}`, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({error: "Error updating username"});
                } else {
                    res.json(result);
                }
            })
        });
    }

    private updateEmail(): void {
        this.app.post("/api/account/updateEmail", (req: Request, res: Response): void => {
            const id = req.body.userID;
            const newEmail = req.body.email;
            this.db.query(`UPDATE Streaminguser
                           SET email = '${newEmail}'
                           WHERE userID = ${id}`, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({error: "Email already registered"});
                } else {
                    res.json(result);
                }
            })
        })
    }

    private deleteAccount(): void {
        this.app.delete("/api/account/delete", (req: Request, res: Response): void => {
            const id = req.body.userID;
            this.db.query(`DELETE
                           FROM Streaminguser
                           WHERE userID = ${id}`, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({error: "Error deleting account"});
                } else {
                    res.json(result);
                }
            })
        })
    }

    private getNestedAggregateGroupBy(): void {
        this.app.get("/api/media/nestedAggregateGroupBy/:numRows", (req: Request, res: Response): void => {
            const n: number = req.params.numRows as unknown as number;

            if (isNaN(n)) {
                res.status(400).send({error: "Number of rows is not a number"});
                return;
            }

            if (n < 0 || n > 10) {
                res.status(400).send({error: "Number of rows is out of range"});
                return;
            }

            this.db.query(`SELECT M.studioName, ROUND(AVG(M.rating), 2) AS avgRating
                           FROM Media M
                           GROUP BY M.studioName
                           HAVING ${n} <=
                                  (SELECT COUNT(*) FROM Media M2 WHERE M.studioName = M2.studioName)`, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send({error: err.sqlMessage});
                } else {
                    res.json(result);
                }
            })
        });
    }

    private getAggregationWithHaving(): void {
        this.app.get("/api/media/aggregationWithHaving/:minRating", (req: Request, res: Response): void => {
            const minRating: number = req.params.minRating as unknown as number;

            console.log("MIN RATING: " + minRating);

            if (isNaN(minRating)) {
                res.status(400).send({error: "Rating is not a number"});
                return;
            }

            if (minRating < 0 || minRating > 10) {
                res.status(400).send({error: "Rating is out of range"});
                return;
            }

            this.db.query(`SELECT studioName, MIN(rating) as minRating, MAX(rating) as maxRating
                           FROM Media
                           WHERE rating >= ${minRating}
                           GROUP BY studioName
                           HAVING COUNT(*) > 1`, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send({error: err.sqlMessage});
                } else {
                    res.json(result);
                }
            })
        });
    }
}
