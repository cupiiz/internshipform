const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'tecmove108',
    user: 'root',
    database: 'therunway_internship',
    host: 'localhost',
    port: '3306'
});

let internshipformdb = {};

internshipformdb.all = () => {

 return new Promise((resolve, reject)=>{

    pool.query(`SELECT * FROM students`,(err,results)=>{
        if(err){
            return reject(err);
        }
        return resolve(results);
    });
    
 });
};

module.exports = internshipformdb;