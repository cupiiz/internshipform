const sql = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.adminSignup = (req, res) => {

    const name = req.body.admin_name;
    const email = req.body.admin_eamil;
    const username = req.body.admin_username;
    const password = req.body.admin_password;

    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            const aslQuery = `
            INSERT INTO admins ( admin_name, admin_eamil, admin_username, admin_password ) 
            VALUES ( '${name}', '${email}', '${username}', '${hashedPw}')`;
            sql.query(aslQuery, (err, results) => {
                if (err) {
                    // throw err
                    const message = 'server error!';
                    const status = 500;
                    return res.status(status).json({ message: message, code: status, err: err });
                } else {
                    return res.status(201).json({ message: 'Admin created!', data: results });
                }
            });
        })
        .catch(err => {
            const message = 'server error!';
            const status = 500;
            return res.status(status).json({ message: message, code: status });
        });
};

exports.adminLogin = (req, res) => {
    const username = req.body.admin_username;
    const password = req.body.admin_password;
    try {
        const sqlQuery = `SELECT id, admin_username, admin_password FROM therunway_internship.admins WHERE admin_username='${username}'`
        sql.query(sqlQuery, async (err, results) => {

            
            if(results.length === 0){
                return res.status(400).json({ message: 'username incorect', code: 400 });
            }

            if (err) {
                // throw err
                const message = 'server error!';
                const status = 500;
                return res.status(status).json({ message: message, code: status, err: err });
            } else {
                const isEqual = await bcrypt.compare(password, results[0].admin_password)
                if (!isEqual) {
                    const message = 'Wrong password!';
                    const status = 401;
                    return res.status(status).json({ message: message, code: status });
                }
                const token = jwt.sign(
                    {
                        username: results[0].admin_username,
                        adminId: results[0].id
                    },
                    'somesupersecretsecret',
                    { expiresIn: '1h' }
                );
                return res.status(200).json({ token: token, userId: results[0].id });
            }
        });
    } catch (err) {
            const message = 'server error!';
            const status = 500;
            return res.status(status).json({ message: message, code: status });
    }

};

exports.getAdmin = (req, res) => {

    try {
        const sqlQuery = `SELECT id, admin_username, admin_password FROM therunway_internship.admins`
        sql.query(sqlQuery, async (err, results) => {
            if (err) {
                // throw err
                const message = 'server error!';
                const status = 500;
                return res.status(status).json({ message: message, code: status, err: err });
            } else {
                return res.status(200).json({ data: results });
            }
        });
    } catch (err) {
            const message = 'server error!';
            const status = 500;
            return res.status(status).json({ message: message, code: status });
    }

};

