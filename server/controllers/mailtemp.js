const sql = require('../db');

exports.getMailTemp = (req, res) => {

    try {
        const sqlQuery = `SELECT id AS mailtemp_id, subject,text FROM therunway_internship.mailtemps`
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

exports.createMailTemp = (req, res) => {
    const mailtemp_subject = req.body.mailtemp_subject;
    const mailtemp_text = req.body.mailtemp_text;

    try { 
        const sqlQuery = `
                    INSERT INTO mailtemps ( subject,text ) 
                    VALUES ( '${mailtemp_subject}','${mailtemp_text}' )
                `
                sql.query(sqlQuery, async (err, results) => {
                    const message = 'success';
                    const status = 200;
                    return res.status(status).json({ message: message });
                })
 
    } catch (err) {
        const message = 'server error!';
        const status = 500;
        return res.status(status).json({ message: message, code: status });
    }

};


exports.updateMailTemp = (req, res) => {
    const mailtemp_subject = req.body.mailtemp_subject;
    const mailtemp_text = req.body.mailtemp_text;
    const mailtemp_id = req.body.mailtemp_id;
    try {
                const sqlQuery = `
                UPDATE mailtemps
                SET subject='${mailtemp_subject}',
                text='${mailtemp_text}' 

                WHERE id='${mailtemp_id}'
                `
                sql.query(sqlQuery, async (err, results) => {
                    const message = 'success';
                    const status = 200;
                    return res.status(status).json({ message: message });
                })
            
            }catch (err) {
        const message = 'server error!';
        const status = 500;
        return res.status(status).json({ message: message, code: status });
    }

};

exports.deleteMailTemp = (req, res) => {
    const mailtemp_id = req.body.mailtemp_id;
    try {
        const sqlQuery = `
            DELETE FROM mailtemps
            WHERE id='${mailtemp_id}'
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