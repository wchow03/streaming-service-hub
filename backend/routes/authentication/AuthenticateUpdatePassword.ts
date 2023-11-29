import {Request, Response} from "express";
import console from "console";

export default function authenticateUpdatePassword(app, db): void {
    app.post("/api/authenticate/updatepassword", (req: Request, res: Response): void => {
        const crypto = require('crypto');
        const userID: string = req.body.userID;
        const password: string = req.body.password;
        const oldPassword: string = req.body.oldPassword;

        // console.log("UserID: " + userID);
        // console.log("Password: " + password);
        // console.log("Old Password: " + oldPassword);

        if (!userID || !password || !oldPassword) {
            res.status(400).send({error: "Missing required field"});
            return;
        }

        const validateOldPasswordQuery: string = `
            SELECT passwordSalt, passwordHash
            FROM StreamingUser
            WHERE userID = ${userID};
        `;

        db.query(validateOldPasswordQuery, (err, result) => {
            if (err) {
                console.error(err);
                res.status(400).send({error: "Error Changing Password"});
            } else {
                if (result.length === 0) {
                    res.status(400).send({error: "User not found"});
                    return;
                }

                const salt = result[0].passwordSalt;
                const hashedPassword = crypto.createHash('sha512').update(oldPassword + salt).digest('hex');

                console.log(hashedPassword);
                console.log(result[0].passwordHash);

                if (hashedPassword !== result[0].passwordHash) {
                    res.status(400).send({error: "Incorrect password"});
                    return;
                }
            }
        });

        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto.createHash('sha512').update(password + salt).digest('hex');

        const query: string = `
            UPDATE StreamingUser
            SET passwordHash = ?,
                passwordSalt = ?
            WHERE userID = ${userID};
        `;

        // console.log(query);

        db.query(query, [hashedPassword, salt], (err, result) => {
            if (err) {
                console.error(err);
                res.status(400).send({error: "Error Changing Password"});
            } else {
                // console.log(result);
                res.status(200).send({message: result});
            }
        });


    });
}