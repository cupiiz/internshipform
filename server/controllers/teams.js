const sql = require('../db');

exports.getTeam = (req, res) => {

    try {
        const sqlQuery = `SELECT id AS team_id, team_name FROM therunway_internship.teams`
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

exports.createTeam = (req, res) => {
    const team_name = req.body.team_name;


    try {
        const sqlQuery = `
        SELECT team_name
        FROM teams
        WHERE team_name = '${team_name}';
        `

        sql.query(sqlQuery, async (err, results) => {
            console.log(results);


            if (err) {
                // throw err
                const message = 'server error!';
                const status = 500;
                return res.status(status).json({ message: message, code: status, err: err });

            }
            console.log(results.length);

            if (results.length != 0) {
                const message = 'This team has already create.';
                return res.status(200).json({ message: message });
            } else {
                const sqlQuery = `
                    INSERT INTO teams ( team_name ) 
                    VALUES ( '${team_name}' )
                `
                sql.query(sqlQuery, async (err, results) => {
                    const message = 'success';
                    const status = 200;
                    return res.status(status).json({ message: message });
                })
            }

        });
    } catch (err) {
        const message = 'server error!';
        const status = 500;
        return res.status(status).json({ message: message, code: status });
    }

};


exports.updateTeam = (req, res) => {
    const team_id = req.body.team_id;
    const team_name = req.body.team_name;
    try {
        const sqlQuery = `
        SELECT team_name
        FROM teams
        WHERE team_name = '${team_name}';
        `

        sql.query(sqlQuery, async (err, results) => {
            console.log(results);


            if (err) {
                // throw err
                const message = 'server error!';
                const status = 500;
                return res.status(status).json({ message: message, code: status, err: err });

            }
            console.log(results.length);

            if (results.length != 0) {
                const message = 'This team has already create.';
                return res.status(200).json({ message: message });
            } else {

                const sqlQuery = `
                UPDATE teams
                SET team_name='${team_name}' 
                WHERE id='${team_id}'
                `
                sql.query(sqlQuery, async (err, results) => {
                    const message = 'success';
                    const status = 200;
                    return res.status(status).json({ message: message });
                })
            }

        });
    } catch (err) {
        const message = 'server error!';
        const status = 500;
        return res.status(status).json({ message: message, code: status });
    }

};

exports.deleteTeam = (req, res) => {
    const team_id = req.body.team_id;
    try {
        const sqlQuery = `
            DELETE FROM teams
            WHERE id='${team_id}'
        `
        sql.query(sqlQuery, async (err, results) => {

            if (err) {
                // throw err
                const message = 'server error!';
                const status = 500;
                return res.status(status).json({ message: message, code: status, err: err });
            } else {
                const message = 'delete success!';
                return res.status(200).json({ status: 200, message: message, results: results });
            }
        });
    } catch (err) {
        const message = 'server error!';
        const status = 500;
        return res.status(status).json({ message: message, code: status });
    }
};