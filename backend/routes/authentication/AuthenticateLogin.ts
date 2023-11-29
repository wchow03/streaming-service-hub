import {Request, Response} from "express";
import console from "console";

export default function authenticateLogin(app, db): void {
    app.post("/api/authenticate/login", (req: Request, res: Response): void => {
        const crypto = require('crypto');
        const email = req.body.email;
        const password = req.body.password;

        const query: string = `
            SELECT passwordSalt, passwordHash, userID, email, userName
            FROM StreamingUser
            WHERE email = ?;
        `;

        db.query(query, [email], (err, result) => {
            if (err) {
                console.error(err);
                res.status(400).send({error: "Error authenticating"});
            } else {
                if (result.length === 0) {
                    res.status(400).send({error: "User not found"});
                    return;
                }

                const salt = result[0].passwordSalt;
                const hashedPassword = crypto.createHash('sha512').update(password + salt).digest('hex');

                // console.log(hashedPassword);
                // console.log(result[0].passwordHash);

                if (hashedPassword === result[0].passwordHash) {
                    res.json({userID: result[0].userID, email: result[0].email, userName: result[0].userName});
                } else {
                    res.status(400).send({error: "Incorrect password"});
                }
            }
        });
    });
}