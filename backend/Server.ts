import * as express from "express";
import {Express, Request, Response} from "express";
import * as path from "path";
import * as mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import * as console from "console";

export class Server {

    private app: Express;
    private db: mysql.Connection;
    private tables: string[] = [];

    constructor(app: Express) {
        this.app = app;
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.initDB();
        this.tables =
            [
                "AddToList", "Age", "Cost", "Genre", "Media", "Movie",
                "Season", "StreamingService", "StreamingUser", "Studio",
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
            this.dynamicGetRoute(route, query);

            // DynamicAddRoute uses POST method
            this.dynamicAddRoute(addRoute, table);

            // DynamicDeleteRoute uses DELETE method
            this.dynamicDeleteRoute(deleteRoute, table);

            // DynamicUpdateRoute uses PUT method
            this.dynamicUpdateRoute(updateRoute, table);

        });

        this.registerRoute();
        this.loginRoute();
        this.subscribedRoute();
        this.nonSubscribedRoute();
        this.subscribeRoute();
        this.unsubscribeRoute();
        this.getWatchlistRoute();
        this.getShows();
        this.getMovies();

        // this.app.get("*", (req: Request, res: Response): void => {
        //     res.sendFile(path.resolve("./") + "/build/frontend/index.html");
        // });
    }


    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }

    // Connect to DB
    // ******************************************************
    private initDB(): void {
        this.db = mysql.createConnection({
            host: "10.254.0.1",
            user: "guest",
            password: "DT8Rbt38###mjR*@",
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

    // /api/:table
    // ******************************************************
    private dynamicGetRoute(route: string, query: string): void {
        this.app.post(route, (req: Request, res: Response): void => {

            const SELECT: string = req.body.SELECT as string;
            const WHERE: string = req.body.WHERE as string;

            let thisQuery: string = query;
            console.log("SELECT: " + SELECT);

            if (WHERE) {
                thisQuery += " WHERE " + WHERE;
            }

            if (SELECT) {
                thisQuery = thisQuery.replace("*", SELECT);
            }

            console.log("QUERY: " + thisQuery);

            this.db.query(thisQuery, (err, result) => {
                if (err) {
                    console.error("ERROR: " + err);
                } else {
                    res.json(result);
                }
            });
        });
    }

    private dynamicAddRoute(route: string, table: string): void {
        this.app.post(route, (req: Request, res: Response): void => {
            let query: string = this.createAddQuery(table, req.body);
            console.log("QUERY: " + query);
            this.db.query(query, (err, result) => {
                if (err) {
                    console.error("ERROR: " + err);
                } else {
                    res.json(result);
                }
            });
        });
    }

    private dynamicDeleteRoute(route: string, table: string): void {
        this.app.delete(route, (req: Request, res: Response): void => {
            let query: string = this.createDeleteQuery(table, req.body);
            console.log("QUERY: " + query);
            this.db.query(query, (err, result) => {
                if (err) {
                    console.error("ERROR: " + err);
                } else {
                    res.json(result);
                }
            });
        });
    }


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
    private dynamicUpdateRoute(route: string, table: string): void {
        this.app.put(route, (req: Request, res: Response): void => {
            let query: string = this.createUpdateQuery(table, req.body);
            console.log("QUERY: " + query);
            this.db.query(query, (err, result) => {
                if (err) {
                    console.error("ERROR: " + err);
                } else {
                    res.json(result);
                }
            });
        });
    }

    private createUpdateQuery(table: string, params: any): string {
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

    private createDeleteQuery(table: string, params: any): string {
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

    private createAddQuery(table: string, params: any): string {
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

    private registerRoute(): void {
        this.app.post("/api/register", (req: Request, res: Response): void => {
            const username = req.body.username;
            const password = req.body.password;
            const email = req.body.email;
            const birthday = req.body.birthday;

            this.db.query("INSERT INTO StreamingUser(username, password, email, birthday) VALUES (?,?,?,?)", [username, password, email, birthday], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(result);
                }
            })
        });
    }

    private loginRoute(): void {
        this.app.get("/api/users", (req: Request, res: Response): void => {
            this.db.query("SELECT userID, username, email, password FROM StreamingUser", (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(result);
                }
            });
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
            this.db.query(`SELECT l.listID,
                                  m.mediaID,
                                  m.mediaName,
                                  m.rating,
                                  m.studioName,
                                  m.serviceName
                           FROM AddToList l
                                    JOIN Media m
                                         ON l.mediaID = m.mediaID
                           WHERE l.listID = ${req.params.listID}
            `, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(result);
                }
            });
        });
    }

    private getShows(): void {
        this.app.post("/api/media/shows/", (req: Request, res: Response): void => {
            const WHERE: string = req.body.WHERE as string;

            let query: string = `SELECT m.mediaID,
                                        m.mediaName,
                                        m.rating,
                                        m.studioName,
                                        m.serviceName,
                                        s.numberOfSeasons,
                                        GROUP_CONCAT(g.genreName) AS genreList
                                 FROM Media m
                                          JOIN TVShow s
                                               ON m.mediaID = s.mediaID
                                          JOIN Genre g
                                               ON m.mediaID = g.mediaID`;

            if (WHERE) {
                query += " WHERE " + WHERE;
            }

            query += ` GROUP BY m.mediaID,
                                  m.mediaName,
                                  m.rating,
                                  m.studioName,
                                  m.serviceName,
                                  s.numberOfSeasons`;

            this.db.query(query,
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(result);
                    }
                });
        });
    }

    private getMovies(): void {
        this.app.post("/api/media/movies/", (req: Request, res: Response): void => {
            const WHERE: string = req.body.WHERE as string;

            let query: string = `SELECT m.mediaID,
                                        m.mediaName,
                                        m.rating,
                                        m.studioName,
                                        m.serviceName,
                                        f.version,
                                        f.length,
                                        GROUP_CONCAT(g.genreName) AS genreList
                                 FROM Media m
                                          JOIN Movie f
                                               ON m.mediaID = f.mediaID
                                          JOIN Genre g
                                               ON m.mediaID = g.mediaID`;

            if (WHERE) {
                query += " WHERE " + WHERE;
            }

            query += ` GROUP BY m.mediaID,
                                  m.mediaName,
                                  m.rating,
                                  m.studioName,
                                  m.serviceName,
                                  f.version,
                                  f.length`;

            this.db.query(query,
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(result);
                    }
                });
        });
    }

}
