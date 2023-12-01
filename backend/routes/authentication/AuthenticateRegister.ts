import {Request, Response} from "express";
import console from "console";

export default function authenticateRegister(app, db): void {
    app.post("/api/authenticate/register", (req: Request, res: Response): void => {
        const crypto = require('crypto');

        const username = req.body.user;
        const password = req.body.password;
        const email = req.body.email;
        const birthday = req.body.birthday;

        if (!username || !password || !email || !birthday) {
            res.status(400).send({error: "Missing required field"});
            return;
        }

        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto.createHash('sha512').update(password + salt).digest('hex');


        // const query: string =
        //     `
        //         INSERT INTO StreamingUser (userName, email, birthday, passwordSalt, passwordHash)
        //         VALUES ('${username}', '${email}', '${birthday}', '${salt}', '${hashedPassword}');
        //     `;

        const query: string =
            `
                INSERT INTO StreamingUser (userName, email, birthday, passwordSalt, passwordHash)
                VALUES (?, ?, ?, ?, ?);
            `;

        console.log(query);

        db.query(query, [username, email, birthday, salt, hashedPassword], (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).send({error: "Error authenticating"});
            } else {
                res.json(result);
            }
        })
    })
}
