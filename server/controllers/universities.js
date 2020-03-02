const sql = require('../db');

exports.getUniversities = (req, res) => {

    try {
        const sqlQuery = `SELECT id AS universities_id, university FROM therunway_internship.universities`
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
