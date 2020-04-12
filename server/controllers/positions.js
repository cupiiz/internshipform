const sql = require('../db');

exports.getPosition = (req, res) => {

    try {
        const sqlQuery = `
            SELECT positions.id AS position_id, positions.positions_name, teams.team_name ,positions.team_id
            FROM therunway_internship.positions
            INNER JOIN teams
            ON positions.team_id = teams.id
        `
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

exports.createPosition = (req, res) => {
    const position_name = req.body.position_name;
    const team_id = req.body.team_id;
    try {
        const sqlQuery = `
            INSERT INTO positions ( positions_name, team_id ) 
            VALUES ( '${position_name}', '${team_id}' )
        `
        sql.query(sqlQuery, async (err, results) => {

            if (err) {
                // throw err
                const message = 'server error!';
                const status = 500;
                return res.status(status).json({ message: message, code: status, err: err });
            } else {
                const message = 'create position success!';
                return res.status(200).json({ status: 200, message: message, results: results });
            }
        });
    } catch (err) {
            const message = 'server error!';
            const status = 500;
            return res.status(status).json({ message: message, code: status });
    }

};

exports.updatePosition = (req, res) => {
    const position_name = req.body.position_name;
    const position_id = req.body.position_id;
    const team_id = req.body.team_id;
    try {
        
        const sqlQuery = `
            UPDATE positions
            SET positions_name='${position_name}',
            team_id ='${team_id}' 
            WHERE id='${position_id}'
        `
        sql.query(sqlQuery, async (err, results) => {

            if (err) {
                // throw err
                const message = 'server error!';
                const status = 500;
                return res.status(status).json({ message: message, code: status, err: err });
            } else {
                const message = 'edit success!';
                return res.status(200).json({ status: 200, message: message, results: results });
            }
        });
    } catch (err) {
            const message = 'server error!';
            const status = 500;
            return res.status(status).json({ message: message, code: status });
    }
};

exports.deletePosition = (req, res) => {
    const position_id = req.body.position_id;
    try {
        const sqlQuery = `
            DELETE FROM positions
            WHERE id='${position_id}'
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