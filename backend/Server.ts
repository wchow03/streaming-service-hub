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

            this.dynamicRoute(route, query);
            this.dynamicAddRoute(addRoute, table);

        });

        this.registerRoute();
        this.loginRoute();

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
            host: "localhost",
            user: "root",
            password: "%mysqlroot%",
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
    private dynamicRoute(route: string, query: string): void {
        this.app.get(route, (req: Request, res: Response): void => {
            this.db.query(query, (err, result) => {
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
            this.db.query(query, (err, result) => {
                if (err) {
                    console.error("ERROR: " + err);
                } else {
                    res.json(result);
                }
            });
        });
    }

    private createAddQuery(table: string, params: any): string {
        let query: string = "INSERT INTO " + table + " VALUES (";
        let i: number = 0;
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                if (i === 0) {
                    query += "'" + params[key] + "'";
                } else {
                    query += ", '" + params[key] + "'";
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
           this.db.query("SELECT username, email, password FROM StreamingUser", (err, result) => {
              if (err) {
                  console.log(err);
              } else {
                  res.json(result);
              }
           });
        });
    }

}
