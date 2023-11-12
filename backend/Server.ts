
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
        this.mediaRoute();
        this.studioRoute();

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

    // /api/media
    // ******************************************************
    private mediaRoute(): void {
        this.app.get("/api/media", (req: Request, res: Response): void => {

            const query: string = "SELECT * FROM Media";

            this.db.query(query, (err, result) => {
                if (err) {
                    console.error("ERROR: " + err);
                } else {
                    res.json(result);
                }
            });

        });
    }

    // /api/studio
    // ******************************************************
    private studioRoute(): void {
        this.app.get("/api/studio", (req: Request, res: Response): void => {

            const query: string = "SELECT * FROM Studio";

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
