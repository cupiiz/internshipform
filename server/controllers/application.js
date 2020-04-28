const sql = require('../db');
const smtp = require('./function/sentMail');
const amtp = require('./function/approveMail');
const dmtp = require('./function/declineMail');
exports.getApplication = (req, res) => {

    try {
        const sqlQuery = `
            SELECT applications.id AS  application_id, 
            applications.internship_startdate, 
            applications.internship_enddate,
            applications.internship_resume,
            students.firstname,
            students.lastname,
            students.email,
            students.phonenumber,
            universities.university,
            faculties.faculty_name,
            branches.branch_name,
            teams.team_name,
            positions.positions_name,
            status
            



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

            WHERE status='Waiting'
          
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
    const status = req.body.status;

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
    
                const sqlQuery = ` SELECT faculties.id,faculty_name FROM faculties WHERE faculty_name= '${faculty_name}' AND university_id ='${university_id}' `
                sql.query(sqlQuery, async (err, responFaculties) => {
                    console.log(responFaculties);
                    
                    if (responFaculties.length != 0) {
                        faculty_id = responFaculties[0].id;
                        console.log(faculty_id);
                        const sqlQuery2 = ` SELECT branches.id,branch_name FROM branches WHERE branch_name= '${branch_name}' AND faculty_id='${faculty_id}' `
                                sql.query(sqlQuery2, async (err, responBranches) => {
                                    if (responBranches.length != 0) {
                                        branch_id = responBranches[0].id;
                                        console.log(branch_id);
                                        
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
                                            position_id,
                                            status) 
                                        VALUES ( 
                                            '${internship_startdate}',
                                            '${internship_enddate}',
                                            '${internship_resume}',
                                            '${student_id}',
                                            '${university_id}',
                                            '${faculty_id}',
                                            '${branch_id}',
                                            '${team_id}',
                                            '${position_id}',
                                            'Waiting' 
                                        ) `
                                                sql.query(sqlQuery, async (err, applications_results) => {
    
                                                    if (err) {
                                                        // throw err
                                                        const message = 'server error!';
                                                        const status = 500;
                                                        return res.status(status).json({ message: message, code: status, err: err });
                                                    } else {
                                                        smtp.sendMail(email)
    
                                                        return res.status(200).json({ status: 200, results: applications_results });
                                                    }
                                                });
                                    } else {
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
                                            position_id,
                                            status ) 
                                        VALUES ( 
                                            '${internship_startdate}',
                                            '${internship_enddate}',
                                            '${internship_resume}',
                                            '${student_id}',
                                            '${university_id}',
                                            '${faculty_id}',
                                            '${branch_id}',
                                            '${team_id}',
                                            '${position_id}',
                                            'Waiting'
                                        ) `
                                                sql.query(sqlQuery, async (err, applications_results) => {
    
                                                    if (err) {
                                                        // throw err
                                                        const message = 'server error!';
                                                        const status = 500;
                                                        return res.status(status).json({ message: message, code: status, err: err });
                                                    } else {
                                                        smtp.sendMail(email)
                                                        
                                                        return res.status(200).json({ status: 200, results: applications_results });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                        
                    } else {
                        const sqlQuery = ` INSERT INTO faculties ( faculty_name, university_id ) VALUES ( '${faculty_name}','${university_id}' ) `
                        sql.query(sqlQuery, async (err, responFaculties) => {
                            if (err) {
                                // throw err
                                const message = 'server error!';
                                const status = 500;
                                return res.status(status).json({ message: message, code: status, err: err });
                            } else {
                                faculty_id = responFaculties.insertId;
                                const sqlQuery = ` SELECT branches.id,branch_name FROM branches WHERE branch_name= '${branch_name}' AND faculty_id='${faculty_id}' `
                                sql.query(sqlQuery, async (err, responBranches) => {
                                    if (responBranches.length != 0) {
                                        branch_id = responBranches[0].id;
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
                                            position_id,
                                            status ) 
                                        VALUES ( 
                                            '${internship_startdate}',
                                            '${internship_enddate}',
                                            '${internship_resume}',
                                            '${student_id}',
                                            '${university_id}',
                                            '${faculty_id}',
                                            '${branch_id}',
                                            '${team_id}',
                                            '${position_id}',
                                            'Waiting'
                                        ) `
                                                sql.query(sqlQuery, async (err, applications_results) => {
    
                                                    if (err) {
                                                        // throw err
                                                        const message = 'server error!';
                                                        const status = 500;
                                                        return res.status(status).json({ message: message, code: status, err: err });
                                                    } else {
                                                        smtp.sendMail(email)
    
                                                        return res.status(200).json({ status: 200, results: applications_results });
                                                    }
                                                });
                                    } else {
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
                                            position_id,
                                            status) 
                                        VALUES ( 
                                            '${internship_startdate}',
                                            '${internship_enddate}',
                                            '${internship_resume}',
                                            '${student_id}',
                                            '${university_id}',
                                            '${faculty_id}',
                                            '${branch_id}',
                                            '${team_id}',
                                            '${position_id}',
                                            'Waiting' 
                                        ) `
                                                sql.query(sqlQuery, async (err, applications_results) => {
    
                                                    if (err) {
                                                        // throw err
                                                        const message = 'server error!';
                                                        const status = 500;
                                                        return res.status(status).json({ message: message, code: status, err: err });
                                                    } else {
                                                        smtp.sendMail(email)
    
                                                        return res.status(200).json({ status: 200, results: applications_results });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
    
    
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
        DELETE therunway_internship.applications, therunway_internship.students 
        FROM applications
        INNER JOIN students ON applications.student_id = students.id
        WHERE applications.id='${application_id}'  ;
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

exports.statusChange = (req, res) => {
    const app_status = req.body.app_status;
    const app_id = req.body.app_id;
    const email = req.body.email;
    const idTmp = req.body.idTmp;

    try {
        const sqlQuery = `
            UPDATE applications
            SET status='${app_status}' 
            WHERE id='${app_id}'
        `
        sql.query(sqlQuery, async (err, results) => {
            console.log(results);

            if (err) {

                const message = 'server error!';
                const status = 500;
                return res.status(status).json({ message: message, code: status, err: err });
            }
            else if (app_status == 'Approve') {

                amtp.sendMail({
                    email: email,
                    idTmp: idTmp
                })
                return res.status(200).json({ status: 200, message: 'success', results: results });
            } else {
                dmtp.sendMail(email)
                return res.status(200).json({ status: 200, message: 'success', results: results });
            }
        });

    } catch (err) {
        const message = 'server error!';
        const status = 500;
        return res.status(status).json({ message: message, code: status });
    }
};

exports.getApprovedApplication = (req, res) => {

    try {
        const sqlQuery = `
            SELECT applications.id AS  application_id, 
            applications.internship_startdate, 
            applications.internship_enddate,
            applications.internship_resume,
            students.firstname,
            students.lastname,
            students.email,
            students.phonenumber,
            universities.university,
            faculties.faculty_name,
            branches.branch_name,
            teams.team_name,
            positions.positions_name,
            applications.status,
            mentors.mentor_firstname,
            applications.mentor_id
            
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

            LEFT JOIN mentors
            ON applications.mentor_id = mentors.id

            WHERE status='Approve'
          
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

exports.getDeclineApplication = (req, res) => {

    try {
        const sqlQuery = `
            SELECT applications.id AS  application_id, 
            applications.internship_startdate, 
            applications.internship_enddate,
            applications.internship_resume,
            students.firstname,
            students.lastname,
            students.email,
            students.phonenumber,
            universities.university,
            faculties.faculty_name,
            branches.branch_name,
            teams.team_name,
            positions.positions_name,
            applications.status
            
            
            
            
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

            

            WHERE status='Decline'
          
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
exports.AddMentors = (req, res) => {
    const mentor_id = req.body.mentor_id;
    const app_id = req.body.app_id;
    try {
        const sqlQuery = `
            UPDATE applications
            SET mentor_id ='${mentor_id}'
            WHERE id='${app_id}'
        `
        sql.query(sqlQuery, async (err, results) => {

            if (err) {
                // throw err
                const message = 'server error!';
                const status = 500;
                return res.status(status).json({ message: message, code: status, err: err });
            } else {
                const message = 'add success!';
                return res.status(200).json({ status: 200, message: message, results: results });
            }
        });
    } catch (err) {
        const message = 'server error!';
        const status = 500;
        return res.status(status).json({ message: message, code: status });
    }
};
