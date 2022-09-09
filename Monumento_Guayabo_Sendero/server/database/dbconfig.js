/*const config = {
    user: 'AdminGuayabo', // sql user
    password: 'Guayabo123', //sql user password
    server: 'LAPTOP-A1MV53OG', // if it does not work try- localhost
    database: 'Sendero_Guayabo',
    options: {
      trustedconnection:  true,
      enableArithAbort:  true,
      instancename:  'LAPTOP-A1MV53OG'  // SQL Server instance name
    },
    port:  1433
  }*/

  const config = {
    user: 'AdminGuayabo',
    password: 'Guayabo123',
    server: 'LAPTOP-A1MV53OG', 
    database: 'Sendero_Guayabo',
    options: { 
      trustServerCertificate: true,
    },
    port:  1433
};
  
module.exports = config;