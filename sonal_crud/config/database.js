const mysql = require('mysql2');
var mysqlconnection = mysql.createConnection({
    host     : 'localhost',
      user     : 'root',
      password : 'smartant',
      database : 'customer'
})

mysqlconnection.connect((err)=>{
    if(err){
       console.log(('error in connection : ' + JSON.stringify(err , undefined ,2)));
       
    }
    else{
     console.log(('db connected' ));
     
    }
})
module.exports = mysqlconnection;