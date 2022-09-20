const config = {
    user: 'db_a8d0f1_guayabosql_admin', // sql user
    password: 'Guayabo123', //sql user password
    server: 'SQL5104.site4now.net', // if it does not work try- localhost
    database: 'db_a8d0f1_guayabosql',
    options: {
      trustedconnection:  true,
      enableArithAbort:  true,
      trustServerCertificate: true,
      instancename:  'SQL5104.site4now.net'  // SQL Server instance name
    },
    port:  1433
  }

  /*const config = {
    user: 'AdminGuayabo',
    password: 'Guayabo123',
    server: 'LAPTOP-A1MV53OG', 
    database: 'Sendero_Guayabo',
    options: { 
      trustServerCertificate: true,
    },
    port:  1433
};*/
  
module.exports = config;