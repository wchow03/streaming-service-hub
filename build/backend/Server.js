"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = __importStar(require("express"));
const path = __importStar(require("path"));
const mysql = __importStar(require("mysql"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
class Server {
    constructor(app) {
        this.tables = [];
        this.app = app;
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.json());
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
        this.tables.map((table) => {
            let query = "SELECT * FROM " + table;
            let route = "/api/" + table.toLowerCase();
            let addRoute = "/api/" + table.toLowerCase() + "/add";
            this.dynamicRoute(route, query);
            this.dynamicAddRoute(addRoute, table);
        });
        // this.app.get("*", (req: Request, res: Response): void => {
        //     res.sendFile(path.resolve("./") + "/build/frontend/index.html");
        // });
    }
    start(port) {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }
    // Connect to DB
    // ******************************************************
    initDB() {
        this.db = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "%mysqlroot%",
            // password: "admin",
            database: "tempstreamingservice"
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
    apiRoute() {
        this.app.get("/api", (req, res) => {
            res.send("You have reached the API!");
        });
    }
    // /api/:table
    // ******************************************************
    dynamicRoute(route, query) {
        this.app.get(route, (req, res) => {
            this.db.query(query, (err, result) => {
                if (err) {
                    console.error("ERROR: " + err);
                }
                else {
                    res.json(result);
                }
            });
        });
    }
    dynamicAddRoute(route, table) {
        this.app.post(route, (req, res) => {
            let query = this.createAddQuery(table, req.body);
            this.db.query(query, (err, result) => {
                if (err) {
                    console.error("ERROR: " + err);
                }
                else {
                    res.json(result);
                }
            });
        });
    }
    createAddQuery(table, params) {
        let query = "INSERT INTO " + table + " VALUES (";
        let i = 0;
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                if (i === 0) {
                    query += "'" + params[key] + "'";
                }
                else {
                    query += ", '" + params[key] + "'";
                }
                i++;
            }
        }
        query += ")";
        return query;
    }
}
exports.Server = Server;
