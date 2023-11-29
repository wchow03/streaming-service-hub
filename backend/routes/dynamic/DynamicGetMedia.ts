import {Request, Response} from "express";
import console from "console";

export default function dynamicGetMedia(app, db): void {
    app.post("/api/media/:type", (req: Request, res: Response): void => {
        const TYPE: string = req.params.type as string;

        const showColumns: string = `d.numberOfSeasons`;
        const movieColumns: string = `d.version, d.length`;
        let columns: string = "";

        if (TYPE === "TVShow") {
            columns = showColumns;
        } else if (TYPE === "Movie") {
            columns = movieColumns;
        } else {
            res.status(400).send({error: "Invalid media type"});
        }

        const WHERE: string = req.body.WHERE as string;
        let GENRE: string[] = (req.body.GENRE as string[]);
        let genreCount: number;

        if (GENRE) {
            GENRE = GENRE.map((genre: string) => {
                return `'${genre}'`;
            });

            genreCount = GENRE.length;
        }

        let query: string = `
            SELECT m.mediaID,
                   m.mediaName,
                   m.rating,
                   m.studioName,
                   m.serviceName,
                   ${columns},
                   GROUP_CONCAT(g.genreName) AS genres
            FROM Media m
                     JOIN ${TYPE} d
                          ON m.mediaID = d.mediaID
                     JOIN Genre g
                          ON m.mediaID = g.mediaID
            WHERE ?where ?genre
            GROUP BY m.mediaID,
                m.mediaName,
                m.rating,
                m.studioName,
                m.serviceName,
                ${columns}
                ?genreCount;`;

        if (WHERE) {
            query = query.replace("?where", `${WHERE} ${genreCount > 0 ? "AND" : ""}`);
        } else {
            query = query.replace("?where", "");
        }

        if (genreCount > 0) {
            query = query.replace("?genre", `g.genreName IN (${GENRE.toString()})`);
            query = query.replace("?genreCount", `HAVING COUNT (DISTINCT g.genreName) = ${genreCount}`);
        } else {
            query = query.replace("?genre", "");
            query = query.replace("?genreCount", "");
        }

        console.log(query);

        db.query(query,
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(result);
                }
            });
    });
}