const sql = require('../db');

exports.getMentors = (req, res) => {

    try {
        const sqlQuery = `
            SELECT id AS mentor_id, firstname, lastname, email, phonenumber
            FROM therunway_internship.mentors
            
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

exports.createMentors = (req, res) => {
    const mentor_firstname = req.body.mentor_firstname;
    const mentor_lastname = req.body.mentor_lastname;
    const mentor_email = req.body.mentor_email;
    const mentor_phonenumber = req.body.mentor_phonenumber;
    
    try {
        const sqlQuery = `
            INSERT INTO mentors ( firstname,lastname,email,phonenumber ) 
            VALUES ( '${mentor_firstname}', '${mentor_lastname}', '${mentor_email}', '${mentor_phonenumber}' )
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

exports.updateMentors = (req, res) => {
    const mentor_firstname = req.body.mentor_firstname;
    const mentor_lastname = req.body.mentor_lastname;
    const mentor_email = req.body.mentor_email;
    const mentor_phonenumber = req.body.mentor_phonenumber;
    const mentor_id = req.body.mentor_id;
    try {
        const sqlQuery = `
            UPDATE mentors
            SET firstname ='${mentor_firstname}',
            lastname ='${mentor_lastname}',
            email ='${mentor_email}',
            phonenumber ='${mentor_phonenumber}'
            
            WHERE id='${mentor_id}'
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

exports.deleteMentors = (req, res) => {
    const mentor_id = req.body.mentor_id;
    try {
        const sqlQuery = `
            DELETE FROM mentors
            WHERE id='${mentor_id}'
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