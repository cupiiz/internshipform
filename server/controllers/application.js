const sql = require('../db');
const smtp = require('./function/sentMail');
exports.getApplication = (req, res) => {

    try {
        const sqlQuery = `
            SELECT applications.id AS  application_id, 
            applications.internship_startdate, 
            applications.internship_enddate,
           
            students.firstname,
            students.lastname,
            students.email,
            students.phonenumber,
            universities.university,
            faculties.faculty_name,
            branches.branch_name,
            teams.team_name,
            positions.positions_name
            



            FROM therunway_internship.applications

            INNER JOIN students
            ON applications.student_id = students.id

            INNER JOIN universities
            ON applications.university_id = universities.id

            INNER JOIN faculties
            ON applications.faculty_id = faculties.id

            INNER JOIN branches
            ON applications.branch_id = branches.id

            INNER JOIN teams
            ON applications.team_id = teams.id

            INNER JOIN positions
            ON applications.position_id = positions.id

          
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

exports.createApplication = (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;

    const internship_startdate = req.body.internship_startdate;
    const internship_enddate = req.body.internship_enddate;
    const university_id = req.body.university_id;
    const position_id = req.body.position_id;
    const team_id = req.body.team_id;
    const internship_resume = req.body.internship_resume;
    const faculty_name = req.body.faculty_name;
    const branch_name = req.body.branch_name;
    

    let student_id = 0;
    let faculty_id = 0;
    let branch_id = 0;

    try {
        const sqlQuery = `
            INSERT INTO students
            (   firstname,
                lastname,
                email,
                phonenumber ) 
            VALUES ( '${first_name}', '${last_name}', '${email}', '${phoneNumber}' )
            
        `
        sql.query(sqlQuery, async (err, responStudent) => {
            if (err) {
                // throw err
                const message = 'server error!';
                const status = 500;
                return res.status(status).json({ message: message, code: status, err: err });
            } else {

                // set student id 
                student_id = responStudent.insertId;


                const sqlQuery = ` INSERT INTO faculties ( faculty_name, university_id ) VALUES ( '${faculty_name}','${university_id}' ) `
                sql.query(sqlQuery, async (err, responFaculties) => {
                    if (err) {
                        // throw err
                        const message = 'server error!';
                        const status = 500;
                        return res.status(status).json({ message: message, code: status, err: err });
                    } else {
                        faculty_id = responFaculties.insertId;


                        const sqlQuery = ` INSERT INTO branches ( branch_name,faculty_id) VALUES ( '${branch_name}', '${faculty_id}')`
                        sql.query(sqlQuery, async (err, responBranches) => {

                            if (err) {
                                // throw err
                                const message = 'server error!';
                                const status = 500;
                                return res.status(status).json({ message: message, code: status, err: err });
                            } else {
                                branch_id = responBranches.insertId;
                                const sqlQuery = `
                                    INSERT INTO applications
                                    (   internship_startdate,
                                        internship_enddate,
                                        internship_resume,
                                        student_id,
                                        university_id,
                                        faculty_id,
                                        branch_id,
                                        team_id,
                                        position_id ) 
                                    VALUES ( 
                                        '${internship_startdate}',
                                        '${internship_enddate}',
                                        '${internship_resume}',
                                        '${student_id}',
                                        '${university_id}',
                                        '${faculty_id}',
                                        '${branch_id}',
                                        '${team_id}',
                                        '${position_id}' 
                                    ) `
                                sql.query(sqlQuery, async (err, applications_results) => {

                                    if (err) {
                                        // throw err
                                        const message = 'server error!';
                                        const status = 500;
                                        return res.status(status).json({ message: message, code: status, err: err });
                                    } else {
                                        smtp.setMail( email )
                                        
                                        return res.status(200).json({ status: 200, message: message, results: applications_results });
                                    }
                                });
                            }
                        });
                    }
                })
            }
        });
    } catch (err) {
        const message = 'server error!';
        const status = 500;
        return res.status(status).json({ message: message, code: status });
    }

};

exports.updateApplication = (req, res) => {
    const application_id = req.body.application_id;

    const internship_startdate = req.body.internship_startdate;
    const internship_enddate = req.body.internship_enddate;
    const university_id = req.body.university_id;
    const position_id = req.body.position_id;
    const team_id = req.body.team_id;
    try {
        const sqlQuery = `
            UPDATE applications
            SET 
            

            internship_startdate='${internship_startdate}',
            internship_enddate='${internship_enddate}',
            university_id='${university_id}',
            positions_id='${position_id}',
            team_id ='${team_id}',

            branch_id='${branch_id}',
            faculty_id='${faculty_id}',

            WHERE id='${application_id}'
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

exports.deleteApplication = (req, res) => {
    const application_id = req.body.application_id;
    try {
        const sqlQuery = `
            DELETE FROM applications
            WHERE id='${application_id}'
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