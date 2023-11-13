
import {Express, Request, Response} from "express";
import * as express from "express";
import * as path from "path";
import * as mysql from "mysql";
import cors from "cors";

export class Server {

    private app: Express;
    private db: mysql.Connection;

    constructor(app: Express) {
        this.app = app;
        this.app.use(cors());
        this.initDB();

        this.app.use(express.static(path.resolve("./") + "/build/frontend"));

        this.apiRoute();

        this.dynamicRoute("/api/addtolist", "SELECT * FROM AddToList");
        this.dynamicRoute("/api/age", "SELECT * FROM Age");
        this.dynamicRoute("/api/cost", "SELECT * FROM Cost");
        this.dynamicRoute("/api/genre", "SELECT * FROM Genre");
        this.dynamicRoute("/api/media", "SELECT * FROM Media");
        this.dynamicRoute("/api/movie", "SELECT * FROM Movie");
        this.dynamicRoute("/api/season", "SELECT * FROM Season");
        this.dynamicRoute("/api/streamingservice", "SELECT * FROM StreamingService");
        this.dynamicRoute("/api/streaminguser", "SELECT * FROM StreamingUser");
        this.dynamicRoute("/api/studio", "SELECT * FROM Studio");
        this.dynamicRoute("/api/subscribesTo", "SELECT * FROM SubscribesTo");
        this.dynamicRoute("/api/subscription", "SELECT * FROM Subscription");
        this.dynamicRoute("/api/tvshow", "SELECT * FROM TVShow");
        this.dynamicRoute("/api/watchhistory", "SELECT * FROM WatchHistory");
        this.dynamicRoute("/api/watchlist", "SELECT * FROM Watchlist");


        this.app.get("*", (req: Request, res: Response): void => {
            res.sendFile(path.resolve("./") + "/build/frontend/index.html");
        });
    }


    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }

    // Connect to DB
    // ******************************************************
    private initDB(): void {
        this.db = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "admin",
            database: "StreamingService"
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

}
